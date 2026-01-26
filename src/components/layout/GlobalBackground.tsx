import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBackground } from '../../contexts/BackgroundContext';
import { useIsMobile } from '../../hooks/useIsMobile';

const GlobalBackground: React.FC = () => {
    const { theme } = useBackground();
    const isMobile = useIsMobile();

    // Fluid Aurora Configuration
    const variants = {
        nebula: {
            gradient: "radial-gradient(circle at 50% 50%, #050a05 0%, #000000 100%)",
            orb1: "bg-[var(--color-primary)]/40",
            orb2: "bg-emerald-900/30",
            orb3: "bg-blue-900/20"
        },
        cyber: {
            gradient: "linear-gradient(to bottom, #030303, #080808)",
            orb1: "bg-[var(--color-primary)]/10",
            orb2: "bg-cyan-900/20",
            orb3: "bg-white/5"
        },
        void: {
            gradient: "#030303",
            orb1: "bg-white/[0.03]",
            orb2: "bg-black/0",
            orb3: "bg-black/0"
        },
        warm: {
            gradient: "linear-gradient(to bottom, #030303, #0a0a0a)",
            orb1: "bg-orange-500/10",
            orb2: "bg-purple-900/20",
            orb3: "bg-red-900/10"
        }
    };

    const currentTheme = variants[theme as keyof typeof variants] || variants.nebula;

    return (
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden transition-colors duration-1000 ease-in-out"
            style={{ background: currentTheme.gradient }}>

            {/* Cinematic Noise Layer - Always present for texture */}
            <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay z-[5] pointer-events-none"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            {/* Aurora Layers - Static on mobile for performance */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={theme}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: isMobile ? 0.5 : 1.5 }}
                    className="absolute inset-0 preserve-3d"
                >
                    {/* Primary Orb - Static on mobile */}
                    <motion.div
                        animate={isMobile ? { x: 0, y: 0, scale: 1, rotate: 0 } : {
                            x: ["-20%", "20%", "-20%"],
                            y: ["-20%", "20%", "-20%"],
                            scale: [1, 1.5, 1],
                            rotate: [0, 90, 0]
                        }}
                        transition={isMobile ? { duration: 0 } : { duration: 20, repeat: Infinity, ease: "linear" }}
                        className={`absolute top-[-20%] left-[-20%] w-[100vw] h-[100vh] rounded-full ${isMobile ? 'blur-[50px]' : 'blur-[150px]'} mix-blend-screen ${isMobile ? 'opacity-40' : 'opacity-60'} ${currentTheme.orb1}`}
                    />

                    {/* Secondary Orb - Hidden on mobile */}
                    {!isMobile && (
                        <motion.div
                            animate={{
                                x: ["20%", "-20%", "20%"],
                                y: ["20%", "-20%", "20%"],
                                scale: [1.2, 0.8, 1.2],
                                rotate: [0, -90, 0]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className={`absolute bottom-[-10%] right-[-10%] w-[90vw] h-[90vh] rounded-full blur-[180px] mix-blend-screen opacity-50 ${currentTheme.orb2}`}
                        />
                    )}

                    {/* Tertiary Orb - Hidden on mobile */}
                    {!isMobile && (
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[120px] mix-blend-screen ${currentTheme.orb3}`}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Global Vignette for Focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-[2]" />
        </div>
    );
};

export default GlobalBackground;
