
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from 'lucide-react';
import { posts } from '../data/posts';
import { useSEO } from '../hooks/useSEO';

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const post = posts.find(p => p.slug === slug);
    const currentIndex = posts.findIndex(p => p.slug === slug);
    const nextPost = posts[currentIndex + 1];
    const prevPost = posts[currentIndex - 1];

    useSEO({
        title: post?.title || 'Artículo',
        description: post?.excerpt || 'Lee nuestro artículo sobre IA y automatización.',
        image: post?.img ? `https://vibeflow.es${post.img}` : undefined,
        url: `https://vibeflow.es/blog/${slug}`,
        type: 'article',
        article: {
            publishedTime: post?.date,
            author: post?.author.name,
            section: post?.category
        }
    });

    if (!post) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Artículo no encontrado</h2>
                    <button onClick={() => navigate('/blog')} className="text-primary underline">
                        Volver al blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[#030303]">
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/blog')}
                        className="group flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-12"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm uppercase tracking-widest">Volver al Blog</span>
                    </motion.button>

                    {/* Category */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4  py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6"
                    >
                        {post.category}
                    </motion.span>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display italic font-bold leading-[1.1] tracking-tight mb-8"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Meta */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-6 text-white/40 text-sm mb-12"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-10 h-10 rounded-full object-cover border border-white/10"
                            />
                            <div>
                                <p className="text-white font-medium">{post.author.name}</p>
                                <p className="text-xs">{post.author.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>{post.readTime} de lectura</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-5xl mx-auto px-6 mb-16"
            >
                <div className="aspect-[16/9] rounded-[2rem] overflow-hidden bg-zinc-900">
                    <img
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            {/* Content */}
            <section className="max-w-3xl mx-auto px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="prose prose-lg prose-invert max-w-none"
                >
                    {post.content.map((paragraph, i) => (
                        <p key={i} className="text-lg text-white/70 leading-relaxed mb-6">
                            {paragraph}
                        </p>
                    ))}
                </motion.div>

                {/* Share */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <p className="text-sm text-white/40 uppercase tracking-widest mb-4">Compartir</p>
                    <div className="flex gap-4">
                        <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                            <Linkedin size={18} />
                        </a>
                        <button className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="max-w-5xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prevPost && (
                        <Link
                            to={`/blog/${prevPost.slug}`}
                            className="group p-8 rounded-[2rem] glass border border-white/5 hover:border-primary/30 transition-colors"
                        >
                            <span className="text-xs text-white/40 uppercase tracking-widest">Anterior</span>
                            <p className="text-xl font-display italic font-bold mt-2 group-hover:text-primary transition-colors">
                                {prevPost.title}
                            </p>
                        </Link>
                    )}
                    {nextPost && (
                        <Link
                            to={`/blog/${nextPost.slug}`}
                            className="group p-8 rounded-[2rem] glass border border-white/5 hover:border-primary/30 transition-colors text-right md:col-start-2"
                        >
                            <span className="text-xs text-white/40 uppercase tracking-widest">Siguiente</span>
                            <p className="text-xl font-display italic font-bold mt-2 group-hover:text-primary transition-colors">
                                {nextPost.title}
                            </p>
                        </Link>
                    )}
                </div>
            </section>
        </article>
    );
};

export default BlogPostPage;
