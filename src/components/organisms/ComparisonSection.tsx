import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup, useMotionTemplate, useMotionValue } from 'framer-motion';
import { X, Zap, Video, Users, DollarSign, Lock, ArrowRight, Minus, Sparkles } from 'lucide-react';
import { EASE_ELITE } from '../../styles/animation';
import { Magnetic } from '../atoms/Magnetic';

// Data Refinement
const comparisonData = [
    {
        id: "format",
        category: "01—Formato",
        old: {
            title: "Pregrabado estático",
            desc: "Contenido que expira antes de que lo termines.",
            icon: <Lock size={14} className="text-white/20" />
        },
        new: {
            title: "Sesiones Live",
            desc: "Ingeniería en tiempo real. Sin filtros. Sin cortes.",
            icon: <Video size={14} className="text-black" />
        }
    },
    {
        id: "focus",
        category: "02—Enfoque",
        old: {
            title: "Parálisis por Tutoriales",
            desc: "Copiar código sin entender la arquitectura.",
            icon: <X size={14} className="text-white/20" />
        },
        new: {
            title: "Sistemas IA",
            desc: "Sistemas escalables, no scripts sueltos.",
            icon: <Zap size={14} className="text-black" />
        }
    },
    {
        id: "community",
        category: "03—Network",
        old: {
            title: "Discord Silencioso",
            desc: "Canales llenos de ruido y cero valor.",
            icon: <Lock size={14} className="text-white/20" />
        },
        new: {
            title: "Círculo de Élite",
            desc: "Constructores que ya están facturando.",
            icon: <Users size={14} className="text-black" />
        }
    },
    {
        id: "roi",
        category: "04—Retorno",
        old: {
            title: "Gasto Hundido",
            desc: "Un certificado que nadie pide.",
            icon: <X size={14} className="text-white/20" />
        },
        new: {
            title: "Negocio & Equity",
            desc: "Acceso directo a flujo de clientes high-ticket.",
            icon: <DollarSign size={14} className="text-black" />
        }
    }
];

const ComparisonSection: React.FC = () => {
    const [activeId, setActiveId] = useState<string | null>('format');
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Optimized Handle Mouse Move
    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Advanced Spotlight Gradient
    const spotlightParams = useMotionTemplate`
        radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(152, 231, 16, 0.25),
            transparent 80%
        )
    `;

    return (
        <section ref={containerRef} className="py-32 md:py-48 px-6 bg-[#030303] relative overflow-hidden text-rendering-optimize" onMouseMove={handleMouseMove}>

            {/* Subtle Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                {/* Active Global Spotlight */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{ background: spotlightParams, opacity: 0.6 }}
                />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[0.4fr_1fr] gap-16 lg:gap-24 items-start">

                {/* Sticky Header Section */}
                <div className="lg:sticky lg:top-32">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-white/40 font-mono text-xs uppercase tracking-widest">
                            Cambio de Paradigma
                        </span>
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-display italic font-bold leading-[0.9] text-white tracking-tighter mb-8">
                        Actualiza<br />
                        <span className="text-white/20">tu sistema.</span>
                    </h2>

                    <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-sm mb-12 font-light">
                        La mayoría de "escuelas" te venden información expirada. Nosotros te damos el sistema operativo para construir el futuro.
                    </p>

                    <Magnetic>
                        <button className="hidden lg:flex px-8 py-4 bg-white text-black rounded-full items-center gap-4 group hover:bg-primary transition-colors duration-500">
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Rompe el ciclo</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Magnetic>
                </div>

                {/* THE ELITE ACCORDION */}
                <LayoutGroup>
                    <div className="flex flex-col">
                        {comparisonData.map((item, index) => {
                            const isActive = activeId === item.id;

                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1, ease: EASE_ELITE }}
                                    onClick={() => setActiveId(isActive ? null : item.id)}
                                    className={`relative border-b border-white/10 cursor-pointer group/card py-8 md:py-10 transition-colors duration-500
                                        ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                                >


                                    {/* Header */}
                                    <motion.div layout="position" className="flex items-center justify-between relative z-10 group-hover/card:pl-4 transition-all duration-500">
                                        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                                            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest min-w-[100px]">
                                                {item.category}
                                            </span>

                                            <div className="relative h-16 w-[280px] md:w-[400px] flex items-center overflow-hidden">
                                                <AnimatePresence mode="popLayout" initial={false}>
                                                    {isActive ? (
                                                        <motion.h3
                                                            key="active"
                                                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                                                            transition={{ duration: 0.5, ease: EASE_ELITE }}
                                                            className="text-2xl md:text-4xl font-display italic font-bold text-white absolute inset-0 flex items-center"
                                                        >
                                                            {item.new.title} <Sparkles size={16} className="ml-3 text-primary animate-pulse" />
                                                        </motion.h3>
                                                    ) : (
                                                        <motion.h3
                                                            key="inactive"
                                                            initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                                                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                            exit={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                                            transition={{ duration: 0.5, ease: EASE_ELITE }}
                                                            className="text-2xl md:text-3xl font-display italic font-bold text-white/40 group-hover/card:text-white absolute inset-0 flex items-center transition-colors duration-500"
                                                        >
                                                            {item.new.title}
                                                        </motion.h3>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500
                                            ${isActive
                                                ? 'bg-primary text-black border-primary rotate-0'
                                                : 'bg-transparent text-white/20 border-white/10 group-hover/card:border-white/40 -rotate-45'}`}
                                        >
                                            <Minus size={14} className={`transition-all duration-500 ${isActive ? 'rotate-0' : 'rotate-90'}`} />
                                        </div>
                                    </motion.div>

                                    {/* Content */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.6, ease: EASE_ELITE }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-8 pl-0 lg:pl-[148px] grid grid-cols-1 md:grid-cols-2 gap-4">

                                                    {/* Void Card (Old Way) - Minimalist Industrial */}
                                                    <motion.div
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.1, duration: 0.6, ease: EASE_ELITE }}
                                                        className="p-6 rounded-xl bg-[#0A0A0A] border border-white/5 flex flex-col justify-between min-h-[160px] relative group/void"
                                                    >
                                                        <div className="flex items-start justify-between mb-4">
                                                            <span className="text-[9px] uppercase tracking-widest text-[#FF3B30] font-bold bg-[#FF3B30]/10 px-2 py-1 rounded">Obsoleto</span>
                                                            <div className="opacity-20 saturate-0">{item.old.icon}</div>
                                                        </div>
                                                        <div>
                                                            <p className="text-white/40 font-mono text-xs mb-2 line-through decoration-[#FF3B30]/50 decoration-2">v1.0 {item.old.title}</p>
                                                            <p className="text-white/30 text-sm leading-relaxed">{item.old.desc}</p>
                                                        </div>
                                                    </motion.div>

                                                    {/* Vibe Card (New Way) - High Tech Holographic */}
                                                    <motion.div
                                                        initial={{ x: 20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.2, duration: 0.6, ease: EASE_ELITE }}
                                                        className="p-6 rounded-xl bg-gradient-to-br from-[#98e710] to-[#7dbf0d] relative overflow-hidden flex flex-col justify-between min-h-[160px] group/new shadow-[0_0_30px_rgba(152,231,16,0.15)] border border-white/20"
                                                    >
                                                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[50px] rounded-full translate-x-10 -translate-y-10" />

                                                        <div className="relative z-10 flex items-start justify-between mb-4">
                                                            <span className="text-[9px] uppercase tracking-widest text-black font-bold bg-black/10 px-2 py-1 rounded backdrop-blur-md">Vibe Flow</span>
                                                            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-black backdrop-blur-md">
                                                                {item.new.icon}
                                                            </div>
                                                        </div>
                                                        <div className="relative z-10">
                                                            <p className="text-black font-display text-2xl md:text-3xl font-bold leading-tight tracking-tight">{item.new.desc}</p>
                                                        </div>
                                                    </motion.div>

                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </LayoutGroup>

                {/* Mobile Button */}
                <div className="flex lg:hidden mt-12 justify-center">
                    <Magnetic>
                        <button className="px-8 py-4 bg-white text-black rounded-full flex items-center gap-4 group hover:bg-primary transition-colors duration-500">
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Rompe el ciclo</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Magnetic>
                </div>

            </div>
        </section>
    );
};

export default ComparisonSection;
