
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Users, Sparkles } from 'lucide-react';
import Badge from '../atoms/Badge';
import { EASE_ELITE } from '../../styles/animation';

const philosophyItems = [
  {
    id: 'execution',
    title: "Ejecución Primero",
    subtitle: "Metodología",
    description: "Aquí no teorizamos. Implementamos. Aprendes haciendo y facturando desde el primer mes.",
    highlight: "0% Humo, 100% Acción",
    icon: <Zap size={28} />,
    color: "#98e710"
  },
  {
    id: 'results',
    title: "Resultados Reales",
    subtitle: "Impacto",
    description: "No medimos el éxito en likes, sino en tiempo ahorrado y dinero generado.",
    highlight: "ROI medible",
    icon: <Target size={28} />,
    color: "#ffffff"
  },
  {
    id: 'human-ai',
    title: "Humano + IA",
    subtitle: "Futuro",
    description: "La IA no te reemplazará. Te reemplazará alguien que use IA mejor que tú.",
    highlight: "Superpoderes digitales",
    icon: <Users size={28} />,
    color: "#98e710"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: EASE_ELITE
    }
  }
};

const AboutSection: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#030303] relative overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2" />
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header - Left aligned with accent line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-primary" />
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">
              Nuestra Filosofía
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display italic font-bold leading-[0.9] text-white mb-6">
            Mentalidad <span className="text-primary">Vibe Flow.</span>
          </h2>
          <p className="text-xl text-white/40 leading-relaxed">
            Principios inquebrantables que guían cada línea de código y cada estrategia.
          </p>
        </motion.div>

        {/* Philosophy Items - Horizontal list with numbers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-0"
        >
          {philosophyItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative border-t border-white/5 py-12 md:py-16"
            >
              <div className="grid grid-cols-12 gap-6 md:gap-12 items-center">

                {/* Number */}
                <div className="col-span-12 md:col-span-1">
                  <span
                    className="text-7xl md:text-8xl font-display italic font-bold opacity-10 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ color: item.color }}
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* Icon + Title */}
                <div className="col-span-12 md:col-span-4 flex items-start gap-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${item.color}30`,
                      background: `${item.color}10`,
                      color: item.color
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{item.subtitle}</p>
                    <h3 className="text-2xl md:text-3xl font-display italic font-bold text-white group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-5">
                  <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Highlight Tag */}
                <div className="col-span-12 md:col-span-2 flex justify-start md:justify-end">
                  <Badge
                    variant="outline"
                    className="inline-flex items-center gap-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-500 group-hover:scale-105"
                    style={{
                      borderColor: `${item.color}30`,
                      color: item.color
                    }}
                    icon={<Sparkles size={12} />}
                  >
                    {item.highlight}
                  </Badge>
                </div>
              </div>

              {/* Hover line accent */}
              <div
                className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-32 transition-all duration-700"
                style={{ background: item.color }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom border */}
        <div className="border-t border-white/5" />

      </div>
    </section>
  );
};

export default AboutSection;
