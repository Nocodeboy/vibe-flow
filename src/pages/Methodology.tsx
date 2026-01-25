import React from 'react';
import LearningModules from '../components/organisms/LearningModules';
import Process from '../components/organisms/Process';
import { useSEO } from '../hooks/useSEO';

const Methodology: React.FC = () => {
    useSEO({
        title: 'Metodología',
        description: 'Descubre nuestra metodología de aprendizaje: módulos prácticos, sesiones en vivo y mentoría directa para dominar IA y automatización.',
        url: 'https://vibeflow.com/methodology'
    });

    return (
        <div className="pt-20">
            <LearningModules />
            <Process />
        </div>
    );
};

export default Methodology;

