export const config = {
    runtime: 'edge',
};

const JSON_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUSPICIOUS_PATTERNS = /<script|javascript:|onerror=|onclick=|<iframe|<img[^>]+onerror/i;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_BODY_BYTES = 20_000;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ContactPayload = {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    submittedAt?: unknown;
    website?: unknown; // Honeypot field
};

type RateLimitEntry = {
    count: number;
    windowStart: number;
};

declare global {
    var __contactRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const getRateLimitStore = (): Map<string, RateLimitEntry> => {
    if (!globalThis.__contactRateLimitStore) {
        globalThis.__contactRateLimitStore = new Map<string, RateLimitEntry>();
    }
    return globalThis.__contactRateLimitStore;
};

const jsonResponse = (status: number, payload: Record<string, unknown>, extraHeaders?: Record<string, string>) =>
    new Response(JSON.stringify(payload), {
        status,
        headers: {
            ...JSON_HEADERS,
            ...(extraHeaders || {}),
        },
    });

const toTrimmedString = (value: unknown): string | null => {
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
};

const getClientIp = (request: Request): string => {
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        const firstIp = forwardedFor.split(',')[0]?.trim();
        if (firstIp) return firstIp;
    }

    const realIp = request.headers.get('x-real-ip');
    if (realIp) return realIp.trim();

    const cfIp = request.headers.get('cf-connecting-ip');
    if (cfIp) return cfIp.trim();

    return 'unknown';
};

const checkRateLimit = (clientId: string): { allowed: boolean; retryAfterSeconds?: number } => {
    const now = Date.now();
    const store = getRateLimitStore();

    // Opportunistic cleanup to avoid unbounded growth in long-lived instances
    for (const [key, entry] of store.entries()) {
        if (now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
            store.delete(key);
        }
    }

    const entry = store.get(clientId);
    if (!entry || now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
        store.set(clientId, { count: 1, windowStart: now });
        return { allowed: true };
    }

    if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
        const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - entry.windowStart);
        return {
            allowed: false,
            retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
        };
    }

    entry.count += 1;
    store.set(clientId, entry);
    return { allowed: true };
};

const validatePayload = (payload: ContactPayload): { isValid: boolean; error?: string; sanitized?: { name: string; email: string; message: string; submittedAt: string } } => {
    const name = toTrimmedString(payload.name);
    const email = toTrimmedString(payload.email);
    const message = toTrimmedString(payload.message);
    const submittedAtRaw = toTrimmedString(payload.submittedAt);

    if (!name || !email || !message) {
        return { isValid: false, error: 'Missing required fields' };
    }

    if (name.length > MAX_NAME_LENGTH) {
        return { isValid: false, error: 'Name is too long' };
    }

    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
        return { isValid: false, error: 'Invalid email format' };
    }

    if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
        return { isValid: false, error: 'Message length is invalid' };
    }

    if (SUSPICIOUS_PATTERNS.test(message)) {
        return { isValid: false, error: 'Message contains disallowed content' };
    }

    const submittedAt = submittedAtRaw && !Number.isNaN(Date.parse(submittedAtRaw))
        ? new Date(submittedAtRaw).toISOString()
        : new Date().toISOString();

    return {
        isValid: true,
        sanitized: {
            name,
            email,
            message,
            submittedAt,
        },
    };
};

export default async function handler(request: Request) {
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                Allow: 'POST, OPTIONS',
            },
        });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
        return jsonResponse(405, { error: 'Method not allowed' }, { Allow: 'POST, OPTIONS' });
    }

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
        return jsonResponse(415, { error: 'Content-Type must be application/json' });
    }

    const contentLengthHeader = request.headers.get('content-length');
    if (contentLengthHeader) {
        const contentLength = Number.parseInt(contentLengthHeader, 10);
        if (!Number.isNaN(contentLength) && contentLength > MAX_BODY_BYTES) {
            return jsonResponse(413, { error: 'Payload too large' });
        }
    }

    const AIRTABLE_WEBHOOK_URL = process.env.AIRTABLE_WEBHOOK_URL;
    if (!AIRTABLE_WEBHOOK_URL) {
        console.error('AIRTABLE_WEBHOOK_URL is not configured');
        return jsonResponse(500, { error: 'Server configuration error' });
    }

    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
        return jsonResponse(
            429,
            { error: 'Too many requests. Please try again later.' },
            { 'Retry-After': String(rateLimit.retryAfterSeconds || 60) }
        );
    }

    try {
        const body = (await request.json()) as ContactPayload;

        // Honeypot: bots usually fill hidden fields, return success to avoid adaptation.
        const website = toTrimmedString(body.website);
        if (website) {
            return jsonResponse(200, { success: true, message: 'Form submitted successfully' });
        }

        const validation = validatePayload(body);
        if (!validation.isValid || !validation.sanitized) {
            return jsonResponse(400, { error: validation.error || 'Invalid payload' });
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        let airtableResponse: Response;
        try {
            airtableResponse = await fetch(AIRTABLE_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validation.sanitized),
                signal: controller.signal,
            });
        } finally {
            clearTimeout(timeout);
        }

        if (!airtableResponse.ok) {
            const errorText = await airtableResponse.text();
            console.error('Airtable error:', errorText);
            return jsonResponse(502, { error: 'Failed to submit to upstream provider' });
        }

        return jsonResponse(200, { success: true, message: 'Form submitted successfully' });
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            return jsonResponse(504, { error: 'Upstream timeout' });
        }

        console.error('Contact form error:', error);
        return jsonResponse(500, { error: 'Internal server error' });
    }
}
