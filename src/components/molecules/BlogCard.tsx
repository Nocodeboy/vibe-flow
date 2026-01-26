import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_ELITE } from '../../styles/animation';

export interface BlogPost {
    id: string | number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    img: string;
}

export interface BlogCardProps {
    post: BlogPost;
    index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: EASE_ELITE }}
            className="group"
        >
            <Link to={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-8 glass">
                    <motion.div style={{ y: yParallax }} className="absolute inset-0 h-[110%] -top-[5%]">
                        <img
                            src={post.img}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100"
                        />
                    </motion.div>

                    <div className="absolute top-6 left-6">
                        <span className="px-4 py-1 rounded-full glass bg-black/40 text-[10px] font-bold uppercase tracking-widest text-primary">
                            {post.category}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-white/30">
                        <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                        <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
                    </div>

                    <h3 className="text-3xl font-display italic font-bold group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                    </h3>

                    <p className="text-white/50 leading-relaxed line-clamp-2 font-light">
                        {post.excerpt}
                    </p>

                    <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] group/btn transition-colors hover:text-white">
                        Leer Artículo
                        <span className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-primary transition-all" />
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
};

export default memo(BlogCard);
