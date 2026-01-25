import React from 'react';
import { useSEO } from '../hooks/useSEO';

const PrivacyPolicy: React.FC = () => {
    useSEO({
        title: 'Política de Privacidad',
        description: 'Política de Privacidad y protección de datos de Vibe Flow.',
        url: 'https://vibeflow.es/politica-privacidad'
    });

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-[#030303] text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-display font-medium mb-12">Política de Privacidad</h1>

                <div className="space-y-8 text-white/70 leading-relaxed font-light">
                    <p className="text-lg">
                        En Vibe Flow, respetamos su información personal y en vista de cumplir con las políticas de seguridad respectivas concernientes a todo sitio web, informamos a ustedes lo siguiente.
                    </p>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">1. Responsable del Tratamiento</h2>
                        <p>
                            Los datos de carácter personal que se pudieran recabar directamente del interesado serán tratados de forma confidencial y quedarán incorporados a la correspondiente actividad de tratamiento titularidad de Vibe Flow.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">2. Finalidad</h2>
                        <p>
                            La finalidad del tratamiento de los datos corresponde a cada una de las actividades de tratamiento que realiza Vibe Flow y que están accesibles en el registro de actividades de tratamiento. En general, los datos se utilizan para:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li>Gestionar su registro como usuario en la plataforma.</li>
                            <li>Gestionar sus compras y solicitudes de servicios.</li>
                            <li>Atender sus consultas y solicitudes.</li>
                            <li>Enviar comunicaciones comerciales y promocionales, previo consentimiento.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">3. Legitimación</h2>
                        <p>
                            El tratamiento de sus datos se realiza para el cumplimiento de obligaciones legales por parte de Vibe Flow, para el cumplimiento de una misión realizada en interés público o en el ejercicio de poderes públicos conferidos a Vibe Flow, así como cuando la finalidad del tratamiento requiera su consentimiento, que habrá de ser prestado mediante una clara acción afirmativa.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">4. Conservación de datos</h2>
                        <p>
                            Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recaban y para determinar las posibles responsabilidades que se pudieran derivar de la finalidad, además de los períodos establecidos en la normativa de archivos y documentación.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">5. Comunicación de datos</h2>
                        <p>
                            Con carácter general no se comunicarán los datos personales a terceros, salvo obligación legal, entre las que pueden estar las comunicaciones al Defensor del Pueblo, Jueces y Tribunales, interesados en los procedimientos relacionados con la reclamaciones presentadas.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">6. Derechos de los interesados</h2>
                        <p>
                            Cualquier persona tiene derecho a obtener confirmación sobre los tratamientos que de sus datos que se llevan a cabo por Vibe Flow.
                        </p>
                        <p className="mt-4">
                            Puede ejercer sus derechos de acceso, rectificación, supresión y portabilidad de sus datos, de limitación y oposición a su tratamiento, así como a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado de sus datos, cuando procedan, ante Vibe Flow, a través de correo electrónico a <a href="mailto:contacto@vibeflow.es" className="text-primary hover:underline">contacto@vibeflow.es</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
