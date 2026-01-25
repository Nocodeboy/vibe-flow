import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { EASE_ELITE } from '../../styles/animation';

export interface FAQItemProps {
    q: string;
    a: string;
    index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ q, a, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: EASE_ELITE }}
            className="border-b border-white/10 last:border-none"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-8 flex justify-between items-center text-left hover:text-primary transition-colors group"
            >
                <span className="text-xl md:text-2xl font-display font-medium pr-8">{q}</span>
                <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover:border-primary group-hover:bg-primary/10 ${isOpen ? 'text-primary' : 'text-white/40'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p
                            className="pb-8 text-white/60 text-lg leading-relaxed max-w-3xl"
                            dangerouslySetInnerHTML={{ __html: a }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FAQItem;
