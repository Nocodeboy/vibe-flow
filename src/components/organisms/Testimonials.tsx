
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Quote, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useBackground } from '../../contexts/BackgroundContext';
import Button from '../atoms/Button';
import { Magnetic } from '../atoms/Magnetic';

const testimonials = [
  {
    id: 1,
    name: "Gianro y Paloma",
    role: "Freelancers - Gialoma.com",
    text: "La estructura de Vibe Flow nos permitió escalar nuestra agencia en tiempo récord. El contenido es puramente práctico.",
    img: "/images/testimonials/testimonial-1.png"
  },
  {
    id: 2,
    name: "Paco Nogueras",
    role: "Emprendedor",
    text: "He pasado de no entender nada de IA a implementar agentes complejos para mi negocio. La comunidad es oro puro.",
    img: "/images/testimonials/testimonial-2.png"
  },
  {
    id: 3,
    name: "Valería Loto",
    role: "Consultora Turismo",
    text: "Automatizar mis procesos me ha ahorrado más de 20 horas semanales. El soporte técnico es inmejorable.",
    img: "/images/testimonials/testimonial-3.png"
  },
  {
    id: 4,
    name: "Martín",
    role: "Freelance Ecommerce",
    text: "Lo mejor es que todo está orientado a resultados reales. Nada de teoría aburrida, directo a la implementación.",
    img: "/images/testimonials/testimonial-4.png"
  },
  {
    id: 5,
    name: "Maite",
    role: "Terapeuta",
    text: "No sabía si esto era para mí, pero la guía paso a paso lo hace accesible para cualquiera. Muy recomendada.",
    img: "/images/testimonials/testimonial-5.png"
  },
  {
    id: 6,
    name: "Oscar",
    role: "Especialista IT",
    text: "Incluso con experiencia técnica, he aprendido muchísimo sobre agentes y nuevas herramientas de IA. Contenido top.",
    img: "/images/testimonials/testimonial-6.png"
  }
];


const Testimonials: React.FC = () => {
  const { setTheme } = useBackground();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });
  const [activeIndex, setActiveIndex] = useState(0);

  React.useEffect(() => {
    if (isInView) setTheme('warm');
  }, [isInView, setTheme]);

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-32 relative min-h-[50vh] overflow-hidden">
      {/* Global Background handles the visuals now */}

      <div className="max-w-7xl mx-auto mb-16 px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Resultados</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-display italic font-bold leading-[0.9]">
              Estudiantes & <br /> <span className="text-white/40">Casos de Éxito.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0"
            >
              <div className="glass p-12 md:p-16 rounded-[3rem] border-white/10 relative overflow-hidden group">
                <Quote size={120} className="absolute top-10 right-10 text-white/[0.02] group-hover:text-primary/10 transition-colors duration-500" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center h-full">
                  <div className="md:col-span-4">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/10 mb-6 group-hover:border-primary/50 transition-colors mx-auto md:mx-0">
                      <img
                        src={testimonials[activeIndex].img}
                        alt={testimonials[activeIndex].name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="text-2xl font-display font-bold text-white mb-2">{testimonials[activeIndex].name}</h4>
                      <p className="text-primary text-sm uppercase tracking-widest font-bold">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>

                  <div className="md:col-span-8">
                    <div className="flex gap-2 mb-8">
                      {[1, 2, 3, 4, 5].map(star => (
                        <div key={star} className="w-1.5 h-1.5 rounded-full bg-primary" />
                      ))}
                    </div>
                    <p className="text-2xl md:text-4xl leading-relaxed font-light text-white/90 italic">
                      "{testimonials[activeIndex].text}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-12">
          <div className="flex gap-4">
            <Magnetic>
              <Button
                variant="outline"
                shape="circle"
                onClick={prevReview}
                className="w-14 h-14 border-white/10 hover:border-primary hover:bg-primary hover:text-black hover:shadow-[0_0_30px_rgba(152,231,16,0.3)] transition-all hover:scale-110"
                icon={<ArrowLeft size={20} />}
              />
            </Magnetic>
            <Magnetic>
              <Button
                variant="outline"
                shape="circle"
                onClick={nextReview}
                className="w-14 h-14 border-white/10 hover:border-primary hover:bg-primary hover:text-black hover:shadow-[0_0_30px_rgba(152,231,16,0.3)] transition-all hover:scale-110"
                icon={<ArrowRight size={20} />}
              />
            </Magnetic>
          </div>

          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex
                  ? 'w-12 bg-primary'
                  : 'bg-white/10 hover:bg-white/30'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
