'use client';
import React from 'react';
import { messages } from '@/lib/i18n';
import { useLanguage } from './LanguageProvider';

import FaqSection from './FaqSection';
import Testimonial from './Testimonial';

export interface StartPageControlProps {
    hidden: boolean;
}

const StartPageControl: React.FC<StartPageControlProps> = ({ hidden }) => {
    const { language: lang } = useLanguage();
    const t = messages[lang as keyof typeof messages].noDataSection;
    const t1 = messages[lang as keyof typeof messages].common;
    const testimonial = messages[lang].noDataSection.testimonials;
    return (
        <section hidden={hidden} className="w-full landing-background py-12 px-4 flex flex-col items-center">
            {/* Hero Section - Main Container */}
            <article className="w-full max-w-7xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 flex flex-col md:flex-row items-center p-6 md:p-12 gap-8 professional-card animate-fade-in-up">
                {/* Product Image Area */}
                <div className="flex-1 flex justify-center items-stretch md:h-full">
                    <img
                        src="/assets/productimage.webp"
                        alt="NFC Gepäckanhänger Bag-Tag am Koffer - Smart Travel Tag für sicheres Reisen"
                        className="w-full max-w-xs h-full object-contain rounded"
                        style={{ minHeight: '8rem' }}
                        loading="eager"
                        width="300"
                        height="300"
                    />
                </div>

                {/* Hero Text Area */}
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 text-center md:text-left flex items-center gap-4 professional-title">
                        <img
                            src="/assets/tag.png"
                            alt="Bag-Tag Logo"
                            className="w-16"
                            loading="eager"
                            width="64"
                            height="64"
                        />
                        {t.heroTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-6 text-center md:text-left break-words">
                        {t.heroSubtitle}
                    </p>
                    <ul id="features" className="mb-6 space-y-2 text-base text-gray-700">
                        {t.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3 feature-item">
                                <span className="inline-block w-6 h-6 text-blue-600 flex-shrink-0" role="img" aria-label={['NFC-Technologie', 'Daten aktualisieren', 'Reise', 'Versand', 'Sicherheit', 'Innovation', 'Weltweit'][idx]}>
                                    {['📱', '🔄', '✈️', '📦', '🔒', '💡', '🌍'][idx]}
                                </span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    {/* Call to Action */}
                    <div className="flex flex-col gap-4 w-full md:w-auto items-center mt-8">
                        {/* Price Display */}
                        <div className="flex flex-col items-center md:items-start w-full md:w-auto mb-2">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-3xl font-bold price-highlight">
                                    12,99&nbsp;€
                                </span>
                                <span className="text-sm text-gray-600">{t.pricePerPiece}</span>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                                    <div className="text-blue-900 font-semibold text-sm">
                                        {t.freeShipping}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Primary CTA */}
                        <a
                            href="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg text-center w-full md:w-auto primary-cta"
                            aria-label="Bag-Tag Travel Tag jetzt kaufen"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {t.cta} {t.ctaSecure}
                            </span>
                        </a>
                        
                        {/* Secondary Option */}
                        <div className="text-center">
                            <span className="text-sm text-gray-500 mb-2 block">{t.or}</span>
                            <a
                                href="https://kreativschicht.de/cart/50710421668182:1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow text-center inline-block secondary-cta"
                                aria-label="3er-Set Bag-Tag kaufen"
                            >
                                {t.ctaBundle}
                            </a>
                        </div>
                        <a
                            href="/5ea2a017-8976-4d28-a2c0-6c80395858a7"
                            className="bg-gray-100 text-blue-900 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-200 transition text-center w-full md:w-auto mt-4 border border-gray-300"
                            aria-label="Demo ansehen"
                        >
                            {t.demoLinkText}
                        </a>
                        <p className="text-sm text-gray-600 mt-4 text-center">
                            * {t.disclaimer}
                        </p>
                    </div>
                </div>
            </article>

            {/* How It Works Section */}
            <section className="w-full max-w-7xl mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 how-it-works-section">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">
                    {t.howItWorksTitle}
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    {t.howItWorksSubtitle}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {t.howItWorksSteps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">
                            <div className="step-number mb-4">{idx + 1}</div>
                            <div className="text-4xl mb-4">{['📦', '📱', '✈️', '🔔'][idx]}</div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="w-full max-w-7xl mt-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">
                    {t.benefitsTitle}
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    {t.benefitsSubtitle.replace('{productname}', t1.productname)}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {t.benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-md benefit-card">
                            <div className="text-4xl mb-4">{['📱', '🔋', '🌍', '🔒', '💧', '🔄'][idx]}</div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 text-sm">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="w-full max-w-7xl mt-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8">
                    {t.testimonialsTitle}
                </h2>
                <Testimonial testimonials={testimonial} />
            </section>
            {/* FAQ Section */}
            <section id="faq" className="w-full max-w-7xl mt-12">
                <FaqSection />
            </section>
        </section>
    );
};

export default StartPageControl;
