import { BlogPost } from '../data/posts';

export const getPosts = async (): Promise<BlogPost[]> => {
    try {
        // En producción (y dev con 'vercel dev'), esto llama a mi propia API
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data as BlogPost[];
    } catch (error) {
        console.error('Error fetching posts from API:', error);
        return [];
    }
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
        const posts = await getPosts();
        return posts.find(p => p.slug === slug) || null;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
};
