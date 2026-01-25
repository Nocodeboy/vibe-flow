import React from 'react';

import HeroVideoB from '../components/organisms/HeroVideoB';
import LearningModules from '../components/organisms/LearningModules';
import Testimonials from '../components/organisms/Testimonials';
import ComparisonSection from '../components/organisms/ComparisonSection';
import FAQSection from '../components/organisms/FAQSection';
import AboutSection from '../components/organisms/AboutSection';
import MembershipSection from '../components/organisms/MembershipSection';
import ContactSection from '../components/organisms/ContactSection';
import RoadmapSection from '../components/organisms/RoadmapSection';
import TargetAudienceSection from '../components/organisms/TargetAudienceSection';
import Footer from '../components/organisms/Footer';

import StackingProjects from '../components/organisms/StackingProjects';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const Home: React.FC = () => {
    const navigate = useNavigate();

    useSEO({
        title: 'Comunidad de IA y Automatización para Creadores Digitales',
        description: 'Aprende IA y automatización haciendo, no viendo videos. Sesiones en vivo, mentoría real, y acceso a proyectos de 2.000€-15.000€. Únete por $24/mes.',
        url: 'https://vibeflow.com/'
    });

    return (
        <div className="relative">
            {/* 1. Hero - Dual Purpose Entry */}
            <HeroVideoB />

            {/* 2. Community First - Who is this for? */}
            <TargetAudienceSection />

            {/* 3. Why Vibe Flow? - Comparison */}
            <ComparisonSection />

            {/* 4. Product (What you learn) - Moved UP force Interest */}
            <LearningModules />

            {/* 5. Authority (What we build) - Moved UP for Authority */}
            <StackingProjects onProjectClick={(p) => navigate(`/work/${p.id}`)} />

            {/* 6. Offer (Membership) */}
            <MembershipSection />

            {/* 7. Vision (Roadmap) - NEW */}
            <RoadmapSection />

            {/* 8. Social Proof - Testimonials */}
            <Testimonials />

            {/* 9. About the Founder */}
            <AboutSection />

            {/* 10. FAQ */}
            <FAQSection />

            {/* 11. Final CTA - Contact */}
            <ContactSection />


        </div>
    );
};

export default Home;
