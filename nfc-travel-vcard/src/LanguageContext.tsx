import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { SupportedLang } from './i18n';

interface LanguageContextProps {
    lang: SupportedLang;
    setLang: (lang: SupportedLang) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
    lang: 'de',
    setLang: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const params = useParams<{ lang?: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Determine language from URL or default to 'de'
    const getLangFromUrl = (): SupportedLang => {
        const urlLang = params.lang;
        if (urlLang && ['de', 'en', 'nl', 'ko', 'ar', 'th'].includes(urlLang)) {
            return urlLang as SupportedLang;
        }
        return 'de';
    };
    
    const [lang, setLangState] = useState<SupportedLang>(getLangFromUrl());
    
    // Update language when URL changes
    useEffect(() => {
        const newLang = getLangFromUrl();
        if (newLang !== lang) {
            setLangState(newLang);
        }
    }, [params.lang]);
    
    // Function to change language by navigating to new route
    const setLang = (newLang: SupportedLang) => {
        const currentPath = location.pathname;
        const pathParts = currentPath.split('/').filter(Boolean);
        
        // Replace the language part of the URL
        if (pathParts.length > 0 && ['de', 'en', 'nl', 'ko', 'ar', 'th'].includes(pathParts[0])) {
            pathParts[0] = newLang;
        } else {
            pathParts.unshift(newLang);
        }
        
        const newPath = '/' + pathParts.join('/');
        navigate(newPath + location.search + location.hash);
    };
    
    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};
