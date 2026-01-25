import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetail from '../components/organisms/ProjectDetail';
import { projects } from '../data/projects';
import { useSEO } from '../hooks/useSEO';

const ProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const project = projects.find(p => p.id === id);

    useSEO({
        title: project?.title || 'Proyecto',
        description: project?.description || 'Caso de estudio detallado de un proyecto de Vibe Flow.',
        url: `https://vibeflow.com/work/${id}`
    });

    if (!project) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Proyecto no encontrado</h2>
                    <button onClick={() => navigate('/work')} className="text-primary underline">Volver al portfolio</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <ProjectDetail project={project} onBack={() => navigate('/work')} />
        </div>
    );
};

export default ProjectPage;

