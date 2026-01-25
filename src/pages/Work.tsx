import React from 'react';
import CaseStudies from '../components/organisms/CaseStudies';
import { useNavigate } from 'react-router-dom';

const Work: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-20">
            <CaseStudies
                fullView
                onBack={() => navigate('/')}
                onProjectClick={(p) => navigate(`/work/${p.id}`)}
            />
        </div>
    );
};

export default Work;

