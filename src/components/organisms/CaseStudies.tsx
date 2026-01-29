import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useBackground } from '../../contexts/BackgroundContext';
import { Project } from '../../types';
import { projects } from '../../data/projects'; // Import shared data
import { EASE_ELITE } from '../../styles/animation';

interface CaseStudiesProps {
  fullView?: boolean;
  onSeeAll?: () => void;
  onBack?: () => void;
  onProjectClick?: (project: Project) => void;
}

const ProjectCard = ({ project, onClick }: { key?: string, project: Project, onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center (normalized -1 to 1)
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10; // Max tilt 10deg
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;

    x.set(rotateY);
    y.set(rotateX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(x, { stiffness: 150, damping: 15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: EASE_ELITE }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className={`group relative rounded-[2rem] bg-[#0A0A0A] border border-white/5 cursor-pointer ${project.className}`}
    >
      {/* Holographic Glare Effect */}
      <div
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 60%)",
          mixBlendMode: "overlay"
        }}
      />

      <div className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden transform-gpu">
        <motion.div
          className="w-full h-full"
          style={{ scale: 1.1 }} // Pre-scale for parallax
        >
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
          />
        </motion.div>
        {/* Gradients for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      </div>

      {/* Content Layer (Popped out in Z-space) */}
      <div className="relative z-10 h-full p-8 flex flex-col justify-between" style={{ transform: "translateZ(40px)" }}>
        {/* Top Row */}
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-white/80 font-bold shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            {project.category}
          </span>
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Bottom Row */}
        <div>
          <h3 className="text-2xl md:text-3xl font-display italic font-bold text-white mb-3 group-hover:text-primary transition-colors drop-shadow-lg leading-tight">
            {project.title}
          </h3>
          <p className="text-white/60 text-sm md:text-base max-w-lg mb-4 line-clamp-2 group-hover:text-white/80 transition-colors">
            {project.description}
          </p>
          <div className="flex gap-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-[10px] uppercase tracking-wider text-white/40 border-b border-white/10 pb-1">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 border border-white/5 rounded-[2rem] group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};

const CaseStudies: React.FC<CaseStudiesProps> = ({ fullView, onSeeAll, onBack, onProjectClick }) => {
  const { setTheme } = useBackground();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

  React.useEffect(() => {
    if (isInView) setTheme('void');
  }, [isInView, setTheme]);

  return (
    <section ref={sectionRef} id="work" className={`py-32 px-6 relative ${fullView ? 'min-h-screen' : ''}`}>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Resultados</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-display italic font-bold leading-[0.9] text-white">
              Proyectos <br /> <span className="text-white/40">Destacados.</span>
            </h2>
          </div>

          {!fullView && (
            <button onClick={onSeeAll} className="px-6 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              Ver Portfolio <ArrowUpRight size={14} />
            </button>
          )}
          {fullView && (
            <button onClick={onBack} className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
              ← Volver
            </button>
          )}
        </div>

        {/* Bento Grid - Explicit Fixed Height Rows for Perfect Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[300px]">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onProjectClick?.(project)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CaseStudies;
