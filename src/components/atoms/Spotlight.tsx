import React from 'react';
import { motion, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';

interface SpotlightProps {
    children?: React.ReactNode;
    className?: string;
    size?: number;
    color?: string; // e.g. "rgba(255, 255, 255, 0.1)"
}

export const Spotlight: React.FC<SpotlightProps> = ({
    children,
    className = "",
    size = 400,
    color = "rgba(152, 231, 16, 0.15)" // Default to Primary Green
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for the laggy "premium" feel
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Dynamic background template
    const background = useMotionTemplate`
        radial-gradient(
            ${size}px circle at ${springX}px ${springY}px,
            ${color},
            transparent 80%
        )
    `;

    return (
        <motion.div
            className={`group relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            {/* The Spotlight Overlay */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background }}
            />
            {children}
        </motion.div>
    );
};

export default Spotlight;
