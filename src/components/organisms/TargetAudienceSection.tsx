
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { EASE_ELITE } from '../../styles/animation';

const personas = [
    {
        id: 'tech',
        title: "Explorador Técnico",
        subtitle: "Developer / QA / Soporte",
        desc: "Construye en días lo que te llevaría meses. Tecnología moderna, casos reales, sin relleno.",
        img: "/images/personas/explorador-tecnico.png"
    },
    {
        id: 'entrepreneur',
        title: "Emprendedor Atascado",
        subtitle: "Freelance / Consultor",
        desc: "Automatiza tu negocio sin contratar equipo técnico. Plantillas listas para usar HOY.",
        img: "/images/personas/emprendedor.png"
    },
    {
        id: 'student',
        title: "Estudiante Ambicioso",
        subtitle: "Recién Graduado / Junior",
        desc: "Construye un portafolio que impresione. Proyectos reales que el mercado paga 2.000€-15.000€.",
        img: "/images/personas/estudiante.png"
    },
    {
        id: 'transition',
        title: "Profesional en Transición",
        subtitle: "Marketing / Ventas / PM",
        desc: "Reinventa tu carrera sin volver a estudiar 4 años. De 0 a facturar en 90 días.",
        img: "/images/personas/profesional-transicion.png"
    },
    {
        id: 'disillusioned',
        title: "Desencantado de Cursos",
        subtitle: "Ex-Coleccionista de Formaciones",
        desc: "No más cursos que no terminas. Aprender haciendo con seguimiento real. 2 sesiones semanales en vivo.",
        img: "/images/personas/desencantado-cursos.png"
    }
];

const TargetAudienceSection: React.FC = () => {
    const [activeId, setActiveId] = useState<string | null>('tech');

    return (
        <section className="py-32 px-6 bg-[#030303] relative border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-20 md:flex items-end justify-between">
                    <div>
                        <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                            Perfil Ideal
                        </span>
                        <h2 className="text-6xl md:text-8xl font-display italic font-bold leading-[0.9] text-white">
                            ¿Eres <br /> <span className="text-white/40">Uno de Ellos?</span>
                        </h2>
                    </div>
                    <p className="text-white/40 max-w-sm text-right hidden md:block mt-8">
                        Diseñado exclusivamente para quienes valoran la ejecución por encima de la teoría.
                    </p>
                </div>

                {/* Premium Accordion / Hover Tabs */}
                <div className="flex flex-col md:flex-row gap-4 h-[600px] mb-32">
                    {personas.map((p) => (
                        <motion.div
                            key={p.id}
                            className={`relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 ease-[0.16,1,0.3,1] ${activeId === p.id ? 'md:flex-[3]' : 'md:flex-[1]'
                                } flex-1 min-h-[100px]`}
                            onHoverStart={() => setActiveId(p.id)}
                            onClick={() => setActiveId(p.id)}
                        >
                            {/* Background Image & Overlay */}
                            <div className="absolute inset-0 w-full h-full">
                                {/* Base dark overlay */}
                                <div className={`absolute inset-0 bg-black/60 z-10 transition-opacity duration-500 ${activeId === p.id ? 'opacity-40' : 'opacity-80'}`} />
                                {/* Strong gradient from bottom for text area */}
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                <img
                                    src={p.img}
                                    alt={p.title}
                                    className={`w-full h-full object-cover transition-transform duration-1000 ${activeId === p.id ? 'scale-110' : 'scale-100 grayscale'}`}
                                />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end">
                                <div className={`transition-all duration-500 ${activeId === p.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-70'}`}>
                                    <p className="text-primary font-mono text-xs uppercase tracking-widest mb-2">{p.subtitle}</p>
                                    <h3 className="text-3xl md:text-5xl font-display italic font-bold text-white mb-4 leading-none">
                                        {p.title}
                                    </h3>

                                    <motion.p
                                        initial={false}
                                        animate={{
                                            opacity: activeId === p.id ? 1 : 0,
                                            y: activeId === p.id ? 0 : 10
                                        }}
                                        transition={{ duration: 0.4, ease: EASE_ELITE }}
                                        className={`text-white text-lg font-light leading-relaxed max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${activeId === p.id ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                    >
                                        {p.desc}
                                    </motion.p>
                                </div>

                                {/* Status Icon */}
                                <div className={`absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-500 ${activeId === p.id ? 'bg-primary text-black border-primary' : 'bg-white/5 text-white'}`}>
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Refined Anti-Persona Section - Awwwards Style 'Red Zone' */}
                <div className="mt-40 max-w-6xl mx-auto relative px-4">

                    {/* Section Header with Kinetic Vibe */}
                    <div className="text-center mb-20 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-6"
                        >
                            <AlertTriangle size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Zona de Exclusión</span>
                        </motion.div>

                        <h3 className="text-4xl md:text-6xl font-display italic font-bold text-white mb-6 tracking-tight">
                            Filtro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Calidad.</span>
                        </h3>
                        <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            No buscamos seguidores, buscamos ejecutores. <br />
                            <span className="text-white/80">Si te identificas con esto, Vibe Flow no es para ti.</span>
                        </p>
                    </div>

                    {/* Interactive 'Red Light' Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {[
                            {
                                id: "01",
                                title: "Quiero hacerme rico mañana",
                                desc: "Buscas atajos, hacks y fórmulas mágicas para facturar sin aportar valor real al mercado."
                            },
                            {
                                id: "02",
                                title: "Turista del Aprendizaje",
                                desc: "Acumulas terabytes de cursos y tutoriales pero te paralizas a la hora de escribir una sola línea de código."
                            },
                            {
                                id: "03",
                                title: "Dependencia Absoluta",
                                desc: "No tienes curiosidad. Esperas que un mentor te resuelva cada error de sintaxis sin investigar primero."
                            }
                        ].map((item, i) => (
                            <div key={i} className="group relative h-full">
                                {/* Hover Glow Effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500 to-red-900 rounded-[2.5rem] opacity-0 group-hover:opacity-75 transition duration-500 blur-xl group-hover:blur-2xl" />

                                {/* Card Body */}
                                <div className="relative h-full bg-[#080808] border border-white/5 rounded-[2rem] p-10 overflow-hidden flex flex-col transition-transform duration-500 group-hover:-translate-y-2">

                                    {/* Noise Texture Overlay */}
                                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

                                    {/* Background Red Gradient on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-red-900/0 via-red-900/0 to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Large Number Background */}
                                    <span className="absolute -right-4 -top-8 text-[120px] font-display font-black text-white/[0.02] group-hover:text-red-500/[0.05] transition-colors duration-500 select-none">
                                        {item.id}
                                    </span>

                                    {/* Icon Area */}
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/30 mb-8 border border-white/5 group-hover:border-red-500/30 group-hover:bg-red-500/10 group-hover:text-red-500 transition-all duration-500">
                                        <AlertTriangle size={24} />
                                    </div>

                                    {/* Text Content */}
                                    <h4 className="text-xl font-bold text-white mb-4 group-hover:text-red-50 transition-colors pr-8">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TargetAudienceSection;
