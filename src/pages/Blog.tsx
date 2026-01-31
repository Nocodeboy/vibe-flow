import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Search, Tag } from 'lucide-react';
import BlogGrid from '../components/organisms/BlogGrid';
import { useSEO } from '../hooks/useSEO';
import { getPosts } from '../services/airtable';
import { BlogPost } from '../data/posts';
import { useState, useEffect } from 'react';

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 9;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
                setFilteredPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        let result = posts;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(post =>
                post.title.toLowerCase().includes(term) ||
                post.excerpt.toLowerCase().includes(term)
            );
        }

        setFilteredPosts(result);
        setCurrentPage(1);
    }, [searchTerm, posts]);

    // Pagination Logic
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const blogSection = document.getElementById('blog-grid-section');
        if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useSEO({
        title: 'Blog',
        description: 'Ideas, tutoriales y reflexiones sobre IA, automatización y la construcción de negocios digitales escalables.',
        image: 'https://vibeflow.es/images/seo/og-image-blog.webp',
        url: 'https://vibeflow.es/blog'
    });

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-32 pb-20 px-6">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
                    >
                        <Sparkles size={14} className="text-primary" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                            Recursos & Artículos
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl md:text-8xl font-display italic font-bold leading-[0.9] tracking-tight mb-8"
                    >
                        Blog & <br />
                        <span className="text-white/40">Ideas.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Ideas, tutoriales y reflexiones sobre IA, automatización y
                        la construcción de negocios digitales escalables.
                    </motion.p>
                </div>
            </section>

            {/* Search Bar Only */}
            <section className="py-12 px-6 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center">
                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative w-full max-w-md"
                        >
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                placeholder="Buscar artículos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-3 rounded-full glass border border-white/5 bg-white/[0.02] text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/30 transition-colors"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div id="blog-grid-section" className="max-w-7xl mx-auto px-6">
                    <BlogGrid posts={currentPosts} />

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-16 gap-4">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${currentPage === 1
                                    ? 'opacity-50 cursor-not-allowed text-white/30 border border-white/5'
                                    : 'glass border border-white/10 hover:border-primary/50 text-white hover:text-primary'
                                    }`}
                            >
                                Anterior
                            </button>

                            <div className="flex items-center gap-2">
                                {(() => {
                                    const windowSize = 1;
                                    const range = [];
                                    const rangeWithDots = [];

                                    range.push(1);

                                    for (let i = Math.max(2, currentPage - windowSize); i <= Math.min(totalPages - 1, currentPage + windowSize); i++) {
                                        range.push(i);
                                    }

                                    if (totalPages > 1) {
                                        range.push(totalPages);
                                    }

                                    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

                                    let l;
                                    for (let i of uniqueRange) {
                                        if (l) {
                                            if (i - l === 2) {
                                                rangeWithDots.push(l + 1);
                                            } else if (i - l !== 1) {
                                                rangeWithDots.push('...');
                                            }
                                        }
                                        rangeWithDots.push(i);
                                        l = i;
                                    }

                                    return rangeWithDots.map((page, index) => (
                                        page === '...' ? (
                                            <span key={`dots-${index}`} className="px-2 text-white/30">...</span>
                                        ) : (
                                            <button
                                                key={page}
                                                onClick={() => paginate(page as number)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${currentPage === page
                                                    ? 'bg-primary text-black'
                                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    ));
                                })()}
                            </div>

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${currentPage === totalPages
                                    ? 'opacity-50 cursor-not-allowed text-white/30 border border-white/5'
                                    : 'glass border border-white/10 hover:border-primary/50 text-white hover:text-primary'
                                    }`}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Community CTA */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-12 md:p-16 rounded-[3rem] glass border border-white/5 text-center relative overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10">
                            <Tag size={32} className="text-primary mx-auto mb-6" />
                            <h3 className="text-4xl md:text-5xl font-display italic font-bold mb-4">
                                Únete a la Comunidad
                            </h3>
                            <p className="text-white/50 max-w-lg mx-auto mb-8">
                                Aprende IA y automatización haciendo, no viendo vídeos.
                                Sesiones en vivo, mentoría real y acceso a proyectos de agencia.
                            </p>

                            <Link
                                to="/comunidad"
                                className="inline-block px-10 py-5 bg-primary text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:shadow-[0_0_60px_rgba(152,231,16,0.4)] transition-all"
                            >
                                Descubre Vibe Flow
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
