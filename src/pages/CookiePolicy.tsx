import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Shield, Settings, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const CookiePolicy: React.FC = () => {
    useSEO({
        title: 'Política de Cookies',
        description: 'Información sobre el uso de cookies en vibeflow.es. Conoce qué cookies utilizamos, para qué sirven y cómo gestionarlas.',
        url: 'https://vibeflow.es/politica-cookies'
    });

    const sections = [
        {
            icon: <Cookie size={24} />,
            title: '¿Qué son las cookies?',
            content: `Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.`
        },
        {
            icon: <Settings size={24} />,
            title: 'Cookies que utilizamos',
            content: `En vibeflow.es utilizamos los siguientes tipos de cookies:

**Cookies esenciales (siempre activas)**
- Preferencias de consentimiento de cookies
- Almacenamiento de sesión

**Cookies de análisis (requieren consentimiento)**
- Google Analytics (GA4): Para entender cómo los visitantes interactúan con nuestro sitio, qué páginas visitan y cuánto tiempo permanecen. Esta información nos ayuda a mejorar la experiencia del usuario.`
        },
        {
            icon: <BarChart3 size={24} />,
            title: 'Google Analytics',
            content: `Utilizamos Google Analytics 4 para recopilar información anónima sobre el uso de nuestro sitio web. Las cookies de Google Analytics recogen información como:

- Número de visitantes
- Páginas visitadas
- Tiempo de permanencia
- Origen del tráfico
- Dispositivo y navegador utilizado

Toda la información recopilada es anónima y agregada. No recopilamos ni almacenamos información personal identificable a través de estas cookies.

**Anonimización de IP:** Hemos configurado Google Analytics para anonimizar las direcciones IP.`
        },
        {
            icon: <Shield size={24} />,
            title: 'Gestión de cookies',
            content: `Cuando visitas nuestro sitio por primera vez, te mostramos un banner que te permite:

- **Aceptar todas las cookies**: Incluye cookies de análisis
- **Rechazar cookies opcionales**: Solo se mantienen las cookies esenciales

Puedes cambiar tu preferencia en cualquier momento eliminando las cookies de tu navegador y visitando de nuevo nuestro sitio.

También puedes configurar tu navegador para bloquear o eliminar cookies. Consulta la ayuda de tu navegador para más información.`
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Volver al inicio</span>
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <Cookie size={16} className="text-primary" />
                        <span className="text-xs text-primary font-bold uppercase tracking-wider">
                            Política de Cookies
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display italic font-bold mb-6">
                        Cookies & <span className="text-white/30">Privacidad</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-2xl">
                        En cumplimiento del artículo 22.2 de la Ley 34/2002, de 11 de julio,
                        de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE),
                        te informamos sobre el uso de cookies en nuestro sitio web.
                    </p>
                    <p className="text-white/30 text-sm mt-4">
                        Última actualización: 30 de enero de 2026
                    </p>
                </motion.div>

                {/* Content Sections */}
                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <motion.section
                            key={section.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="relative pl-8 border-l border-white/10"
                        >
                            <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {section.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4 pl-4">
                                {section.title}
                            </h2>
                            <div className="text-white/50 leading-relaxed whitespace-pre-line pl-4">
                                {section.content.split('**').map((part, i) =>
                                    i % 2 === 1 ? (
                                        <strong key={i} className="text-white/70">{part}</strong>
                                    ) : (
                                        <span key={i}>{part}</span>
                                    )
                                )}
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 p-8 bg-white/[0.02] border border-white/10 rounded-2xl"
                >
                    <h2 className="text-xl font-bold text-white mb-4">¿Tienes preguntas?</h2>
                    <p className="text-white/50 mb-4">
                        Si tienes alguna pregunta sobre nuestra política de cookies o el tratamiento
                        de tus datos, no dudes en contactarnos.
                    </p>
                    <a
                        href="mailto:contacto@vibeflow.es"
                        className="text-primary hover:underline font-medium"
                    >
                        contacto@vibeflow.es
                    </a>
                </motion.div>

                {/* Related Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-12 flex flex-wrap gap-4"
                >
                    <Link
                        to="/politica-privacidad"
                        className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                        Política de Privacidad →
                    </Link>
                    <Link
                        to="/aviso-legal"
                        className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                        Aviso Legal →
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default CookiePolicy;
