import type { VercelRequest, VercelResponse } from '@vercel/node';
import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID || 'appSaEaDYNrloBTkT');

const TABLE_NAME = 'News';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Cache the sitemap for 1 hour (3600s), stale-while-revalidate for 1 day
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'application/xml');

    try {
        // 1. Fetch all blog posts for dynamic URLs
        const records = await base(TABLE_NAME).select({
            fields: ['Nuevo Título', 'Título', 'Url', 'SEO:Slug', 'Fecha de Publicación', 'Creada 2'],
            sort: [{ field: 'Fecha de Publicación', direction: 'desc' }]
        }).all();

        const posts = records.map(record => {
            const fields = record.fields;

            const getString = (val: any): string => {
                if (!val) return '';
                if (typeof val === 'string') return val;
                if (typeof val === 'object' && val?.value) return String(val.value);
                return String(val);
            };

            // Slug logic (consistent with posts.ts)
            let slug = getString(fields['SEO:Slug']);
            if (!slug) {
                const rawUrl = (fields['Url'] as string) || '';
                if (rawUrl.startsWith('http')) {
                    slug = rawUrl.split('/').filter(Boolean).pop() || '';
                }
            }
            if (!slug) {
                slug = getString(fields['Nuevo Título'] || fields['Título'] || 'untitled')
                    .toString()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
            }

            const date = getString(fields['Fecha de Publicación']) || getString(fields['Creada 2']) || new Date().toISOString();

            return {
                url: `https://vibeflow.es/blog/${slug}`,
                lastmod: date.split('T')[0] // YYYY-MM-DD
            };
        });

        // 2. Define Static Pages
        const staticPages = [
            { url: 'https://vibeflow.es/', changefreq: 'weekly', priority: '1.0' },
            { url: 'https://vibeflow.es/servicios', changefreq: 'monthly', priority: '0.9' },
            { url: 'https://vibeflow.es/proyectos', changefreq: 'monthly', priority: '0.8' },
            { url: 'https://vibeflow.es/nosotros', changefreq: 'monthly', priority: '0.7' },
            { url: 'https://vibeflow.es/blog', changefreq: 'daily', priority: '0.9' },
            { url: 'https://vibeflow.es/comunidad', changefreq: 'weekly', priority: '0.8' },
            { url: 'https://vibeflow.es/contacto', changefreq: 'monthly', priority: '0.7' },
            { url: 'https://vibeflow.es/metodologia', changefreq: 'monthly', priority: '0.6' }
        ];

        // 3. Build XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Static Pages -->
    ${staticPages.map(page => `
    <url>
        <loc>${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('')}

    <!-- Dynamic Blog Posts -->
    ${posts.map(post => `
    <url>
        <loc>${post.url}</loc>
        <lastmod>${post.lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`).join('')}
</urlset>`;

        res.status(200).send(sitemap);

    } catch (error) {
        console.error('Sitemap Generation Error:', error);
        res.status(500).send('Error generating sitemap');
    }
}
