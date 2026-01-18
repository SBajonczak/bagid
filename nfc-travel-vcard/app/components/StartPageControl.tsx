'use client';
import React from 'react';
import { messages } from '@/lib/i18n';
import { useLanguage } from './LanguageProvider';
// Icons wirken deutlich professioneller als Emojis für ein Tech-Produkt
import { Package, Smartphone, Plane, Bell, BatteryCharging, Globe, Lock, Droplets, RefreshCw, CreditCard } from 'lucide-react';

import FaqSection from './FaqSection';
import Testimonial from './Testimonial';
import Script from 'next/script'; // Für SEO Structured Data

export interface StartPageControlProps {
    hidden: boolean;
}

const StartPageControl: React.FC<StartPageControlProps> = ({ hidden }) => {
    const { language: lang } = useLanguage();
    const t = messages[lang as keyof typeof messages].noDataSection;
    const t1 = messages[lang as keyof typeof messages].common;
    const testimonial = messages[lang].noDataSection.testimonials;

    // Mapping von Icons statt Emojis
    const howItWorksIcons = [Package, Smartphone, Plane, Bell];
    const benefitIcons = [Smartphone, BatteryCharging, Globe, Lock, Droplets, RefreshCw];

    // SEO: Structured Data für das Produkt und FAQs
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: t1.productname,
        description: t.howItWorksSubtitle,
        offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price: '10.99',
            availability: 'https://schema.org/InStock',
        },
        // FAQ Schema hilft extrem bei Google Snippets
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Batterie notwendig?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Nein, das Produkt nutzt NFC und benötigt nie eine Batterie.'
                }
            }
        ]
    };

    return (
        <section hidden={hidden} className="w-full landing-background py-12 px-4 flex flex-col items-center">
            {/* SEO Script injection */}
            <Script
                id="startpage-product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* How It Works Section */}
            <section className="w-full max-w-7xl mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 how-it-works-section relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div> {/* Design Akzent */}
                
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">
                    {t.howItWorksTitle}
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    {t.howItWorksSubtitle}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {t.howItWorksSteps.map((step, idx) => {
                        const Icon = howItWorksIcons[idx] || Package;
                        return (
                            <div key={idx} className="flex flex-col items-center text-center group">
                                <div className="step-number mb-4 bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center">
                                    {idx + 1}
                                </div>
                                <div className="p-4 bg-gray-50 rounded-full mb-4 group-hover:bg-blue-50 transition-colors">
                                    <Icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* NEU: "The Offer" Highlight - Beruhigt den Kunden bzgl. Kosten */}
            <section className="w-full max-w-4xl mt-12 mb-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4">
                    <div className="p-3 bg-green-100 rounded-full">
                        <CreditCard className="w-8 h-8 text-green-700" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-green-900">Einmal zahlen, für immer nutzen</h3>
                        <p className="text-green-800 text-sm">Kein Abo. Keine versteckten Kosten. Keine leeren Batterien.</p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="features" className="w-full max-w-7xl mt-8 scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">
                    {t.benefitsTitle}
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    {t.benefitsSubtitle.replace('{productname}', t1.productname)}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {t.benefits.map((benefit, idx) => {
                        const Icon = benefitIcons[idx] || Smartphone;
                        return (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-md benefit-card hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="mb-4">
                                    <Icon className="w-10 h-10 text-blue-500" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
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
            <section id="faq" className="w-full max-w-7xl mt-12 mb-20"> {/* mb-20 für etwas Luft unten */}
                <FaqSection />
            </section>
        </section>
    );
};

export default StartPageControl;