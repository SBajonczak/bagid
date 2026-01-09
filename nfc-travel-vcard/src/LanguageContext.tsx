import React, { createContext, useContext, useState } from 'react';
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
    const [lang, setLangState] = useState<SupportedLang>(() => {
        // Check for saved preference first
        const savedLang = localStorage.getItem('preferred_language') as SupportedLang;
        if (savedLang && ['de', 'en', 'nl', 'ko', 'ar', 'th'].includes(savedLang)) {
            return savedLang;
        }
        // Default to German for SEO (not browser detection)
        return 'de';
    });

    const setLang = (newLang: SupportedLang) => {
        setLangState(newLang);
        localStorage.setItem('preferred_language', newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};
