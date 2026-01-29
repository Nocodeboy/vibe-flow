
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Testimonials from '../components/organisms/Testimonials';
import MembershipSection from '../components/organisms/MembershipSection';
import FAQSection from '../components/organisms/FAQSection';
import RoadmapSection from '../components/organisms/RoadmapSection';
import ComparisonSection from '../components/organisms/ComparisonSection';
import TargetAudienceSection from '../components/organisms/TargetAudienceSection';
import AnimatedCounter from '../components/atoms/AnimatedCounter';
import { useSEO } from '../hooks/useSEO';

const stats = [
    { value: 50, suffix: '+', label: 'Miembros Activos' },
    { value: 2, suffix: 'x', label: 'Sesiones Semanales' },
    { value: 24, suffix: 'h', label: 'Tiempo de Respuesta' },
    { prefix: '$', value: 24, suffix: '', label: 'Al Mes' },
];

const Community: React.FC = () => {
    useSEO({
        title: 'Comunidad',
        description: 'Únete a la comunidad de élite para aprender IA y automatización haciendo proyectos reales. 2 sesiones semanales en vivo, mentoría, y acceso a proyectos de agencia.',
        image: 'https://vibeflow.es/images/seo/og-image-comunity.webp',
        url: 'https://vibeflow.es/comunidad'
    });

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden pt-32 pb-20 px-6">
                {/* Background Glow - Consistent with other pages */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
                    >
                        <Sparkles size={14} className="text-primary" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                            La Comunidad de Élite
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl md:text-8xl font-display italic font-bold leading-[0.9] tracking-tight mb-8"
                    >
                        Vibe <span className="text-primary">Flow</span><br />
                        <span className="text-white/40">Community.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed mb-12"
                    >
                        El único lugar donde aprender IA y automatización haciendo,
                        no viendo videos que nunca terminas. Sesiones en vivo, mentoría real,
                        y acceso a proyectos de 2.000€-15.000€.
                    </motion.p>

                    {/* Stats Row with Animated Counters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-8 md:gap-16"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-4xl md:text-5xl font-display italic font-bold text-primary">
                                    <AnimatedCounter
                                        value={stat.value}
                                        prefix={stat.prefix || ''}
                                        suffix={stat.suffix}
                                        duration={1.5}
                                    />
                                </p>
                                <p className="text-sm text-white/40 uppercase tracking-widest mt-2">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12"
                    >
                        <a
                            href="https://www.skool.com/vibe-flow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-black font-bold uppercase tracking-widest text-sm rounded-full hover:shadow-[0_0_60px_rgba(152,231,16,0.4)] transition-all duration-500"
                        >
                            Únete Ahora por $24/mes
                            <ArrowRight size={18} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Main Sections */}
            <TargetAudienceSection />
            <ComparisonSection />
            <MembershipSection />
            <Testimonials />
            <RoadmapSection />
            <FAQSection />
        </div>
    );
};

export default Community;
