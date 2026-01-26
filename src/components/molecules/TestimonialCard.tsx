import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    text: string;
    img: string;
}

export interface TestimonialCardProps {
    testimonial: Testimonial;
    isActive?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isActive = true }) => {
    if (!isActive) return null;

    return (
        <motion.article
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="absolute inset-0"
            aria-label={`Testimonio de ${testimonial.name}`}
        >
            <div className="glass p-12 md:p-16 rounded-[3rem] border-white/10 relative overflow-hidden group">
                <Quote size={120} className="absolute top-10 right-10 text-white/[0.02] group-hover:text-primary/10 transition-colors duration-500" aria-hidden="true" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center h-full">
                    <div className="md:col-span-4">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/10 mb-6 group-hover:border-primary/50 transition-colors mx-auto md:mx-0">
                            <img
                                src={testimonial.img}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                width={192}
                                height={192}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-display font-bold text-white mb-2">{testimonial.name}</h3>
                            <p className="text-primary text-sm uppercase tracking-widest font-bold">{testimonial.role}</p>
                        </div>
                    </div>

                    <div className="md:col-span-8">
                        <div className="flex gap-2 mb-8" role="img" aria-label="5 estrellas">
                            {[1, 2, 3, 4, 5].map(star => (
                                <div key={`star-${testimonial.id}-${star}`} className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                            ))}
                        </div>
                        <blockquote className="text-2xl md:text-4xl leading-relaxed font-light text-white/90 italic">
                            "{testimonial.text}"
                        </blockquote>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

// Memoize to prevent unnecessary re-renders
export default memo(TestimonialCard, (prevProps, nextProps) => {
    return (
        prevProps.testimonial.id === nextProps.testimonial.id &&
        prevProps.isActive === nextProps.isActive
    );
});
