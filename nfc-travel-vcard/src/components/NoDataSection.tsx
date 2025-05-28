import React from 'react';
import { messages } from '../i18n';
import { useLanguage } from '../LanguageContext';
import bagtagImg from '../assets/bagtag.webp';
import logo from '../assets/tag.png';


export interface NoDataSectionProps {
    hidden: boolean;
}

const NoDataSection: React.FC<NoDataSectionProps> = ({ hidden }) => {
    const { lang } = useLanguage();
    const t = messages[lang].noDataSection;
    const t1 = messages[lang].common;

    return (
        <section hidden={hidden} className="w-full bg-gradient-to-br py-12 px-4 flex flex-col items-center">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center p-6 md:p-12 gap-8">
                {/* Text & CTA & Testimonials */}
                <div className="flex-1 flex flex-col items-center md:items-start">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 text-center md:text-left flex items-center gap-4">
                        <img
                            src={logo}
                            alt={`${t1.productname} Logo`}
                            className="w-16"
                            loading="lazy"
                        />
                        {t1.productname}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-6 text-center md:text-left break-words">
                        {t.subline}
                    </p>
                    <ul className="mb-6 space-y-2 text-base text-gray-800">
                        {t.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span className="inline-block w-6 h-6 text-blue-700">
                                    {['📱', '🔄', '✈️', '📦', '🔒', '💧', '🌍'][idx]}
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    {/* CTA */}
                    <div className="flex flex-col gap-4 w-full md:w-auto items-center">
                        <a
                            href="https://kreativschicht.de/products/nfc-kofferanhaenger-3er-set"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-green-600 transition text-center w-full md:w-auto"
                        >
                            {t.cta}
                        </a>
                        <p className="text-sm text-gray-600 mt-4 md:mt-0 text-center">
                            * Secure your luggage and travel worry-free with Bag Tag.
                        </p>
                    </div>



                </div>
                <div>
                    {/* Produktbild */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src={bagtagImg}
                            alt="Bag Tag Produkt"
                            className="w-64 h-auto object-contain drop-shadow-xl"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>


        </section>
    );
};

export default NoDataSection;
