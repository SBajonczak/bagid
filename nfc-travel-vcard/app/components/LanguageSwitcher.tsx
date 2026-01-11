'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale, localeNames, localeFlags } from '@/lib/i18n-config';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] as Locale;
  const validLocale = i18n.locales.includes(currentLocale) ? currentLocale : i18n.defaultLocale;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === validLocale) {
      setIsOpen(false);
      return;
    }

    // Remove current locale from pathname and add new one
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Sprache wählen / Choose language"
      >
        <span className="text-xl">{localeFlags[validLocale]}</span>
        <span className="hidden sm:inline font-medium">{localeNames[validLocale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {i18n.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 transition-colors ${
                locale === validLocale ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <span className="text-xl">{localeFlags[locale]}</span>
              <span className="font-medium">{localeNames[locale]}</span>
              {locale === validLocale && (
                <svg className="w-5 h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
