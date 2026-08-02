import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { 
  TldrSection, 
  RelatedLinksSection, 
  CtaSection,
  Breadcrumb 
} from '@/app/components/ContentComponents';
import { getRelatedLinks } from '@/lib/linkMap';
import { generateBreadcrumbSchema } from '@/lib/schema-utils';
import { BookOpen, Smartphone, HelpCircle, Settings, RefreshCw, QrCode, CheckCircle } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Hilfe & Aktivierung | Bag-Tag';
  const description = 'Hilfe-Center für Ihren Bag-Tag NFC Gepäckanhänger. Aktivierungsanleitung, NFC-Einrichtung für iPhone & Android, Datenänderung und häufige Fragen.';
  const url = 'https://bag-tag.de/de/hilfe';

  return {
    title,
    description,
    keywords: 'Bag-Tag Hilfe, NFC aktivieren, Gepäckanhänger aktivieren, iPhone NFC, Android NFC, Tag einrichten, Anleitung',
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
          alt: 'Bag-Tag Hilfe & Aktivierung',
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
        de: '/de/hilfe',
        en: '/en/help',
      },
    },
  };
}

export default function HilfePage() {
  const breadcrumbItems = [
    { name: 'Home', href: '/de' },
    { name: 'Hilfe & Aktivierung' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Hilfe & Aktivierung', url: 'https://bag-tag.de/de/hilfe' },
  ]);

  const relatedLinks = getRelatedLinks('help', 'de');

  const helpCards = [
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Tag aktivieren',
      description: 'Schritt-für-Schritt-Anleitung zur Aktivierung Ihres Bag-Tags',
      href: '/de/hilfe/aktivieren',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'NFC auf iPhone aktivieren',
      description: 'So aktivieren Sie NFC auf Ihrem iPhone',
      href: '/de/hilfe/iphone-nfc-aktivieren',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'NFC auf Android aktivieren',
      description: 'So aktivieren Sie NFC auf Ihrem Android-Gerät',
      href: '/de/hilfe/android-nfc-aktivieren',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: <QrCode className="h-8 w-8" />,
      title: 'QR-Code als Fallback',
      description: 'Nutzen Sie den QR-Code, wenn NFC nicht verfügbar ist',
      href: '/de/hilfe/qr-code-als-fallback',
      color: 'bg-orange-50 text-orange-600',
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: 'Daten ändern',
      description: 'Kontakt- und Reisedaten aktualisieren',
      href: '/de/hilfe/daten-aendern',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: 'Tag übertragen',
      description: 'Tag auf ein neues Konto übertragen',
      href: '/de/hilfe/tag-uebertragen',
      color: 'bg-teal-50 text-teal-600',
    },
    {
      icon: <HelpCircle className="h-8 w-8" />,
      title: 'Häufige Fragen (FAQ)',
      description: 'Antworten auf die am häufigsten gestellten Fragen',
      href: '/de/hilfe/faq',
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article>
            <Breadcrumb items={breadcrumbItems} />

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Hilfe & Aktivierung
            </h1>

            {/* TL;DR */}
            <TldrSection>
              <p className="mb-2">
                <strong>Willkommen im Bag-Tag Hilfe-Center!</strong> Hier finden Sie alle 
                Anleitungen und Informationen, die Sie benötigen, um Ihren NFC Gepäckanhänger 
                einzurichten und optimal zu nutzen.
              </p>
              <p>
                Von der ersten Aktivierung über NFC-Einrichtung bis zur Datenänderung – 
                wir begleiten Sie Schritt für Schritt.
              </p>
            </TldrSection>

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Der Bag-Tag ist so konzipiert, dass die Einrichtung in wenigen Minuten 
                abgeschlossen ist. Egal ob Sie ein technisches Neuland betreten oder bereits 
                Erfahrung mit NFC haben – unsere Anleitungen führen Sie sicher durch alle Schritte.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Wählen Sie einfach das Thema, bei dem Sie Hilfe benötigen. Alle Anleitungen 
                sind mit Screenshots und detaillierten Schritt-für-Schritt-Beschreibungen 
                versehen.
              </p>
            </section>

            {/* Help Cards */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-slate-900">
                Hilfe-Themen
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {helpCards.map((card, index) => (
                  <Link
                    key={index}
                    href={card.href}
                    className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <div className={`${card.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Quick Start */}
            <section className="mb-12 bg-blue-50 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <BookOpen className="h-10 w-10 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Schnellstart: Erste Schritte
                  </h2>
                  <ol className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </span>
                      <span>
                        <strong>Tag scannen:</strong> Halten Sie Ihr Smartphone an den NFC-Tag 
                        oder scannen Sie den QR-Code
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </span>
                      <span>
                        <strong>Registrieren:</strong> Erstellen Sie ein kostenloses Konto oder 
                        melden Sie sich an
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </span>
                      <span>
                        <strong>Daten eingeben:</strong> Hinterlegen Sie Ihre Kontakt- und 
                        Reiseinformationen
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </span>
                      <span>
                        <strong>Fertig!</strong> Ihr Tag ist aktiviert und einsatzbereit
                      </span>
                    </li>
                  </ol>
                  <div className="mt-6">
                    <Link
                      href="/de/hilfe/aktivieren"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Zur detaillierten Aktivierungsanleitung
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Links */}
            <RelatedLinksSection title="Weitere Informationen" links={relatedLinks} />

            {/* CTA */}
            <CtaSection
              primaryText="Bag-Tag kaufen"
              primaryHref="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
              secondaryText="So funktioniert's"
              secondaryHref="/de/so-funktionierts"
              description="Noch keinen Bag-Tag?"
            />
          </article>
        </div>
      </div>
    </>
  );
}
