'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';

const isLocalePath = (pathname: string) => {
  return pathname.startsWith('/de/') || pathname === '/de' || pathname.startsWith('/en/') || pathname === '/en';
};

export default function LanguageSwitcher() {
  const pathname = usePathname() || '/';
  const { language, setLanguage } = useLanguage();

  if (isLocalePath(pathname)) {
    const rest = pathname.replace(/^\/(de|en)/, '');
    const dePath = `/de${rest || ''}`;
    const enPath = `/en${rest || ''}`;
    return (
      <div className="flex items-center gap-2">
        <Link href={dePath} className={`px-3 py-1 rounded ${pathname.startsWith('/de') ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} aria-label="Deutsch">
          DE
        </Link>
        <Link href={enPath} className={`px-3 py-1 rounded ${pathname.startsWith('/en') ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} aria-label="English">
          EN
        </Link>
      </div>
    );
  }

  // Non-locale paths (e.g., tag pages like /{tagId}) -> toggle context only
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('de')}
        className={`px-3 py-1 rounded ${language === 'de' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        aria-label="Deutsch"
      >
        DE
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
