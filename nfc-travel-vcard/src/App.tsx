import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
                    <div>
                        <SeoMeta />
                        <NavigationBar />

                        {/* Video shown only when NOT authenticated */}
                        {!isAuthenticated && (
                            <div className="w-full flex justify-center bg-gradient-to-br py-6">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full max-w-7xl h-40 object-cover rounded shadow"
                                    style={{ height: '55vh', width: '100%' }}
                                    preload="auto"
                                    controls={false}
                                    disablePictureInPicture
                                    controlsList="nodownload noremoteplayback"
                                    aria-label="Bag Tag Produktdemonstration"
                                    title="Bag Tag Produktdemonstration">
                                    <source src="/assets/bagid-loop.mp4" type="video/mp4; codecs=avc1.4D401E,mp4a.40.2" />
                                    Dein Browser unterstützt keine eingebetteten Videos.
                                </video>
                            </div>
                        )}

                        <Header />
                        <MessageContainer message={''} type={'none'} />

                        {/* Show Dashboard when authenticated, StartPageControl when not */}
                       {isAuthenticated && (
                            <>
                                <Dashboard hidden={false} />
                            </>
                        )}

                        <StartPageControl hidden={false} />

                    </div>
                    <footer className="mt-10 py-4 text-center text-sm text-gray-600">
                        <p>© {new Date().getFullYear()} Bag-Tag.de - Alle Rechte vorbehalten</p>
                    </footer>
                </AuthProvider>
            </LanguageProvider>
        </HelmetProvider>
    );
};

export default App;