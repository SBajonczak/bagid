import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const LanguageBanner: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);
    const { setLang } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if user has already made a language choice
        const savedPreference = localStorage.getItem('preferred_language');
        const bannerDismissed = localStorage.getItem('language_banner_dismissed');
        
        // Only show banner if:
        // 1. User is on root path "/"
        // 2. No saved preference exists
        // 3. Banner hasn't been dismissed
        // 4. Browser language starts with "en"
        if (
            location.pathname === '/' &&
            !savedPreference &&
            !bannerDismissed &&
            navigator.language.toLowerCase().startsWith('en')
        ) {
            setShowBanner(true);
        }
    }, [location.pathname]);

    const handleSwitch = () => {
        localStorage.setItem('preferred_language', 'en');
        setLang('en');
        setShowBanner(false);
        navigate('/en');
    };

    const handleStay = () => {
        localStorage.setItem('preferred_language', 'de');
        localStorage.setItem('language_banner_dismissed', 'true');
        setShowBanner(false);
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
            <div className="bg-white rounded-lg shadow-2xl border border-blue-200 p-5">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-2xl">
                        🌍
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                            English version available
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            It looks like you prefer English. Would you like to switch to the English version?
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={handleSwitch}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors text-sm"
                            >
                                Switch to English
                            </button>
                            <button
                                onClick={handleStay}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-md transition-colors text-sm"
                            >
                                Stay in German
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LanguageBanner;
