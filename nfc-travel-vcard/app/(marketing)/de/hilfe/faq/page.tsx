import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { 
  TldrSection, 
  ContentFaqSection,
  RelatedLinksSection, 
  CtaSection,
  Breadcrumb 
} from '@/app/components/ContentComponents';
import { getRelatedLinks } from '@/lib/linkMap';
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/schema-utils';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Häufig gestellte Fragen (FAQ) – Bag-Tag Hilfe | Bag-Tag';
  const description = 'Antworten auf die am häufigsten gestellten Fragen zu Bag-Tag NFC Gepäckanhängern: Aktivierung, NFC, Datenschutz, Kosten, Kompatibilität und mehr.';
  const url = 'https://bag-tag.de/de/hilfe/faq';

  return {
    title,
    description,
    keywords: 'Bag-Tag FAQ, NFC Gepäckanhänger Fragen, Bag-Tag Hilfe, NFC Tag Fragen, Gepäckanhänger Antworten',
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'de_DE',
      url,
      siteName: 'Bag-Tag',
      images: [
        {
          url: 'https://bag-tag.de/assets/productimage.webp',
          width: 1200,
          height: 630,
          alt: 'Bag-Tag FAQ',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://bag-tag.de/assets/productimage.webp'],
    },
    alternates: {
      canonical: url,
      languages: {
        de: '/de/hilfe/faq',
        en: '/en/help/faq',
      },
    },
  };
}

export default function FaqPage() {
  const breadcrumbItems = [
    { name: 'Home', href: '/de' },
    { name: 'Hilfe', href: '/de/hilfe' },
    { name: 'FAQ' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Hilfe', url: 'https://bag-tag.de/de/hilfe' },
    { name: 'FAQ', url: 'https://bag-tag.de/de/hilfe/faq' },
  ]);

  const faqs = [
    {
      question: 'Was ist ein Bag-Tag und wie funktioniert er?',
      answer: 'Bag-Tag ist ein smarter NFC Gepäckanhänger, der Ihre Kontaktdaten digital speichert. Wenn jemand sein Smartphone an den Tag hält (NFC) oder den QR-Code scannt, werden Ihre Kontaktinformationen angezeigt – ohne App. So kann Ihr verlorenes Gepäck schnell zu Ihnen zurückfinden.',
    },
    {
      question: 'Benötige ich eine App für den Bag-Tag?',
      answer: 'Nein! Das ist einer der größten Vorteile. NFC ist in modernen Smartphones (ab iOS 13 und Android 5) standardmäßig integriert. Zusätzlich verfügt jeder Bag-Tag über einen QR-Code, der mit jeder Smartphone-Kamera funktioniert. Weder Sie noch der Finder benötigen eine spezielle App.',
    },
    {
      question: 'Welche Smartphones unterstützen NFC?',
      answer: 'Fast alle modernen Smartphones: iPhone 7 und neuer (ab iOS 13), alle Android-Geräte ab Android 5 mit NFC-Chip (Samsung, Google Pixel, OnePlus, Xiaomi, Huawei und viele mehr). Falls Ihr Smartphone kein NFC hat, funktioniert der QR-Code auf allen Geräten.',
    },
    {
      question: 'Wie aktiviere ich meinen Bag-Tag?',
      answer: 'Aktivierung in 4 Schritten: (1) Tag scannen (NFC oder QR-Code), (2) Kostenloses Konto erstellen oder anmelden, (3) Kontaktdaten und optional Reisedaten eingeben, (4) Speichern – fertig! Die gesamte Aktivierung dauert nur 3–5 Minuten.',
    },
    {
      question: 'Kann ich meine Daten später ändern?',
      answer: 'Ja, jederzeit! Das ist einer der Hauptvorteile gegenüber klassischen Gepäckanhängern. Melden Sie sich einfach bei bag-tag.de an, wählen Sie Ihren Tag aus und aktualisieren Sie Ihre Daten. Die Änderungen sind sofort aktiv – auch während Sie bereits unterwegs sind.',
    },
    {
      question: 'Ist der Bag-Tag wasserfest?',
      answer: 'Ja, der Bag-Tag ist wasserfest, stoßfest und für den rauen Reisealltag konzipiert. Er hält Regen, Schnee, extreme Temperaturen und dem rauen Umgang am Flughafen stand. Der NFC-Chip und der QR-Code sind geschützt und funktionieren auch bei Nässe zuverlässig.',
    },
    {
      question: 'Muss ich den Tag aufladen oder Batterien wechseln?',
      answer: 'Nein! Der Bag-Tag benötigt keine Batterie und muss niemals aufgeladen werden. Die NFC-Technologie ist passiv und wird vom Smartphone des Finders mit Energie versorgt. Damit funktioniert er lebenslang ohne Wartung oder Folgekosten.',
    },
    {
      question: 'Wie sicher sind meine Daten?',
      answer: 'Sehr sicher. Der Bag-Tag ist DSGVO-konform und wurde nach deutschen Datenschutzstandards entwickelt. Ihre Daten liegen auf sicheren deutschen Servern. Sie entscheiden selbst, welche Informationen sichtbar sind. Es gibt kein Tracking, keine Weitergabe an Dritte, und Sie können Ihr Konto jederzeit vollständig löschen.',
    },
    {
      question: 'Was kostet die Nutzung des Bag-Tags?',
      answer: 'Nach dem einmaligen Kauf des Tags ist die Nutzung dauerhaft kostenlos. Es gibt keine Abonnements, keine monatlichen Gebühren, keine versteckten Kosten. Sie können Ihre Daten beliebig oft ändern, den Tag auf andere Konten übertragen – alles kostenlos.',
    },
    {
      question: 'Funktioniert der Bag-Tag weltweit?',
      answer: 'Ja! NFC funktioniert weltweit auf allen kompatiblen Smartphones, unabhängig vom Land oder Mobilfunknetz. Der QR-Code ist international lesbar. Die Bag-Tag-Website ist mehrsprachig (Deutsch, Englisch) und für weltweite Nutzung optimiert.',
    },
    {
      question: 'Was passiert, wenn jemand meinen Koffer findet?',
      answer: 'Der Finder hält sein Smartphone an den Bag-Tag oder scannt den QR-Code. Er sieht dann Ihre hinterlegten Kontaktinformationen (z. B. Name, Telefon, E-Mail) und kann Sie direkt kontaktieren – per Anruf, SMS oder E-Mail. Sie erhalten optional eine Benachrichtigung, wenn Ihr Tag gescannt wurde.',
    },
    {
      question: 'Kann der Finder meine vollständige Adresse sehen?',
      answer: 'Nur wenn Sie das möchten. Sie entscheiden selbst, welche Informationen für Finder sichtbar sind. Viele Nutzer geben nur Name, Telefonnummer und E-Mail an – keine vollständige Adresse. So bleiben Sie erreichbar, ohne zu viel preiszugeben.',
    },
    {
      question: 'Wie viele Tags kann ich mit einem Konto verwalten?',
      answer: 'Unbegrenzt! Sie können beliebig viele Tags mit einem Konto verbinden – ideal für Familien oder wenn Sie mehrere Gepäckstücke haben. Jeder Tag kann individuelle Daten haben (z. B. unterschiedliche Reisedaten oder Kontaktpersonen).',
    },
    {
      question: 'Kann ich den Tag auf ein anderes Konto übertragen?',
      answer: 'Ja, Tags können beliebig oft übertragen werden. Das ist praktisch, wenn Sie den Tag verschenken, verkaufen oder an ein Familienmitglied weitergeben möchten. Die Übertragung erfolgt über das Dashboard und dauert nur wenige Minuten.',
    },
    {
      question: 'Was ist der Unterschied zwischen NFC und QR-Code?',
      answer: 'Beide öffnen dieselbe Seite mit Ihren Daten. NFC ist schneller (1 Sekunde, Smartphone einfach dranhalten) und funktioniert auch bei schlechtem Licht. QR-Codes sind langsamer (2–3 Sekunden, Kamera öffnen), aber universell kompatibel – auch auf sehr alten Smartphones. Jeder Bag-Tag hat beides für maximale Flexibilität.',
    },
  ];

  const faqSchema = generateFAQPageSchema(faqs);

  const relatedLinks = getRelatedLinks('helpFaq', 'de');

  const faqCategories = [
    {
      title: '🚀 Erste Schritte',
      description: 'Aktivierung, Einrichtung und erste Nutzung',
      links: [
        { href: '/de/hilfe/aktivieren', text: 'Tag aktivieren' },
        { href: '/de/hilfe/iphone-nfc-aktivieren', text: 'NFC auf iPhone' },
        { href: '/de/hilfe/android-nfc-aktivieren', text: 'NFC auf Android' },
      ],
    },
    {
      title: '⚙️ Verwaltung',
      description: 'Daten ändern, Tag übertragen, Dashboard nutzen',
      links: [
        { href: '/de/hilfe/daten-aendern', text: 'Daten ändern' },
        { href: '/de/hilfe/tag-uebertragen', text: 'Tag übertragen' },
      ],
    },
    {
      title: '❓ Probleme lösen',
      description: 'NFC funktioniert nicht, QR-Code-Probleme',
      links: [
        { href: '/de/hilfe/iphone-nfc-aktivieren', text: 'iPhone NFC-Probleme' },
        { href: '/de/hilfe/android-nfc-aktivieren', text: 'Android NFC-Probleme' },
        { href: '/de/hilfe/qr-code-als-fallback', text: 'QR-Code als Alternative' },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article>
            <Breadcrumb items={breadcrumbItems} />

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Häufig gestellte Fragen (FAQ)
            </h1>

            {/* TL;DR */}
            <TldrSection>
              <p className="mb-2">
                <strong>Schnelle Antworten:</strong> Hier finden Sie Antworten auf die am 
                häufigsten gestellten Fragen zu Bag-Tag NFC Gepäckanhängern. Von der Aktivierung 
                über Datenschutz bis zu technischen Details.
              </p>
              <p>
                Ihre Frage ist nicht dabei? Nutzen Sie die Hilfe-Sektion oder kontaktieren Sie 
                unseren Support.
              </p>
            </TldrSection>

            {/* Quick Links to specific help pages */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">
                Schnelle Hilfe nach Thema
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {faqCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-slate-200 p-6 hover:border-blue-300 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {category.description}
                    </p>
                    <ul className="space-y-2">
                      {category.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                          >
                            → {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Main FAQ Section */}
            <ContentFaqSection
              title="Alle Fragen und Antworten"
              faqs={faqs}
            />

            {/* Still have questions */}
            <section className="mb-12 bg-blue-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Ihre Frage wurde nicht beantwortet?
              </h2>
              <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                Wir helfen Ihnen gerne weiter! Durchsuchen Sie unsere Hilfe-Sektion oder 
                kontaktieren Sie unseren Support direkt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/de/hilfe"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Zur Hilfe-Übersicht
                </Link>
                <a
                  href="mailto:support@bag-tag.de"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Support kontaktieren
                </a>
              </div>
            </section>

            {/* Additional Topics */}
            <section className="mb-12 bg-slate-100 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Weitere hilfreiche Themen
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/de/so-funktionierts"
                  className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">
                    📖 So funktioniert Bag-Tag
                  </h3>
                  <p className="text-sm text-slate-600">
                    Detaillierte Übersicht über Funktionen und Ablauf
                  </p>
                </Link>
                <Link
                  href="/de/sicherheit-datenschutz"
                  className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">
                    🔒 Sicherheit & Datenschutz
                  </h3>
                  <p className="text-sm text-slate-600">
                    DSGVO-Konformität und Datensicherheit
                  </p>
                </Link>
                <Link
                  href="/de/ratgeber/gepaeck-verlust-vermeiden"
                  className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">
                    ✈️ Gepäckverlust vermeiden
                  </h3>
                  <p className="text-sm text-slate-600">
                    Praktische Tipps für sicheres Reisen
                  </p>
                </Link>
                <Link
                  href="/de/ratgeber/nfc-vs-qr"
                  className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">
                    ⚡ NFC vs. QR-Code
                  </h3>
                  <p className="text-sm text-slate-600">
                    Ausführlicher Vergleich der beiden Technologien
                  </p>
                </Link>
              </div>
            </section>

            {/* Related Links */}
            <RelatedLinksSection title="Hilfe-Themen" links={relatedLinks} />

            {/* CTA */}
            <CtaSection
              primaryText="Bag-Tag kaufen"
              primaryHref="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
              secondaryText="Tag aktivieren"
              secondaryHref="/de/hilfe/aktivieren"
              description="Bereit für sorgenfreies Reisen?"
            />
          </article>
        </div>
      </div>
    </>
  );
}
