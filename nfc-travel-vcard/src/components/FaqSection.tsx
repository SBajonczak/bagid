import React from 'react';
import { messages } from '../i18n';
import { useLanguage } from '../LanguageContext';

const FaqSection: React.FC = () => {
    const { lang } = useLanguage();
    const faq = messages[lang].faq;

    return (
        <section className="w-full bg-white py-12 px-4 flex flex-col items-center border rounded-xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">
                {faq.title}
            </h2>
            <div className="max-w-4xl w-full space-y-6">
                {faq.questions.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-blue-800 mb-2">
                            {item.question}
                        </h3>
                        <p className="text-gray-700">{item.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FaqSection;
