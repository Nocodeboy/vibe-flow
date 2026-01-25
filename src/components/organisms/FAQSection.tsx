
import React from 'react';
import { motion } from 'framer-motion';
import FAQItem from '../molecules/FAQItem';

const questions = [
    {
        q: "¿Qué es exactamente Vibe Flow?",
        a: "La comunidad de élite para <span class='text-primary font-bold'>creadores digitales y automatizadores</span> en español. No es un curso pasivo: es aprender haciendo con 2 sesiones semanales en vivo, mentoría técnica directa, y acceso a proyectos reales de 2.000€-15.000€."
    },
    {
        q: "¿Esto es para principiantes o necesito experiencia previa?",
        a: "Ambos. El contenido va desde fundamentos hasta Agentes IA avanzados y Sistemas Multi-agente. La mayoría entra sin saber nada y sale implementando automatizaciones de alto valor en <span class='text-primary font-bold'>menos de 90 días</span>."
    },
    {
        q: "¿Qué incluye la membresía de $24/mes?",
        a: "2 llamadas semanales en vivo (valor: 964€/año), Plantillas listas para usar (valor: +999€), actualizaciones perpetuas semanales (valor: 364€/año), mentoría técnica directa, y cuando estés listo: acceso a proyectos de agencia reales."
    },
    {
        q: "¿Si me atasco, qué tan rápido me ayudan?",
        a: "<span class='text-primary font-bold'>Menos de 24 horas. Garantizado.</span> Si publicas antes de las 5pm CET, respuesta el mismo día. Además tenemos 2 llamadas en vivo por semana + Cafés virtuales diarios donde resolvemos dudas en directo."
    },
    {
        q: "¿Y si solo quiero que lo hagan por mí?",
        a: "También podemos. Nuestra <span class='text-primary font-bold'>agencia implementa proyectos llave en mano</span> desde 2.000€. CRMs, automatizaciones, chatbots IA, integraciones... Visita nuestra página de <a href='/services' class='text-primary underline'>Servicios</a> para más información."
    }
];


const FAQSection: React.FC = () => {
    return (
        <section id="faq" className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-24">
                    <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                        Resolvemos tus dudas
                    </span>
                    <h2 className="text-5xl md:text-7xl font-display italic font-bold">
                        ¿Tienes <span className="text-white/40">Preguntas?</span>
                    </h2>
                    <p className="mt-8 text-white/60 text-xl">
                        Tenemos respuestas claras. Si necesitas más ayuda, contáctanos.
                    </p>
                </div>

                <div>
                    {questions.map((item, i) => (
                        <FAQItem key={i} {...item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
