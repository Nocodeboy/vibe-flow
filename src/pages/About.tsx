import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Zap, Linkedin, Twitter, Award, Target, Sparkles } from 'lucide-react';
import TeamSection from '../components/organisms/TeamSection';
import { useSEO } from '../hooks/useSEO';

const values = [
    {
        icon: <Zap size={24} />,
        title: "Ejecución sobre Teoría",
        desc: "Aprender haciendo. Cada sesión produce algo tangible que puedes usar o mostrar."
    },
    {
        icon: <Users size={24} />,
        title: "Comunidad > Individuo",
        desc: "Los mejores resultados vienen de compartir conocimiento y experiencias en tiempo real."
    },
    {
        icon: <Heart size={24} />,
        title: "Valor Real",
        desc: "Cada contenido, plantilla o sesión está diseñado para generar resultados monetizables."
    },
    {
        icon: <Target size={24} />,
        title: "Transparencia Total",
        desc: "Sin humo ni promesas vacías. Datos reales, resultados medibles, honestidad brutal."
    }
];

const About: React.FC = () => {
    useSEO({
        title: 'Sobre Nosotros',
        description: 'Conoce la historia de Vibe Flow, nuestro equipo y los valores que nos impulsan a construir la mejor comunidad de IA y automatización en español.',
        url: 'https://vibeflow.es/nosotros'
    });

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden pt-32 pb-20 px-6">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
                    >
                        <Sparkles size={14} className="text-primary" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                            Nuestra Historia
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl md:text-8xl font-display italic font-bold leading-[0.9] tracking-tight mb-8"
                    >
                        Construyendo el <br />
                        <span className="text-white/40">Futuro Digital.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Vibe Flow nació de una idea simple: el conocimiento más valioso
                        se transmite entre personas que ejecutan, no entre cursos que nadie termina.
                    </motion.p>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-32 px-6 bg-[#050505] relative border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-zinc-900">
                                <img
                                    src="/images/team/german.png"
                                    alt="Germán Huertas Piquero"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 px-6 py-4 glass rounded-2xl border border-white/10">
                                <div className="flex items-center gap-3">
                                    <Award className="text-primary" size={24} />
                                    <div>
                                        <p className="text-sm font-bold">+5 años</p>
                                        <p className="text-xs text-white/50">Automatización & IA</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                                Fundador
                            </span>
                            <h2 className="text-5xl md:text-6xl font-display italic font-bold leading-[0.9] mb-6">
                                Germán Huertas <br /><span className="text-white/40">Piquero</span>
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-8">
                                Ingeniero de software convertido en estratega de automatización.
                                Después de años construyendo soluciones para startups y corporaciones,
                                decidí crear el espacio que me hubiera gustado tener cuando empecé:
                                una comunidad donde aprender haciendo sea la norma, no la excepción.
                            </p>
                            <p className="text-white/40 text-base leading-relaxed mb-8">
                                Mi filosofía es simple: la IA y la automatización no reemplazan a las personas,
                                las potencian. Y el mejor lugar para aprender a potenciarte es junto a otros
                                que comparten tu ambición.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                    <Linkedin size={20} />
                                </a>
                                <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                            Principios
                        </span>
                        <h2 className="text-5xl md:text-7xl font-display italic font-bold leading-[0.9]">
                            Nuestros <span className="text-white/40">Valores.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="group p-8 rounded-[2rem] glass border border-white/5 hover:border-primary/30 transition-colors"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-all">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <TeamSection />
        </div>
    );
};

export default About;
