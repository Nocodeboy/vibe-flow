import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import { projects as projectsData, Project } from '../../data/projects';
import { EASE_ELITE } from '../../styles/animation';
import { Magnetic } from '../atoms/Magnetic';

// Extended project type with additional display properties
interface DisplayProject extends Project {
    year: string;
    color: string;
}

// Map projects with premium colors and years
const projects: DisplayProject[] = projectsData.map((p, i) => ({
    ...p,
    year: '2026',
    color: ['#98e710', '#6366f1', '#ec4899', '#3b82f6'][i % 4]
}));

interface ProjectCardProps {
    project: DisplayProject;
    index: number;
    range: [number, number];
    targetScale: number;
    progress: MotionValue<number>;
    onProjectClick: (project: DisplayProject) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, range, targetScale, progress, onProjectClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useScroll({
        target: containerRef,
        offset: ['start end', 'start start']
    });

    const scale = useTransform(progress, range, [1, targetScale]);

    // Smooth 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        // Disable 3D tilt on mobile for performance
        if (window.innerWidth < 768) return;

        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        const distance = { x: clientX - center.x, y: clientY - center.y };

        // Tilt intensity
        x.set(distance.x / 40);
        y.set(distance.y / -40);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Keyboard support for accessibility
    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onProjectClick(project);
        }
    }

    // Dynamic rotation based on physics
    const rotateX = mouseY;
    const rotateY = mouseX;

    // Scroll Parallax for Image
    const imageY = useTransform(progress, range, ['0%', '15%']);

    return (
        <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 perspective-1000">
            <motion.div
                style={{
                    scale,
                    top: `calc(-5vh + ${index * 25}px)`
                }}
                className="relative flex flex-col items-center"
            >
                <motion.div
                    role="button"
                    tabIndex={0}
                    aria-label={`Ver proyecto ${project.title}`}
                    onClick={() => onProjectClick(project)}
                    onKeyDown={handleKeyDown}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d"
                    }}
                    className="relative w-[90vw] md:w-[85vw] max-w-[1100px] aspect-[4/5] md:aspect-auto md:h-[600px] bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 overflow-hidden group hover:border-white/10 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] transition-all duration-500 cursor-pointer"
                >
                    {/* Dynamic Colored Shadow / Glow */}
                    <motion.div
                        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-[100px]"
                        style={{ background: project.color }}
                    />

                    {/* Holographic Glare */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    800px circle at ${mouseX}px ${mouseY}px,
                                    rgba(255, 255, 255, 0.1),
                                    transparent 80%
                                )
                            `
                        }}
                    />

                    {/* Image Layer with Scroll Parallax */}
                    <motion.div
                        className="absolute inset-0 z-0 overflow-hidden"
                        style={{ transform: "translateZ(-20px) scale(1.1)" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-transparent to-transparent z-10" />

                        <motion.img
                            style={{ y: imageY }}
                            src={project.img}
                            alt={`Captura de pantalla del proyecto ${project.title}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        />
                    </motion.div>

                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                    {/* Content */}
                    <div className="relative z-20 h-full p-8 md:p-14 flex flex-col justify-between" style={{ transform: "translateZ(40px)" }}>

                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                                <Badge variant="glass" size="sm" className="backdrop-blur-xl bg-white/5 border-white/10">
                                    {project.category}
                                </Badge>
                                {project.tags.slice(0, 2).map((tag: string) => (
                                    <span key={tag} className="hidden md:inline-flex px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-white/40 border border-white/5 bg-black/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-5xl font-display font-bold text-white/10 italic outline-text">
                                0{index + 1}
                            </span>
                        </div>

                        {/* Footer Info */}
                        <div className="max-w-2xl overflow-hidden">
                            <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.8, ease: EASE_ELITE }}
                                className="text-3xl md:text-6xl font-display italic font-bold text-white mb-4 md:mb-6 leading-[0.9] tracking-tight group-hover:text-primary transition-colors duration-300"
                            >
                                {project.title}
                            </motion.h3>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8, ease: EASE_ELITE }}
                                className="flex items-center gap-6"
                            >
                                <p className="text-white/60 text-sm md:text-base line-clamp-2 max-w-lg hidden md:block group-hover:text-white/80 transition-colors">
                                    {project.description}
                                </p>
                                <Magnetic>
                                    <Button
                                        variant="primary"
                                        className="rounded-full px-6 md:px-8 py-3 md:py-4 bg-white text-black hover:bg-primary whitespace-nowrap opacity-100 translate-y-0 text-sm md:text-base md:opacity-100 md:translate-y-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                                        icon={<ArrowUpRight size={18} />}
                                    >
                                        Ver Caso
                                    </Button>
                                </Magnetic>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

interface StackingProjectsProps {
    onProjectClick: (project: Project) => void;
}

const StackingProjects: React.FC<StackingProjectsProps> = ({ onProjectClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <section className="bg-[#030303] relative pt-20" id="projects">
            {/* Header */}
            <div className="container mx-auto px-6 mb-24 text-center">
                <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                    Selected Work
                </span>
                <h2 className="text-5xl md:text-8xl font-display italic font-bold text-white leading-[0.85] tracking-tighter">
                    Proyectos <br /> <span className="text-white/20">Destacados</span>
                </h2>
            </div>

            {/* Stacking Cards Container */}
            <div ref={containerRef} className="relative pb-[20vh]">
                {projects.map((project, index) => {
                    // Calculate scale for stacking effect
                    const targetScale = 1 - ((projects.length - index) * 0.05);
                    return (
                        <MemoizedProjectCard
                            key={project.id}
                            index={index}
                            project={project}
                            onProjectClick={onProjectClick}
                            range={[index * 0.25, 1]}
                            targetScale={targetScale}
                            progress={scrollYProgress}
                        />
                    );
                })}
            </div>

            {/* View All Button */}
            <div className="flex justify-center pb-32">
                <Button variant="outline" size="lg" className="rounded-full border-white/10 hover:bg-white/5 text-white/60 hover:text-white px-10">
                    Ver Todos los Proyectos
                </Button>
            </div>
        </section>
    );
};

// Memoize ProjectCard to prevent unnecessary re-renders
const MemoizedProjectCard = memo(ProjectCard, (prevProps, nextProps) => {
    return (
        prevProps.project.id === nextProps.project.id &&
        prevProps.index === nextProps.index &&
        prevProps.targetScale === nextProps.targetScale
    );
});

export default memo(StackingProjects);
