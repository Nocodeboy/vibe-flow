import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Linkedin, Twitter, Instagram, ArrowUpRight, Youtube, GraduationCap, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import { Magnetic } from '../atoms/Magnetic';
import { useIsMobile } from '../../hooks/useIsMobile';

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Spotlight Effect - only on desktop
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        // Disable spotlight tracking on mobile
        if (isMobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            ref={footerRef}
            className={`relative ${isMobile ? 'h-auto' : 'h-[800px]'}`}
            style={isMobile ? {} : { clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div
                className={`relative w-full bg-[#050505] text-white overflow-hidden group ${isMobile ? 'h-auto' : 'fixed bottom-0 h-[800px]'}`}
                onMouseMove={handleMouseMove}
            >
                {/* Spotlight Overlay - Hidden on mobile for performance */}
                {!isMobile && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    600px circle at ${mouseX}px ${mouseY}px,
                                    rgba(152, 231, 16, 0.15),
                                    transparent 80%
                                )
                            `
                        }}
                    />
                )}

                <div className={`relative container mx-auto px-6 md:px-12 flex flex-col justify-between z-20 ${isMobile ? 'py-12' : 'h-full py-20'}`}>

                    {/* Top Content */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                        {/* Call to Action */}
                        <div className="md:w-1/2">
                            <h3 className="text-4xl md:text-5xl font-display italic font-bold mb-8 leading-tight">
                                ¿Tienes una idea?
                                <br />
                                <span className="text-white/40">Hagámosla realidad.</span>
                            </h3>
                            <Magnetic>
                                <Button
                                    href="/contacto"
                                    size="lg"
                                    className="inline-flex items-center gap-4 text-xl px-8 py-4 rounded-full bg-white text-black hover:scale-105 transition-transform duration-300 font-bold"
                                >
                                    Hablemos Ahora
                                </Button>
                            </Magnetic>
                        </div>

                        {/* Navigation Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
                            <div className="space-y-4">
                                <span className="text-xs uppercase tracking-[0.2em] text-white/30 block mb-4">Sitemap</span>
                                {['Inicio', 'Servicios', 'Comunidad', 'Nosotros', 'Blog'].map(link => (
                                    <Link key={link} to={`/${link.toLowerCase() === 'inicio' ? '' : link.toLowerCase()}`} className="block text-white/60 hover:text-white transition-colors text-lg">
                                        {link}
                                    </Link>
                                ))}
                            </div>
                            <div className="space-y-4">
                                <span className="text-xs uppercase tracking-[0.2em] text-white/30 block mb-4">Social</span>
                                {[
                                    { name: 'LinkedIn', icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/germ%C3%A1n-huertas-piquero-b89a80b1/" },
                                    { name: 'Instagram', icon: <Instagram size={16} />, href: "https://www.instagram.com/germanhuertaspiquero/" },
                                    { name: 'X', icon: <Twitter size={16} />, href: "https://x.com/Nocodeboy" },
                                    { name: 'YouTube', icon: <Youtube size={16} />, href: "https://www.youtube.com/@germanhuertaspiquero" },
                                    { name: 'TikTok', icon: <Video size={16} />, href: "https://www.tiktok.com/@nocodeboy" },
                                    { name: 'Skool', icon: <GraduationCap size={16} />, href: "https://www.skool.com/vibe-flow" }
                                ].map(item => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group text-lg"
                                    >
                                        {item.icon}
                                        {item.name}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 translate-x-1" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Giant Text & Info */}
                    <div>
                        {/* Time & Legal - Top of bottom section */}
                        <div className="flex justify-between items-end mb-4 text-xs font-mono text-white/30 uppercase tracking-widest border-t border-white/5 pt-8">
                            <div className="flex gap-8">
                                <span>© 2026 Vibe Flow</span>
                                <span className="hidden md:inline">Madrid, ES • {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="flex gap-6">
                                <Link to="/aviso-legal" className="hover:text-white transition-colors">Legal</Link>
                                <Link to="/politica-privacidad" className="hover:text-white transition-colors">Privacidad</Link>
                            </div>
                        </div>

                        {/* THE GIANT TEXT - Decorative, not H1 */}
                        <p
                            className={`font-display italic font-bold leading-[0.8] tracking-tighter text-center text-white/10 select-none bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-transparent ${isMobile ? 'text-[15vw] mt-8' : 'text-[13vw] hover:text-white/20 transition-colors duration-500'}`}
                            aria-hidden="true"
                        >
                            VIBE FLOW
                        </p>
                    </div>
                </div>

                {/* Background Noise/Gradient - Simplified on mobile */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />
                {!isMobile && (
                    <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0" />
                )}
            </div>
        </div>
    );
};

export default Footer;
