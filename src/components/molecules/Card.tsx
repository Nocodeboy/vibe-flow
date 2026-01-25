
import React, { memo } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: 'glass' | 'solid' | 'outline';
    hoverEffect?: 'scale' | 'glow' | 'none';
    children: React.ReactNode;
    className?: string;
    gradientOverlay?: boolean;
}

const Card: React.FC<CardProps> = ({
    variant = 'glass',
    hoverEffect = 'scale',
    children,
    className = '',
    gradientOverlay = false,
    ...props
}) => {

    const baseStyles = 'relative rounded-[2rem] overflow-hidden border transition-all duration-500';

    const variants = {
        glass: 'bg-[#0A0A0A] border-white/5 backdrop-blur-sm',
        solid: 'bg-[#0A0A0A] border-white/5',
        outline: 'bg-transparent border-white/10'
    };

    const hoverEffects = {
        scale: 'hover:scale-[1.02] hover:border-white/10',
        glow: 'hover:border-primary/30 hover:shadow-[0_0_30px_rgba(152,231,16,0.1)]',
        none: ''
    };

    return (
        <motion.div
            className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${hoverEffects[hoverEffect]} 
        ${className}
      `}
            {...props}
        >
            {gradientOverlay && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none z-10" />
            )}
            <div className="relative z-20 h-full">
                {children}
            </div>
        </motion.div>
    );
};

export default memo(Card);
