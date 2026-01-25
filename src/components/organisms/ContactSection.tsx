
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// Fixed imports
import Button from '../atoms/Button';
import { EASE_ELITE } from '../../styles/animation';
import { Magnetic } from '../atoms/Magnetic';

const AIRTABLE_WEBHOOK_URL = 'https://hooks.airtable.com/workflows/v1/genericWebhook/appUb3sR4AI0MHrOc/wflAehnMXnp2GZTog/wtrYLeCa5bnseoFYm';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(AIRTABLE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

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
            <form className="space-y-12" aria-label="Formulario de contacto" onSubmit={handleSubmit}>
              <div className="group relative">
                <input
                  type="text"
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu Nombre"
                  aria-label="Tu nombre"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-b border-white/10 py-6 text-2xl font-display focus:outline-none focus:border-primary transition-colors placeholder:text-white/10 disabled:opacity-50"
                />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-focus-within:w-full" aria-hidden="true" />
              </div>

              <div className="group relative">
                <input
                  type="email"
                  id="contact-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Corporativo"
                  aria-label="Tu correo electrónico corporativo"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-b border-white/10 py-6 text-2xl font-display focus:outline-none focus:border-primary transition-colors placeholder:text-white/10 disabled:opacity-50"
                />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-focus-within:w-full" aria-hidden="true" />
              </div>

              <div className="group relative">
                <textarea
                  rows={4}
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Háblanos de tu visión..."
                  aria-label="Tu mensaje o visión del proyecto"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-b border-white/10 py-6 text-2xl font-display focus:outline-none focus:border-primary transition-colors placeholder:text-white/10 resize-none disabled:opacity-50"
                />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-focus-within:w-full" aria-hidden="true" />
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-green-400 bg-green-400/10 p-4 rounded-xl"
                >
                  <CheckCircle size={20} />
                  <p>¡Mensaje enviado! Te contactaremos pronto.</p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl"
                >
                  <AlertCircle size={20} />
                  <p>Error al enviar. Inténtalo de nuevo.</p>
                </motion.div>
              )}

              <Magnetic>
                <Button
                  type="submit"
                  variant="glass"
                  fullWidth
                  size="lg"
                  className="h-24 rounded-[2rem] text-xl hover:border-primary hover:text-primary group"
                  icon={status === 'loading' ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
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
