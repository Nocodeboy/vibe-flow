import type { VercelRequest, VercelResponse } from '@vercel/node';
import Airtable from 'airtable';

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID || 'appSaEaDYNrloBTkT');

const TABLE_NAME = 'News';

const TITLE_FIELD_CANDIDATES = [
    'Nuevo T\u00edtulo',
    'Nuevo TÃ­tulo',
    'Nuevo TÃƒÂ­tulo',
    'T\u00edtulo',
    'TÃ­tulo',
    'TÃƒÂ­tulo',
    'Titulo'
];

const DATE_FIELD_CANDIDATES = [
    'Fecha de Publicaci\u00f3n',
    'Fecha de PublicaciÃ³n',
    'Fecha de PublicaciÃƒÂ³n',
    'Creada 2'
];

const BODY_FIELD_CANDIDATES = [
    'Publicaci\u00f3n de blog',
    'PublicaciÃ³n de blog',
    'PublicaciÃƒÂ³n de blog'
];

type AirtableAttachment = { url?: unknown };

const getString = (val: unknown): string => {
    if (!val) return '';
    if (typeof val === 'string') return val.trim();
    if (typeof val === 'object' && val !== null && 'value' in val) {
        return String((val as { value: unknown }).value).trim();
    }
    return String(val).trim();
};

const pickField = (fields: Record<string, unknown>, candidates: string[]): unknown => {
    for (const key of candidates) {
        if (!(key in fields)) continue;
        const value = fields[key];
        if (getString(value)) {
            return value;
        }
    }
    return '';
};

const getImage = (val: unknown): string => {
    if (Array.isArray(val) && val.length > 0) {
        const firstItem = val[0] as AirtableAttachment;
        if (typeof firstItem?.url === 'string') {
            return firstItem.url;
        }
    }
    return getString(val);
};

const normalizeSlug = (value: string): string => {
    return value
        .toLowerCase()
        .replace(/^https?:\/\/[^/]+/i, '')
        .replace(/^\/?blog\/?/i, '')
        .replace(/[?#].*$/, '')
        .replace(/\/+$/, '')
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

const extractSlug = (fields: Record<string, unknown>): string => {
    const slugFromSeo = normalizeSlug(getString(fields['SEO:Slug']));
    if (slugFromSeo) return slugFromSeo;

    const rawUrl = getString(fields['Url']);
    if (rawUrl) {
        const slugFromUrl = normalizeSlug(rawUrl.split('/').filter(Boolean).pop() || '');
        if (slugFromUrl) return slugFromUrl;
    }

    return normalizeSlug(getString(pickField(fields, TITLE_FIELD_CANDIDATES)));
};

const normalizeDate = (value: string): string => {
    if (!value) return new Date().toISOString();
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
    return parsed.toISOString();
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { slug } = req.query;
    if (!slug || typeof slug !== 'string') {
        res.status(400).json({ error: 'Missing or invalid slug parameter' });
        return;
    }

    const requestedSlug = normalizeSlug(slug);
    if (!requestedSlug) {
        res.status(400).json({ error: 'Invalid slug parameter' });
        return;
    }

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=7200');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');

    try {
        if (!process.env.AIRTABLE_API_KEY) {
            throw new Error('Missing AIRTABLE_API_KEY environment variable');
        }

        const records = await base(TABLE_NAME).select().all();
        const seenSlugs = new Set<string>();

        const processedPosts = records
            .map(record => {
                const fields = record.fields as Record<string, unknown>;
                const postSlug = extractSlug(fields);
                const title = getString(pickField(fields, TITLE_FIELD_CANDIDATES));

                if (!postSlug || postSlug === 'untitled' || postSlug.length < 3 || seenSlugs.has(postSlug) || !title) {
                    return null;
                }

                seenSlugs.add(postSlug);

                const body = getString(pickField(fields, BODY_FIELD_CANDIDATES));

                return {
                    id: record.id,
                    slug: postSlug,
                    title,
                    excerpt: getString(fields['SEO:Description']) || getString(fields['SEO:Title']) || `${title.slice(0, 140)}...`,
                    category: 'Blog',
                    date: normalizeDate(getString(pickField(fields, DATE_FIELD_CANDIDATES))),
                    readTime: '5 min',
                    img: getImage(fields['Social:Image']) || getString(fields['Url img']) || '/images/blog/placeholder.webp',
                    author: {
                        name: Array.isArray(fields['Nombre (from Editor - Nombre)']) && fields['Nombre (from Editor - Nombre)'].length > 0
                            ? String(fields['Nombre (from Editor - Nombre)'][0])
                            : 'Vibe Flow Team',
                        avatar: '/images/team/german.webp',
                        role: 'Editor'
                    },
                    content: [body]
                };
            })
            .filter((post): post is NonNullable<typeof post> => post !== null)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const currentIndex = processedPosts.findIndex(post => post.slug === requestedSlug);
        if (currentIndex === -1) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }

        const post = processedPosts[currentIndex];
        const prev = currentIndex > 0
            ? { slug: processedPosts[currentIndex - 1].slug, title: processedPosts[currentIndex - 1].title }
            : null;
        const next = currentIndex < processedPosts.length - 1
            ? { slug: processedPosts[currentIndex + 1].slug, title: processedPosts[currentIndex + 1].title }
            : null;

        res.status(200).json({
            post,
            navigation: { prev, next }
        });
    } catch (error: unknown) {
        console.error('Airtable API Error:', error);
        const details = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            error: 'Failed to fetch post',
            details,
        });
    }
}
