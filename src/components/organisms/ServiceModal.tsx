import React, { useId } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Check, Sparkles, Clock, Users, Shield, Zap, Globe } from 'lucide-react';
import { Service } from '../../data/services';
import Button from '../atoms/Button';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface ServiceModalProps {
    service: Service;
    onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
    const modalId = useId();
    const titleId = `modal-title-${modalId}`;
    const descId = `modal-desc-${modalId}`;
    const modalRef = useFocusTrap<HTMLDivElement>(true);

    // Prevent body scroll
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Handle escape key
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const modalContent = (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Modal Container */}
            <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-6xl max-h-[90vh] md:h-[800px] flex flex-col md:flex-row bg-[#080808] border border-white/[0.08] rounded-[32px] overflow-hidden shadow-2xl shadow-black/80 ring-1 ring-white/5"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background Noise/Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/noise.png")' }} />

                {/* Left Column (Hero) */}
                <div className="relative w-full md:w-[400px] flex-shrink-0 flex flex-col justify-between p-8 md:p-10 overflow-hidden">
                    {/* Dynamic Background */}
                    <div className="absolute inset-0 opacity-20">
                        <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                                background: `radial-gradient(circle at top left, ${service.color}, transparent 70%)`
                            }}
                        />
                        <div
                            className="absolute bottom-[-20%] right-[-20%] w-[300px] h-[300px] rounded-full blur-[100px]"
                            style={{ background: service.color }}
                        />
                    </div>

                    {/* Top Info */}
                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
                        >
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: service.color }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{service.priceRange}</span>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-black"
                            style={{
                                background: service.color,
                                boxShadow: `0 10px 40px -10px ${service.color}60`
                            }}
                        >
                            {React.cloneElement(service.icon as React.ReactElement, { size: 40, color: '#000' })}
                        </motion.div>

                        <motion.h2
                            id={titleId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl md:text-5xl font-display italic font-bold leading-tight text-white mb-4"
                        >
                            {service.title.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="h-1 w-20 rounded-full"
                            style={{ background: service.color }}
                        />
                    </div>

                    {/* Bottom Info - Number */}
                    <div className="relative z-10 mt-auto pt-10">
                        <span className="text-[140px] leading-none font-display italic font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent absolute -bottom-16 -left-6 select-none pointer-events-none">
                            {service.num}
                        </span>
                    </div>
                </div>

                {/* Right Column (Content Grid) */}
                <div className="flex-1 overflow-y-auto modal-scrollbar relative z-10 bg-[#0a0a0a]/50 backdrop-blur-md md:rounded-l-[32px] md:-ml-8 border-l border-white/5">
                    {/* Close Button Mobile - Absolute top right */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/40 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-8 md:p-12 pt-16 md:pt-12 grid gap-6">

                        {/* 1. Description Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm"
                        >
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/40" /> Resumen
                            </h3>
                            <p id={descId} className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                                {service.details.fullDesc}
                            </p>
                        </motion.div>

                        {/* 2. Grid for Bento Items */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Deliverables */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="row-span-2 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm flex flex-col"
                            >
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Qué Incluye</h3>
                                <div className="space-y-3 flex-1">
                                    {service.details.deliverables.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 group">
                                            <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5">
                                                <Check size={10} style={{ color: service.color }} />
                                            </div>
                                            <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors leading-tight py-0.5">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Timeline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.04]"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/70">
                                    <Clock size={18} />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Tiempo Estimado</h4>
                                <p className="text-2xl font-bold text-white">{service.details.timeline}</p>
                            </motion.div>

                            {/* Ideal For */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.04]"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/70">
                                    <Users size={18} />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Ideal Para</h4>
                                <p className="text-sm text-white/60 leading-relaxed">{service.details.ideal}</p>
                            </motion.div>
                        </div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-4 flex flex-col md:flex-row gap-6 items-center justify-between p-6 md:p-8 rounded-3xl relative overflow-hidden group"
                        >
                            {/* Background glow for CTA */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-100 transition-opacity" />
                            <div
                                className="absolute right-0 top-0 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                                style={{ background: service.color }}
                            />

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-2">¿Te encaja este servicio?</h3>
                                <p className="text-sm text-white/50">Agenda una llamada o pide presupuesto sin compromiso.</p>
                            </div>

                            <div className="relative z-10 flex-shrink-0">
                                <Button
                                    href="mailto:contact@vibeflow.es"
                                    external
                                    size="lg"
                                    shape="pill"
                                    className="border-none text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow"
                                    style={{ background: service.color }}
                                    icon={<ArrowRight size={18} />}
                                >
                                    Solicitar Ahora
                                </Button>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </motion.div>
        </motion.div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default ServiceModal;
