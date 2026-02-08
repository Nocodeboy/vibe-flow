import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Twitter, Linkedin, Share2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { getPostBySlug } from '../services/airtable';
import { BlogPost } from '../data/posts';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CommunityCTA from '../components/molecules/CommunityCTA';

interface RelatedPosts {
    prev?: { slug: string; title: string };
    next?: { slug: string; title: string };
}


const markdownComponents: Components = {
    p: ({ ...props }) => <p className="text-white/80 leading-relaxed mb-6 font-light" {...props} />,
    h2: ({ ...props }) => <h2 className="text-3xl font-display italic font-bold mt-12 mb-6 text-white" {...props} />,
    h3: ({ ...props }) => <h3 className="text-2xl font-display font-bold mt-8 mb-4 text-white" {...props} />,
    ul: ({ ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-white/80" {...props} />,
    li: ({ ...props }) => <li className="pl-2" {...props} />,
    a: ({ ...props }) => <a className="text-primary hover:underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-white/60 bg-white/5 rounded-r-lg" {...props} />,
    code: ({ ...props }) => <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-primary" {...props} />,
};

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState<RelatedPosts>({});

    useEffect(() => {
        const loadPost = async () => {
            if (!slug) return;

            try {
                // Use dedicated endpoint for individual post (much faster than loading all posts)
                const result = await getPostBySlug(slug);

                if (result) {
                    setPost(result.post);
                    setRelatedPosts({
                        prev: result.navigation.prev || undefined,
                        next: result.navigation.next || undefined
                    });
                }
            } catch (error) {
                console.error("Failed to load post", error);
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [slug]);

    useSEO({
        title: post?.title || 'Blog Post',
        description: post?.excerpt || '',
        image: post?.img || 'https://vibeflow.es/images/seo/og-image-blog.webp',
        url: `https://vibeflow.es/blog/${slug}`,
        type: 'article',
        article: {
            publishedTime: post?.date,
            author: post?.author.name,
            section: 'Technology'
        }
    });

    if (loading) {
        return (
            <div className="flex justify-center py-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center py-40">
                <h2 className="text-4xl font-display italic font-bold mb-4">Post no encontrado</h2>
                <Link to="/blog" className="text-primary hover:underline">Volver al blog</Link>
            </div>
        );
    }

    return (
        <article className="pt-24 md:pt-32">
            {/* Minimal Hero */}
            <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex gap-4 items-center justify-center text-sm text-white/40 mb-8"
                >
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold">
                        {post.category}
                    </span>
                    <span className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                    <span className="flex items-center gap-2">
                        <User size={14} />
                        {post.author.name}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-display italic font-bold leading-tight mb-8"
                >
                    {post.title}
                </motion.h1>

                <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    src={post.img}
                    alt={post.title}
                    className="w-full h-[400px] md:h-[500px] object-cover rounded-[2rem] border border-white/5"
                />
            </div>

            {/* Content */}
            <section className="max-w-3xl mx-auto px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert prose-lg max-w-none"
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                    >
                        {post.content.join('\n')}
                    </ReactMarkdown>
                </motion.div>

                <CommunityCTA />

                {/* Share */}
                <div className="pt-8 border-t border-white/10">
                    <p className="text-sm text-white/40 uppercase tracking-widest mb-4">Compartir</p>
                    <div className="flex gap-4">
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://vibeflow.es/blog/${slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                            aria-label="Compartir en Twitter"
                        >
                            <Twitter size={18} />
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://vibeflow.es/blog/${slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                            aria-label="Compartir en LinkedIn"
                        >
                            <Linkedin size={18} />
                        </a>
                        <button
                            onClick={async () => {
                                if (navigator.share) {
                                    try {
                                        await navigator.share({
                                            title: post.title,
                                            text: post.excerpt,
                                            url: `https://vibeflow.es/blog/${slug}`
                                        });
                                    } catch (err) {
                                        console.error('Error sharing:', err);
                                    }
                                } else {
                                    await navigator.clipboard.writeText(`https://vibeflow.es/blog/${slug}`);
                                    alert('¡Enlace copiado al portapapeles!');
                                }
                            }}
                            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                            aria-label="Compartir"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="max-w-5xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.prev && (
                        <Link
                            to={`/blog/${relatedPosts.prev.slug}`}
                            className="group p-8 rounded-[2rem] glass border border-white/5 hover:border-primary/30 transition-colors"
                        >
                            <span className="text-xs text-white/40 uppercase tracking-widest">Anterior</span>
                            <p className="text-xl font-display italic font-bold mt-2 group-hover:text-primary transition-colors">
                                {relatedPosts.prev.title}
                            </p>
                        </Link>
                    )}
                    {relatedPosts.next && (
                        <Link
                            to={`/blog/${relatedPosts.next.slug}`}
                            className="group p-8 rounded-[2rem] glass border border-white/5 hover:border-primary/30 transition-colors text-right md:col-start-2"
                        >
                            <span className="text-xs text-white/40 uppercase tracking-widest">Siguiente</span>
                            <p className="text-xl font-display italic font-bold mt-2 group-hover:text-primary transition-colors">
                                {relatedPosts.next.title}
                            </p>
                        </Link>
                    )}
                </div>
            </section>
        </article>
    );
};

export default BlogPostPage;
