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

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Ratgeber für sicheres Reisen – Bag-Tag Info Hub | Bag-Tag';
  const description = 'Entdecken Sie unsere Reise-Ratgeber: Gepäckverlust vermeiden, was tun bei verlorenem Koffer, NFC vs QR-Code und mehr. Expertentipps für stressfreies Reisen.';
  const url = 'https://bag-tag.de/de/ratgeber';

  return {
    title,
    description,
    keywords: 'Reise Ratgeber, Gepäck verloren, Koffer Tipps, sicher reisen, Gepäckverlust vermeiden',
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
          alt: 'Bag-Tag Ratgeber',
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
        de: '/de/ratgeber',
        en: '/en/guides',
        'x-default': '/de/ratgeber',
      },
    },
  };
}

export default function RatgeberPage() {
  const relatedLinks = getRelatedLinks('ratgeber', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  const guides = [
    {
      title: 'Koffer verloren – was tun?',
      description: 'Schritt-für-Schritt Anleitung, was Sie sofort tun sollten, wenn Ihr Gepäck verloren geht. Von der Meldung bis zur Wiederbeschaffung.',
      icon: '🆘',
      link: '/de/ratgeber/koffer-verloren-was-tun',
      tags: ['Notfall', 'Flughafen', 'Rechte'],
    },
    {
      title: 'Gepäckverlust vermeiden',
      description: 'Die besten Tipps und Strategien, um Gepäckverlust von vornherein zu verhindern. Packtipps, smarte Kennzeichnung und mehr.',
      icon: '🛡️',
      link: '/de/ratgeber/gepaeck-verlust-vermeiden',
      tags: ['Prävention', 'Tipps', 'Sicherheit'],
    },
    {
      title: 'NFC vs. QR-Code',
      description: 'Detaillierter Vergleich der beiden Technologien. Welche ist besser für Gepäckanhänger? Vor- und Nachteile im Überblick.',
      icon: '⚡',
      link: '/de/ratgeber/nfc-vs-qr',
      tags: ['Technologie', 'Vergleich', 'NFC'],
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Ratgeber für sicheres Reisen
              </h1>
              <p className="text-xl text-gray-600">
                Expertenwissen und praktische Tipps für stressfreie Reisen
              </p>
            </header>

            <TldrSection
              title="Das Wichtigste in Kürze"
              points={[
                'Umfassende Ratgeber zu Gepäcksicherheit und verlorenem Gepäck',
                'Praktische Schritt-für-Schritt Anleitungen für Notfälle',
                'Präventionstipps von Reiseexperten',
                'Technologie-Vergleiche: NFC vs. QR-Code und mehr',
              ]}
            />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Unsere Ratgeber-Themen
              </h2>
              
              <div className="grid md:grid-cols-1 gap-6 my-8">
                {guides.map((guide, index) => (
                  <Link
                    key={index}
                    href={guide.link}
                    className="block bg-white border-2 border-gray-200 hover:border-blue-400 rounded-lg p-6 transition-all duration-200 hover:shadow-lg no-underline"
                  >
                    <div className="flex items-start">
                      <div className="text-5xl mr-6">{guide.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                          {guide.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{guide.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {guide.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-blue-600 text-2xl">→</div>
                    </div>
                  </Link>
                ))}
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Warum diese Ratgeber wichtig sind
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                <p className="text-gray-800 text-lg">
                  Jedes Jahr gehen weltweit über <strong>25 Millionen Gepäckstücke</strong> verloren, verspätet sich 
                  oder werden beschädigt. Die meisten dieser Probleme könnten mit der richtigen Vorbereitung und dem 
                  richtigen Wissen vermieden werden.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">📚</span>
                    Fundiertes Wissen
                  </h3>
                  <p className="text-gray-700">
                    Unsere Ratgeber basieren auf offiziellen Airline-Richtlinien, Verbraucherschutz-Informationen 
                    und jahrelanger Erfahrung.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    Praktische Tipps
                  </h3>
                  <p className="text-gray-700">
                    Keine Theorie, sondern konkrete Handlungsanweisungen, die Sie sofort umsetzen können – 
                    vor, während und nach Ihrer Reise.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">⚡</span>
                    Schnelle Lösungen
                  </h3>
                  <p className="text-gray-700">
                    Im Notfall brauchen Sie schnelle Antworten. Unsere Ratgeber sind so strukturiert, 
                    dass Sie sofort die wichtigsten Informationen finden.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🔄</span>
                    Aktuell & Relevant
                  </h3>
                  <p className="text-gray-700">
                    Wir aktualisieren unsere Ratgeber regelmäßig, um sicherzustellen, dass alle Informationen 
                    den neuesten Standards entsprechen.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Für wen sind diese Ratgeber?
              </h2>
              <div className="space-y-4 my-8">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">🧳 Gelegenheitsreisende</h3>
                  <p className="text-gray-700">
                    Sie reisen ein- bis zweimal im Jahr? Diese Ratgeber helfen Ihnen, häufige Fehler zu vermeiden 
                    und gut vorbereitet zu sein.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">✈️ Vielflieger</h3>
                  <p className="text-gray-700">
                    Auch wenn Sie regelmäßig unterwegs sind: Es gibt immer neue Tipps und Strategien, um Ihre 
                    Reisen noch sicherer zu machen.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">👨‍👩‍👧‍👦 Familien</h3>
                  <p className="text-gray-700">
                    Mit mehreren Gepäckstücken und Kindern wird Reisen komplexer. Unsere Ratgeber helfen Ihnen, 
                    organisiert zu bleiben.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">💼 Geschäftsreisende</h3>
                  <p className="text-gray-700">
                    Zeit ist Geld. Erfahren Sie, wie Sie Gepäckprobleme minimieren und bei Verlust schnell reagieren.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Weitere hilfreiche Ressourcen
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 my-8">
                <ul className="space-y-3">
                  <li>
                    <Link href="/de/hilfe/faq" className="text-blue-600 hover:underline font-semibold">
                      → Häufig gestellte Fragen (FAQ)
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">Schnelle Antworten auf die wichtigsten Fragen zu Bag-Tag</p>
                  </li>
                  <li>
                    <Link href="/de/so-funktionierts" className="text-blue-600 hover:underline font-semibold">
                      → So funktioniert Bag-Tag
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">Schritt-für-Schritt Anleitung zur Nutzung</p>
                  </li>
                  <li>
                    <Link href="/de/use-cases" className="text-blue-600 hover:underline font-semibold">
                      → Use Cases
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">Praktische Anwendungsbeispiele für verschiedene Reisende</p>
                  </li>
                </ul>
              </div>
            </section>

            <RelatedLinksSection links={relatedLinks} />
            
            <CtaSection
              title="Schützen Sie Ihr Gepäck jetzt"
              description="Mit Bag-Tag sind Sie optimal vorbereitet – für alle Reisesituationen."
              buttonText="Jetzt kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
