import React from 'react';
import BlogCard, { BlogPost } from '../molecules/BlogCard';

interface BlogGridProps {
    posts: BlogPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
            ))}
        </div>
    );
};

export default BlogGrid;
