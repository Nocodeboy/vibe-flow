import type { VercelRequest, VercelResponse } from '@vercel/node';
import Airtable from 'airtable';

// Initialize Airtable with server-side env vars
const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID || 'appSaEaDYNrloBTkT');

const TABLE_NAME = 'News';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Cache the response for 60 seconds, revalidate in background (SWR)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    try {
        if (!process.env.AIRTABLE_API_KEY) {
            throw new Error('Missing AIRTABLE_API_KEY environment variable');
        }

        const records = await base(TABLE_NAME).select({
            // Optimization: Only fetch fields we actually use
            fields: [
                'Nuevo Título',
                'Publicación de blog',
                'Url',
                'Fecha de Publicación',
                'Creada 2',
                'Url img',
                'SEO:Title',
                'SEO:Description',
                'SEO:Slug',
                'Social:Image',
                'Nombre (from Editor - Nombre)',
                'Título'
            ],
            sort: [{ field: 'Fecha de Publicación', direction: 'desc' }]
        }).all();

        const posts = records.map(record => {
            const fields = record.fields;

            // Helper to safely extract string from potential objects (AI fields, etc)
            const getString = (val: any): string => {
                if (!val) return '';
                if (typeof val === 'string') return val;
                if (typeof val === 'object' && val?.value) return String(val.value);
                return String(val);
            };

            // Helper for attachment images (Social:Image is an array of attachments)
            const getImage = (val: any): string => {
                if (Array.isArray(val) && val.length > 0) {
                    return val[0].url;
                }
                return getString(val);
            };

            // Slug generation logic
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

            return {
                id: record.id,
                slug: slug,
                title: getString(fields['Nuevo Título']) || getString(fields['Título']) || 'Sin Título',
                excerpt: getString(fields['SEO:Description']) || getString(fields['SEO:Title']) || getString(fields['Publicación de blog']).substring(0, 150) + '...' || '',
                category: 'Blog',
                date: getString(fields['Fecha de Publicación']) || getString(fields['Creada 2']) || new Date().toISOString(),
                readTime: '5 min',
                img: getImage(fields['Social:Image']) || getString(fields['Url img']) || '/images/blog/placeholder.webp',
                author: {
                    name: Array.isArray(fields['Nombre (from Editor - Nombre)'])
                        ? fields['Nombre (from Editor - Nombre)'][0]
                        : 'Vibe Flow Team',
                    avatar: '/images/team/german.webp',
                    role: 'Editor'
                },
                content: [getString(fields['Publicación de blog'])]
            };
        });

        res.status(200).json(posts);
    } catch (error: any) {
        console.error('Airtable API Error:', error);
        res.status(500).json({
            error: 'Failed to fetch posts',
            details: error.message || String(error)
        });
    }
}
