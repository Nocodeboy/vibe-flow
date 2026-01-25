import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Spotlight } from '../atoms/Spotlight';
import { Flag, Rocket, Users, Globe, Zap, ArrowUpRight } from 'lucide-react';
import { EASE_ELITE } from '../../styles/animation';

interface RoadmapItem {
    id: string;
    quarter: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    items: string[];
    insight: string;
    metric: string;
}

const roadmapData: RoadmapItem[] = [
    {
        id: '01',
        quarter: 'Q1 2026',
        title: 'Fundación',
        subtitle: 'Validar modelo & primeros evangelistas',
        icon: <Flag size={24} />,
        insight: "Sentando las bases de la mayor comunidad de IA No-Code.",
        metric: "Goal: 50 Founders",
        items: [
            'Lanzamiento oficial de membresía',
            'Primeros 50 miembros fundadores',
            'Beta testers y feedback loop',
            'Módulos Core: WebApps & IA SOTA'
        ]
    },
    {
        id: '02',
        quarter: 'Q2 2026',
        title: 'Tracción',
        subtitle: 'Escalar a 100 miembros & Agencia',
        icon: <Rocket size={24} />,
        insight: "De aprendizaje individual a una factoría de proyectos reales.",
        metric: "Revenue: 10k€/mo",
        items: [
            'Marketplace Interno de proyectos',
            'Certificación \'Vibe Flow Certified\'',
            '10.000€+ en proyectos distribuidos',
            'Partnerships con herramientas NoCode'
        ]
    },
    {
        id: '03',
        quarter: 'Q3 2026',
        title: 'Consolidación',
        subtitle: 'Optimización y Retención',
        icon: <Users size={24} />,
        insight: "Automatizando la propia elite: escalado humano asistido por IA.",
        metric: "Team: 5 Agents/FE",
        items: [
            'Sistema de mentorías 1-on-1',
            'Vibe Flow Agency como marca propia',
            'Módulos Avanzados: Multi-Agent Systems',
            '3-5 miembros full-time con proyectos'
        ]
    },
    {
        id: '04',
        quarter: 'Q4 2026',
        title: 'Expansión',
        subtitle: 'Escalado masivo & Internacional',
        icon: <Globe size={24} />,
        insight: "Exportando el Vibe Flow: de Hub local a estándar global.",
        metric: "Reach: Global ES",
        items: [
            'Tier Enterprise para equipos',
            'Conferencia Virtual Vibe Flow',
            '100.000€+ en proyectos gestionados',
            'Preparación para expansión 2027'
        ]
    }
];

const ScrollRevealListItem: React.FC<{ text: string; index: number }> = ({ text, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const color = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.2)", "rgba(255,255,255,1)"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

    return (
        <motion.li
            ref={ref}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (index * 0.05) }}
            className="flex items-start gap-4 group/item py-2 border-b border-white/[0.02]"
        >
            <Zap size={12} className="mt-1 text-primary/30 group-hover/item:text-primary transition-colors shrink-0" />
            <motion.span
                style={{ color }}
                className="text-[13px] leading-snug font-light transition-colors"
            >
                {text}
            </motion.span>
        </motion.li>
    );
};

const ScrollRevealInsight: React.FC<{ text: string; align: 'left' | 'right' }> = ({ text, align }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const color = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.2)", "rgba(255,255,255,1)"]);

    return (
        <motion.p
            ref={ref}
            style={{ color }}
            className={`text-xl md:text-2xl font-display italic leading-tight ${align === 'left' ? 'text-left' : 'text-right'}`}
        >
            "{text}"
        </motion.p>
    );
};

const MilestoneCard: React.FC<{ item: RoadmapItem; index: number; globalScroll: any }> = ({ item, index, globalScroll }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 0;

    // 3D Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Parallax for huge background text and decorative elements
    const textParallax = useTransform(globalScroll, [0, 1], [isEven ? -100 : 100, isEven ? 100 : -100]);
    const decorParallax = useTransform(globalScroll, [0, 1], [50, -50]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className={`relative flex items-center justify-between mb-48 md:mb-64 w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Kinetic Background Typography */}
            <motion.div
                style={{ x: textParallax }}
                className={`absolute top-1/2 -translate-y-1/2 ${isEven ? '-left-20' : '-right-20'} opacity-[0.02] select-none pointer-events-none z-0`}
            >
                <span className="text-[15rem] md:text-[25rem] font-display italic font-bold leading-none uppercase">
                    {item.id}
                </span>
            </motion.div>

            {/* Content Card */}
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 1.2, ease: EASE_ELITE }}
                style={{
                    rotateX,
                    rotateY,
                    perspective: 1000
                }}
                className={`z-20 w-full md:w-[55%] glass p-8 md:p-12 rounded-[2.5rem] border-white/5 hover:border-primary/20 transition-colors duration-700 relative group overflow-visible`}
            >
                {/* Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[2.5rem] overflow-hidden bg-[url('/noise.svg')]" />


                {/* Dynamic Mouse-tracking Glow via Spotlight */}
                <Spotlight
                    className="absolute inset-0 rounded-[2.5rem]"
                    size={600}
                    color="rgba(152,231,16,0.15)"
                />

                <div className="relative z-10 font-display">
                    <div className="flex items-center justify-between mb-8">
                        <div className="px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md">
                            <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase">
                                {item.quarter}
                            </span>
                        </div>
                        <div className="flex gap-4">
                            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">{item.id}</span>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500"
                            >
                                {item.icon}
                            </motion.div>
                        </div>
                    </div>

                    <h3 className="text-4xl md:text-5xl italic font-bold mb-4 tracking-tighter leading-none">
                        {item.title}
                    </h3>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-10 block font-bold">
                        {item.subtitle}
                    </p>

                    <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mb-10" />

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.items.map((listItem, idx) => (
                            <ScrollRevealListItem key={idx} text={listItem} index={idx} />
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* Gap Filler: Phase Insight (Desktop only) */}
            <motion.div
                style={{ y: decorParallax }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`hidden lg:flex flex-col ${isEven ? 'items-start pl-12' : 'items-end pr-12'} md:w-[35%] z-10 shrink-0 pointer-events-none`}
            >
                <div className={`flex items-center gap-3 mb-4 text-primary/40`}>
                    <ArrowUpRight size={16} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.5em]">{item.metric}</span>
                </div>
                <ScrollRevealInsight text={item.insight} align={isEven ? 'left' : 'right'} />
                {/* Decorative floating sphere */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 mt-8 rounded-full bg-primary/5 blur-2xl"
                />
            </motion.div>
        </div>
    );
};

const RoadmapSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 40,
        restDelta: 0.001
    });

    // Elite Organic Path Data
    const d = "M 50 0 C 80 150, 20 250, 50 400 C 80 550, 20 700, 50 850 C 80 1000, 20 1150, 50 1300";

    return (
        <section ref={containerRef} id="roadmap" className="py-64 px-6 relative bg-[#030303] overflow-hidden">
            {/* Elite Section Header */}
            <div className="max-w-7xl mx-auto mb-48 relative z-30">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 mb-6"
                >
                    <div className="w-12 h-[1px] bg-primary" />
                    <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px]">
                        ROADMAP ARCHITECTURE
                    </span>
                </motion.div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE_ELITE }}
                        className="text-6xl md:text-8xl font-display italic font-bold leading-tight tracking-tighter"
                    >
                        Visión<br />
                        <span className="text-white/20">Estratégica.</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-md"
                    >
                        <p className="text-white/30 text-lg font-light leading-relaxed pl-8 border-l border-white/5">
                            Diseñamos el futuro de la automatización bajo una hoja de ruta
                            binaria: Ejecución agresiva y escalado inteligente.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative min-h-[1300px]">
                {/* Sinuous Elite Path (Desktop only) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-full h-full pointer-events-none z-0">
                    <svg
                        viewBox="0 0 100 1300"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <path
                            d={d}
                            stroke="rgba(255,255,255,0.02)"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <motion.path
                            style={{ pathLength }}
                            d={d}
                            stroke="url(#pathGradient)"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="1"
                        />
                        <defs>
                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#98e710" stopOpacity="0" />
                                <stop offset="50%" stopColor="#98e710" stopOpacity="1" />
                                <stop offset="100%" stopColor="#98e710" stopOpacity="0.5" />
                            </linearGradient>
                        </defs>

                        <motion.circle
                            r="3"
                            fill="#98e710"
                            style={{
                                offsetPath: `path("${d}")`,
                                offsetDistance: useTransform(pathLength, [0, 1], ["0%", "100%"])
                            }}
                            className="shadow-[0_0_20px_rgba(152,231,16,1)]"
                        />
                    </svg>
                </div>

                {/* Milestones Area */}
                <div className="relative z-10 flex flex-col items-center">
                    {roadmapData.map((item, index) => (
                        <MilestoneCard
                            key={item.id}
                            item={item}
                            index={index}
                            globalScroll={scrollYProgress}
                        />
                    ))}
                </div>
            </div>

            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 blur-[200px] -z-10 rounded-full opacity-50" />
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 blur-[200px] -z-10 rounded-full opacity-30" />
        </section>
    );
};

export default RoadmapSection;
