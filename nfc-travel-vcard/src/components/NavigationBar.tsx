/// <reference types="vite/client" />
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { messages } from '../i18n';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import authService from '../services/AuthService';
import { logger } from '@/utils/logger';

const NavigationBar: React.FC = () => {
    const { lang } = useLanguage();

    const t1 = messages[lang].common;
    const t2 = messages[lang].noDataSection;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState<string | undefined>('');

    // Check authentication status on component mount and when window gains focus
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const isAuth = authService.isAuthenticated();
                setIsAuthenticated(isAuth);

                if (isAuth) {
                    const user = authService.getCurrentUser();
                    if (user) {
                        setUserEmail(user.email);
                        logger.debug("NavigationBar: User is authenticated as:", user.email);
                    }
                }
            } catch (error) {
                logger.error("NavigationBar: Error checking authentication status:", error);
            }
        };



        // Initial check
        checkAuthStatus();

        // Listen for window focus events (useful after redirect)
        const handleFocus = () => {
            checkAuthStatus();
        };

        window.addEventListener('focus', handleFocus);

        // Clean up
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    // Handle login button click
    const handleLogin = async () => {
        try {
            setLoading(true);
            await authService.login();
        } catch (error) {
            logger.error("NavigationBar: Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle login button click
    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            logger.error("NavigationBar: Login error:", error);
        } finally {
        }
    };


    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 flex justify-between items-center z-50 md:flex">
            {/* Language selection with flags */}
            <div className="flex gap-2">
                {/* Add more flags as needed */}
                <span
                    className="font-extrabold text-blue-800 tracking-wide drop-shadow-sm flex items-center text-[1.25rem] md:text-2xl"
                >
                    <img
                        src={`${import.meta.env.BASE_URL}assets/icon_32_32.png`}
                        alt="Logo"
                        className="inline-block w-8 h-8 mr-2 align-middle flex-shrink-0"
                    />
                    <span className="hidden md:inline md:text-3xl whitespace-nowrap">
                        {t1.productname}
                    </span>
                    <span className="inline md:hidden text-[1rem] whitespace-nowrap">
                        {t1.productname}
                    </span>
                </span>
            </div>
            <div className="flex-1 flex justify-center">
                <h1 className="font-bold px-4 py-2  text-md md:text-base text-center">

                </h1>
            </div>
            <ul className="hidden md:flex gap-4 ml-auto">
                <li><a href="#features" className="text-blue-700 font-bold hover:underline">{t1.features}</a></li>
                <li><a href="#faq" className="text-blue-700 font-bold hover:underline">{t1.faq}</a></li>
            </ul>

            <div className="flex items-center gap-2">
                {/* High-conversion "Buy Now" button */}
                <a
                    href="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
                >
                    {t2.cta}
                </a>

                {/* User authentication button */}
                {loading ? (
                    <div className="w-8 h-8 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : isAuthenticated ? (


                    <button
                        onClick={handleLogout}
                        className="text-blue-700 flex items-center gap-1 ml-2"
                        title={t1.login || "Login"}
                        disabled={loading}
                    >
                        <FaUserCircle className="text-2xl" />
                        <span className="hidden md:inline font-bold">{userEmail ? userEmail : t1.dashboard}</span>
                    </button>

                ) : (
                    <button
                        onClick={handleLogin}
                        className="text-blue-700 flex items-center gap-1 ml-2"
                        title={t1.login || "Login"}
                        disabled={loading}
                    >
                        <FaUser className="text-2xl" />
                        <span className="hidden md:inline font-bold">{t1.login}</span>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
