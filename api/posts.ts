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

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');

    try {
        if (!process.env.AIRTABLE_API_KEY) {
            throw new Error('Missing AIRTABLE_API_KEY environment variable');
        }

        const records = await base(TABLE_NAME).select().all();
        const seenSlugs = new Set<string>();

        const posts = records
            .map(record => {
                const fields = record.fields as Record<string, unknown>;
                const slug = extractSlug(fields);
                const title = getString(pickField(fields, TITLE_FIELD_CANDIDATES));

                if (!slug || slug === 'untitled' || slug.length < 3 || seenSlugs.has(slug) || !title) {
                    return null;
                }

                seenSlugs.add(slug);

                const excerpt =
                    getString(fields['SEO:Description']) ||
                    getString(fields['SEO:Title']) ||
                    `${title.slice(0, 140)}...`;

                return {
                    id: record.id,
                    slug,
                    title,
                    excerpt,
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
                    content: []
                };
            })
            .filter((post): post is NonNullable<typeof post> => post !== null)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        res.status(200).json(posts);
    } catch (error: unknown) {
        console.error('Airtable API Error:', error);
        const details = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            error: 'Failed to fetch posts',
            details,
        });
    }
}
