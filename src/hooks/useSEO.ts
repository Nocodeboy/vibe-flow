
import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    article?: {
        publishedTime?: string;
        author?: string;
        section?: string;
    };
}

const defaultMeta = {
    title: 'Vibe Flow | Comunidad de IA y Automatización',
    description: 'La comunidad de élite para aprender IA y automatización haciendo, no viendo videos. Sesiones en vivo, mentoría real, y acceso a proyectos de 2.000€-15.000€.',
    image: 'https://vibeflow.es/images/og-image.png',
    url: 'https://vibeflow.es'
};

export const useSEO = ({
    title,
    description,
    image,
    url,
    type = 'website',
    article
}: SEOProps = {}) => {
    useEffect(() => {
        const fullTitle = title
            ? `${title} | Vibe Flow`
            : defaultMeta.title;

        document.title = fullTitle;

        // Update meta tags
        const updateMeta = (name: string, content: string, property?: boolean) => {
            const attribute = property ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${name}"]`);

            if (element) {
                element.setAttribute('content', content);
            } else {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                element.setAttribute('content', content);
                document.head.appendChild(element);
            }
        };

        // Standard meta
        updateMeta('description', description || defaultMeta.description);

        // Open Graph
        updateMeta('og:title', fullTitle, true);
        updateMeta('og:description', description || defaultMeta.description, true);
        updateMeta('og:image', image || defaultMeta.image, true);
        updateMeta('og:url', url || defaultMeta.url, true);
        updateMeta('og:type', type, true);

        // Twitter
        updateMeta('twitter:title', fullTitle);
        updateMeta('twitter:description', description || defaultMeta.description);
        updateMeta('twitter:image', image || defaultMeta.image);

        // Article specific
        if (type === 'article' && article) {
            if (article.publishedTime) {
                updateMeta('article:published_time', article.publishedTime, true);
            }
            if (article.author) {
                updateMeta('article:author', article.author, true);
            }
            if (article.section) {
                updateMeta('article:section', article.section, true);
            }
        }

        // Update canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', url || defaultMeta.url);
        }

    }, [title, description, image, url, type, article]);
};

export default useSEO;
