
import React from 'react';
import { motion } from 'framer-motion';
import { EASE_ELITE } from '../../styles/animation';

const steps = [
  {
    num: "01",
    title: "Únete gratis a la comunidad",
    desc: "Accede ahora a nuestra comunidad gratuita y conecta con otros profesionales.",
    img: "/images/process-1.png"
  },
  {
    num: "02",
    title: "Comienza a aprender",
    desc: "Desbloquea módulos, plantillas y recursos para comenzar tu aprendizaje en automatización con IA.",
    img: "/images/process-2.png"
  },
  {
    num: "03",
    title: "Creas tu propia agencia",
    desc: "Comienza a ofrecer tus servicios, consigues tus primeros clientes y empiezas a ganar dinero con la IA.",
    img: "/images/process-3.png"
  },
  {
    num: "04",
    title: "Ganas dinero real",
    desc: "En 90 días puedes pasar de no tener ni idea a comenzar a vender servicios por más de 3K €.",
    img: "/images/process-4.png"
  }
];

const Process: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 border-y border-white/5 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Tu Ruta al Éxito
          </span>
          <h2 className="text-5xl md:text-7xl font-display italic font-bold">
            ¿Cómo Funciona <span className="text-white/40">Esto?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent">
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-primary blur-md"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: EASE_ELITE }}
              className={`flex flex-col gap-6 group relative ${i % 2 === 0 ? 'md:text-right md:items-end' : 'md:text-left md:items-start md:mt-24'}`}
            >
              {/* Image Card */}
              <div className="w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 relative group-hover:border-primary/50 transition-colors bg-white/5">
                <img src={step.img} alt={step.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
              </div>

              <div className="max-w-md">
                <span className="text-6xl font-display italic font-bold text-white/5 group-hover:text-primary/20 transition-colors absolute -z-10 -mt-12 select-none">
                  {step.num}
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-widest mb-3 text-white">{step.title}</h3>
                <p className="text-white/40 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
