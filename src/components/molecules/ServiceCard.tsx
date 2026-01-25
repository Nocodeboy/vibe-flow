import React, { useRef, memo, useCallback } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Service } from '../../data/services';
import { EASE_ELITE } from '../../styles/animation';

interface ServiceCardProps {
    service: Service;
    index: number;
    onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / 20);
        y.set((e.clientY - centerY) / 20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: EASE_ELITE }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX: y,
                rotateY: x,
                transformStyle: "preserve-3d"
            }}
            className="group relative cursor-pointer"
        >
            {/* Card Container */}
            <div className="relative h-full p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] backdrop-blur-sm overflow-hidden">

                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${service.color}15 0%, transparent 50%)`
                    }}
                />

                {/* Glare effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
                        transform: "translateX(-100%)",
                        animation: "glare 0.6s ease-out forwards"
                    }}
                />

                {/* Content */}
                <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110"
                                style={{
                                    borderColor: `${service.color}30`,
                                    background: `${service.color}10`,
                                    color: service.color
                                }}
                            >
                                {service.icon}
                            </div>
                            <span className="text-6xl font-display italic font-bold text-white/[0.03] group-hover:text-white/[0.08] transition-colors">
                                {service.num}
                            </span>
                        </div>
                        <motion.div
                            className="px-4 py-2 rounded-full border text-xs font-bold"
                            style={{ borderColor: `${service.color}40`, color: service.color }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {service.priceRange}
                        </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-display italic font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/40 leading-relaxed mb-8 group-hover:text-white/60 transition-colors">
                        {service.desc}
                    </p>

                    {/* Features as pills */}
                    <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                            <span
                                key={feature}
                                className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] uppercase tracking-wider text-white/50 group-hover:border-primary/20 group-hover:text-white/70 transition-all"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Corner accent */}
                <div
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                    style={{ background: service.color }}
                />
            </div>
        </motion.div>
    );
};

export default memo(ServiceCard);
