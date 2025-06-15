import React from 'react';
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
        <svg viewBox="0 0 640 480" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="640" height="160" fill="#AE1C28" />
            <rect y="160" width="640" height="160" fill="#FFF" />
            <rect y="320" width="640" height="160" fill="#21468B" />
        </svg>
    );

    const FlagKO = () => (
        <svg viewBox="0 0 640 480" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="640" height="480" fill="#FFF" />
            <circle cx="320" cy="240" r="80" fill="#C60C30" />
            <path d="M320,160 A80,80 0 0,0 320,320 A40,40 0 0,1 320,240 A40,40 0 0,0 320,160 Z" fill="#003478" />
            <g stroke="#000" strokeWidth="8">
                <path d="M400,160 L480,100 M420,140 L500,80 M440,120 L520,60" />
                <path d="M520,360 L440,420 M500,400 L420,460 M480,380 L400,440" />
                <path d="M160,320 L240,380 M140,340 L220,400 M120,360 L200,420" />
                <path d="M240,100 L160,160 M220,80 L140,140 M200,60 L120,120" />
            </g>
        </svg>
    );

    const FlagAR = () => (
        <svg viewBox="0 0 640 480" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="640" height="480" fill="#239F40" />
            <rect y="160" width="640" height="160" fill="#FFF" />
            <circle cx="320" cy="240" r="40" fill="none" stroke="#C8102E" strokeWidth="8" />
            <polygon points="320,200 340,220 360,200 340,240 320,220 300,240 300,220" fill="#C8102E" />
        </svg>
    );

    const FlagTH = () => (
        <svg viewBox="0 0 640 480" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="640" height="80" fill="#A51931" />
            <rect y="80" width="640" height="80" fill="#FFF" />
            <rect y="160" width="640" height="160" fill="#2D2A4A" />
            <rect y="320" width="640" height="80" fill="#FFF" />
            <rect y="400" width="640" height="80" fill="#A51931" />
        </svg>
    );

    const { lang, setLang } = useLanguage();

    const languages = [
        { code: 'de', flag: FlagDE, label: 'Deutsch' },
        { code: 'en', flag: FlagEN, label: 'English' },
        { code: 'nl', flag: FlagNL, label: 'Nederlands' },
        { code: 'ko', flag: FlagKO, label: '한국어' },
        { code: 'ar', flag: FlagAR, label: 'العربية' },
        { code: 'th', flag: FlagTH, label: 'ไทย' }
    ];

    return (
        <div className="flex items-center gap-2 flex-wrap justify-center">
            {languages.map(({ code, flag: Flag, label }) => (
                <button
                    key={code}
                    onClick={() => {
                        console.log(`Setting language to ${label}`);
                        if (typeof setLang === 'function') {
                            setLang(code as any);
                            console.log(`Language set to ${label}`);
                        } else {
                            console.error('setLang is not a function');
                        }
                    }}
                    className={`p-1 transition hover:scale-110 ${
                        lang === code ? 'opacity-100' : 'opacity-40'
                    }`}
                    aria-label={`Set language to ${label}`}
                    title={label}
                >
                    <Flag />
                </button>
            ))}
        </div>
    );
};

export default LanguageSelection;