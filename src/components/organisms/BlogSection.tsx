
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { posts } from '../../data/posts';
import BlogCard from '../molecules/BlogCard';


import { BlogPost } from '../../data/posts';

interface BlogSectionProps {
  posts?: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts: externalPosts }) => {
  const displayPosts = externalPosts || posts;

  return (
    <section id="blog" className="py-32 px-6 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block"
            >
              Pensamiento Sistémico
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-display italic font-bold leading-none"
            >
              Blog <br /> <span className="text-white/40">e Ideas.</span>
            </motion.h2>
          </div>

          <Link to="/blog">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block px-10 py-5 glass border-white/5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/5 transition-colors"
            >
              Ver Todo el Contenido
            </motion.span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {displayPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
