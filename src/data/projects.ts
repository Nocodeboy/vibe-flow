import { Project } from '../types';

// Re-export Project type for convenience
export type { Project };

export const projects: Project[] = [
    {
        id: 'omkin-kay',
        title: "Minumerologia.es - Oráculo de Autoconocimiento",
        category: "SaaS + Mentoría Cuántica",
        img: "/images/projects/omkin-kay.webp",
        description: "Plataforma de autoconocimiento que combina cálculo numerológico avanzado con un embudo de conversión para servicios de mentoría.",
        tags: ["React", "Lucide React", "Stripe", "Supabase"],
        className: "md:col-span-8 md:row-span-2 h-[600px] md:h-auto",
        challenge: "El cliente necesitaba validar su metodología única de numerología sin invertir meses en desarrollo. Buscaba una estética premium ('Quiet Luxury') que generara confianza inmediata.",
        solution: "Desarrollamos un SaaS de autoconocimiento en <3 semanas. Integramos pasarela de pago, generación de informes PDF dinámicos y un diseño minimalista que eleva el valor percibido.",
        impact: ["Validación de Mercado en 21 días", "Ticket medio +40%", "Automatización total de entregas"],
        link: "https://minumerologia.es",
        devTime: "< 3 Semanas",
        service: "Desarrollo SaaS & MVP"
    },
    {
        id: 'photo-pack-ai',
        title: "Photopack.ai - Estudio Fotográfico Virtual",
        category: "SaaS + IA Generativa",
        img: "/images/projects/photopack.webp",
        description: "Estudio fotográfico IA que transforma selfies en sesiones editoriales profesionales usando Gemini 3.0 Pro.",
        tags: ["React 19", "Gemini 3.0", "Framer Motion", "Tailwind"],
        className: "md:col-span-4 md:row-span-1 h-[300px] md:h-auto",
        challenge: "Los estudios de fotografía tradicionales son costosos y logísticamente complejos. El cliente quería democratizar la fotografía profesional con IA, pero necesitaba un lanzamiento rápido.",
        solution: "Lanzamos un estudio virtual basado en Gemini 3.0 Pro en tiempo récord. El sistema permite a los usuarios subir selfies y recibir fotos de calidad editorial en minutos, todo gestionado desde una web app robusta.",
        impact: ["MVP lanzado en 4 semanas", "Cero coste de inventario", "Escalabilidad global inmediata"],
        link: "https://photopack.ai",
        devTime: "< 1 Mes",
        service: "IA Generativa & Web Apps"
    },
    {
        id: 'viralth-saas',
        title: "Viralth.com - Ingeniería Viral Potenciada por IA",
        category: "SaaS + IA Generativa",
        img: "/images/projects/viralth.webp",
        description: "Motor de ingeniería viral que automatiza la creación de miniaturas de alto impacto con IA Generativa multimodal.",
        tags: ["React & Vite", "Gemini AI", "Supabase", "Stripe"],
        className: "md:col-span-4 md:row-span-1 h-[300px] md:h-auto",
        challenge: "Los creadores de contenido pierden horas diseñando miniaturas o gestionando diseñadores. Viralth necesitaba una herramienta que automatizara esto con calidad de agencia.",
        solution: "Implementamos un motor de generación de imágenes con IA multimodal. El sistema analiza el título del video y genera 4 variantes optimizadas para CTR en segundos, listas para descargar.",
        impact: ["Ahorro de 10h/semana por creador", "Coste de producción -90%", "Iteración rápida de estilos"],
        link: "https://viralth.com",
        devTime: "3 Semanas",
        service: "Automatización & IA"
    },
    {
        id: 'vibeflow-community',
        title: "Vibeflow.es - Comunidad de Élite NoCode & IA",
        category: "Comunidad / EdTech",
        img: "/images/projects/vibeflow.webp",
        description: "Ecosistema de construcción colectiva para VibeCoders que buscan facturar con proyectos reales de IA y Automatización.",
        tags: ["React 19", "TypeScript", "Vite", "Tailwind"],
        className: "md:col-span-12 md:row-span-1 h-[350px] md:h-[400px]",
        challenge: "Muchos desarrolladores NoCode se quedan estancados entre tutoriales. Necesitábamos crear un espacio donde pudieran construir proyectos reales y monetizar sus habilidades.",
        solution: "Construimos una plataforma de comunidad 'Gamificada' con acceso a leads reales. Integramos recursos educativos, mentoría en vivo y un sistema de desafíos para potenciar la carrera de los miembros.",
        impact: ["Comunidad activa desde día 1", "Networking de alto valor", "Plataforma centralizada de aprendizaje"],
        link: "https://vibeflow.es",
        devTime: "2 Semanas",
        service: "Comunidades & EdTech"
    }
];
