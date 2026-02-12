import type { VercelRequest, VercelResponse } from '@vercel/node';

const SITE_URL = 'https://vibeflow.es';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.png`;

type PageMeta = {
    title: string;
    description: string;
    image?: string;
};

const PAGES: Record<string, PageMeta> = {
    servicios: {
        title: 'Servicios | Vibe Flow',
        description: 'Proyectos llave en mano de IA y automatización. Desarrollo web, CRMs, chatbots IA y automatizaciones desde 2.000€. Resultados garantizados.',
        image: `${SITE_URL}/images/seo/og-image-services.webp`
    },
    proyectos: {
        title: 'Portfolio | Vibe Flow',
        description: 'Explora nuestros casos de éxito en automatización, CRMs, chatbots IA y desarrollo web. Proyectos reales con resultados medibles.',
        image: `${SITE_URL}/images/seo/og-image-projects.webp`
    },
    nosotros: {
        title: 'Sobre Nosotros | Vibe Flow',
        description: 'Conoce la historia de Vibe Flow, nuestro equipo y los valores que nos impulsan a construir la mejor comunidad de IA y automatización en español.',
        image: `${SITE_URL}/images/seo/og-image-about.webp`
    },
    comunidad: {
        title: 'Comunidad | Vibe Flow',
        description: 'Únete a la comunidad de élite para aprender IA y automatización haciendo proyectos reales. 2 sesiones semanales en vivo, mentoría, y acceso a proyectos de agencia.',
        image: `${SITE_URL}/images/seo/og-image-comunity.webp`
    },
    contacto: {
        title: 'Contacto | Vibe Flow',
        description: 'Contacta con Vibe Flow para consultas sobre proyectos de automatización, IA, o para unirte a nuestra comunidad.',
        image: `${SITE_URL}/images/seo/og-image-contact.webp`
    },
    metodologia: {
        title: 'Metodología | Vibe Flow',
        description: 'Descubre nuestra metodología de aprendizaje: módulos prácticos, sesiones en vivo y mentoría directa para dominar IA y automatización.'
    },
    'politica-cookies': {
        title: 'Política de Cookies | Vibe Flow',
        description: 'Información sobre el uso de cookies en vibeflow.es. Conoce qué cookies utilizamos, para qué sirven y cómo gestionarlas.'
    },
    'politica-privacidad': {
        title: 'Política de Privacidad | Vibe Flow',
        description: 'Política de Privacidad y protección de datos de Vibe Flow.'
    },
    'aviso-legal': {
        title: 'Aviso Legal | Vibe Flow',
        description: 'Aviso Legal y Condiciones de Uso de Vibe Flow.'
    }
};

const escapeHtml = (value: string): string => {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
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

    const { path } = req.query;
    if (!path || typeof path !== 'string') {
        res.status(400).send('Missing path');
        return;
    }

    const pageMeta = PAGES[path];
    if (!pageMeta) {
        res.status(404).send('Page not found');
        return;
    }

    const pageUrl = `${SITE_URL}/${path}`;
    const image = pageMeta.image || DEFAULT_IMAGE;

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(pageMeta.title)}</title>
    <meta name="description" content="${escapeHtml(pageMeta.description)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${escapeHtml(pageUrl)}">

    <meta property="og:type" content="website">
    <meta property="og:url" content="${escapeHtml(pageUrl)}">
    <meta property="og:title" content="${escapeHtml(pageMeta.title)}">
    <meta property="og:description" content="${escapeHtml(pageMeta.description)}">
    <meta property="og:image" content="${escapeHtml(image)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="es_ES">
    <meta property="og:site_name" content="Vibe Flow">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${escapeHtml(pageUrl)}">
    <meta name="twitter:title" content="${escapeHtml(pageMeta.title)}">
    <meta name="twitter:description" content="${escapeHtml(pageMeta.description)}">
    <meta name="twitter:image" content="${escapeHtml(image)}">
</head>
<body>
    <main>
        <h1>${escapeHtml(pageMeta.title.replace(' | Vibe Flow', ''))}</h1>
        <p>${escapeHtml(pageMeta.description)}</p>
    </main>
</body>
</html>`;

    if (req.method === 'HEAD') {
        res.status(200).end();
        return;
    }

    res.status(200).send(html);
}
