import React from 'react';
import ContactSection from '../components/organisms/ContactSection';
import { useSEO } from '../hooks/useSEO';

const Contact: React.FC = () => {
    useSEO({
        title: 'Contacto',
        description: 'Contacta con Vibe Flow para consultas sobre proyectos de automatización, IA, o para unirte a nuestra comunidad.',
        url: 'https://vibeflow.es/contacto'
    });

    return (
        <div className="pt-20">
            <ContactSection />
        </div>
    );
};

export default Contact;

