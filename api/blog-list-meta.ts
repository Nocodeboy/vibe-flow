import type { VercelRequest, VercelResponse } from '@vercel/node';
import Airtable from 'airtable';

const SITE_URL = 'https://vibeflow.es';
const TABLE_NAME = 'News';
const OG_IMAGE = `${SITE_URL}/images/seo/og-image-blog.webp`;
const PAGE_TITLE = 'Blog | Vibe Flow';
const PAGE_DESCRIPTION = 'Ideas, tutoriales y reflexiones sobre IA, automatización y la construcción de negocios digitales escalables.';
const MAX_POSTS_PREVIEW = 20;

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID || 'appSaEaDYNrloBTkT');

const TITLE_FIELD_CANDIDATES = [
    'Nuevo T\u00edtulo',
    'Nuevo TÃ\u00adtulo',
    'Nuevo TÃƒÂ\u00adtulo',
    'T\u00edtulo',
    'TÃ\u00adtulo',
    'TÃƒÂ\u00adtulo',
    'Titulo'
];

const DATE_FIELD_CANDIDATES = [
    'Fecha de Publicaci\u00f3n',
    'Fecha de PublicaciÃ³n',
    'Fecha de PublicaciÃƒÂ³n',
    'Creada 2'
];

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
        if (getString(value)) return value;
    }
    return '';
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

const escapeHtml = (value: string): string => {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

type PostPreview = {
    slug: string;
    title: string;
    description: string;
    date: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.setHeader('Allow', 'GET, HEAD, OPTIONS');
        res.status(405).send('Method Not Allowed');
        return;
    }

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    try {
        if (!process.env.AIRTABLE_API_KEY) {
            throw new Error('Missing AIRTABLE_API_KEY environment variable');
        }

        const records = await base(TABLE_NAME).select().all();
        const seenSlugs = new Set<string>();
        const posts: PostPreview[] = [];

        for (const record of records) {
            const fields = record.fields as Record<string, unknown>;
            const slug = extractSlug(fields);
            const title = getString(pickField(fields, TITLE_FIELD_CANDIDATES));

            if (!slug || slug === 'untitled' || slug.length < 3 || !title || seenSlugs.has(slug)) {
                continue;
            }

            seenSlugs.add(slug);

            const description =
                getString(fields['SEO:Description']) ||
                getString(fields['SEO:Title']) ||
                `${title.slice(0, 160)}...`;

            const rawDate = getString(pickField(fields, DATE_FIELD_CANDIDATES));
            const parsed = rawDate ? new Date(rawDate) : null;
            const date = parsed && !Number.isNaN(parsed.getTime())
                ? parsed.toISOString().split('T')[0]
                : '';

            posts.push({ slug, title, description, date });
        }

        posts.sort((a, b) => {
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            return b.date.localeCompare(a.date);
        });

        const previewPosts = posts.slice(0, MAX_POSTS_PREVIEW);

        const blogListSchema = {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            url: `${SITE_URL}/blog`,
            publisher: {
                '@type': 'Organization',
                name: 'Vibe Flow',
                logo: {
                    '@type': 'ImageObject',
                    url: `${SITE_URL}/images/og-image.png`
                }
            },
            blogPost: previewPosts.map(post => ({
                '@type': 'BlogPosting',
                headline: post.title,
                url: `${SITE_URL}/blog/${post.slug}`,
                description: post.description,
                ...(post.date ? { datePublished: post.date } : {})
            }))
        };

        const schemaJson = JSON.stringify(blogListSchema).replace(/</g, '\\u003c');

        const postListHtml = previewPosts.map(post =>
            `        <li>
            <a href="${escapeHtml(`${SITE_URL}/blog/${post.slug}`)}">${escapeHtml(post.title)}</a>
            <p>${escapeHtml(post.description)}</p>
        </li>`
        ).join('\n');

        const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(PAGE_TITLE)}</title>
    <meta name="description" content="${escapeHtml(PAGE_DESCRIPTION)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${SITE_URL}/blog">

    <meta property="og:type" content="website">
    <meta property="og:url" content="${SITE_URL}/blog">
    <meta property="og:title" content="${escapeHtml(PAGE_TITLE)}">
    <meta property="og:description" content="${escapeHtml(PAGE_DESCRIPTION)}">
    <meta property="og:image" content="${escapeHtml(OG_IMAGE)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="es_ES">
    <meta property="og:site_name" content="Vibe Flow">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${SITE_URL}/blog">
    <meta name="twitter:title" content="${escapeHtml(PAGE_TITLE)}">
    <meta name="twitter:description" content="${escapeHtml(PAGE_DESCRIPTION)}">
    <meta name="twitter:image" content="${escapeHtml(OG_IMAGE)}">

    <script type="application/ld+json">${schemaJson}</script>
</head>
<body>
    <main>
        <h1>Blog &amp; Ideas</h1>
        <p>${escapeHtml(PAGE_DESCRIPTION)}</p>
        <h2>Artículos recientes</h2>
        <ul>
${postListHtml}
        </ul>
    </main>
</body>
</html>`;

        if (req.method === 'HEAD') {
            res.status(200).end();
            return;
        }

        res.status(200).send(html);
    } catch (error: unknown) {
        console.error('Blog List Meta Error:', error);
        const details = error instanceof Error ? error.message : String(error);
        res.status(500).send(`Failed to generate blog list metadata: ${escapeHtml(details)}`);
    }
}
