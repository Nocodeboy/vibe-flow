import React from 'react';
import CaseStudies from '../components/organisms/CaseStudies';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const Work: React.FC = () => {
    useSEO({
        title: 'Portfolio',
        description: 'Explora nuestros casos de éxito en automatización, CRMs, chatbots IA y desarrollo web. Proyectos reales con resultados medibles.',
        url: 'https://vibeflow.es/proyectos'
    });

    const navigate = useNavigate();

    return (
        <div className="pt-20">
            <CaseStudies
                fullView
                onBack={() => navigate('/')}
                onProjectClick={(p) => navigate(`/proyectos/${p.id}`)}
            />
        </div>
    );
};

export default Work;

