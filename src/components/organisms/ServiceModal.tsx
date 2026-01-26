import React, { useId } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { ArrowRight, X, Check, Sparkles, Clock, Users } from 'lucide-react';
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

    // Prevent body scroll when modal is open
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
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999]"
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
        >
            {/* Backdrop with blur */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none"
                style={{ background: service.color }}
            />

            {/* Modal Container - centered */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 30 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-2xl max-h-[85vh] rounded-[2rem] bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Top gradient line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                    />

                    {/* Scrollable content with custom scrollbar */}
                    <div
                        className="overflow-y-auto max-h-[85vh] modal-scrollbar"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: `${service.color}40 transparent`
                        }}
                    >
                        {/* Header - Fixed look */}
                        <div className="relative p-8 pb-6">
                            {/* Close button */}
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                aria-label="Cerrar modal"
                            >
                                <X size={18} className="text-white/60" aria-hidden="true" />
                            </motion.button>

                            {/* Service number watermark */}
                            <div className="absolute top-4 right-20 text-[120px] font-display italic font-bold text-white/[0.02] leading-none pointer-events-none">
                                {service.num}
                            </div>

                            {/* Icon and title */}
                            <div className="flex items-start gap-5">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 flex-shrink-0"
                                    style={{
                                        borderColor: `${service.color}50`,
                                        background: `linear-gradient(135deg, ${service.color}20, ${service.color}05)`,
                                        color: service.color,
                                        boxShadow: `0 0 40px ${service.color}20`
                                    }}
                                >
                                    {service.icon}
                                </motion.div>
                                <div className="flex-1 pr-12">
                                    <motion.span
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                        className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block"
                                        style={{ color: service.color }}
                                    >
                                        Servicio {service.num}
                                    </motion.span>
                                    <motion.h2
                                        id={titleId}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-2xl md:text-3xl font-display italic font-bold leading-tight"
                                    >
                                        {service.title}
                                    </motion.h2>
                                </div>
                            </div>

                            {/* Price badge */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 }}
                                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border"
                                style={{
                                    borderColor: `${service.color}30`,
                                    background: `linear-gradient(135deg, ${service.color}10, transparent)`
                                }}
                            >
                                <Sparkles size={14} style={{ color: service.color }} />
                                <span className="text-sm font-bold" style={{ color: service.color }}>
                                    {service.priceRange}
                                </span>
                            </motion.div>
                        </div>

                        {/* Divider */}
                        <div className="mx-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Content */}
                        <div className="p-8 pt-6 space-y-8">
                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-white/20" />
                                    Descripción
                                </h4>
                                <p id={descId} className="text-white/60 leading-relaxed text-[15px]">
                                    {service.details.fullDesc}
                                </p>
                            </motion.div>

                            {/* Deliverables */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                            >
                                <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-white/20" />
                                    Qué Incluye
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {service.details.deliverables.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + i * 0.05 }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors group"
                                        >
                                            <div
                                                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{ background: `${service.color}15` }}
                                            >
                                                <Check size={12} style={{ color: service.color }} />
                                            </div>
                                            <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                                                {item}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Timeline & Ideal - Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06]">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Clock size={14} className="text-white/30" />
                                        <h4 className="text-[10px] uppercase tracking-widest text-white/30">Tiempo</h4>
                                    </div>
                                    <p className="text-xl font-display italic font-bold" style={{ color: service.color }}>
                                        {service.details.timeline}
                                    </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06]">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Users size={14} className="text-white/30" />
                                        <h4 className="text-[10px] uppercase tracking-widest text-white/30">Ideal Para</h4>
                                    </div>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        {service.details.ideal}
                                    </p>
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 }}
                                className="pt-6 border-t border-white/[0.06]"
                            >
                                <Button
                                    href="mailto:contact@vibeflow.es"
                                    external
                                    size="lg"
                                    className="w-full justify-center py-4 text-base font-bold group"
                                    icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                                >
                                    Solicitar Presupuesto
                                </Button>
                                <p className="text-center text-white/30 text-xs mt-4">
                                    Respuesta en menos de 24 horas
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default ServiceModal;
