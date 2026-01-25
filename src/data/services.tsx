import React from 'react';
import { Code, Zap, Database, Bot, Clock, Users, Shield } from 'lucide-react';

export interface Service {
    id: string;
    num: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
    features: string[];
    priceRange: string;
    color: string;
    details: {
        fullDesc: string;
        deliverables: string[];
        timeline: string;
        ideal: string;
    };
}

export interface ProcessStep {
    step: string;
    title: string;
    desc: string;
}

export interface Guarantee {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

export const services: Service[] = [
    {
        id: 'webdev',
        num: '01',
        icon: <Code size={ 28} />,
    title: "Desarrollo Web & Apps",
    desc: "Webs y aplicaciones modernas con diseño premium y rendimiento excepcional.",
    features: ["React / Next.js", "Diseño UI/UX", "PWA & Mobile"],
    priceRange: "3.000€ - 12.000€",
    color: "#98e710",
    details: {
        fullDesc: "Creamos experiencias digitales que convierten. Desde landing pages de alto impacto hasta aplicaciones web complejas con integraciones avanzadas. Diseño orientado a conversión con animaciones fluidas y rendimiento optimizado.",
        deliverables: ["Diseño UI/UX completo", "Desarrollo frontend React/Next.js", "Responsive & Mobile-first", "SEO técnico optimizado", "Hosting y despliegue", "Formación de uso"],
        timeline: "4-8 semanas",
        ideal: "Empresas que quieren diferenciarse con una presencia digital premium y profesional."
    }
    },
{
    id: 'automation-ai',
        num: '02',
            icon: <Zap size={ 28 } />,
    title: "Automatización & IA",
        desc: "Eliminamos tareas repetitivas y potenciamos tu negocio con inteligencia artificial.",
            features: ["Make / n8n", "OpenAI / Claude", "Workflows inteligentes"],
                priceRange: "2.500€ - 10.000€",
                    color: "#ffffff",
                        details: {
        fullDesc: "Combinamos automatización de procesos con inteligencia artificial para crear flujos de trabajo que ahorran tiempo y toman decisiones inteligentes. Desde sincronización de datos hasta procesamiento de documentos con IA.",
            deliverables: ["Auditoría de procesos actuales", "Diseño de flujos automatizados", "Integraciones con tus herramientas", "Modelos de IA personalizados", "Dashboard de monitoreo", "Documentación técnica"],
                timeline: "3-6 semanas",
                    ideal: "Negocios con tareas repetitivas que quieren escalar sin aumentar equipo."
    }
},
{
    id: 'crm',
        num: '03',
            icon: <Database size={ 28 } />,
    title: "CRMs y Bases de Datos",
        desc: "Sistemas de gestión personalizados que centralizan tu información y automatizan tu operativa.",
            features: ["Airtable / SmartSuite", "Interfaces personalizadas", "Paneles de métricas"],
                priceRange: "2.000€ - 5.000€",
                    color: "#98e710",
                        details: {
        fullDesc: "Diseñamos bases de datos relacionales que se adaptan a tu negocio, no al revés. Interfaces personalizadas para tu equipo, automatizaciones internas y paneles de control para tomar decisiones basadas en datos.",
            deliverables: ["Arquitectura de datos personalizada", "Interfaces de usuario intuitivas", "Automatizaciones internas", "Dashboards y reportes", "Migración de datos", "Formación del equipo"],
                timeline: "2-4 semanas",
                    ideal: "Equipos que gestionan información en Excel y necesitan profesionalizar sus procesos."
    }
},
{
    id: 'agents',
        num: '04',
            icon: <Bot size={ 28 } />,
    title: "Chatbots y Agentes IA",
        desc: "Asistentes virtuales inteligentes integrados en WhatsApp, web o tu CRM.",
            features: ["Vapi / Botpress", "WhatsApp Business API", "Entrenamiento personalizado"],
                priceRange: "4.000€ - 15.000€",
                    color: "#ffffff",
                        details: {
        fullDesc: "Creamos agentes conversacionales que entienden tu negocio. Desde chatbots de atención al cliente hasta asistentes de ventas que cualifican leads 24/7. Integrados en WhatsApp, tu web o cualquier plataforma.",
            deliverables: ["Diseño conversacional completo", "Desarrollo e integración del agente", "Entrenamiento con tus datos", "Conexión con tu CRM", "Panel de analíticas", "Optimización continua (1 mes)"],
                timeline: "4-6 semanas",
                    ideal: "Negocios con alto volumen de consultas o que quieren automatizar ventas."
    }
}
];

export const processSteps: ProcessStep[] = [
    { step: "01", title: "Análisis", desc: "Estudiamos tu negocio y diseñamos la solución perfecta." },
    { step: "02", title: "Diseño", desc: "Arquitectura técnica y flujos antes de implementar." },
    { step: "03", title: "Implementación", desc: "Construcción y despliegue con testing riguroso." },
    { step: "04", title: "Soporte", desc: "Acompañamiento post-lanzamiento y optimización." }
];

export const guarantees: Guarantee[] = [
    { icon: <Clock size={ 24} />, title: "2-4 Semanas", desc: "Entrega ágil" },
{ icon: <Users size={ 24 } />, title: "Sin Intermediarios", desc: "Trato directo" },
{ icon: <Shield size={ 24 } />, title: "30 Días Garantía", desc: "Sin coste extra" }
];
