import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { TldrSection, RelatedLinksSection, CtaSection, Breadcrumb } from '@/app/components/ContentComponents';
import { Package, Users, Plane } from 'lucide-react';

const linkMap = {
  kids: '/de/use-cases/kofferanhaenger-fuer-kinder',
  families: '/de/use-cases/gepaeckanhaenger-fuer-familien',
  frequentFlyers: '/de/use-cases/gepaeckanhaenger-fuer-vielflieger',
  product: '/de/nfc-gepaeckanhaenger',
  howItWorks: '/de/so-funktionierts',
  security: '/de/sicherheit-datenschutz',
};

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Use Cases für Bag-Tag – NFC Gepäckanhänger für jeden Reisenden | Bag-Tag';
  const description = 'Entdecken Sie die vielfältigen Einsatzmöglichkeiten des Bag-Tag NFC Gepäckanhängers: Für Kinder, Familien und Vielflieger. Sicher, praktisch und DSGVO-konform.';
  const url = 'https://bag-tag.de/de/use-cases';

  return {
    title,
    description,
    keywords: 'Gepäckanhänger Kinder, Familienreise Gepäck, Vielflieger Kofferanhänger, NFC Tag Reise, Gepäck organisieren',
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
          alt: 'Bag-Tag Use Cases',
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
        de: '/de/use-cases',
        en: '/en/use-cases',
        'x-default': '/en/use-cases',
      },
    },
  };
}

export default function UseCasesPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bag-tag.de/de',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Use Cases',
        item: 'https://bag-tag.de/de/use-cases',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Use Cases für Bag-Tag NFC Gepäckanhänger',
    description: 'Vielseitige Einsatzmöglichkeiten des Bag-Tag für verschiedene Reiseszenarien.',
    author: {
      '@type': 'Organization',
      name: 'Bag-Tag',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bag-Tag',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bag-tag.de/assets/productimage.webp',
      },
    },
    datePublished: '2024-01-15',
    dateModified: '2024-01-15',
  };

  const relatedLinks = [
    { href: linkMap.product, title: 'NFC Gepäckanhänger – Produkt Details' },
    { href: linkMap.howItWorks, title: 'So funktioniert der Bag-Tag' },
    { href: linkMap.security, title: 'Sicherheit & Datenschutz' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <Breadcrumb items={[
            { name: 'Home', href: '/de' },
            { name: 'Use Cases' },
          ]} />

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Use Cases für Bag-Tag
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Der Bag-Tag NFC Gepäckanhänger ist für jeden Reisenden die perfekte Lösung. 
            Entdecken Sie, wie unterschiedliche Nutzergruppen von den smarten Features profitieren.
          </p>

          <TldrSection title="Auf einen Blick">
            <ul className="space-y-2 mt-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Für Kinder: Sicherheit auf Klassenfahrten und im Familienurlaub</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Für Familien: Mehrere Gepäckstücke einfach verwalten</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Für Vielflieger: Professionelle Effizienz auf Geschäftsreisen</span>
              </li>
            </ul>
          </TldrSection>

          {/* Use Case Cards */}
          <section className="my-12">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Kids */}
              <Link href={linkMap.kids} className="block group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg h-full">
                  <Package className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    Für Kinder
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Sicherheit für Kindergepäck auf Klassenfahrten, Ferienlagern und im Familienurlaub. 
                    Mit Privatsphäre-Schutz speziell für Kinder.
                  </p>
                  <span className="text-purple-600 font-semibold inline-flex items-center gap-2">
                    Mehr erfahren →
                  </span>
                </div>
              </Link>

              {/* Families */}
              <Link href={linkMap.families} className="block group">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg h-full">
                  <Users className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    Für Familien
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Mehrere Koffer für die ganze Familie organisieren. Mit Farbcodierung und 
                    zentraler Verwaltung aller Gepäckstücke.
                  </p>
                  <span className="text-blue-600 font-semibold inline-flex items-center gap-2">
                    Mehr erfahren →
                  </span>
                </div>
              </Link>

              {/* Frequent Flyers */}
              <Link href={linkMap.frequentFlyers} className="block group">
                <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-8 rounded-lg border-2 border-slate-300 hover:border-slate-500 transition-all hover:shadow-lg h-full">
                  <Plane className="h-12 w-12 text-slate-700 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-slate-700 transition-colors">
                    Für Vielflieger
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Effizienz für Geschäftsreisende und Vielflieger. Schnelle Identifikation, 
                    professionelles Auftreten, Priority-Handling.
                  </p>
                  <span className="text-slate-700 font-semibold inline-flex items-center gap-2">
                    Mehr erfahren →
                  </span>
                </div>
              </Link>
            </div>
          </section>

          {/* Why Bag-Tag for All Use Cases */}
          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Warum Bag-Tag für alle Reisenden?
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p className="leading-relaxed">
                <strong>Universell einsetzbar:</strong> Ob Kinder, Familien oder Geschäftsreisende – 
                der Bag-Tag passt sich an jeden Anwendungsfall an. Die flexible Konfiguration erlaubt 
                es, die Sichtbarkeit der Kontaktdaten je nach Situation anzupassen.
              </p>
              <p className="leading-relaxed">
                <strong>Datenschutz für alle:</strong> DSGVO-konform, keine unnötige Datenpreisgabe. 
                Besonders wichtig bei Kindergepäck, wo Privatsphäre oberste Priorität hat.
              </p>
              <p className="leading-relaxed">
                <strong>Einfache Verwaltung:</strong> Egal wie viele Tags Sie verwenden – alle können 
                über ein Konto verwaltet werden. Perfekt für Familien mit mehreren Koffern.
              </p>
              <p className="leading-relaxed">
                <strong>Keine laufenden Kosten:</strong> Einmal kaufen, lebenslang nutzen. 
                Keine Batterien, keine Abos, keine versteckten Gebühren.
              </p>
            </div>
          </section>

          <RelatedLinksSection 
            title="Mehr über Bag-Tag erfahren"
            links={relatedLinks}
          />

          <CtaSection 
            title="Bereit für stressfreies Reisen?"
            description="Wählen Sie Ihre Farbe und legen Sie los"
            primaryText="Jetzt Bag-Tag kaufen"
            primaryHref="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
            secondaryText="Wie funktioniert's?"
            secondaryHref={linkMap.howItWorks}
          />
        </article>
      </div>
    </>
  );
}
