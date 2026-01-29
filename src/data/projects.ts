import { Project } from '../types';

// Re-export Project type for convenience
export type { Project };

export const projects: Project[] = [
    {
        id: 'omkin-kay',
        title: "Omkin-Kay Digital - Oráculo de Autoconocimiento",
        category: "SaaS + Mentoría Cuántica",
        img: "/images/projects/omkin-kay.png",
        description: "Plataforma de autoconocimiento que combina cálculo numerológico avanzado con un embudo de conversión para servicios de mentoría.",
        tags: ["React", "Lucide React", "Stripe", "Supabase"],
        className: "md:col-span-8 md:row-span-2 h-[600px] md:h-auto",
        challenge: "Profesionales y emprendedores sufren 'parálisis por análisis' y desconexión con su propósito, buscando respuestas precisas.",
        solution: "Oráculo digital con estética 'Quiet Luxury' que calcula la esencia y personalidad, ofreciendo un mapa de vida claro y accionable.",
        impact: ["Alta conversión a consultas", "Apselling a programas", "Reducción de estrés"]
    },
    {
        id: 'photo-pack-ai',
        title: "Photo Pack AI - Estudio Fotográfico Virtual",
        category: "SaaS + IA Generativa",
        img: "/images/projects/photopack.png",
        description: "Estudio fotográfico IA que transforma selfies en sesiones editoriales profesionales usando Gemini 3.0 Pro.",
        tags: ["React 19", "Gemini 3.0", "Framer Motion", "Tailwind"],
        className: "md:col-span-4 md:row-span-1 h-[300px] md:h-auto",
        challenge: "La fotografía profesional es costosa y lenta. Los usuarios necesitan inmediatez y versatilidad sin perder calidad de estudio.",
        solution: "SaaS que sintetiza packs de fotos ultra-realistas en <30seg, preservando la identidad del usuario a través de múltiples estilos.",
        impact: ["Tiempo de entrega <30seg", "Calidad 8K (Upscaling)", "Privacy First"]
    },
    {
        id: 'viralth-saas',
        title: "Viralth - Ingeniería Viral Potenciada por IA",
        category: "SaaS + IA Generativa",
        img: "/images/projects/viralth.png",
        description: "Motor de ingeniería viral que automatiza la creación de miniaturas de alto impacto con IA Generativa multimodal.",
        tags: ["React & Vite", "Gemini AI", "Supabase", "Stripe"],
        className: "md:col-span-4 md:row-span-1 h-[300px] md:h-auto",
        challenge: "El ecosistema actual impide iterar rápido ante las tendencias, con procesos de diseño lentos e inconsistencia visual.",
        solution: "SaaS que sintetiza 4 variantes de miniaturas únicas en segundos usando IA, con refinamiento en lenguaje natural y SEO integrado.",
        impact: ["Tiempo de diseño -90%", "Optimización de CTR", "Escalabilidad Global"]
    },
    {
        id: 'vibeflow-community',
        title: "Vibe Flow - Comunidad de Élite NoCode & IA",
        category: "Comunidad / EdTech",
        img: "/images/vibeflow_community.webp",
        description: "Ecosistema de construcción colectiva para VibeCoders que buscan facturar con proyectos reales de IA y Automatización.",
        tags: ["React 19", "TypeScript", "Vite", "Tailwind"],
        className: "md:col-span-12 md:row-span-1 h-[350px] md:h-[400px]",
        challenge: "La brecha entre 'aprender tecnología' y 'ganar dinero' es enorme. Los creadores sufren soledad y falta de proyectos reales.",
        solution: "Plataforma de 'Build in Public' con sesiones en vivo, acceso a leads de agencia y mentoría continua para pasar de tutorial a facturación.",
        impact: ["+500 Miembros Activos", "Proyectos Reales", "Networking de Élite"]
    }
];
