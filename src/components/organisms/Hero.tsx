import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useBackground } from '../../contexts/BackgroundContext';
import { Spotlight } from '../atoms/Spotlight';
import { Magnetic } from '../atoms/Magnetic';
import { EASE_ELITE, DURATION } from '../../styles/animation';

// Kinetic Character Component - Awwwards style hover effect
const KineticChar: React.FC<{ char: string, baseColor: string }> = ({ char, baseColor }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Swap colors on hover: white -> green, green -> white
    const hoverColor = baseColor === "#ffffff" ? "#98e710" : "#ffffff";

    return (
        <motion.span
            className="inline-block relative cursor-default select-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
                y: isHovered ? -6 : 0,
                scale: isHovered ? 1.05 : 1,
                color: isHovered ? hoverColor : baseColor,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.8
            }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
};

// Stagger animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            ease: EASE_ELITE
        }
    }
};

const titleVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: EASE_ELITE
        }
    }
};

const Hero: React.FC = () => {
    const { setTheme } = useBackground();
    const targetRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });

    useEffect(() => { setTheme('nebula'); }, [setTheme]);

    // Parallax
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <section ref={targetRef} className="relative min-h-[100vh] flex flex-col justify-center items-center px-6 overflow-hidden">

            {/* Ambient Lighting Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Primary glow - Green accent */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[180px]"
                />

                {/* Secondary glow - Top right */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        opacity: [0.2, 0.35, 0.2]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px]"
                />

                {/* Tertiary glow - Bottom left */}
                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 20, 0],
                        opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

                {/* Radial vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            </div>

            {/* Main Content */}
            <motion.div
                style={{ y: textY, opacity }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl w-full z-10 text-center flex flex-col items-center relative group"
            >
                {/* Spotlight Backlight */}
                <Spotlight
                    className="absolute -inset-[200px] z-0 opacity-80 pointer-events-none"
                    size={800}
                    color="rgba(152, 231, 16, 0.08)"
                />

                {/* Badge - Premium Tech Pill */}
                <motion.div
                    variants={itemVariants}
                    className="group cursor-default inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-md mb-12 hover:border-white/10 hover:bg-white/[0.06] transition-all duration-500"
                >
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 group-hover:text-white transition-colors">
                        IA  |  Sin Código  |  Automatización
                    </span>
                </motion.div>

                {/* Main Title - Kinetic Vibe Flow */}
                <motion.div
                    variants={titleVariants}
                    className="mb-8 flex items-center leading-[0.85] select-none"
                >
                    <h1 className="text-[18vw] md:text-[14vw] font-display italic font-bold tracking-tighter flex">
                        {/* Vibe - White */}
                        {"Vibe".split("").map((char, i) => (
                            <KineticChar key={`vibe-${i}`} char={char} baseColor="#ffffff" />
                        ))}
                        {/* Flow - Primary Green */}
                        {"Flow".split("").map((char, i) => (
                            <KineticChar key={`flow-${i}`} char={char} baseColor="#98e710" />
                        ))}
                    </h1>
                </motion.div>

                {/* Subtitle - Dual Purpose */}
                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl text-lg md:text-2xl text-white/60 font-light leading-relaxed mb-4 text-center"
                >
                    La comunidad de élite para creadores digitales
                </motion.p>
                <motion.p
                    variants={itemVariants}
                    className="max-w-xl text-base md:text-lg text-white/40 font-light leading-relaxed mb-12 text-center"
                >
                    Aprende a dominar la <span className="text-primary font-medium">IA y automatización</span>. O contrata a nuestro equipo para implementarlo por ti.
                </motion.p>

                {/* Dual CTAs */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 items-center"
                >
                    {/* Primary CTA - Community */}
                    <Magnetic>
                        <a
                            href="https://www.skool.com/vibe-flow/about"
                            className="group relative px-10 h-14 rounded-full bg-primary text-black font-bold uppercase tracking-widest text-xs overflow-hidden flex items-center justify-center outline-none focus:outline-none focus:ring-0"
                        >
                            <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                            <div className="relative z-10 overflow-hidden flex flex-col items-center h-4">
                                <span className="group-hover:-translate-y-5 transition-transform duration-500 ease-[0.16,1,0.3,1] flex items-center gap-2">
                                    Únete Gratis <ArrowRight size={14} />
                                </span>
                                <span className="group-hover:-translate-y-5 transition-transform duration-500 ease-[0.16,1,0.3,1] flex items-center gap-2 text-primary absolute top-5">
                                    Únete Gratis <ArrowRight size={14} />
                                </span>
                            </div>
                        </a>
                    </Magnetic>

                    {/* Secondary CTA - Agency */}
                    <Magnetic>
                        <a
                            href="/services"
                            className="group px-10 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-500 outline-none focus:outline-none focus:ring-0"
                        >
                            Ver Servicios <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Magnetic>
                </motion.div>

            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="w-full h-1/2 bg-primary blur-[1px]"
                    />
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;


