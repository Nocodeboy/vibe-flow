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

interface PostWithNavigation {
    post: BlogPost;
    navigation: {
        prev: { slug: string; title: string } | null;
        next: { slug: string; title: string } | null;
    };
}

export const getPostBySlug = async (slug: string): Promise<PostWithNavigation | null> => {
    try {
        // Use dedicated endpoint for individual post with full content
        const response = await fetch(`/api/post?slug=${encodeURIComponent(slug)}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data as PostWithNavigation;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
};
