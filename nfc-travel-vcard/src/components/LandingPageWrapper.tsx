import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import App from '../App';
import LanguageBanner from './LanguageBanner';

const LandingPageWrapper: React.FC = () => {
    const location = useLocation();
    const { lang, setLang } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        // Extract language from pathname
        const path = location.pathname;
        
        if (path === '/de') {
            if (lang !== 'de') {
                setLang('de');
                localStorage.setItem('preferred_language', 'de');
            }
        } else if (path === '/en') {
            if (lang !== 'en') {
                setLang('en');
                localStorage.setItem('preferred_language', 'en');
            }
        }
        // For root path "/", language defaults to 'de' and is handled by LanguageBanner
    }, [location.pathname, lang, setLang, navigate]);

    return (
        <>
            <App />
            {/* Show language banner only on root path */}
            <LanguageBanner />
        </>
    );
};

export default LandingPageWrapper;
