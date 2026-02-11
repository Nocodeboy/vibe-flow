import type { VercelRequest, VercelResponse } from '@vercel/node';
import Airtable from 'airtable';

const SITE_URL = 'https://vibeflow.es';
const TABLE_NAME = 'News';
const FALLBACK_IMAGE = `${SITE_URL}/images/seo/og-image-blog.webp`;
const FALLBACK_DESCRIPTION = 'Ideas, tutoriales y reflexiones sobre IA, automatizacion y la construccion de negocios digitales escalables.';

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID || 'appSaEaDYNrloBTkT');

const TITLE_FIELD_CANDIDATES = [
    'Nuevo T\u00edtulo',
    'Nuevo TÃƒÂ­tulo',
    'Nuevo TÃƒÆ’Ã‚Â­tulo',
    'T\u00edtulo',
    'TÃƒÂ­tulo',
    'TÃƒÆ’Ã‚Â­tulo',
    'Titulo'
];

const DATE_FIELD_CANDIDATES = [
    'Fecha de Publicaci\u00f3n',
    'Fecha de PublicaciÃƒÂ³n',
    'Fecha de PublicaciÃƒÆ’Ã‚Â³n',
    'Creada 2'
];

type AirtableAttachment = { url?: unknown };

type BlogMetaPost = {
    slug: string;
    title: string;
    description: string;
    date: string;
    image: string;
    author: string;
};

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

const toAbsoluteUrl = (value: string): string => {
    if (!value) return FALLBACK_IMAGE;
    if (/^https?:\/\//i.test(value)) return value;
    if (value.startsWith('//')) return `https:${value}`;
    if (value.startsWith('/')) return `${SITE_URL}${value}`;
    return `${SITE_URL}/${value.replace(/^\/+/, '')}`;
};

const escapeHtml = (value: string): string => {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

const toPostMeta = (fields: Record<string, unknown>): BlogMetaPost | null => {
    const slug = extractSlug(fields);
    const title = getString(pickField(fields, TITLE_FIELD_CANDIDATES));

    if (!slug || slug === 'untitled' || slug.length < 3 || !title) {
        return null;
    }

    const description =
        getString(fields['SEO:Description']) ||
        getString(fields['SEO:Title']) ||
        `${title.slice(0, 160)}...`;

    const image = toAbsoluteUrl(
        getImage(fields['Social:Image']) || getString(fields['Url img']) || FALLBACK_IMAGE
    );

    const author = Array.isArray(fields['Nombre (from Editor - Nombre)']) && fields['Nombre (from Editor - Nombre)'].length > 0
        ? String(fields['Nombre (from Editor - Nombre)'][0])
        : 'Vibe Flow Team';

    return {
        slug,
        title,
        description,
        date: normalizeDate(getString(pickField(fields, DATE_FIELD_CANDIDATES))),
        image,
        author
    };
};

const buildHtml = (post: BlogMetaPost): string => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    const title = `${post.title} | Vibe Flow`;
    const safeTitle = escapeHtml(title);
    const safeDescription = escapeHtml(post.description || FALLBACK_DESCRIPTION);
    const safeImage = escapeHtml(post.image || FALLBACK_IMAGE);
    const safeUrl = escapeHtml(url);

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        image: [post.image || FALLBACK_IMAGE],
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Person',
            name: post.author
        },
        publisher: {
            '@type': 'Organization',
            name: 'Vibe Flow',
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/images/og-image.png`
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url
        },
        description: post.description || FALLBACK_DESCRIPTION
    };

    const schemaJson = JSON.stringify(articleSchema).replace(/</g, '\\u003c');

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}">
    <link rel="canonical" href="${safeUrl}">

    <meta property="og:type" content="article">
    <meta property="og:url" content="${safeUrl}">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDescription}">
    <meta property="og:image" content="${safeImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="es_ES">
    <meta property="og:site_name" content="Vibe Flow">
    <meta property="article:published_time" content="${escapeHtml(post.date)}">
    <meta property="article:author" content="${escapeHtml(post.author)}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${safeUrl}">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDescription}">
    <meta name="twitter:image" content="${safeImage}">

    <script type="application/ld+json">${schemaJson}</script>
</head>
<body>
    <main>
        <h1>${escapeHtml(post.title)}</h1>
        <p>${safeDescription}</p>
    </main>
</body>
</html>`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
        res.setHeader('Allow', 'GET, HEAD, OPTIONS');
        res.status(405).send('Method Not Allowed');
        return;
    }

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { slug } = req.query;
    if (!slug || typeof slug !== 'string') {
        res.status(400).send('Missing slug');
        return;
    }

    const requestedSlug = normalizeSlug(slug);
    if (!requestedSlug) {
        res.status(400).send('Invalid slug');
        return;
    }

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    try {
        if (!process.env.AIRTABLE_API_KEY) {
            throw new Error('Missing AIRTABLE_API_KEY environment variable');
        }

        const records = await base(TABLE_NAME).select().all();
        let matchedPost: BlogMetaPost | null = null;

        for (const record of records) {
            const fields = record.fields as Record<string, unknown>;
            const postMeta = toPostMeta(fields);
            if (!postMeta) continue;
            if (postMeta.slug === requestedSlug) {
                matchedPost = postMeta;
                break;
            }
        }

        if (!matchedPost) {
            res.status(404).send('Post not found');
            return;
        }

        if (req.method === 'HEAD') {
            res.status(200).end();
            return;
        }

        res.status(200).send(buildHtml(matchedPost));
    } catch (error: unknown) {
        console.error('Blog Meta Error:', error);
        const details = error instanceof Error ? error.message : String(error);
        res.status(500).send(`Failed to generate metadata: ${escapeHtml(details)}`);
    }
}
