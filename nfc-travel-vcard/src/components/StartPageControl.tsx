import React from 'react';
import { messages } from '../i18n';
import { useLanguage } from '../LanguageContext';

import FaqSection from './FaqSection';
import Testimonial from './Testimonial';

export interface StartPageControlProps {
    hidden: boolean;
}

const StartPageControl: React.FC<StartPageControlProps> = ({ hidden }) => {
    const { lang } = useLanguage();
    const t = messages[lang as keyof typeof messages].noDataSection;
    const t1 = messages[lang as keyof typeof messages].common;
    const testimoial = messages[lang].noDataSection.testimonials;
    return (
        <section hidden={hidden} className="w-full bg-gradient-to-br py-12 px-4 flex flex-col items-center">
            {/* Navigation */}
            {/* Hauptcontainer */}
            <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center p-6 md:p-12 gap-8">
                {/* Productbild-Bereich */}
                <div className="flex-1 flex justify-center items-stretch md:h-full">
                    <img
                        src="/assets/productimage.webp"
                        alt={`${t1.productname} Produktbild`}
                        className="w-full max-w-xs h-full object-contain rounded"
                        style={{ minHeight: '8rem' }}
                    />
                </div>

                {/* Textbereich */}
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 text-center md:text-left flex items-center gap-4">
                        <img
                            src="/assets/tag.png"
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
                        {/* Familienpack Highlight */}
                        <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full shadow-lg transform -rotate-2 animate-pulse">
                            <span className="text-sm font-bold uppercase tracking-wide">🔥 FAMILIENPACK ANGEBOT 🔥</span>
                        </div>
                        
                        {/* Preis-Anzeige */}
                        <div className="flex flex-col items-center md:items-start w-full md:w-auto mb-2">
                            <div className="text-center md:text-left mb-2">
                                <span className="text-lg font-semibold text-gray-700">3 Stück zum Preis von:</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-400 line-through text-lg">38,97&nbsp;€</span>
                                {(() => {
                                    const originalPrice = 38.97; // 3 × 12,99
                                    const familyPackPrice = 19.99;
                                    const discountPercent = Math.round(((originalPrice - familyPackPrice) / originalPrice) * 100);
                                    return (
                                        <>
                                            <span className="text-3xl font-bold text-green-600">
                                                {familyPackPrice.toFixed(2).replace('.', ',')}&nbsp;€
                                            </span>
                                            <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full animate-bounce">
                                                SPARE {discountPercent}%!
                                            </span>
                                        </>
                                    );
                                })()}
                            </div>
                            <div className="text-center md:text-left mt-1">
                                <span className="text-sm text-gray-600">Das sind nur {(19.99/3).toFixed(2).replace('.', ',')}&nbsp;€ pro Stück!</span>
                            </div>
                        </div>
                        <a
                            href="https://kreativschicht.de/cart/50710421668182:3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 text-center w-full md:w-auto relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                🚀 {t.cta} - FAMILIENPACK
                            </span>
                            <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                        </a>
                        <a
                            href="/5ea2a017-8976-4d28-a2c0-6c80395858a7"
                            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition text-center w-full md:w-auto mt-4"
                        >
                            {t.demoLinkText}
                        </a>
                        <p className="text-sm text-gray-600 mt-4 text-center">
                            * {t.disclaimer}
                        </p>

                    </div>
                </div>
            </div>


            <div id="faq" className="w-full max-w-7xl mt-12">
                <Testimonial testimonials={testimoial} />
            </div>
            {/* FAQ Section */}
            <div id="faq" className="w-full max-w-7xl mt-12">
                <FaqSection />
            </div>
        </section>
    );
};

export default StartPageControl;
