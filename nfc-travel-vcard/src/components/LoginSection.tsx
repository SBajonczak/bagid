import React from 'react';
import { messages } from '../i18n';
import { useLanguage } from '../LanguageContext';


const LanguageSelection: React.FC = () => {


    const FlagDE = () => (
        <svg viewBox="0 0 640 480" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="640" height="160" fill="#000" />
            <rect y="160" width="640" height="160" fill="#D00" />
            <rect y="320" width="640" height="160" fill="#FFCE00" />
        </svg>
    );

    const FlagEN = () => (
        <svg viewBox="0 0 60 30" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="30" fill="#012169" />
            <path fill="#FFF" d="M0,0 60,30M60,0 0,30M25,0v30M0,15h60" stroke="#fff" strokeWidth="6" />
            <path fill="#C8102E" d="M0,0 60,30M60,0 0,30M25,0v30M0,15h60" stroke="#C8102E" strokeWidth="4" />
        </svg>
    );

    const FlagNL = () => (
        <svg viewBox="0 0 3 2" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="3" height="2" fill="#fff" />
            <rect width="3" height="0.666" fill="#21468b" y="1.333" />
            <rect width="3" height="0.666" fill="#ae1c28" />
        </svg>
    );

    const FlagFR = () => (
        <svg viewBox="0 0 3 2" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="1" height="2" fill="#0055a4" />
            <rect x="1" width="1" height="2" fill="#fff" />
            <rect x="2" width="1" height="2" fill="#ef4135" />
        </svg>
    );
    const FlagBE = () => (
        <svg viewBox="0 0 3 2" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="1" height="2" fill="#000" />
            <rect x="1" width="1" height="2" fill="#ffd90c" />
            <rect x="2" width="1" height="2" fill="#ef3340" />
        </svg>
    );
    const { lang, setLang } = useLanguage();

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={() => setLang('de')}
                className={`p-1 transition hover:scale-110 ${lang === 'de' ? 'opacity-100' : 'opacity-40'
                    }`}
                aria-label="Sprache auf Deutsch setzen"
            >
                <FlagDE />
            </button>
            <button
                onClick={() => setLang('en')}
                className={`p-1 transition hover:scale-110 ${lang === 'en' ? 'opacity-100' : 'opacity-40'
                    }`}
                aria-label="Set language to English"
            >
                <FlagEN />
            </button>


              <button
                onClick={() => setLang('nl')}
                className={`p-1 transition hover:scale-110 ${lang === 'en' ? 'opacity-100' : 'opacity-40'
                    }`}
                aria-label="Set language to Netherlands"
            >
                <FlagNL />
            </button>

              <button
                onClick={() => setLang('be')}
                className={`p-1 transition hover:scale-110 ${lang === 'en' ? 'opacity-100' : 'opacity-40'
                    }`}
                aria-label="Set language to Belgium"
            >
                <FlagBE />
            </button>
        </div>
    );
};

export default LanguageSelection;