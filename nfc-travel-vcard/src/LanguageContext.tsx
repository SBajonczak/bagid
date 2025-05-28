import React, { createContext, useContext, useState } from 'react';
import { SupportedLang, getBrowserLanguage } from './i18n';

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
    const [lang, setLang] = useState<SupportedLang>(getBrowserLanguage());
    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};
