/// <reference types="vite/client" />
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { messages } from '../i18n';

const NavigationBar: React.FC = () => {
    const { lang } = useLanguage();
    const t1 = messages[lang].common;
    const t2 = messages[lang].noDataSection;


    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 flex justify-between items-center z-50 md:flex">
            {/* Language selection with flags */}
            <div className="flex gap-2">
            {/* Add more flags as needed */}
            <span
                className="font-extrabold text-blue-800 tracking-wide drop-shadow-sm flex items-center text-[1.25rem] md:text-2xl"
            >
                <img
                    src={`${import.meta.env.BASE_URL}assets/icon_32_32.png`}
                    alt="Logo"
                    className="inline-block w-8 h-8 mr-2 align-middle flex-shrink-0"
                />
                <span className="hidden md:inline md:text-3xl whitespace-nowrap">
                    {t1.productname}
                </span>
                <span className="inline md:hidden text-[1rem] whitespace-nowrap">
                    {t1.productname}
                </span>
            </span>
            </div>
            <div className="flex-1 flex justify-center">
            <h1 className="font-bold px-4 py-2  text-md md:text-base text-center">
              
            </h1>
            </div>
            <ul className="hidden md:flex gap-4 ml-auto">
            <li><a href="#features" className="text-blue-700 font-bold hover:underline">{t1.features}</a></li>
            <li><a href="#faq" className="text-blue-700 font-bold hover:underline">{t1.faq}</a></li>
            </ul>
            {/* High-conversion "Buy Now" button */}
            <a
            href="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-green-600 transition ml-4"
            >
            {t2.cta}
            </a>
        </nav>
    );
};

export default NavigationBar;
