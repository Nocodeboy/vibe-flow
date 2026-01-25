
import React from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';

// Fixed imports
import Button from '../atoms/Button';
import { EASE_ELITE } from '../../styles/animation';
import { Magnetic } from '../atoms/Magnetic';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-40 px-6 bg-[#0a0a0a] relative" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_ELITE }}
          >
            <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">Conversación Estratégica</span>
            <h2 id="contact-heading" className="text-5xl md:text-7xl font-display italic font-bold leading-[0.9] mb-12">
              Construyamos <br /> <span className="text-white/40">el</span> <br /> Futuro.
            </h2>
            <div className="space-y-8 mt-20">
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-2 font-bold">Oficina Digital</p>
                <address className="text-xl text-white/80 italic font-display not-italic">Madrid, España / Remote Everywhere</address>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-2 font-bold">Disponibilidad</p>
                <p className="text-xl text-white/80 italic font-display">2026 • Abiertos a Colaboraciones</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_ELITE }}
            className="flex flex-col justify-end"
          >
            <form className="space-y-12" aria-label="Formulario de contacto">
              <div className="group relative">
                <input
                  type="text"
                  id="contact-name"
                  placeholder="Tu Nombre"
                  aria-label="Tu nombre"
                  className="w-full bg-transparent border-b border-white/10 py-6 text-2xl font-display focus:outline-none focus:border-primary transition-colors placeholder:text-white/10"
                />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-focus-within:w-full" aria-hidden="true" />
              </div>

              <div className="group relative">
                <input
                  type="email"
                  id="contact-email"
                  placeholder="Email Corporativo"
                  aria-label="Tu correo electrónico corporativo"
                  className="w-full bg-transparent border-b border-white/10 py-6 text-2xl font-display focus:outline-none focus:border-primary transition-colors placeholder:text-white/10"
                />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-focus-within:w-full" aria-hidden="true" />
              </div>

              <div className="group relative">
                <textarea
                  rows={4}
                  id="contact-message"
                  placeholder="Háblanos de tu visión..."
                  aria-label="Tu mensaje o visión del proyecto"
                  className="w-full bg-transparent border-b border-white/10 py-6 text-2xl font-display focus:outline-none focus:border-primary transition-colors placeholder:text-white/10 resize-none"
                />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-focus-within:w-full" aria-hidden="true" />
              </div>


              {/* ... (inside the form) */}

              <Magnetic>
                <Button
                  type="submit"
                  variant="glass"
                  fullWidth
                  size="lg"
                  className="h-24 rounded-[2rem] text-xl hover:border-primary hover:text-primary group"
                  icon={<Send size={20} />}
                >
                  Enviar Mensaje
                </Button>
              </Magnetic>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
