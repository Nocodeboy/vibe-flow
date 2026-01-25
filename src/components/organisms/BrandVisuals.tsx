
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { EASE_ELITE } from '../../styles/animation';

const artworks = [
  {
    title: "Arquitectura de Datos",
    img: "/images/blog/arquitecturas-rag.png",
    tag: "LOGIC & FLOW"
  },
  {
    title: "Convergencia Digital",
    img: "/images/blog/comunidades.png",
    tag: "STRATEGIC SYNC"
  },
  {
    title: "Visión Sistémica",
    img: "/images/blog/paradoja-ia.png",
    tag: "EXPONENTIAL GROWTH"
  }
];

const ArtCard: React.FC<{ art: typeof artworks[0], index: number }> = ({ art, index }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 1.2, ease: EASE_ELITE }}
      className="group relative"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-[3rem] glass mb-8 relative cursor-none">
        <motion.div
          style={{ y: yTransform }}
          className="absolute inset-0 h-[124%] -top-[12%]"
        >
          <motion.img
            src={art.img}
            alt={art.title}
            initial={{ filter: 'grayscale(100%) contrast(110%)', scale: 1 }}
            whileHover={{
              filter: 'grayscale(0%) contrast(100%)',
              scale: 1.08,
              transition: { duration: 0.9, ease: [0.33, 1, 0.68, 1] }
            }}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute inset-0 border border-white/0 group-hover:border-primary/10 rounded-[3rem] transition-all duration-700 pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
        className="relative z-10"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60 group-hover:text-primary mb-2 transition-colors duration-500">
          {art.tag}
        </p>
        <h3 className="text-2xl font-display italic font-semibold group-hover:translate-x-2 transition-transform duration-700 ease-out">
          {art.title}
        </h3>
      </motion.div>
    </motion.div>
  );
};

const BrandVisuals: React.FC = () => {
  return (
    <section id="vision" className="py-32 px-6 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] flex items-center gap-2">
              <Sparkles size={12} className="animate-pulse" /> ADN Estratégico
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_ELITE }}
            className="text-7xl md:text-9xl font-display italic font-bold leading-[0.85]"
          >
            Arquitectura <br /> <span className="text-white/40">de Futuro.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
          {artworks.map((art, i) => (
            <ArtCard key={art.title} art={art} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandVisuals;
