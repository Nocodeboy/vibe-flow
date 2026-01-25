import React from 'react';
import { useSEO } from '../hooks/useSEO';

const LegalNotice: React.FC = () => {
    useSEO({
        title: 'Aviso Legal',
        description: 'Aviso Legal y Condiciones de Uso de Vibe Flow.',
        url: 'https://vibeflow.es/aviso-legal'
    });

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-[#030303] text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-display font-medium mb-12">Aviso Legal</h1>

                <div className="space-y-8 text-white/70 leading-relaxed font-light">
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">1. Información General</h2>
                        <p>
                            En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Información y el Comercio Electrónico (LSSI-CE), se facilitan a continuación los siguientes datos de información general de este sitio web:
                        </p>
                        <p className="mt-4">
                            La titularidad de este sitio web, <span className="text-primary">vibeflow.es</span>, (en adelante, Sitio Web) la ostenta: <strong>Vibe Flow</strong>.
                        </p>
                        <p>
                            Email de contacto: <a href="mailto:contacto@vibeflow.es" className="text-primary hover:underline">contacto@vibeflow.es</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">2. Términos y Condiciones de Uso</h2>
                        <p>
                            El objeto de las condiciones: El Sitio Web. El objeto de las presentes Condiciones Generales de Uso (en adelante, Condiciones) es regular el acceso y la utilización del Sitio Web. A los efectos de las presentes Condiciones se entenderá como Sitio Web: la apariencia externa de los interfaces de pantalla, tanto de forma estática como de forma dinámica, es decir, el árbol de navegación; y todos los elementos integrados tanto en los interfaces de pantalla como en el árbol de navegación (en adelante, Contenidos) y todos aquellos servicios o recursos en línea que en su caso ofrezca a los Usuarios (en adelante, Servicios).
                        </p>
                        <p className="mt-4">
                            Vibe Flow se reserva la facultad de modificar, en cualquier momento, y sin aviso previo, la presentación y configuración del Sitio Web y de los Contenidos y Servicios que en él pudieran estar incorporados. El Usuario reconoce y acepta que en cualquier momento Vibe Flow pueda interrumpir, desactivar y/o cancelar cualquiera de estos elementos que se integran en el Sitio Web o el acceso a los mismos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">3. Propiedad Intelectual e Industrial</h2>
                        <p>
                            Vibe Flow por sí o como parte cesionaria, es titular de todos los derechos de propiedad intelectual e industrial del Sitio Web, así como de los elementos contenidos en el mismo (a título enunciativo y no exhaustivo, imágenes, sonido, audio, vídeo, software o textos, marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.). Serán, por consiguiente, obras protegidas como propiedad intelectual por el ordenamiento jurídico español, siéndoles aplicables tanto la normativa española y comunitaria en este campo, como los tratados internacionales relativos a la materia y suscritos por España.
                        </p>
                        <p className="mt-4">
                            Todos los derechos reservados. En virtud de lo dispuesto en la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Vibe Flow.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">4. Exclusión de Garantías y Responsabilidad</h2>
                        <p>
                            Vibe Flow no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">5. Legislación Aplicable y Jurisdicción</h2>
                        <p>
                            La relación entre Vibe Flow y el Usuario se regirá por la normativa vigente y de aplicación en el territorio español. De surgir cualquier controversia en relación a la interpretación y/o a la aplicación de estas Condiciones las partes someterán sus conflictos a la jurisdicción ordinaria sometiéndose a los jueces y tribunales que correspondan conforme a derecho.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LegalNotice;
