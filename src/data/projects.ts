import { Project } from '../types';

export const projects: Project[] = [
    {
        id: 'clinica-dental',
        title: "Clínica Dr. Martínez",
        category: "CRM + Automatización",
        img: "/images/projects/nexus.png",
        description: "Sistema completo de gestión de pacientes con recordatorios automáticos y seguimiento de citas.",
        tags: ["Airtable", "Make", "WhatsApp"],
        className: "md:col-span-8 md:row-span-2 h-[600px] md:h-auto",
        challenge: "La clínica perdía el 30% de sus citas por falta de recordatorios y gestionaba todo en hojas de Excel desactualizadas.",
        solution: "Implementamos un CRM en Airtable conectado a WhatsApp Business que envía recordatorios automáticos 24h y 2h antes de cada cita.",
        impact: ["85% menos citas perdidas", "15h/semana ahorradas", "Pacientes más satisfechos"]
    },
    {
        id: 'ecommerce-ropa',
        title: "KLÄRE Clothing",
        category: "Automatización IA",
        img: "/images/projects/vibeflow-app.png",
        description: "Automatización de atención al cliente con chatbot IA para tienda de ropa online.",
        tags: ["Botpress", "OpenAI", "Shopify"],
        className: "md:col-span-4 md:row-span-1 h-[300px] md:h-auto",
        challenge: "La dueña respondía manualmente 50+ mensajes diarios sobre tallas, envíos y devoluciones, robándole tiempo de gestión.",
        solution: "Creamos un chatbot IA entrenado con su catálogo que responde FAQs, recomienda tallas y gestiona el estado de pedidos 24/7.",
        impact: ["80% consultas automatizadas", "Ventas +25%", "0€ en personal adicional"]
    },
    {
        id: 'inmobiliaria',
        title: "Fincas Mediterráneo",
        category: "Dashboard + CRM",
        img: "/images/projects/quantum-strat.png",
        description: "Panel de control para inmobiliaria local con seguimiento de propiedades y clientes.",
        tags: ["SmartSuite", "Make", "Portal Web"],
        className: "md:col-span-4 md:row-span-1 h-[300px] md:h-auto",
        challenge: "El equipo de 3 agentes usaba WhatsApp y notas en papel para seguir leads, perdiendo oportunidades por falta de organización.",
        solution: "Base de datos relacional con portal web para clientes, automatización de seguimientos y dashboard de métricas en tiempo real.",
        impact: ["Conversión +40%", "0 leads olvidados", "Visibilidad total del pipeline"]
    },
    {
        id: 'agencia-marketing',
        title: "Nómada Studio",
        category: "Flujos de Trabajo",
        img: "/images/projects/ethical-ia.png",
        description: "Automatización end-to-end desde briefing de cliente hasta entrega de assets.",
        tags: ["Notion", "Make", "Claude", "Slack"],
        className: "md:col-span-12 md:row-span-1 h-[350px] md:h-[400px]",
        challenge: "Agencia de 5 personas con proyectos caóticos: briefings perdidos en emails, entregas retrasadas y clientes frustrados.",
        solution: "Sistema de intake automático que genera tareas en Notion, asigna responsables, resume briefs con IA y notifica deadlines en Slack.",
        impact: ["Entregas a tiempo +60%", "Clientes más felices", "Equipo menos estresado"]
    }
];
