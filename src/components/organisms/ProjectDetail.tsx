import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Globe, Share2 } from 'lucide-react';
import { Project } from '../../data/projects';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Sticky Header Nav */}
      <div className="fixed top-8 left-8 z-[60]">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          onClick={onBack}
          className="group glass p-5 rounded-full flex items-center gap-4 border-white/10 hover:bg-white transition-all duration-500"
          aria-label="Volver a proyectos"
        >
          <ArrowLeft size={20} className="group-hover:text-black transition-colors" />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block group-hover:text-black">Back to Portfolio</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <motion.img
            layoutId={`project-img-${project.id}`}
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-50 contrast-125 scale-105"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
        </motion.div>

        <div className="absolute inset-x-0 bottom-24 px-6 max-w-7xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px]">
              {project.category}
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-display italic font-bold leading-[0.9] tracking-tighter"
            >
              {project.title.split(" ").map((word: string, i: number) => (
                <span key={i} className={i === 1 ? 'text-white/60' : 'text-white'}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">

          <div className="lg:col-span-8 space-y-40">
            {/* The Brief */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-white/60 uppercase tracking-[0.4em] text-[10px] font-bold mb-12 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-white/10" /> El Brief Estratégico
              </h2>
              <p className="text-3xl md:text-5xl font-light leading-[1.15] text-white italic font-display">
                {project.description}
              </p>
            </motion.div>

            {/* Core Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-primary uppercase tracking-widest text-[10px] font-bold mb-8">El Desafío Operativo</h3>
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  {project.challenge}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h3 className="text-primary uppercase tracking-widest text-[10px] font-bold mb-8">Arquitectura de Solución</h3>
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  {project.solution}
                </p>
              </motion.div>
            </div>

            {/* Immersive Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="group aspect-[16/9] rounded-[4rem] overflow-hidden glass border-white/5 relative"
            >
              <img
                src={project.img}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-110"
                alt={`Vista detallada del proyecto ${project.title}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          </div>

          {/* Sidebar Metrics & Tools */}
          <aside className="lg:col-span-4 space-y-20 lg:sticky lg:top-40 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass p-12 rounded-[3rem] border-white/5 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[60px] rounded-full" />
              <h4 className="text-white/30 uppercase tracking-widest text-[10px] font-bold mb-12">Indicadores de Éxito</h4>
              <div className="space-y-10">
                {project.impact?.map((stat: string, i: number) => (
                  <div key={i} className="flex items-start gap-6">
                    <CheckCircle2 size={22} className="text-primary mt-1 shrink-0" />
                    <span className="text-2xl font-display italic font-bold leading-tight">{stat}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="px-6"
            >
              <h4 className="text-white/30 uppercase tracking-widest text-[10px] font-bold mb-8">Stack Tecnológico</h4>
              <div className="flex flex-wrap gap-4">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-5 py-3 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-white/50 border-white/5 hover:border-primary/30 hover:text-white transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex gap-4 px-6"
            >
              <button className="flex-1 py-6 bg-white text-black rounded-full flex items-center justify-center gap-4 font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all duration-500">
                Visitar Live <Globe size={16} />
              </button>
              <button className="p-6 glass rounded-full border-white/10 hover:bg-white/10 transition-all">
                <Share2 size={20} />
              </button>
            </motion.div>
          </aside>

        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
