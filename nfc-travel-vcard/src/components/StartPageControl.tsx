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
                        {lang === 'de' ? 'NFC Gepäckanhänger für sicheres Reisen' : lang === 'en' ? 'NFC Luggage Tag for Safe Travel' : 'NFC Bagagelabel voor Veilig Reizen'}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-6 text-center md:text-left break-words">
                        {lang === 'de' ? 'Smarter Kofferanhänger mit NFC & QR-Code – nie wieder Gepäck verlieren' : lang === 'en' ? 'Smart luggage tag with NFC & QR code – never lose your baggage again' : 'Slimme bagagelabel met NFC & QR-code – verlies nooit meer uw bagage'}
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
                                <span className="text-sm text-gray-600">pro Stück</span>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                                    <div className="text-blue-900 font-semibold text-sm">
                                        ✓ Kostenloser Versand ab 2 Stück
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
                                {t.cta} – Travel Tag sichern
                            </span>
                        </a>
                        
                        {/* Secondary Option */}
                        <div className="text-center">
                            <span className="text-sm text-gray-500 mb-2 block">oder</span>
                            <a
                                href="https://kreativschicht.de/cart/50710421668182:1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow text-center inline-block secondary-cta"
                                aria-label="3er-Set Bag-Tag kaufen"
                            >
                                3er-Set kaufen und sparen
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
                    Wie es funktioniert
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    In nur wenigen Schritten zu mehr Sicherheit auf Reisen
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="step-number mb-4">1</div>
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Anhänger anbringen</h3>
                        <p className="text-gray-600 text-sm">
                            Befestigen Sie den Travel Tag am Koffer oder der Tasche
                        </p>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="step-number mb-4">2</div>
                        <div className="text-4xl mb-4">📱</div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Online registrieren</h3>
                        <p className="text-gray-600 text-sm">
                            Scannen Sie den NFC/QR-Code und hinterlegen Sie Ihre Daten
                        </p>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="step-number mb-4">3</div>
                        <div className="text-4xl mb-4">✈️</div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Sorgenfrei reisen</h3>
                        <p className="text-gray-600 text-sm">
                            Ihre Kontaktdaten sind jederzeit aktualisierbar
                        </p>
                    </div>
                    
                    {/* Step 4 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="step-number mb-4">4</div>
                        <div className="text-4xl mb-4">🔔</div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Gefunden werden</h3>
                        <p className="text-gray-600 text-sm">
                            Im Verlustfall kann der Finder Sie sofort kontaktieren
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="w-full max-w-7xl mt-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">
                    Ihre Vorteile
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Warum tausende Reisende dem {t1.productname} vertrauen
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Benefit 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-md benefit-card">
                        <div className="text-4xl mb-4">📱</div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Keine App nötig</h3>
                        <p className="text-gray-600 text-sm">
                            Funktioniert mit jedem modernen Smartphone – einfach scannen und fertig
                        </p>
                    </div>
                    
                    {/* Benefit 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-md benefit-card">
                        <div className="text-4xl mb-4">🔋</div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Keine Batterien</h3>
                        <p className="text-gray-600 text-sm">
                            NFC-Technologie ohne Stromversorgung – wartungsfrei und zuverlässig
                        </p>
                    </div>
                    
                    {/* Benefit 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-md benefit-card">
                        <div className="text-4xl mb-4">🌍</div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Weltweit einsetzbar</h3>
                        <p className="text-gray-600 text-sm">
                            Funktioniert überall – keine Roaming-Gebühren, keine Grenzen
                        </p>
                    </div>
                    
                    {/* Benefit 4 */}
                    <div className="bg-white p-6 rounded-xl shadow-md benefit-card">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Datenschutzkonform</h3>
                        <p className="text-gray-600 text-sm">
                            DSGVO-konform – Sie entscheiden, welche Daten geteilt werden
                        </p>
                    </div>
                    
                    {/* Benefit 5 */}
                    <div className="bg-white p-6 rounded-xl shadow-md benefit-card">
                        <div className="text-4xl mb-4">💧</div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Robust & wasserfest</h3>
                        <p className="text-gray-600 text-sm">
                            Hochwertiges Material hält jeder Reise stand
                        </p>
                    </div>
                    
                    {/* Benefit 6 */}
                    <div className="bg-white p-6 rounded-xl shadow-md benefit-card">
                        <div className="text-4xl mb-4">🔄</div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Jederzeit aktualisierbar</h3>
                        <p className="text-gray-600 text-sm">
                            Ändern Sie Ihre Daten online – kein neuer Tag nötig
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="w-full max-w-7xl mt-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8">
                    Was unsere Kunden sagen
                </h2>
                <Testimonial testimonials={testimonial} />
            </section>

            {/* SEO Content Section - Why Choose Bag-Tag */}
            {lang === 'de' && (
                <section className="w-full max-w-7xl mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8">
                        Warum ein NFC Gepäckanhänger die beste Wahl für Ihre Reise ist
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <p>
                            Verlorenes Gepäck gehört zu den größten Ärgernissen auf Reisen. Jedes Jahr gehen weltweit 
                            Millionen von Koffern verloren oder werden verspätet ausgeliefert. Mit einem <strong>NFC Gepäckanhänger 
                            von Bag-Tag</strong> schützen Sie sich effektiv vor diesem Problem und sorgen dafür, dass Ihr 
                            Gepäck sicher bei Ihnen ankommt.
                        </p>
                        <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
                            Digitale Gepäckanhänger – Die moderne Alternative
                        </h3>
                        <p>
                            Im Gegensatz zu herkömmlichen Kofferanhängern aus Papier oder Plastik bietet ein 
                            <strong> digitaler Gepäckanhänger mit NFC-Technologie</strong> entscheidende Vorteile: 
                            Die Kontaktdaten können jederzeit online aktualisiert werden, ohne dass ein neuer Anhänger 
                            benötigt wird. Der Finder Ihres Gepäcks kann durch einfaches Scannen mit dem Smartphone 
                            sofort Ihre aktuellen Kontaktinformationen abrufen – schnell, einfach und datenschutzkonform.
                        </p>
                        <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
                            NFC Technologie – Kontaktlos und zukunftssicher
                        </h3>
                        <p>
                            Die <strong>NFC-Technologie (Near Field Communication)</strong> ist der Standard für kontaktlose 
                            Datenübertragung. Fast jedes moderne Smartphone unterstützt NFC – eine zusätzliche App ist 
                            nicht erforderlich. Einfach das Handy an den <strong>NFC Koffer Tag</strong> halten, und schon 
                            werden alle wichtigen Informationen angezeigt. Zusätzlich bietet unser Bag-Tag einen 
                            <strong> QR-Code als Backup</strong>, falls das Smartphone des Finders keine NFC-Funktion hat.
                        </p>
                        <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
                            Ideal für Reisen, Geschäftsreisen und Familien
                        </h3>
                        <p>
                            Ob Sie geschäftlich oder privat unterwegs sind, mehrere Koffer für die Familie haben oder 
                            häufig zwischen verschiedenen Städten und Ländern reisen – der <strong>Bag-Tag NFC Travel Tag</strong> 
                            ist die perfekte Lösung. Dank der robusten, wasserfesten Bauweise hält der Anhänger auch 
                            extremen Bedingungen stand. Sie können jeden Tag Ihre Reisedaten, Hoteladressen und 
                            Kontaktinformationen aktualisieren – so sind Sie immer erreichbar.
                        </p>
                        <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
                            DSGVO-konform und sicher
                        </h3>
                        <p>
                            Datenschutz ist uns wichtig. Sie allein entscheiden, welche Informationen Sie auf Ihrem 
                            <strong> smarten Kofferanhänger</strong> hinterlegen möchten. Alle Daten werden sicher 
                            gespeichert und können jederzeit von Ihnen geändert oder gelöscht werden. Der Bag-Tag 
                            entspricht vollständig den deutschen und europäischen Datenschutzbestimmungen (DSGVO).
                        </p>
                        <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
                            Einfache Einrichtung und Nutzung
                        </h3>
                        <p>
                            Die Aktivierung Ihres NFC Tags dauert nur wenige Minuten: Tag am Koffer befestigen, 
                            QR-Code oder NFC scannen, Daten online eingeben – fertig! Ab sofort ist Ihr Gepäck 
                            geschützt. Änderungen nehmen Sie bequem über Ihr Smartphone oder am Computer vor, 
                            ohne zusätzliche App oder Software.
                        </p>
                    </div>
                </section>
            )}

            {lang === 'en' && (
                <section className="w-full max-w-7xl mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8">
                        Why an NFC Luggage Tag is the Best Choice for Your Journey
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <p>
                            Lost luggage is one of the biggest frustrations when traveling. Every year, millions of 
                            suitcases worldwide are lost or delayed. With an <strong>NFC luggage tag from Bag-Tag</strong>, 
                            you effectively protect yourself from this problem and ensure your baggage arrives safely.
                        </p>
                        <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
                            Digital Luggage Tags – The Modern Alternative
                        </h3>
                        <p>
                            Unlike traditional paper or plastic luggage tags, a <strong>digital luggage tag with NFC 
                            technology</strong> offers crucial advantages: Contact details can be updated online anytime 
                            without needing a new tag. Anyone who finds your luggage can instantly access your current 
                            contact information by simply scanning with their smartphone – fast, easy, and privacy-compliant.
                        </p>
                        <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
                            NFC Technology – Contactless and Future-Proof
                        </h3>
                        <p>
                            <strong>NFC (Near Field Communication) technology</strong> is the standard for contactless 
                            data transfer. Almost every modern smartphone supports NFC – no additional app required. 
                            Simply hold the phone to the <strong>NFC travel tag</strong> and all important information 
                            is displayed. Additionally, our Bag-Tag features a <strong>QR code as backup</strong> in case 
                            the finder's smartphone doesn't have NFC.
                        </p>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section id="faq" className="w-full max-w-7xl mt-12">
                <FaqSection />
            </section>
        </section>
    );
};

export default StartPageControl;
