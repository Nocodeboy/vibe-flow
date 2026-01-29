import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, Tag } from 'lucide-react';
import BlogSection from '../components/organisms/BlogSection';
import { useSEO } from '../hooks/useSEO';

const categories = [
    { name: "Todos", count: 12 },
    { name: "IA & Automatización", count: 5 },
    { name: "Estrategia", count: 3 },
    { name: "Comunidad", count: 2 },
    { name: "Tutoriales", count: 2 },
];

const Blog: React.FC = () => {
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
                        <span className="text-white/40">Pensamiento.</span>
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

            {/* Categories & Search Bar */}
            <section className="py-12 px-6 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Categories */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            {categories.map((cat, i) => (
                                <motion.button
                                    key={cat.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${i === 0
                                        ? 'bg-primary text-black'
                                        : 'glass border border-white/5 text-white/60 hover:text-white hover:border-primary/30'
                                        }`}
                                >
                                    {cat.name}
                                    <span className="ml-2 text-[10px] opacity-50">({cat.count})</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative w-full md:w-auto"
                        >
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                placeholder="Buscar artículos..."
                                className="w-full md:w-[300px] pl-12 pr-6 py-3 rounded-full glass border border-white/5 bg-white/[0.02] text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/30 transition-colors"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Blog Grid - Reusing BlogSection */}
            <BlogSection />

            {/* Newsletter CTA */}
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
                                Únete al Newsletter
                            </h3>
                            <p className="text-white/50 max-w-lg mx-auto mb-8">
                                Recibe las últimas ideas sobre IA, automatización y estrategias de crecimiento
                                directamente en tu inbox. Sin spam, solo valor.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="flex-1 px-6 py-4 rounded-full glass border border-white/10 bg-white/[0.02] text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/30 transition-colors"
                                />
                                <button className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:shadow-[0_0_60px_rgba(152,231,16,0.4)] transition-all">
                                    Suscribirse
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
