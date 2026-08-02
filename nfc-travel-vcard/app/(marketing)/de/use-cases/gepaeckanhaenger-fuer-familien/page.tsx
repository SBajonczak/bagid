import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { TldrSection, RelatedLinksSection, CtaSection, Breadcrumb } from '@/app/components/ContentComponents';

const linkMap = {
  useCases: '/de/use-cases',
  kids: '/de/use-cases/kofferanhaenger-fuer-kinder',
  frequentFlyers: '/de/use-cases/gepaeckanhaenger-fuer-vielflieger',
  security: '/de/sicherheit-datenschutz',
  howItWorks: '/de/so-funktionierts',
  product: '/de/nfc-gepaeckanhaenger',
};

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Gepäckanhänger für Familien – Mehrere Koffer organisieren | Bag-Tag';
  const description = 'Smart mehrere Gepäckstücke für die ganze Familie verwalten. NFC Kofferanhänger mit Farbcodierung und zentraler Verwaltung. DSGVO-konform.';
  const url = 'https://bag-tag.de/de/use-cases/gepaeckanhaenger-fuer-familien';

  return {
    title,
    description,
    keywords: 'Gepäckanhänger Familie, Familienurlaub Koffer, mehrere Gepäckstücke, Gepäck organisieren, NFC Tag Familie',
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
          alt: 'Bag-Tag Gepäckanhänger für Familien',
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
        de: '/de/use-cases/gepaeckanhaenger-fuer-familien',
        en: '/en/use-cases/luggage-tags-for-families',
        'x-default': '/en/use-cases/luggage-tags-for-families',
      },
    },
  };
}

export default function GepäckanhängerFürFamilienPage() {
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Bag-Tag NFC Gepäckanhänger für Familien',
    brand: {
      '@type': 'Brand',
      name: 'Bag-Tag',
    },
    description: 'NFC Gepäckanhänger für die ganze Familie. Zentrale Verwaltung mehrerer Tags.',
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
    headline: 'Gepäckanhänger für Familien – Mehrere Koffer smart verwalten',
    description: 'Wie Familien mit mehreren Gepäckstücken von NFC Tags profitieren.',
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
        name: 'Gepäckanhänger für Familien',
        item: 'https://bag-tag.de/de/use-cases/gepaeckanhaenger-fuer-familien',
      },
    ],
  };

  const relatedLinks = [
    { href: linkMap.kids, title: 'Kofferanhänger für Kinder' },
    { href: linkMap.frequentFlyers, title: 'Gepäckanhänger für Vielflieger' },
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
            { name: 'Gepäckanhänger für Familien' },
          ]} />

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Gepäckanhänger für Familien
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Familienurlaub bedeutet oft: viele Koffer, viel Chaos. Mit dem Bag-Tag NFC Gepäckanhänger 
            behalten Sie den Überblick über alle Gepäckstücke – vom Kinderkoffer bis zur Reisetasche. 
            Zentral verwaltet, smart organisiert, stressfrei reisen.
          </p>

          <TldrSection title="Auf einen Blick">
            <ul className="space-y-2 mt-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Zentrale Verwaltung aller Familien-Gepäckstücke über ein Konto</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Farbcodierung zur schnellen Identifikation am Gepäckband</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Perfekt für Familienurlaub, Roadtrips und Gruppenreisen</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Jedes Familienmitglied kann individuell konfiguriert werden</span>
              </li>
            </ul>
          </TldrSection>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Die Herausforderungen von Familienreisen
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Jeder, der mit Kindern verreist ist, kennt das Problem: Mehrere Koffer, Rucksäcke, 
                Kinderwagen, Spielzeugtaschen – und am Gepäckband das große Chaos. Welcher Koffer 
                gehört zu wem? Ist das der rote Koffer von Papa oder der von der Oma?
              </p>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                <h3 className="font-semibold text-red-900 mb-3">
                  Typische Probleme bei Familienreisen:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Verwechslungsgefahr:</strong> Viele schwarze Koffer sehen gleich aus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Hektik am Gepäckband:</strong> Während man auf einen Koffer wartet, 
                    fährt der nächste schon vorbei</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Unterschiedliche Kontaktdaten:</strong> Mama hat eine andere Nummer 
                    als Papa – wer soll kontaktiert werden?</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Kinder verlieren ihre Taschen:</strong> Am Flughafen, im Hotel, 
                    beim Umsteigen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Papier-Tags reißen ab:</strong> Besonders bei häufigem Handling</span>
                  </li>
                </ul>
              </div>

              <p>
                Der Bag-Tag löst all diese Probleme mit smarter Technologie und durchdachtem Design.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Zentrale Verwaltung aller Gepäckstücke
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Mit dem Bag-Tag verwalten Sie alle Gepäckstücke Ihrer Familie über <strong>ein 
                einziges Konto</strong>. Das bringt enorme Vorteile:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    📱 Ein Login für alles
                  </h3>
                  <p>
                    Egal ob 2 oder 10 Koffer – alle werden über Ihr Familien-Konto verwaltet. 
                    Sie loggen sich einmal ein und haben Zugriff auf alle Tags.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    ✏️ Daten zentral ändern
                  </h3>
                  <p>
                    Neue Telefonnummer? Hotel gewechselt? Ändern Sie die Kontaktdaten für alle 
                    Tags gleichzeitig oder individuell – wie Sie möchten.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    👨‍👩‍👧‍👦 Personalisierung
                  </h3>
                  <p>
                    Jedes Familienmitglied kann seinen eigenen Tag mit individuellen Infos haben: 
                    „Papa – Kontakt: mobil", „Lena (8 Jahre) – Kontakt: Eltern".
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    🔔 Benachrichtigungen
                  </h3>
                  <p>
                    Wenn ein Koffer gescannt wird, bekommen Sie sofort eine Benachrichtigung. 
                    So wissen Sie, wenn jemand Ihr Gepäck gefunden hat.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-lg border border-blue-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Farbcodierung: Der Familien-Trick
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Eine der besten Strategien für Familienreisen: <strong>Verschiedene Farben für 
                verschiedene Personen oder Gepäckarten</strong>. Der Bag-Tag ist in mehreren 
                Farben erhältlich – nutzen Sie das zu Ihrem Vorteil!
              </p>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">
                  💡 Bewährte Farbcodierungs-Strategien:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">1</span>
                    <div>
                      <strong>Eine Farbe pro Person:</strong><br />
                      Blau für Papa, Rot für Mama, Grün für Max, Gelb für Lisa. 
                      Jeder erkennt sein Gepäck sofort.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">2</span>
                    <div>
                      <strong>Farben nach Gepäckart:</strong><br />
                      Schwarz für große Koffer, Orange für Handgepäck, Grün für Kinderrucksäcke.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">3</span>
                    <div>
                      <strong>Kombination beider Systeme:</strong><br />
                      Papa Koffer = Blau, Papa Rucksack = Hellblau. 
                      Mama Koffer = Rot, Mama Tasche = Rosa.
                    </div>
                  </li>
                </ul>
              </div>

              <p className="bg-white p-4 rounded border border-blue-300">
                <strong>🎯 Praxis-Tipp:</strong> Fotografieren Sie vor der Reise alle Koffer mit 
                ihren Tags. Im Chaos am Gepäckband können Sie dann schnell nachschauen, welche 
                Farbe zu welchem Familienmitglied gehört.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Perfekt für Familienurlaub-Szenarien
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6 bg-slate-50 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ✈️ Flugreisen mit der Familie
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Am Flughafen ist die größte Herausforderung, schnell alle Koffer vom Band zu 
                  bekommen. Mit farbcodierten Bag-Tags erkennt jedes Familienmitglied sofort sein 
                  Gepäck – auch aus der Ferne.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Extra-Vorteil:</strong> Wenn ein Koffer verloren geht, kann das 
                  Flughafenpersonal Sie direkt kontaktieren, statt dass Sie stundenlang am 
                  Lost & Found warten müssen.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 bg-slate-50 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🚗 Roadtrips und Autoreisen
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Bei Roadtrips wird Gepäck ständig ein- und ausgeladen. Hotels, Campingplätze, 
                  Ferienwohnungen – überall kann etwas verloren gehen oder vertauscht werden.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Der Bag-Tag am Gepäck sorgt dafür, dass verlorene Taschen schnell zu Ihnen 
                  zurückfinden. Hinterlassen Sie einfach die Kontaktdaten Ihres aktuellen Hotels 
                  oder Ihre Handynummer.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-6 bg-slate-50 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🏖️ Strandurlaub und All-Inclusive
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Im Hotel oder Resort gibt es oft ähnliche Taschen am Pool oder Strand. 
                  Kinder verlieren ihre Badetaschen, Handtücher werden mitgenommen – mit dem 
                  Bag-Tag haben Sie immer eine Absicherung.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Tipp:</strong> Bringen Sie auch an Strandtaschen, Schwimm-Rucksäcken 
                  und Kinder-Spielzeugtaschen einen Tag an.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6 bg-slate-50 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🎒 Gruppenreisen mit mehreren Familien
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Wenn Sie mit befreundeten Familien verreisen, wird das Gepäck-Chaos noch größer. 
                  Mit unterschiedlichen Bag-Tag-Farben weiß jeder sofort, welcher Koffer zu welcher 
                  Familie gehört.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Praxis-Beispiel:</strong> Familie Müller = blaue Tags, Familie Schmidt = 
                  grüne Tags, Familie Weber = rote Tags. Am Gepäckband ist sofort klar, wer welchen 
                  Koffer nehmen muss.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-6 bg-slate-50 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🎄 Weihnachten bei Verwandten
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Über die Feiertage bei Oma und Opa? Geschenke, Klamotten, Kinderspielzeug – 
                  da kommt einiges an Gepäck zusammen. Mit Bag-Tags vergessen Sie nichts beim 
                  Abreisen, und falls doch, können die Verwandten Sie einfach kontaktieren.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Praktische Organisation für Familien
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  📋 Gepäck-Checkliste digital hinterlegen
                </h3>
                <p>
                  Nutzen Sie das Notizfeld im Bag-Tag, um eine kleine Packliste zu hinterlegen: 
                  „Koffer 1: Kleidung Eltern", „Koffer 2: Spielzeug & Kinder-Klamotten". 
                  So wissen Sie immer, was in welchem Koffer ist.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  🏨 Hotel-Kontaktdaten aktualisieren
                </h3>
                <p>
                  Vor der Abreise: Fügen Sie die Adresse und Telefonnummer Ihres Hotels hinzu. 
                  Falls Ihr Gepäck später ankommt, kann es direkt dorthin geschickt werden.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  👶 Extra-Tags für Kinderwagen & Buggys
                </h3>
                <p>
                  Kinderwagen gehen am Flughafen besonders oft verloren. Bringen Sie einen 
                  Bag-Tag am Gestell an – so kann er eindeutig identifiziert werden.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  🎁 Tags als Geschenk für Großeltern
                </h3>
                <p>
                  Reisen Oma und Opa mit? Schenken Sie ihnen auch einen Bag-Tag, damit ihr 
                  Gepäck genauso sicher ist wie Ihres. Über Ihr Familienkonto können Sie alle 
                  Tags gemeinsam verwalten.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Warum Bag-Tag perfekt für Familien ist
            </h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Ein Konto für die ganze Familie:</strong> Alle Tags zentral verwalten</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Mehrere Farben verfügbar:</strong> Für einfache Identifikation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Individuelle Konfiguration:</strong> Jeder Tag kann unterschiedliche Infos haben</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Kinderfreundlich und sicher:</strong> DSGVO-konform, kein Tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Langlebig und robust:</strong> Hält Familienurlaube jahrelang durch</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Keine Folgekosten:</strong> Einmal kaufen, lebenslang nutzen</span>
              </li>
            </ul>
          </section>

          <RelatedLinksSection 
            title="Weitere Informationen"
            links={relatedLinks}
          />

          <CtaSection 
            title="Stressfreier Familienurlaub beginnt hier"
            description="Bag-Tag für die ganze Familie – in verschiedenen Farben"
            primaryText="Jetzt kaufen"
            primaryHref="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
            secondaryText="Wie funktioniert's?"
            secondaryHref={linkMap.howItWorks}
          />
        </article>
      </div>
    </>
  );
}
