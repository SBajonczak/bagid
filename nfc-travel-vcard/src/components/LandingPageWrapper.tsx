import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { SupportedLang } from '../i18n';
import App from '../App';
import LanguageBanner from './LanguageBanner';

const LandingPageWrapper: React.FC = () => {
    const { lang: urlLang } = useParams<{ lang?: string }>();
    const { lang, setLang } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        // If we have a language in the URL, use it
        if (urlLang === 'de' || urlLang === 'en') {
            if (lang !== urlLang) {
                setLang(urlLang as SupportedLang);
                localStorage.setItem('preferred_language', urlLang);
            }
        } else if (urlLang) {
            // Invalid language code, redirect to default
            navigate('/de', { replace: true });
        }
        // For root path "/", language is handled by LanguageBanner and defaults to 'de'
    }, [urlLang, lang, setLang, navigate]);

    return (
        <>
            <App />
            {/* Show language banner only on root path */}
            <LanguageBanner />
        </>
    );
};

export default LandingPageWrapper;
