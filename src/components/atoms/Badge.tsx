
import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    variant?: 'outline' | 'filled' | 'glass' | 'live';
    color?: 'primary' | 'white' | 'red';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'outline',
    color = 'primary',
    className = "",
    size = 'sm',
    icon,
    style,
    ...props
}) => {

    const variants = {
        outline: "bg-transparent",
        filled: "text-black",
        glass: "glass text-white",
        live: "glass text-white pl-3"
    };

    const sizes = {
        sm: "text-[10px] px-3 py-1 rounded-full",
        md: "text-[11px] px-4 py-1.5 rounded-full",
        lg: "text-xs px-5 py-2 rounded-full"
    };

    const colors = {
        primary: variant === 'filled' ? "bg-primary border-primary text-black hover:bg-white hover:border-white" : "border-primary/50 text-white bg-primary/10",
        white: variant === 'filled' ? "bg-white border-white text-black hover:bg-primary" : "border-white/10 text-white/50 bg-white/[0.02]",
        red: variant === 'filled' ? "bg-red-500 border-red-500 text-white" : "border-red-500/50 text-red-500"
    };

    return (
        <span
            className={`
                inline-flex items-center justify-center font-bold uppercase tracking-[0.2em] border transition-all duration-300 font-display
                ${variants[variant]}
                ${sizes[size]}
                ${colors[color]}
                ${className}
            `}
            style={style}
            {...props}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {variant === 'live' && (
                <span className="relative flex h-2 w-2 mr-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color === 'primary' ? 'bg-primary' : 'bg-white'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${color === 'primary' ? 'bg-primary' : 'bg-white'}`}></span>
                </span>
            )}
            {children}
        </span>
    );
};

export default Badge;
