import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../atoms/Button';
import { EASE_ELITE } from '../../styles/animation';
import { useIsMobile } from '../../hooks/useIsMobile';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isMobile = useIsMobile();

    // Dynamic Island Logic
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { num: '01', name: 'Inicio', href: '/' },
        { num: '02', name: 'Comunidad', href: '/comunidad' },
        { num: '03', name: 'Servicios', href: '/servicios' },
        { num: '04', name: 'Nosotros', href: '/nosotros' },
        { num: '05', name: 'Blog', href: '/blog' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return location.pathname === '/';
        return location.pathname.startsWith(href);
    };

    return (
        <>
            {/* Creates a wrapper to center the island */}
            <div className="fixed top-0 left-0 w-full z-[70] pointer-events-none flex justify-center pt-2 md:pt-6">
                <motion.nav
                    initial={{ width: '100%', y: isMobile ? 0 : -100, borderRadius: 0 }}
                    animate={{
                        width: scrolled ? '92%' : '100%',
                        maxWidth: scrolled ? '800px' : '100%',
                        y: scrolled ? 10 : 0,
                        borderRadius: scrolled ? 9999 : 0,
                        backgroundColor: scrolled ? "rgba(5, 5, 5, 0.85)" : "rgba(5, 5, 5, 0)",
                        borderWidth: scrolled ? 1 : 0,
                        borderColor: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
                        backdropFilter: scrolled ? (isMobile ? "blur(8px)" : "blur(12px)") : "blur(0px)",
                        paddingTop: scrolled ? "0.75rem" : "1.5rem",
                        paddingBottom: scrolled ? "0.75rem" : "1.5rem",
                        paddingLeft: scrolled ? "1.25rem" : "1.5rem",
                        paddingRight: scrolled ? "1.25rem" : "1.5rem",
                    }}
                    transition={{ duration: isMobile ? 0.2 : 0.5, ease: EASE_ELITE }}
                    className="pointer-events-auto flex justify-between items-center transition-all bg-[#050505]/0"
                >
                    {/* Logo Area */}
                    <Link to="/">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-xl md:text-2xl font-display italic font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-1"
                        >
                            VF<span className="text-primary">.</span>
                        </motion.div>
                    </Link>

                    {/* Navigation Links - Island Mode: Hidden on Mobile, Visible on Desktop */}
                    <div className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.12em] font-bold text-white/65">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`hover:text-white transition-colors relative py-1 ${isActive(link.href) ? 'text-white' : ''}`}
                            >
                                {link.name}
                                {isActive(link.href) && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary shadow-[0_0_8px_rgba(152,231,16,0.8)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Actions Area */}
                    <div className="flex items-center gap-3">
                        <Button
                            href="/contacto"
                            size="sm"
                            variant={scrolled ? 'secondary' : 'glass'}
                            className="hidden sm:flex font-black"
                        >
                            Hablemos
                        </Button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-full transition-all duration-300 group ${isOpen ? 'bg-white text-black rotate-90' : 'bg-white/10 hover:bg-white/20 text-white'
                                }`}
                            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            {isOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </motion.nav>
            </div>

            {/* Menu overlay - Simplified on mobile for performance */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: isMobile ? 0.2 : 0.5 } }}
                        className={`fixed inset-0 z-[60] bg-[#050505]/98 ${isMobile ? 'backdrop-blur-md' : 'backdrop-blur-3xl'} flex items-center justify-center overflow-hidden`}
                    >
                        {/* Background Decoration - Hidden on mobile for performance */}
                        {!isMobile && (
                            <div className="absolute inset-0 pointer-events-none opacity-30">
                                <motion.div
                                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[150px]"
                                />
                                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[150px]" />
                            </div>
                        )}

                        <div className="max-w-7xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
                            <div className="flex flex-col gap-2 md:gap-6">
                                {[...navLinks, { num: '05', name: 'Contacto', href: '/contacto' }].map((link, i) => (
                                    isMobile ? (
                                        // Simplified animation on mobile
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: i * 0.05, duration: 0.3 }}
                                        >
                                            <Link
                                                to={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="group flex items-baseline gap-4 text-left"
                                            >
                                                <span className="text-primary font-display italic text-base">
                                                    {link.num}
                                                </span>
                                                <span className="text-4xl font-display italic font-bold text-white">
                                                    {link.name}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    ) : (
                                        // Full animation on desktop
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -60 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: EASE_ELITE }}
                                        >
                                            <Link
                                                to={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="group flex items-baseline gap-6 text-left hover:translate-x-5 transition-transform"
                                            >
                                                <span className="text-primary font-display italic text-lg md:text-xl opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                                    {link.num}
                                                </span>
                                                <span className="text-5xl md:text-8xl font-display italic font-bold text-white/80 group-hover:text-white transition-colors duration-300">
                                                    {link.name}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    )
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.4 }}
                                className="hidden md:block glass p-12 rounded-[3rem] border-white/5 bg-white/[0.02]"
                            >
                                <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-8">Información Directa</p>
                                <div className="space-y-10">
                                    <div>
                                        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Oficina</p>
                                        <p className="text-2xl font-display italic font-semibold text-white/90">Madrid, España</p>
                                    </div>
                                    <div>
                                        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Social</p>
                                        <div className="flex gap-6 text-lg font-display italic text-white/90">
                                            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                                            <a href="#" className="hover:text-primary transition-colors">Twitter / X</a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
