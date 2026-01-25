import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
    children: React.ReactElement;
    strength?: number; // How strong the pull is. Default 0.35
    springConfig?: { stiffness: number; damping: number; mass: number };
}

export const Magnetic: React.FC<MagneticProps> = ({
    children,
    strength = 0.35,
    springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Use spring for smoother return to center
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        x.set((clientX - centerX) * strength);
        y.set((clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="inline-block" // Ensure it wraps content tightly
        >
            {React.cloneElement(children, {
                // Ensure the child doesn't block pointer events if it has own logic
            })}
        </motion.div>
    );
};

export default Magnetic;
