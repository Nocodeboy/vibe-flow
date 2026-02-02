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

    const { slug } = req.query;

    if (!slug || typeof slug !== 'string') {
        res.status(400).json({ error: 'Missing or invalid slug parameter' });
        return;
    }

    // Cache individual posts for 30 minutes with 2 hour stale-while-revalidate
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=7200');

    try {
        if (!process.env.AIRTABLE_API_KEY) {
            throw new Error('Missing AIRTABLE_API_KEY environment variable');
        }

        // Fetch all posts to find by slug (Airtable doesn't support filtering by formula on SEO:Slug easily)
        // This is still needed because slugs are generated dynamically
        const records = await base(TABLE_NAME).select({
            // Include full content for individual post view
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

        // Helper to safely extract string from potential objects
        const getString = (val: any): string => {
            if (!val) return '';
            if (typeof val === 'string') return val;
            if (typeof val === 'object' && val?.value) return String(val.value);
            return String(val);
        };

        // Helper for attachment images
        const getImage = (val: any): string => {
            if (Array.isArray(val) && val.length > 0) {
                return val[0].url;
            }
            return getString(val);
        };

        // Process records and find matching post
        let foundPost = null;
        let prevPost = null;
        let nextPost = null;
        let prevIndex = -1;

        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            const fields = record.fields;

            // Generate slug (same logic as posts.ts)
            let postSlug = getString(fields['SEO:Slug']);
            if (!postSlug) {
                const rawUrl = (fields['Url'] as string) || '';
                if (rawUrl.startsWith('http')) {
                    postSlug = rawUrl.split('/').filter(Boolean).pop() || '';
                }
            }
            if (!postSlug) {
                postSlug = getString(fields['Nuevo Título'] || fields['Título'] || 'untitled')
                    .toString()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
            }

            const processedPost = {
                id: record.id,
                slug: postSlug,
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

            if (postSlug === slug) {
                foundPost = processedPost;
                prevIndex = i;
            } else if (prevIndex !== -1 && !nextPost) {
                // This is the next post after the found one
                nextPost = { slug: processedPost.slug, title: processedPost.title };
            }

            if (prevIndex === -1) {
                // Keep track of the previous post
                prevPost = { slug: processedPost.slug, title: processedPost.title };
            }
        }

        if (!foundPost) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }

        // Return the post with navigation info
        res.status(200).json({
            post: foundPost,
            navigation: {
                prev: prevIndex > 0 ? prevPost : null,
                next: nextPost
            }
        });

    } catch (error: any) {
        console.error('Airtable API Error:', error);
        res.status(500).json({
            error: 'Failed to fetch post',
            details: error.message || String(error)
        });
    }
}
