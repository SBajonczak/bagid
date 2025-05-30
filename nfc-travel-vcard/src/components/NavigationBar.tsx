import React from 'react';
import { useLanguage } from '../LanguageContext';
import { messages } from '../i18n';
import LanguageSelection from './LoginSection';

const NavigationBar: React.FC = () => {
    const { lang } = useLanguage();
    const t1 = messages[lang].common;


    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 flex justify-between items-center z-50">
            {/* Language selection with flags */}
            <div className="flex gap-2">
                <LanguageSelection/>
                {/* Add more flags as needed */}
            </div>
            <div className="flex-1 flex justify-center">
                <span className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg shadow animate-pulse text-sm md:text-base text-center">
                    {t1.offerText}
                </span>
            </div>
            <ul className="flex gap-4 ml-auto">
                <li><a href="#features" className="text-blue-700 font-bold hover:underline">{t1.features}</a></li>
                <li><a href="#faq" className="text-blue-700 font-bold hover:underline">{t1.faq}</a></li>
            </ul>
            {/* High-conversion "Buy Now" button */}
            <a
                href="https://kreativschicht.de/products/nfc-kofferanhaenger-3er-set"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-green-600 transition ml-4"
            >
                Buy Now
            </a>
        </nav>
    );
};

export default NavigationBar;
