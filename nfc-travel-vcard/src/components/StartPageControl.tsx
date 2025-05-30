import React from 'react';
import { messages } from '../i18n';
import { useLanguage } from '../LanguageContext';
import logo from '../assets/tag.png';
import product from '../assets/productimage.webp';
import FaqSection from './FaqSection';

export interface StartPageControlProps {
    hidden: boolean;
}

const StartPageControl: React.FC<StartPageControlProps> = ({ hidden }) => {
    const { lang } = useLanguage();
    const t = messages[lang as keyof typeof messages].noDataSection;
    const t1 = messages[lang as keyof typeof messages].common;

    return (
        <section hidden={hidden} className="w-full bg-gradient-to-br py-12 px-4 flex flex-col items-center">
            {/* Navigation */}
            {/* Hauptcontainer */}
            <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center p-6 md:p-12 gap-8">
                {/* Productbild-Bereich */}
                <div className="flex-1 flex justify-center items-stretch md:h-full">
                    <img
                        src={product}
                        alt={`${t1.productname} Produktbild`}
                        className="w-full max-w-xs h-full object-contain rounded"
                        style={{ minHeight: '8rem' }}
                    />
                </div>

                {/* Textbereich */}
                <div className="flex-1">
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
                    <ul id="features" className="mb-6 space-y-2 text-base text-gray-800">
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
                        {/* Preis-Anzeige */}
                        <div className="flex flex-col items-center md:items-start w-full md:w-auto mb-2">
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-400 line-through text-lg">12,99&nbsp;€</span>
                                {(() => {
                                    const originalPrice = 12.99;
                                    const discountedPrice = 10.99;
                                    const discountPercent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
                                    return (
                                        <>
                                            <span className="text-2xl font-bold text-green-600">
                                                {discountedPrice.toFixed(2).replace('.', ',')}&nbsp;€
                                            </span>
                                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
                                                -{discountPercent}%
                                            </span>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                        <a
                            href="https://kreativschicht.de/products/nfc-kofferanhaenger-3er-set"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-green-600 transition text-center w-full md:w-auto"
                        >
                            {t.cta}
                        </a>
                        <a
                            href="/demo"
                            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition text-center w-full md:w-auto mt-4"
                        >
                            {t.demoLinkText}
                        </a>
                        <p className="text-sm text-gray-600 mt-4 text-center">
                            * Secure your luggage and travel worry-free with Bag Tag.
                        </p>
                         
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div id="faq" className="w-full max-w-7xl mt-12">
                <FaqSection />
            </div>
        </section>
    );
};

export default StartPageControl;
