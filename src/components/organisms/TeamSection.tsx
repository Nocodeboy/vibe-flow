
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Twitter, Globe, ArrowUpRight } from 'lucide-react';
import { EASE_ELITE } from '../../styles/animation';
import { Magnetic } from '../atoms/Magnetic';

const team = [
  {
    name: "Germán Huertas",
    surname: "Piquero",
    role: "Fundador y Estratega IA",
    bio: "Visionario digital especializado en la convergencia de IA y modelos de negocio escalables.",
    img: "/images/team/german.webp",
    social: { linkedin: "https://www.linkedin.com/in/germ%C3%A1n-huertas-piquero-b89a80b1/", twitter: "https://x.com/Nocodeboy" }
  },
  {
    name: "Raquel",
    surname: "Organista",
    role: "Soporte y Asistencia",
    bio: "Experta en consultoria de procesos empresariales complejosEs.",
    img: "/images/team/raquel.webp",
    social: { linkedin: "https://www.linkedin.com/in/raquelorganistagarc%C3%ADa/" }
  },
  {
    name: "Daniel",
    surname: "Lianes",
    role: "Estratega Vibe Flow",
    bio: "Especialista en networking estratégico y construcción de comunidades de alto rendimiento.",
    img: "/images/team/daniel.webp",
    social: { linkedin: "https://www.linkedin.com/in/daniel-lianes/" }
  }
];

const TeamMember: React.FC<{ member: typeof team[0], index: number }> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.15,
        duration: 1.2,
        ease: EASE_ELITE // Custom ease-out-cubic for premium feel
      }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-zinc-900 mb-8">
        {/* Image Container with smooth hover */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="h-full w-full"
        >
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
          />
        </motion.div>

        {/* Floating Socials with staggered entrance on view */}
        <div className="absolute top-6 right-6 flex flex-col gap-3">
          {Object.entries(member.social).map(([key, href], i) => (
            <motion.a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (index * 0.1) + (i * 0.1) }}
              className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-black text-white transition-all duration-500"
            >
              {key === 'linkedin' && <Linkedin size={18} />}
              {key === 'twitter' && <Twitter size={18} />}
              {key === 'globe' && <Globe size={18} />}
            </motion.a>
          ))}
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />

        {/* Info on hover reveal */}
        <div className="absolute bottom-8 left-8 right-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
          <p className="text-white text-sm font-light leading-relaxed line-clamp-2">
            {member.bio}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <motion.span
          className="text-primary font-bold uppercase tracking-[0.4em] text-[9px]"
        >
          {member.role}
        </motion.span>
        <h3 className="text-4xl font-display italic font-bold tracking-tight">
          {member.name} <span className="text-white/20 group-hover:text-white/40 transition-colors">{member.surname}</span>
        </h3>
      </div>
    </motion.div>
  );
};

const TeamSection: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const xParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="team" ref={sectionRef} className="py-40 px-6 bg-surface relative overflow-hidden">
      {/* Background Parallax Text */}
      <motion.div
        style={{ x: xParallax }}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.02] pointer-events-none select-none"
      >
        <h2 className="text-[25vw] font-display font-bold italic">COLECTIVO COLECTIVO COLECTIVO</h2>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-white/40 font-bold uppercase tracking-[0.5em] text-[10px]">Estructura Humana</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_ELITE }}
              className="text-7xl md:text-9xl font-display italic font-bold leading-[0.8] mb-8 text-white"
            >
              El <br /> <span className="text-primary">Equipo.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-col items-end gap-6"
          >
            <p className="text-right text-white/40 text-sm max-w-[280px] leading-relaxed">
              Combinamos visión estratégica con ejecución técnica para materializar el futuro de tu industria.
            </p>
            <Link to="/comunidad" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-primary transition-colors">
              Únete al equipo <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
          {team.map((member, i) => (
            <TeamMember key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Call to Action Bar with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-40 p-12 glass rounded-[3rem] border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left"
        >
          <div>
            <h4 className="text-2xl font-display italic font-bold mb-2">¿Quieres escalar tu visión?</h4>
            <p className="text-white/40 text-sm uppercase tracking-widest">Estamos buscando partners, no solo clientes.</p>
          </div>
          <Magnetic>
            <Link to="/contacto" className="inline-block px-10 py-5 bg-primary text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:shadow-[0_0_60px_rgba(152,231,16,0.4)] transition-all duration-500">
              Inicia una conversación
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
