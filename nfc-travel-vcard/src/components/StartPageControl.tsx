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
        <section hidden={hidden} className="w-full bg-gradient-to-br from-red-50 via-green-50 to-red-100 py-12 px-4 flex flex-col items-center christmas-background">
            {/* Navigation */}
            {/* Hauptcontainer */}
            <div className="w-full max-w-7xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200 flex flex-col md:flex-row items-center p-6 md:p-12 gap-8 christmas-card">
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
                    <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 mb-4 text-center md:text-left flex items-center gap-4 christmas-title">
                        <img
                            src="/assets/tag.png"
                            alt={`${t1.productname} Logo`}
                            className="w-16"
                            loading="lazy"
                        />
                        {t1.productname}
                        <span className="text-2xl">🎄</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-6 text-center md:text-left break-words">
                        {t.subline}
                    </p>
                    <ul id="features" className="mb-6 space-y-2 text-base text-red-800">
                        {t.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 christmas-feature">
                                <span className="inline-block w-6 h-6 text-red-600">
                                    {['📱', '🔄', '✈️', '📦', '🔒', '🎄', '🎁'][idx]}
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    {/* CTA */}
                    <div className="flex flex-col gap-4 w-full md:w-auto items-center">
                        {/* Weihnachts Sparpack Highlight */}
                        <div className="bg-gradient-to-r from-red-500 via-green-500 to-red-600 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 christmas-highlight animate-pulse">
                            <span className="text-sm font-bold uppercase tracking-wide">🎄 WEIHNACHTS SPARPACK 🎁</span>
                        </div>
                        
                        {/* Preis-Anzeige */}
                        <div className="flex flex-col items-center md:items-start w-full md:w-auto mb-2">
                            <div className="text-center md:text-left mb-3">
                                <span className="text-lg font-semibold text-red-700">🎁 3 Stück Weihnachts-Edition:</span>
                            </div>
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-gray-400 line-through text-lg">38,97&nbsp;€</span>
                                {(() => {
                                    const originalPrice = 38.97; // 3 × 12,99
                                    const christmasPackPrice = 19.99;
                                    const discountPercent = Math.round(((originalPrice - christmasPackPrice) / originalPrice) * 100);
                                    return (
                                        <>
                                            <span className="text-3xl font-bold text-red-700 christmas-price">
                                                {christmasPackPrice.toFixed(2).replace('.', ',')}&nbsp;€
                                            </span>
                                            <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full animate-bounce">
                                                🎄 -{discountPercent}%!
                                            </span>
                                        </>
                                    );
                                })()}
                            </div>
                            <div className="text-center md:text-left">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2 christmas-savings">
                                    <div className="text-red-800 font-bold text-lg">
                                        🎁 Du sparst {(38.97 - 19.99).toFixed(2).replace('.', ',')}&nbsp;€!
                                    </div>
                                    <div className="text-green-700 text-sm">
                                        Das sind nur {(19.99/3).toFixed(2).replace('.', ',')}&nbsp;€ pro Stück statt 12,99&nbsp;€
                                    </div>
                                </div>
                                <span className="text-sm text-red-600">🎄 Das perfekte Weihnachtsgeschenk für die Familie</span>
                            </div>
                        </div>
                        <a
                            href="https://kreativschicht.de/cart/50710421668182:1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-red-600 via-green-600 to-red-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:from-red-700 hover:via-green-700 hover:to-red-800 transition-all transform hover:scale-105 text-center w-full md:w-auto relative overflow-hidden christmas-cta"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                🎁 {t.cta} - WEIHNACHTS SPARPACK (3 Stück)
                            </span>
                            <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                        </a>
                        
                        {/* Einzelkauf Option */}
                        <div className="text-center">
                            <span className="text-sm text-red-400 mb-2 block">oder</span>
                            <a
                                href="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-green-600 via-red-500 to-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow hover:from-green-700 hover:via-red-600 hover:to-green-800 transition-all text-center inline-block"
                            >
                                🎄 Einzeln kaufen und Farbe selbst wählen (12,99&nbsp;€)
                            </a>
                        </div>
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
