
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface KineticCharProps {
    char: string;
    baseColor?: string;
    hoverColor?: string;
}

const KineticChar: React.FC<KineticCharProps> = ({
    char,
    baseColor = "#ffffff",
    hoverColor = "#98e710"
}) => {
    const [isHovered, setIsHovered] = useState(false);

    // If hoverColor is not provided, default to lime green if base is white, or white if base is something else
    const targetColor = hoverColor || (baseColor === "#ffffff" ? "#98e710" : "#ffffff");

    return (
        <motion.span
            className="inline-block relative cursor-default select-none font-display font-bold italic"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
                y: isHovered ? -6 : 0,
                scale: isHovered ? 1.05 : 1,
                color: isHovered ? targetColor : baseColor,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.8
            }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
};

export default KineticChar;
