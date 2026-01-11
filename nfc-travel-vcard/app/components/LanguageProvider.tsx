'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLang, getBrowserLanguage } from '@/lib/i18n';

interface LanguageContextType {
  language: SupportedLang;
  setLanguage: (lang: SupportedLang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'de',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: SupportedLang;
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLang>(initialLanguage || 'de');

  useEffect(() => {
    // Check localStorage for saved language preference
    const saved = localStorage.getItem('preferred-language') as SupportedLang;
    if (saved) {
      setLanguageState(saved);
    } else if (!initialLanguage) {
      // Detect browser language if no saved preference and no initial language
      const detected = getBrowserLanguage();
      setLanguageState(detected);
    }
  }, [initialLanguage]);

  const setLanguage = (lang: SupportedLang) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
