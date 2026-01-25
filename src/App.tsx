
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Contexts
import { BackgroundProvider } from './contexts/BackgroundContext';

// Layout Components
import SmoothScroll from './components/layout/SmoothScroll';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import PageTransition from './components/layout/PageTransition';

// Effects
import GlobalBackground from './components/layout/GlobalBackground';
import CustomCursor from './components/atoms/CustomCursor';
import NoiseOverlay from './components/atoms/NoiseOverlay';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectPage from './pages/ProjectPage';
import Methodology from './pages/Methodology';
import Community from './pages/Community';
import Contact from './pages/Contact';
import Services from './pages/Services';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';

// ScrollToTop Component to handle route changes
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const AppContent: React.FC = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const footerRef = useRef<HTMLDivElement>(null);
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!footerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setFooterHeight(entry.contentRect.height);
            }
        });
        resizeObserver.observe(footerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    return (
        <SmoothScroll>
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
                                <h1 className="text-4xl md:text-6xl font-display italic font-bold mb-4">
                                    GHP<span className="text-primary">.</span>
                                </h1>
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
                <Navbar />
                <ScrollToTop />

                {/* Main Content with Dynamic Bottom Margin for Sticky Footer Reveal */}
                <main
                    className="relative z-10 w-full"
                    style={{ marginBottom: footerHeight }}
                >
                    <div className="bg-[#030303] relative z-10 shadow-2xl min-h-screen">
                        <AnimatePresence mode="wait">
                            <Routes location={location}>
                                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                                <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
                                <Route path="/work/:id" element={<PageTransition><ProjectPage /></PageTransition>} />
                                <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                                <Route path="/methodology" element={<PageTransition><Methodology /></PageTransition>} />
                                <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
                                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                                <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
                                <Route path="/blog/:slug" element={<PageTransition><BlogPostPage /></PageTransition>} />
                                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                            </Routes>
                        </AnimatePresence>
                    </div>
                </main>

                {/* Sticky Footer (Fixed at bottom, revealed by scroll) */}
                <div
                    ref={footerRef}
                    className="fixed bottom-0 left-0 right-0 z-0 h-auto"
                >
                    <Footer />
                </div>
            </div>
        </SmoothScroll>
    );
};

const App: React.FC = () => {
    return (
        <BackgroundProvider>
            <Router>
                <AppContent />
            </Router>
        </BackgroundProvider>
    );
};

export default App;
