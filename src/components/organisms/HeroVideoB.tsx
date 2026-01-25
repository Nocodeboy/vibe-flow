
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { useBackground } from '../../contexts/BackgroundContext';
import { Magnetic } from '../atoms/Magnetic';
import KineticChar from '../atoms/KineticChar';
import Badge from '../atoms/Badge';
import { EASE_ELITE } from '../../styles/animation';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.5
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

const HeroVideoB: React.FC = () => {
    const { setTheme } = useBackground();
    const targetRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });

    useEffect(() => { setTheme('nebula'); }, [setTheme]);

    // Parallax
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const videoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section ref={targetRef} className="relative min-h-[100vh] flex flex-col justify-center items-center px-6 overflow-hidden">

            {/* Video Background */}
            <motion.div
                style={{ scale: videoScale, opacity: videoOpacity }}
                className="absolute inset-0 z-0"
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/images/hero/hero-loop.webm" type="video/webm" />
                </video>

                {/* Video Overlays */}
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

                {/* Green tint overlay */}
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
            </motion.div>

            {/* Video Control Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={toggleVideo}
                className="absolute bottom-10 right-10 z-20 w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </motion.button>

            {/* Ambient Lighting Effects - Subtle over video */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px]"
                />
            </div>

            {/* Main Content */}
            <motion.div
                style={{ y: textY, opacity }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl w-full z-10 text-center flex flex-col items-center"
            >
                {/* Badge */}
                <motion.div variants={itemVariants} className="mb-12">
                    <Badge variant="live" color="primary" size="md">
                        IA | No-Code | Automatización
                    </Badge>
                </motion.div>

                {/* Main Title */}
                <motion.div
                    variants={titleVariants}
                    className="mb-8 flex items-center leading-[0.85] select-none"
                >
                    <h1 className="text-[18vw] md:text-[14vw] font-display italic font-bold tracking-tighter flex drop-shadow-2xl">
                        {"Vibe".split("").map((char, i) => (
                            <KineticChar key={`vibe-${i}`} char={char} baseColor="#ffffff" />
                        ))}
                        {"Flow".split("").map((char, i) => (
                            <KineticChar key={`flow-${i}`} char={char} baseColor="#98e710" hoverColor="#ffffff" />
                        ))}
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl text-lg md:text-2xl text-white/70 font-light leading-relaxed mb-4 text-center drop-shadow-lg"
                >
                    La comunidad de élite para creadores digitales
                </motion.p>
                <motion.p
                    variants={itemVariants}
                    className="max-w-xl text-base md:text-lg text-white/50 font-light leading-relaxed mb-12 text-center"
                >
                    Aprende a dominar la <span className="text-primary font-medium">IA y automatización</span>. O contrata a nuestro equipo para implementarlo por ti.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 items-center"
                >
                    <Magnetic>
                        <a
                            href="https://www.skool.com/vibe-flow/about"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-10 h-14 rounded-full bg-primary text-black font-bold uppercase tracking-widest text-xs overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(152,231,16,0.3)]"
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

                    <Magnetic>
                        <a href="/services" className="group px-10 h-14 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-500">
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
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent">
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

export default HeroVideoB;
