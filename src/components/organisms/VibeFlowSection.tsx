
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';
import { Magnetic } from '../atoms/Magnetic';

const VibeFlowSection: React.FC = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgColor = useTransform(scrollYProgress, [0.4, 0.6], ["rgba(13, 13, 13, 0)", "rgba(45, 212, 191, 0.05)"]);

  return (
    <section id="vibeflow" className="py-32 px-6 relative overflow-hidden" ref={containerRef}>
      <motion.div style={{ backgroundColor: bgColor }} className="absolute inset-0 -z-10 transition-colors duration-500" />

      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[3rem] overflow-hidden flex flex-col lg:flex-row border-white/5">
          <div className="p-12 lg:p-20 lg:w-3/5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Comunidad Exclusiva
              </span>
              <h2 className="text-5xl md:text-7xl font-display italic font-bold mb-8">
                Skool <br /> <span className="text-white/40">VibeFlow.</span>
              </h2>
              <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-xl">
                Únete a la comunidad de élite donde mentes creativas y expertos en IA colaboran para dominar las herramientas del futuro.
                Network, recursos exclusivos y mentoría directa.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-3xl font-display italic font-bold text-white mb-2">500+</h4>
                  <p className="text-white/40 uppercase tracking-widest text-[10px]">Miembros Activos</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display italic font-bold text-white mb-2">Weekly</h4>
                  <p className="text-white/40 uppercase tracking-widest text-[10px]">Masterclasses</p>
                </div>
              </div>

              <Magnetic>
                <button className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-tighter text-lg rounded-full overflow-hidden transition-transform hover:scale-105">
                  <span className="relative z-10 flex items-center gap-3">
                    Unirme a VibeFlow <ExternalLink size={20} />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              </Magnetic>
            </motion.div>
          </div>

          <div className="relative lg:w-2/5 min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/images/vibeflow_community.png"
                alt="Community"
                className="w-full h-full object-cover grayscale brightness-[0.3] scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent" />
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative z-10 w-64 aspect-square glass rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center p-8 group cursor-none"
            >
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-6 shadow-2xl group-hover:scale-125 transition-transform">
                <Play size={24} fill="currentColor" className="ml-1" />
              </div>
              <p className="font-display italic font-bold text-xl mb-2">Inside VibeFlow</p>
              <p className="text-white/40 text-xs uppercase tracking-widest">Sneak Peek</p>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-6 right-6 w-10 h-10 glass rounded-lg border-primary/30 rotate-12"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VibeFlowSection;
