import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { SupportedLang } from '../i18n';

const LanguageSwitcher: React.FC = () => {
    const { lang, setLang } = useLanguage();
    const navigate = useNavigate();

    const handleLanguageChange = (newLang: SupportedLang) => {
        if (newLang === lang) return;
        
        // Save preference to localStorage
        localStorage.setItem('preferred_language', newLang);
        setLang(newLang);
        
        // Navigate to the appropriate route
        if (newLang === 'de') {
            navigate('/de');
        } else if (newLang === 'en') {
            navigate('/en');
        }
    };

    return (
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md px-3 py-2 border border-gray-200">
            <button
                onClick={() => handleLanguageChange('de')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    lang === 'de'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Switch to German"
            >
                DE
            </button>
            <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    lang === 'en'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Switch to English"
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
