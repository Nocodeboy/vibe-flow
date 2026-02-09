import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hasConsentBeenGiven, setConsent } from '../../hooks/useAnalytics';

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show banner if consent hasn't been given yet
        const timer = setTimeout(() => {
            if (!hasConsentBeenGiven()) {
                setIsVisible(true);
            }
        }, 1500); // Delay to not disrupt initial page load

        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        setConsent(true);
        setIsVisible(false);
    };

    const handleReject = () => {
        setConsent(false);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        delay: 0.2
                    }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9998]"
                >
                    <div className="relative bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/12 rounded-2xl p-5 md:p-6 shadow-2xl shadow-black/50">
                        {/* Close button */}
                        <button
                            onClick={handleReject}
                            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Cerrar"
                        >
                            <X size={16} className="text-white/40" />
                        </button>

                        {/* Content */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Cookie size={20} className="text-primary" />
                            </div>

                            <div className="flex-1 pr-6">
                                <h3 className="text-sm font-bold text-white mb-1">
                                    Cookies & Privacidad
                                </h3>
                                <p className="text-xs text-white/65 leading-relaxed mb-4">
                                    Usamos cookies para mejorar tu experiencia y analizar el tráfico.
                                    Puedes aceptar, rechazar o ver más en nuestra{' '}
                                    <Link
                                        to="/politica-cookies"
                                        className="text-primary hover:underline"
                                    >
                                        política de cookies
                                    </Link>.
                                </p>

                                {/* Buttons */}
                                <div className="flex items-center gap-2.5 md:gap-3">
                                    <button
                                        onClick={handleReject}
                                        className="px-4 py-2.5 text-xs font-medium text-white/70 hover:text-white border border-white/15 hover:border-white/30 rounded-full transition-all duration-300"
                                    >
                                        Rechazar
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="px-5 py-2.5 text-xs font-bold text-black bg-primary hover:bg-primary/90 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(152,231,16,0.3)]"
                                    >
                                        Aceptar todas
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
