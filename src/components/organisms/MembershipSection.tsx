import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, FileCode, RefreshCw, Briefcase, Zap } from 'lucide-react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { Spotlight } from '../atoms/Spotlight';
import { EASE_ELITE } from '../../styles/animation';
import { Magnetic } from '../atoms/Magnetic';

const benefits = [
    {
        title: "2x Llamadas Semanales",
        tag: "VALOR: 964€/AÑO",
        desc: "Mentoría en vivo. Resolvemos tus bloqueos técnicos y estratégicos cara a cara. Sin filtros.",
        img: "/images/community/llamadas-semanales.png",
        icon: <Phone size={24} />,
        className: "md:col-span-2 md:row-span-1"
    },
    {
        title: "Plantillas 'Plug & Play'",
        tag: "AHORRA +100H",
        desc: "No empieces de cero. Clona nuestros sistemas de automatización probados.",
        img: "/images/community/plantillas-listas.png",
        icon: <FileCode size={24} />,
        className: "md:col-span-1 md:row-span-1"
    },
    {
        title: "Actualizaciones Perpetuas",
        tag: "SIEMPRE AL DÍA",
        desc: "La IA cambia cada semana. Tu formación también debería hacerlo.",
        img: "/images/community/actualizaciones.png",
        icon: <RefreshCw size={24} />,
        className: "md:col-span-1 md:row-span-1"
    },
    {
        title: "Acceso a Proyectos",
        tag: "OPORTUNIDAD EXCLUSIVA",
        desc: "Bolsa de trabajo interna. Asignamos proyectos de clientes reales (2k€ - 15k€) a miembros certificados.",
        img: "/images/community/proyectos-agencia.png",
        icon: <Briefcase size={24} />,
        className: "md:col-span-2 md:row-span-1"
    }
];

const BenefitCard: React.FC<{ benefit: typeof benefits[0], index: number }> = ({ benefit, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover="hover"
            transition={{ delay: index * 0.1, duration: 0.8, ease: EASE_ELITE }}
            viewport={{ once: true }}
            className={`group relative overflow-hidden rounded-[2.5rem] bg-[#0F0F0F] border border-white/5 hover:border-white/10 transition-colors duration-500 ${benefit.className} min-h-[300px] md:min-h-[340px]`}
        >
            {/* Spotlight Effect */}
            <Spotlight className="absolute inset-0 z-20" size={500} color="rgba(255, 255, 255, 0.05)" />

            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="w-full h-full"
                    variants={{
                        hover: { scale: 1.1 }
                    }}
                    transition={{ duration: 1.4, ease: EASE_ELITE }}
                >
                    <img
                        src={benefit.img}
                        alt={benefit.title}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                    />
                </motion.div>
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
            </div>

            {/* Content Content */}
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/5 group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-xl">
                        {benefit.icon}
                    </div>
                    <Badge variant="outline" className="bg-black/50 backdrop-blur border-white/10 text-[9px] tracking-widest">
                        {benefit.tag}
                    </Badge>
                </div>

                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-3 leading-tight">
                        {benefit.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {benefit.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const MembershipSection: React.FC = () => {
    return (
        <section className="py-32 px-6 bg-[#080808] relative overflow-hidden text-white">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] flex items-center gap-2">
                                <Zap size={12} className="fill-primary" /> MEMBRESÍA ÉLITE
                            </span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-display font-medium leading-[0.9] tracking-tight">
                            Nunca Volverás a <br /> <span className="text-white/30 italic">Construir Solo.</span>
                        </h2>
                    </div>

                    <Magnetic>
                        <Button
                            href="https://www.skool.com/vibe-flow"
                            external
                            size="lg"
                            icon={<ArrowRight size={20} />}
                            className="shadow-[0_0_30px_rgba(152,231,16,0.2)] hover:shadow-[0_0_50px_rgba(152,231,16,0.4)]"
                        >
                            Únete Ahora • $24/mes
                        </Button>
                    </Magnetic>
                </div>

                {/* Bento Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {benefits.map((benefit, i) => (
                        <BenefitCard key={benefit.title} benefit={benefit} index={i} />
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <p className="text-white/20 text-xs uppercase tracking-widest font-medium">
                        Plazas limitadas para el Q1 2026
                    </p>
                </div>
            </div>
        </section>
    );
};

export default MembershipSection;
