export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    img: string;
    author: {
        name: string;
        avatar: string;
        role: string;
        description?: string;
    };
    content: string[];
}

export const posts: BlogPost[] = [];
