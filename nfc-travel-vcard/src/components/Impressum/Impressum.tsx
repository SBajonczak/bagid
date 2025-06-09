import React from 'react';
import { useLanguage } from '../../LanguageContext';
import { messages } from '@/i18n';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';

const Impressum: React.FC = () => {
    const { lang } = useLanguage();
    const t = messages[lang];
        
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navigation */}
            <NavigationBar />

            {/* Main Content */}
            <main className="flex-grow pt-20"> {/* Add padding-top to account for fixed navigation */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            {t.impressum.title}
                        </h1>
                        
                        <div className="prose max-w-none">
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                    {t.impressum.legalNotice}
                                </h2>
                                <div className="text-gray-700 leading-relaxed">
                                    <p>
                                        {t.impressum.companyName}<br />
                                    </p>
                                </div>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                    {t.impressum.contact}
                                </h2>
                                <div className="text-gray-700 leading-relaxed">
                                    <p>
                                        {t.impressum.email}
                                    </p>
                                </div>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                    {t.impressum.responsibleContent}
                                </h2>
                                <div className="text-gray-700 leading-relaxed">
                                    <p>
                                        {t.impressum.companyName}
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Impressum;
