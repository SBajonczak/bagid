'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { SupportedLang, getBrowserLanguage } from '@/lib/i18n';

/** Sprache aus der URL (/de/…, /en/…) – hat Vorrang vor Browser/LocalStorage. */
export function languageFromPath(pathname?: string | null): SupportedLang | undefined {
  const m = pathname?.match(/^\/(de|en)(\/|$)/);
  return m ? (m[1] as SupportedLang) : undefined;
}

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
  const routeLanguage = languageFromPath(usePathname());
  const fixedLanguage = initialLanguage || routeLanguage;
  const [language, setLanguageState] = useState<SupportedLang>(fixedLanguage || 'de');

  useEffect(() => {
    // Sprache aus Route/Layout hat Vorrang und wird gemerkt
    if (fixedLanguage) {
      setLanguageState(fixedLanguage);
      localStorage.setItem('preferred-language', fixedLanguage);
    } else {
      // Only check localStorage if no initialLanguage is provided
      const saved = localStorage.getItem('preferred-language') as SupportedLang;
      if (saved) {
        setLanguageState(saved);
      } else {
        // Detect browser language if no saved preference and no initial language
        const detected = getBrowserLanguage();
        setLanguageState(detected);
      }
    }
  }, [fixedLanguage]);

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
