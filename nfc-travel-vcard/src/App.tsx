import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import MessageContainer from './components/MessageContainer';
import StartPageControl from './components/StartPageControl';
import { LanguageProvider } from './LanguageContext';
import { AuthProvider } from './AuthContext';
import SeoMeta from './components/SeoMeta';
import NavigationBar from './components/NavigationBar';
import Dashboard from './components/Dashboard';
import authService from './services/AuthService';
import { logger } from './utils/logger';
import Footer from './components/Footer';



const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const isAuth = authService.isAuthenticated();
                setIsAuthenticated(isAuth);
                logger.debug("App: User is authenticated:", isAuth);
            } catch (error) {
                logger.error('Error checking authentication status:', error);
            }
        };



        // Initial check
        checkAuthStatus();

        // Listen for window focus events (useful after redirect)
        const handleFocus = () => {
            checkAuthStatus();
        };

        window.addEventListener('focus', handleFocus);

        // Also listen for auth_state_changed events
        const handleAuthChange = () => {
            logger.debug("App: Auth state change detected, rechecking...");
            checkAuthStatus();
        };

        window.addEventListener('auth_state_changed', handleAuthChange);

        // Clean up
        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('auth_state_changed', handleAuthChange);
        };
    }, []);

    // Debug output to verify state
    useEffect(() => {
        logger.debug("App: Authentication state changed to:", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <HelmetProvider>
            <LanguageProvider>
                <AuthProvider>
                    <>
                        <SeoMeta />
                        <NavigationBar />

                        {/* Video header shown only when NOT authenticated */}
                        {!isAuthenticated && (
                            <header className="w-full flex justify-center bg-gradient-to-br py-6">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full max-w-7xl h-40 object-cover rounded shadow"
                                    style={{ height: '55vh', width: '100%' }}
                                    preload="metadata"
                                    controls={false}
                                    disablePictureInPicture
                                    controlsList="nodownload noremoteplayback"
                                    aria-label="Bag Tag Produktdemonstration"
                                    title="Bag Tag Produktdemonstration"
                                    width="1920"
                                    height="1080">
                                    <source src="/assets/bagid-loop.mp4" type="video/mp4; codecs=avc1.4D401E,mp4a.40.2" />
                                    Dein Browser unterstützt keine eingebetteten Videos.
                                </video>
                            </header>
                        )}

                        <Header />
                        <MessageContainer message={''} type={'none'} />

                        {/* Main content area */}
                        <main>
                            {/* Show Dashboard when authenticated, StartPageControl when not */}
                            {isAuthenticated && (
                                <Dashboard hidden={false} />
                            )}

                            <StartPageControl hidden={false} />
                        </main>

                        <Footer/>
                    </>
                </AuthProvider>
            </LanguageProvider>
        </HelmetProvider>
    );
};

export default App;