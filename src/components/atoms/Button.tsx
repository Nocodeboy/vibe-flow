import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    shape?: 'pill' | 'rounded' | 'square' | 'circle';
    isLoading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    href?: string;
    external?: boolean;
    fullWidth?: boolean;
    className?: string; // Add className explicitly to interface
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    shape = 'pill',
    isLoading = false,
    icon,
    iconPosition = 'right',
    href,
    external = false,
    fullWidth = false,
    className = "",
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-bold uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden font-display";

    const variants = {
        primary: "bg-primary text-black hover:bg-white hover:text-black border border-transparent hover:shadow-[0_0_60px_rgba(152,231,16,0.4)]",
        secondary: "bg-white text-black hover:bg-primary hover:text-black border border-transparent",
        outline: "bg-transparent text-white border border-white/20 hover:border-primary hover:text-primary backdrop-blur-md bg-white/5",
        ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
        glass: "glass border-white/10 text-white hover:bg-white/10 hover:border-white/30"
    };

    const sizes = {
        sm: "text-[10px] tracking-widest px-6 py-3",
        md: "text-xs tracking-widest px-8 py-4",
        lg: "text-sm tracking-widest px-10 py-5",
        icon: "p-3"
    };

    const shapes = {
        pill: "rounded-full",
        rounded: "rounded-lg",
        square: "rounded-none",
        circle: "rounded-full aspect-square p-0"
    };

    // Override size padding if shape is circle to ensure perfect circle
    const classes = `
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${shapes[shape]}
        ${fullWidth ? "w-full" : ""}
        ${shape === 'circle' ? 'flex items-center justify-center' : ''}
        ${className}
    `;

    // ... (rest of the component logic remains similar but needs to use updated props)

    const content = (
        <>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
            {children}
            {!isLoading && icon && iconPosition === 'right' && <span className={`ml-2 group-hover:translate-x-1 transition-transform ${shape === 'circle' ? 'ml-0 group-hover:translate-x-0' : ''}`}>{icon}</span>}

            {/* Hover Glow Effect */}
            {(variant === 'primary' || variant === 'glass') && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
            )}
        </>
    );

    // Render logic updates
    if (href) {
        if (external) {
            return (
                <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {content}
                </motion.a>
            );
        }
        return (
            <Link to={href} className={classes}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center justify-center w-full h-full">
                    {content}
                </motion.div>
            </Link>
        );
    }

    return (
        <motion.button
            className={classes}
            disabled={isLoading || disabled}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {content}
        </motion.button>
    );
};

export default Button;
