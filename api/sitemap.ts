import type { VercelRequest, VercelResponse } from '@vercel/node';
import Airtable from 'airtable';

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID || 'appSaEaDYNrloBTkT');

const SITE_URL = 'https://vibeflow.es';
const TABLE_NAME = 'News';
const MAX_POSTS_IN_SITEMAP = 1000;

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

type SitemapUrl = {
    loc: string;
    lastmod?: string;
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority: string;
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

const normalizeDate = (value: string): string | null => {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toISOString().split('T')[0];
};

const escapeXml = (value: string): string => {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
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

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'noindex');

    try {
        const records = await base(TABLE_NAME).select().all();
        const today = new Date().toISOString().split('T')[0];

        const staticPages: SitemapUrl[] = [
            { loc: `${SITE_URL}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
            { loc: `${SITE_URL}/servicios`, lastmod: today, changefreq: 'monthly', priority: '0.9' },
            { loc: `${SITE_URL}/proyectos`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
            { loc: `${SITE_URL}/nosotros`, lastmod: today, changefreq: 'monthly', priority: '0.7' },
            { loc: `${SITE_URL}/blog`, lastmod: today, changefreq: 'daily', priority: '0.9' },
            { loc: `${SITE_URL}/comunidad`, lastmod: today, changefreq: 'weekly', priority: '0.8' },
            { loc: `${SITE_URL}/contacto`, lastmod: today, changefreq: 'monthly', priority: '0.7' },
            { loc: `${SITE_URL}/metodologia`, lastmod: today, changefreq: 'monthly', priority: '0.6' },
            { loc: `${SITE_URL}/politica-cookies`, lastmod: today, changefreq: 'yearly', priority: '0.3' },
            { loc: `${SITE_URL}/politica-privacidad`, lastmod: today, changefreq: 'yearly', priority: '0.3' },
            { loc: `${SITE_URL}/aviso-legal`, lastmod: today, changefreq: 'yearly', priority: '0.3' }
        ];

        const seenSlugs = new Set<string>();
        const postCandidates: Array<{ loc: string; lastmod: string; timestamp: number }> = [];

        for (const record of records) {
            const fields = record.fields as Record<string, unknown>;
            const slug = extractSlug(fields);

            if (!slug || slug === 'untitled' || slug.length < 3 || seenSlugs.has(slug)) {
                continue;
            }

            seenSlugs.add(slug);
            const rawDate = getString(pickField(fields, DATE_FIELD_CANDIDATES));
            const lastmod = normalizeDate(rawDate) || today;

            postCandidates.push({
                loc: `${SITE_URL}/blog/${slug}`,
                lastmod,
                timestamp: new Date(lastmod).getTime()
            });
        }

        postCandidates.sort((a, b) => b.timestamp - a.timestamp);
        const postUrls: SitemapUrl[] = postCandidates.slice(0, MAX_POSTS_IN_SITEMAP).map(post => ({
            loc: post.loc,
            lastmod: post.lastmod,
            changefreq: 'monthly',
            priority: '0.8'
        }));

        const allUrls = [...staticPages, ...postUrls];
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `    <url>
        <loc>${escapeXml(page.loc)}</loc>
        ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('\n')}
</urlset>`;

        res.status(200).send(sitemap);
    } catch (error) {
        console.error('Sitemap Generation Error:', error);
        res.status(500).send('Error generating sitemap');
    }
}
