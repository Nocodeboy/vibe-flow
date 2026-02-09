import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/atoms/Button';
import ServiceCard from '../components/molecules/ServiceCard';
import ServiceModal from '../components/organisms/ServiceModal';
import { services, processSteps, guarantees, Service } from '../data/services';
import { projects } from '../data/projects';
import { useSEO } from '../hooks/useSEO';

const Services: React.FC = () => {
    useSEO({
        title: 'Servicios',
        description: 'Proyectos llave en mano de IA y automatización. Desarrollo web, CRMs, chatbots IA y automatizaciones desde 2.000€. Resultados garantizados.',
        image: 'https://vibeflow.es/images/seo/og-image-services.webp',
        url: 'https://vibeflow.es/servicios'
    });

    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Modal */}
            <AnimatePresence>
                {selectedService && (
                    <ServiceModal
                        service={selectedService}
                        onClose={() => setSelectedService(null)}
                    />
                )}
            </AnimatePresence>

            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />
            </div>

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center px-6 pt-32">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="text-center max-w-5xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
                    >
                        <Sparkles size={14} className="text-primary" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                            Agencia de Automatización
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-8xl lg:text-9xl font-display italic font-bold leading-[0.85] mb-8"
                    >
                        <span className="text-white">Lo Hacemos</span>
                        <br />
                        <span className="text-primary">Por Ti.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-2xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-12"
                    >
                        Proyectos llave en mano de IA y automatización.
                        <br />
                        <span className="text-white/75">Desde <span className="text-primary font-bold">2.000€</span>.</span>
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Button
                            href="/contacto"
                            size="lg"
                            className="inline-flex items-center gap-3 px-10 py-5 font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_60px_rgba(152,231,16,0.4)] transition-all duration-500"
                            icon={<ArrowRight size={18} />}
                        >
                            Solicitar Presupuesto
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent">
                        <motion.div
                            animate={{ y: [0, 40, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-4 bg-primary/60"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section className="relative px-6 py-32">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                            Servicios
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display italic font-bold">
                            ¿Qué <span className="text-white/30">Podemos Hacer?</span>
                        </h2>
                    </motion.div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {services.map((service, i) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={i}
                                onClick={() => setSelectedService(service)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section - Horizontal Timeline */}
            <section className="relative px-6 py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                            Proceso
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display italic font-bold">
                            De Idea a <span className="text-white/30">Producción.</span>
                        </h2>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
                            {processSteps.map((item, i) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.6 }}
                                    className="relative text-center md:text-left group"
                                >
                                    {/* Step number with glow */}
                                    <div className="relative inline-block mb-6">
                                        <span className="text-7xl md:text-8xl font-display italic font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 group-hover:from-primary/40 group-hover:to-primary/10 transition-all duration-500">
                                            {item.step}
                                        </span>
                                        <div className="absolute inset-0 blur-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Guarantees - Floating Cards */}
            <section className="relative px-6 py-24">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        {guarantees.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="flex items-center gap-4 px-6 py-4 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                                    <p className="text-xs text-white/40">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="relative px-6 py-32 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">
                            Resultados Reales
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display italic font-bold mb-4">
                            Proyectos Entregados
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto">
                            Cada proyecto refleja nuestro compromiso con la excelencia técnica y resultados medibles.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.slice(0, 2).map((project, i) => (
                            <motion.a
                                key={project.id}
                                href={`/proyectos/${project.id}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -8, scale: 1.01 }}
                                className="group relative aspect-[16/10] rounded-[2rem] overflow-hidden cursor-pointer border border-white/5"
                            >
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] block mb-2">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-display italic font-bold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/60 text-sm flex items-center gap-2">
                                        <Sparkles size={14} className="text-primary" />
                                        {project.impact?.[0] || "Resultado Garantizado"}
                                    </p>
                                </div>

                                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowRight size={20} className="text-white" />
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Button
                            href="/proyectos"
                            variant="outline"
                            size="lg"
                            shape="pill"
                            icon={<ArrowRight size={18} />}
                            iconPosition="right"
                        >
                            Ver todos los proyectos
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section id="contact" className="relative px-6 py-32">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <h2 className="text-5xl md:text-7xl font-display italic font-bold mb-8">
                        ¿Empezamos?
                    </h2>
                    <p className="text-xl text-white/40 mb-12 max-w-xl mx-auto">
                        Cuéntanos tu proyecto y te enviamos propuesta personalizada en <span className="text-primary font-bold">menos de 48h</span>.
                    </p>
                    <Button
                        href="mailto:contacto@vibeflow.es"
                        external
                        size="lg"
                        className="inline-flex items-center gap-3 px-12 py-6 rounded-full bg-primary text-black font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_80px_rgba(152,231,16,0.5)] transition-all duration-500"
                        icon={<ArrowRight size={18} />}
                    >
                        Solicitar Presupuesto
                    </Button>
                </motion.div>
            </section>

        </div>
    );
};

export default Services;
