import React from 'react';
import { ArrowRight } from 'lucide-react';

const CommunityCTA: React.FC = () => {
    return (
        <div className="my-16 p-8 md:p-12 rounded-[2rem] glass border border-primary/20 bg-primary/5 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-500" />

            <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-display italic font-bold mb-4 text-white">
                    ¿Te gusta lo que lees?
                </h3>
                <p className="text-white/60 mb-8 max-w-xl mx-auto text-lg">
                    Únete a <span className="text-primary font-bold">Vibe Flow</span>, nuestra comunidad exclusiva de emprendedores y creadores. Aprende, conecta y escala tu negocio.
                </p>
                <a
                    href="https://www.skool.com/vibe-flow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-full hover:shadow-[0_0_40px_rgba(152,231,16,0.4)] transition-all transform hover:-translate-y-1"
                >
                    Únete Ahora por $29/mes
                    <ArrowRight size={16} />
                </a>
            </div>
        </div>
    );
};

export default CommunityCTA;
