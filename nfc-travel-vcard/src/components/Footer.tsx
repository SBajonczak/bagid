import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { messages } from '@/i18n';
import LanguageSelection from './LoginSection';

const Footer: React.FC = () => {
    const { lang } = useLanguage();
    const t = messages[lang];
        
    return (
        <div className="mt-10 py-4 text-center text-sm text-gray-600">
            <footer className="mt-4">
            <LanguageSelection />
                <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-4">
                        <Link to="/impressum" className="hover:text-gray-800 underline">
                            {t.impressum.title}
                        </Link>
                    </div>
                    <p>© {new Date().getFullYear()} Bag-Tag.de - {lang === 'de' ? 'Alle Rechte vorbehalten' : 'All rights reserved'}</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;