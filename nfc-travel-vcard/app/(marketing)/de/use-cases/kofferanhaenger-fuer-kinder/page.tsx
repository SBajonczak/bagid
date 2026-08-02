import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import { TldrSection, RelatedLinksSection, CtaSection, Breadcrumb } from '@/app/components/ContentComponents';

const linkMap = {
  useCases: '/de/use-cases',
  families: '/de/use-cases/gepaeckanhaenger-fuer-familien',
  frequentFlyers: '/de/use-cases/gepaeckanhaenger-fuer-vielflieger',
  security: '/de/sicherheit-datenschutz',
  howItWorks: '/de/so-funktionierts',
  product: '/de/nfc-gepaeckanhaenger',
};

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Kofferanhänger für Kinder – Sicher auf Klassenfahrten | Bag-Tag';
  const description = 'Smarter NFC Kofferanhänger für Kindergepäck. DSGVO-konform, kinderfreundlich und sicher. Ideal für Klassenfahrten, Ferienlager und Familienurlaub.';
  const url = 'https://bag-tag.de/de/use-cases/kofferanhaenger-fuer-kinder';

  return {
    title,
    description,
    keywords: 'Kofferanhänger Kinder, Gepäckanhänger Klassenfahrt, NFC Tag Kinder, Kindergepäck sicher, Schulreise Gepäck',
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'de_DE',
      url,
      siteName: 'Bag-Tag',
      images: [
        {
          url: 'https://bag-tag.de/assets/productimage.webp',
          width: 1200,
          height: 630,
          alt: 'Bag-Tag Kofferanhänger für Kinder',
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
        de: '/de/use-cases/kofferanhaenger-fuer-kinder',
        en: '/en/use-cases/luggage-tags-for-kids',
        'x-default': '/en/use-cases/luggage-tags-for-kids',
      },
    },
  };
}

export default function KofferanhängerFürKinderPage() {
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Bag-Tag NFC Kofferanhänger für Kinder',
    brand: {
      '@type': 'Brand',
      name: 'Bag-Tag',
    },
    description: 'Sicherer NFC Gepäckanhänger speziell für Kinder. DSGVO-konform mit Privatsphäre-Schutz.',
    image: 'https://bag-tag.de/assets/productimage.webp',
    offers: {
      '@type': 'Offer',
      url: 'https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc',
      priceCurrency: 'EUR',
      price: '10.99',
      availability: 'https://schema.org/InStock',
    },
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Kofferanhänger für Kinder – Sicher auf Klassenfahrten',
    description: 'Warum smarte NFC Gepäckanhänger perfekt für Kindergepäck sind.',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Kofferanhänger für Kinder',
        item: 'https://bag-tag.de/de/use-cases/kofferanhaenger-fuer-kinder',
      },
    ],
  };

  const relatedLinks = [
    { href: linkMap.families, title: 'Gepäckanhänger für Familien' },
    { href: linkMap.security, title: 'Sicherheit & Datenschutz' },
    { href: linkMap.howItWorks, title: 'So funktioniert der Bag-Tag' },
    { href: linkMap.product, title: 'NFC Gepäckanhänger – Produkt Details' },
  ];

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <Breadcrumb items={[
            { name: 'Home', href: '/de' },
            { name: 'Use Cases', href: linkMap.useCases },
            { name: 'Kofferanhänger für Kinder' },
          ]} />

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Kofferanhänger für Kinder
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Sicherheit hat Priorität, wenn Kinder auf Klassenfahrt, ins Ferienlager oder in den 
            Familienurlaub fahren. Der Bag-Tag NFC Kofferanhänger sorgt dafür, dass das Gepäck 
            Ihrer Kinder sicher ankommt – mit maximalem Datenschutz.
          </p>

          <TldrSection title="Das Wichtigste in Kürze">
            <ul className="space-y-2 mt-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Kinderfreundliche Sicherheit für Klassenfahrten und Camps</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>DSGVO-konform mit speziellen Privatsphäre-Features für Kinder</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Eltern behalten die volle Kontrolle über die Daten</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Farbige Tags zur einfachen Identifikation</span>
              </li>
            </ul>
          </TldrSection>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Warum Kinder ID-Tags für Gepäck brauchen
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Wenn Kinder das erste Mal alleine verreisen – sei es auf Klassenfahrt, ins Ferienlager 
                oder zu Verwandten – ist das für Eltern oft ein aufregender, aber auch besorgniserregender 
                Moment. Verlorenes oder vertauschtes Gepäck kann den Start in die Reise verderben.
              </p>

              <p>
                <strong>Typische Situationen, in denen Kindergepäck verloren geht:</strong>
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Schulausflüge und Klassenfahrten:</strong> Viele ähnliche Koffer, 
                  Hektik beim Ein- und Ausladen, Kinder verwechseln ihre Taschen
                </li>
                <li>
                  <strong>Ferienlager und Jugendfreizeiten:</strong> Große Gepäckmengen, 
                  unübersichtliche Sammelpunkte, Zeitdruck beim Verladen
                </li>
                <li>
                  <strong>Familienurlaub:</strong> Flughäfen, Bahnhöfe und Hotels – 
                  überall kann Kindergepäck verloren gehen oder vertauscht werden
                </li>
                <li>
                  <strong>Sportveranstaltungen:</strong> Bei Turnieren oder Wettkämpfen 
                  in der Hektik schnell den Überblick verlieren
                </li>
              </ul>

              <p>
                Der Bag-Tag sorgt dafür, dass verlorenes oder vertauschtes Kindergepäck schnell 
                wieder zu seinem Besitzer findet – ohne dass sensible Daten wie die vollständige 
                Heimadresse öffentlich sichtbar sind.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Perfekt für Schulreisen und Camps
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🎒 Klassenfahrten
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Wenn die ganze Klasse mit ähnlichen Koffern reist, ist Verwechslungsgefahr groß. 
                  Farbige Bag-Tags in verschiedenen Designs helfen Kindern, ihren Koffer sofort zu 
                  erkennen. Bei Verlust können Lehrer oder Finder die Eltern direkt kontaktieren.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🏕️ Ferienlager
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Bei mehrtägigen Camps mit vielen Kindern ist Organisation alles. Der NFC-Tag 
                  speichert alle wichtigen Infos digital: Name des Kindes, Notfallkontakt der Eltern, 
                  und optional auch Allergien oder medizinische Hinweise.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ✈️ Familienurlaub
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Am Flughafen oder Bahnhof geht schnell mal ein Kinderrucksack verloren. Mit dem 
                  Bag-Tag können Flughafenmitarbeiter oder hilfsbereite Reisende die Eltern sofort 
                  kontaktieren – ohne lange Wartezeiten am Lost & Found.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ⚽ Sportreisen
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Bei Sportvereins-Fahrten zu Turnieren oder Wettkämpfen ist oft viel los. 
                  Der robuste, wasserfeste Bag-Tag hält auch rauen Bedingungen stand und bleibt 
                  immer lesbar.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Privatsphäre-Features für Kinder
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                <strong>Datenschutz ist besonders wichtig, wenn es um Kinder geht.</strong> Der Bag-Tag 
                wurde mit speziellen Privatsphäre-Features entwickelt, die Kindern maximale Sicherheit bieten:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3 text-2xl">1</span>
                  <div>
                    <strong>Keine vollständige Adresse erforderlich:</strong> Sie können einfach 
                    eine E-Mail-Adresse oder Telefonnummer hinterlegen – die Heimadresse bleibt privat.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3 text-2xl">2</span>
                  <div>
                    <strong>Eltern-Kontakt statt Kind-Kontakt:</strong> Der Finder kontaktiert immer 
                    die Eltern, niemals direkt das Kind.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3 text-2xl">3</span>
                  <div>
                    <strong>Kein Tracking oder Standortverfolgung:</strong> Der Tag sendet keine 
                    GPS-Daten. Nur wenn jemand den Tag aktiv scannt, werden Informationen sichtbar.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3 text-2xl">4</span>
                  <div>
                    <strong>Sichtbare Informationen kontrollieren:</strong> Sie entscheiden, welche 
                    Details angezeigt werden. Für Schulreisen reicht oft: „Vorname, Klasse 7b, 
                    Kontakt: eltern@beispiel.de"
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3 text-2xl">5</span>
                  <div>
                    <strong>DSGVO-konform:</strong> Alle Daten werden auf deutschen Servern gespeichert 
                    und niemals an Dritte weitergegeben.
                  </div>
                </li>
              </ul>

              <p className="mt-6 bg-white p-4 rounded border border-blue-300">
                <strong>💡 Tipp für Eltern:</strong> Richten Sie eine separate E-Mail-Adresse nur 
                für die Bag-Tags Ihrer Kinder ein, z.B. „familie.mueller.gepaeck@gmail.com". So haben 
                Sie volle Kontrolle und können Benachrichtigungen zentral empfangen.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Eltern behalten die Kontrolle
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Als Eltern möchten Sie die volle Kontrolle über die Daten Ihrer Kinder behalten. 
                Mit dem Bag-Tag ist das garantiert:
              </p>

              <div className="bg-white border-l-4 border-blue-600 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  ✓ Zentrale Verwaltung über Ihr Konto
                </h3>
                <p className="mb-4">
                  Alle Bag-Tags Ihrer Kinder werden über Ihr Eltern-Konto verwaltet. Sie können 
                  jederzeit Informationen ändern, Tags aktivieren/deaktivieren oder löschen.
                </p>
              </div>

              <div className="bg-white border-l-4 border-blue-600 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  ✓ Benachrichtigungen bei Scan
                </h3>
                <p className="mb-4">
                  Optional können Sie eine Benachrichtigung erhalten, wenn jemand den Tag Ihres 
                  Kindes scannt. So wissen Sie sofort, wenn das Gepäck gefunden wurde.
                </p>
              </div>

              <div className="bg-white border-l-4 border-blue-600 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  ✓ Mehrere Kinder, ein Konto
                </h3>
                <p className="mb-4">
                  Sie können beliebig viele Tags für Ihre Kinder über ein Eltern-Konto verwalten. 
                  Jedes Kind kann unterschiedliche Farben bekommen, um die Tags leicht auseinanderzuhalten.
                </p>
              </div>

              <div className="bg-white border-l-4 border-blue-600 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  ✓ Zeitlich begrenzte Aktivierung
                </h3>
                <p className="mb-4">
                  Aktivieren Sie den Tag nur während der Reise. Zu Hause oder nach der Klassenfahrt 
                  können Sie den Tag einfach deaktivieren, sodass keine Informationen mehr lesbar sind.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Praktische Tipps für Eltern
            </h2>

            <div className="space-y-4 text-lg text-gray-700">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🎨 Verschiedene Farben nutzen
                </h3>
                <p>
                  Wenn mehrere Kinder gleichzeitig verreisen, verwenden Sie unterschiedliche Farben 
                  für jeden Koffer. So können die Kinder ihr Gepäck sofort erkennen.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  📝 Minimale Infos sind genug
                </h3>
                <p>
                  Für Schulreisen reicht: „Max M., Klasse 7b, Elternkontakt: 0171-1234567". 
                  Keine vollständige Adresse nötig!
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🏫 Mit Lehrern abstimmen
                </h3>
                <p>
                  Informieren Sie die Klassenlehrer über den Bag-Tag. Im Notfall können auch sie 
                  den Tag scannen und die Eltern kontaktieren.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🧳 An mehreren Stellen anbringen
                </h3>
                <p>
                  Bringen Sie Tags sowohl außen am Koffer als auch innen in der Tasche an. 
                  Falls der äußere Tag abgerissen wird, bleibt der innere Tag lesbar.
                </p>
              </div>
            </div>
          </section>

          <RelatedLinksSection 
            title="Weitere Informationen"
            links={relatedLinks}
          />

          <CtaSection 
            title="Sicherheit für Ihr Kind auf Reisen"
            description="Bag-Tag jetzt in verschiedenen Farben bestellen"
            primaryText="Jetzt kaufen"
            primaryHref="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
            secondaryText="Mehr über Sicherheit"
            secondaryHref={linkMap.security}
          />
        </article>
      </div>
    </>
  );
}
