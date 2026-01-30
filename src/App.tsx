import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Contexts
import { BackgroundProvider } from './contexts/BackgroundContext';

// Layout Components
import SmoothScroll from './components/layout/SmoothScroll';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import PageTransition from './components/layout/PageTransition';
import ErrorBoundary from './components/layout/ErrorBoundary';

// Effects
import GlobalBackground from './components/layout/GlobalBackground';
import CustomCursor from './components/atoms/CustomCursor';
import NoiseOverlay from './components/atoms/NoiseOverlay';
import CookieBanner from './components/molecules/CookieBanner';

// Hooks
import { useIsMobile } from './hooks/useIsMobile';

// Lazy loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const Methodology = lazy(() => import('./pages/Methodology'));
const Community = lazy(() => import('./pages/Community'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const LegalNotice = lazy(() => import('./pages/LegalNotice'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));

// Loading fallback component
const PageLoader: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/50 text-sm">Cargando...</p>
        </div>
    </div>
);

// ScrollToTop Component to handle route changes - Compatible with Lenis
const ScrollToTop = () => {
    const { pathname } = useLocation();
    const prevPathname = useRef<string>(pathname);

    useEffect(() => {
        // Solo hacer scroll si realmente cambió la ruta (no solo el hash)
        if (prevPathname.current !== pathname) {
            // Dar tiempo a que Lenis se inicialice y la página se renderice
            requestAnimationFrame(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
            });
            prevPathname.current = pathname;
        }
    }, [pathname]);
    return null;
};

const AppContent: React.FC = () => {
    const location = useLocation();
    // Loader solo aparece la primera vez por sesión
    const [isLoading, setIsLoading] = useState(() => {
        return !sessionStorage.getItem('app_loaded');
    });
    const footerRef = useRef<HTMLDivElement>(null);
    const [footerHeight, setFooterHeight] = useState(0);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('app_loaded', 'true');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    useEffect(() => {
        // Only track footer height on desktop for the sticky reveal effect
        if (isMobile || !footerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setFooterHeight(entry.contentRect.height);
            }
        });
        resizeObserver.observe(footerRef.current);
        return () => resizeObserver.disconnect();
    }, [isMobile]);

    return (
        <SmoothScroll>
            {/* Skip Link for Accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-black focus:rounded-lg focus:font-bold"
            >
                Saltar al contenido principal
            </a>
            <GlobalBackground />
            <NoiseOverlay />
            <div className="relative min-h-screen">
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            key="loader"
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                            exit={{
                                clipPath: 'circle(0% at 50% 50%)',
                                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center"
                            >
                                <p className="text-4xl md:text-6xl font-display italic font-bold mb-4" aria-hidden="true">
                                    GHP<span className="text-primary">.</span>
                                </p>
                                <div className="w-48 h-[1px] bg-white/20 mx-auto overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white"
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                    />
                                </div>
                                <p className="mt-4 text-[10px] tracking-[0.4em] text-white/50 uppercase">
                                    Developing Excellence
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <CustomCursor />
                <CookieBanner />
                <Navbar />
                <ScrollToTop />

                {/* Main Content with Dynamic Bottom Margin for Sticky Footer Reveal (desktop only) */}
                <main
                    id="main-content"
                    className="relative z-10 w-full"
                    style={{ marginBottom: isMobile ? 0 : footerHeight }}
                    tabIndex={-1}
                >
                    <div className="bg-[#030303] relative z-10 shadow-2xl min-h-screen">
                        <Suspense fallback={<PageLoader />}>
                            <AnimatePresence mode="wait">
                                <Routes location={location}>
                                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                                    <Route path="/proyectos" element={<PageTransition><Work /></PageTransition>} />
                                    <Route path="/proyectos/:id" element={<PageTransition><ProjectPage /></PageTransition>} />
                                    <Route path="/servicios" element={<PageTransition><Services /></PageTransition>} />
                                    <Route path="/metodologia" element={<PageTransition><Methodology /></PageTransition>} />
                                    <Route path="/comunidad" element={<PageTransition><Community /></PageTransition>} />
                                    <Route path="/nosotros" element={<PageTransition><About /></PageTransition>} />
                                    <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
                                    <Route path="/blog/:slug" element={<PageTransition><BlogPostPage /></PageTransition>} />
                                    <Route path="/contacto" element={<PageTransition><Contact /></PageTransition>} />
                                    <Route path="/contacto" element={<PageTransition><Contact /></PageTransition>} />
                                    <Route path="/aviso-legal" element={<PageTransition><LegalNotice /></PageTransition>} />
                                    <Route path="/politica-privacidad" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
                                    <Route path="/politica-cookies" element={<PageTransition><CookiePolicy /></PageTransition>} />
                                </Routes>
                            </AnimatePresence>
                        </Suspense>
                    </div>
                </main>

                {/* Footer - Fixed on desktop for sticky reveal, relative on mobile */}
                <div
                    ref={footerRef}
                    className={isMobile ? "relative z-10" : "fixed bottom-0 left-0 right-0 z-0 h-auto"}
                >
                    <Footer />
                </div>
            </div>
        </SmoothScroll>
    );
};

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <BackgroundProvider>
                <Router>
                    <AppContent />
                </Router>
            </BackgroundProvider>
        </ErrorBoundary>
    );
};

export default App;
