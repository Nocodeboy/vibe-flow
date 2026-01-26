import React, { useState, ReactNode, memo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { EASE_ELITE } from '../../styles/animation';

export interface FAQItemProps {
  q: string;
  a: ReactNode;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const buttonId = `faq-button-${uniqueId}`;
  const contentId = `faq-content-${uniqueId}`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: EASE_ELITE }}
      className="border-b border-white/10 last:border-none"
    >
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full py-8 flex justify-between items-center text-left hover:text-primary transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="text-xl md:text-2xl font-display font-medium pr-8">{q}</span>
        <div
          className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover:border-primary group-hover:bg-primary/10 flex-shrink-0 ${
            isOpen ? 'text-primary bg-primary/10 border-primary' : 'text-white/40'
          }`}
          aria-hidden="true"
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_ELITE }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-white/60 text-lg leading-relaxed max-w-3xl">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(FAQItem);
