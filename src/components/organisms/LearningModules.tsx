import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Database, Zap, Layers, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { EASE_ELITE } from '../../styles/animation';

interface ModuleData {
    id: string;
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    tags: string[];
    gradient: string;
    image: string;
}

const modules: ModuleData[] = [
    {
        id: 'db',
        number: '01',
        title: 'CRMs y BBDD',
        description: 'Arquitectura de datos escalable. Aprende a diseñar el cerebro digital de tu negocio sin escribir código.',
        icon: <Database className="w-5 h-5" />,
        tags: ['AIRTABLE', 'SUPABASE', 'INTERFACES'],
        gradient: 'from-blue-500/20 to-cyan-500/20',
        image: '/images/services/crms.png'
    },
    {
        id: 'auto',
        number: '02',
        title: 'Automatizacion',
        description: 'Orquestación de flujos complejos. Conecta aplicaciones y elimina el trabajo manual para siempre.',
        icon: <Zap className="w-5 h-5" />,
        tags: ['MAKE', 'N8N', 'IA'],
        gradient: 'from-amber-500/20 to-orange-500/20',
        image: '/images/services/automatizaciones.png'
    },
    {
        id: 'ai',
        number: '03',
        title: 'Integraciones IA',
        description: 'Inteligencia artificial aplicada. Integra modelos LLM para procesar texto, imágenes y audio en tiempo real.',
        icon: <Layers className="w-5 h-5" />,
        tags: ['CLAUDE', 'GEMINI', 'OPENAI'],
        gradient: 'from-primary/20 to-green-500/20',
        image: '/images/services/integraciones.png'
    },
    {
        id: 'bots',
        number: '04',
        title: 'Chatbots',
        description: 'Agentes conversacionales avanzados. Crea asistentes que entienden, razonan y ejecutan acciones.',
        icon: <Cpu className="w-5 h-5" />,
        tags: ['VAPI', 'BOTPRESS', 'WHATSAPP'],
        gradient: 'from-purple-500/20 to-pink-500/20',
        image: '/images/services/chatbots.png'
    }
];

const ModuleCard: React.FC<{ module: ModuleData; index: number }> = ({ module, index }) => {
    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Card rotation
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Image Parallax (moves opposite to card tilt for depth)
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20px", "20px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: EASE_ELITE }}
            viewport={{ once: true }}
            className="relative flex-shrink-0 w-[85vw] md:w-[420px] h-[580px] rounded-[3rem] bg-[#0A0A0A] border border-white/[0.08] overflow-hidden group select-none shadow-2xl shadow-black/50"
        >
            {/* Shimmer Effect on Hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-50 mix-blend-overlay">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
            </div>

            {/* Ambient Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

            {/* Background Number */}
            <div className="absolute top-6 right-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 z-0">
                <span className="text-[10rem] font-display font-bold leading-none tracking-tighter">{module.number}</span>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between p-2" style={{ transform: "translateZ(20px)" }}>

                {/* Top Content Area (Padded) */}
                <div className="p-8 pt-10">
                    <div className="flex items-start justify-between mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300 backdrop-blur-md shadow-lg">
                            {module.icon}
                        </div>
                        {/* Status Indicator */}
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Module</span>
                        </div>
                    </div>

                    <h3 className="text-4xl font-display font-bold mb-4 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent group-hover:to-primary/80 transition-all duration-500 leading-tight">
                        {module.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-[90%] font-light">
                        {module.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {module.tags.map(tag => (
                            <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover:border-primary/20 group-hover:text-primary transition-colors duration-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Bottom Image Area (Full width/rounded bottom) */}
                <div className="relative h-56 w-full rounded-[2.5rem] overflow-hidden mx-auto border-t border-white/5 bg-black/50 group-hover:h-64 transition-all duration-500 ease-out">
                    <motion.div
                        style={{ x: imageX, y: imageY, scale: 1.1 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={module.image}
                            alt={module.title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />

                    {/* Action Hint */}
                    <div className="absolute bottom-6 left-8 z-20 flex items-center gap-3 text-white group-hover:text-primary transition-colors duration-300">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                            Explorar
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                            <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const LearningModules: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Transform scroll progress to horizontal movement
    // 0% -> 0px
    // 100% -> -totalWidth (we approximate 4 cards * 450px ~= 1800px)
    // We adjust exact distance based on viewport in a real app, but here we can estimate for the effect.
    // For a smoother desktop experience we move the container left.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[#030303]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Background elements */}
                {/* Background elements - Removed per user request */}
                {/* <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" /> */}


                <div className="relative w-full max-w-[100vw]">
                    <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-[1px] bg-primary" />
                                    <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">
                                        ACADEMIA VIBE FLOW
                                    </span>
                                </div>
                                <h2 className="text-6xl md:text-8xl font-display font-medium tracking-tighter text-white">
                                    Áreas de <br />
                                    <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-transparent">
                                        Dominio.
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <motion.div style={{ x }} className="flex gap-8 px-6 md:px-[max(calc((100vw-80rem)/2),1.5rem)]">
                        {modules.map((module, idx) => (
                            <ModuleCard key={module.id} module={module} index={idx} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LearningModules;
