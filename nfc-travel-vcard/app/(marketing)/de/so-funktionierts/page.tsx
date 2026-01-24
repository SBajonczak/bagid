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
import { generateBreadcrumbSchema, generateHowToSchema } from '@/lib/schema-utils';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'So funktioniert Bag-Tag – NFC Gepäckanhänger einfach erklärt | Bag-Tag';
  const description = 'Entdecken Sie, wie der Bag-Tag NFC Gepäckanhänger funktioniert: In 4 Schritten zu mehr Sicherheit für Ihr Reisegepäck. NFC & QR-Code kombiniert für maximalen Schutz.';
  const url = 'https://bag-tag.de/de/so-funktionierts';

  return {
    title,
    description,
    keywords: 'Bag-Tag Funktion, NFC Gepäckanhänger wie funktioniert, Smart Luggage Tag, digitaler Kofferanhänger Anleitung',
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
          alt: 'Bag-Tag Funktion',
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
        de: '/de/so-funktionierts',
        en: '/en/how-it-works',
        'x-default': '/de/so-funktionierts',
      },
    },
  };
}

export default function SoFunktioniertPage() {
  const relatedLinks = getRelatedLinks('so-funktionierts', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'So funktioniert es', url: 'https://bag-tag.de/de/so-funktionierts' },
  ];

  const howToSteps = [
    {
      name: 'Bag-Tag kaufen',
      text: 'Bestellen Sie Ihren NFC Gepäckanhänger im Online-Shop. Der Tag wird fertig aktiviert geliefert und ist sofort einsatzbereit.',
      url: 'https://bag-tag.de/de/so-funktionierts#kaufen',
    },
    {
      name: 'Tag aktivieren und Daten eingeben',
      text: 'Scannen Sie den NFC-Chip oder QR-Code mit Ihrem Smartphone. Erstellen Sie ein Konto und geben Sie Ihre Kontakt- und Reisedaten ein.',
      url: 'https://bag-tag.de/de/so-funktionierts#aktivieren',
    },
    {
      name: 'An Gepäck befestigen',
      text: 'Befestigen Sie den Bag-Tag sicher an Ihrem Koffer, Rucksack oder Ihrer Tasche. Der robuste Tag hält allen Reisebedingungen stand.',
      url: 'https://bag-tag.de/de/so-funktionierts#befestigen',
    },
    {
      name: 'Geschützt reisen',
      text: 'Bei Verlust kann der Finder Ihr Gepäck scannen und Sie sofort kontaktieren – ohne dass Ihre Daten sichtbar werden.',
      url: 'https://bag-tag.de/de/so-funktionierts#geschuetzt',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const howToSchema = generateHowToSchema({
    name: 'So funktioniert der Bag-Tag NFC Gepäckanhänger',
    description: 'Lernen Sie, wie Sie Ihren Bag-Tag in 4 einfachen Schritten einrichten und Ihr Gepäck schützen.',
    image: 'https://bag-tag.de/assets/productimage.webp',
    steps: howToSteps,
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />

      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                So funktioniert Bag-Tag
              </h1>
              <p className="text-xl text-gray-600">
                Der intelligente NFC Gepäckanhänger für moderne Reisende
              </p>
            </header>

            <TldrSection
              title="Das Wichtigste in Kürze"
              points={[
                'Bag-Tag kombiniert NFC-Technologie mit QR-Code für doppelte Sicherheit',
                'In 4 einfachen Schritten zu mehr Gepäcksicherheit: Kaufen → Aktivieren → Befestigen → Geschützt reisen',
                'Ihre Daten bleiben privat – nur Sie entscheiden, wer was sehen kann',
                'Funktioniert ohne App-Installation für den Finder',
              ]}
            />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 id="kaufen" className="text-3xl font-bold text-gray-900 mb-6">
                Schritt 1: Bag-Tag kaufen
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                <p className="text-gray-800">
                  Bestellen Sie Ihren Bag-Tag bequem im Online-Shop. Jeder Tag ist bereits aktiviert und sofort einsatzbereit. 
                  Es gibt keine versteckten Kosten – keine Abo-Gebühren, keine monatlichen Zahlungen.
                </p>
              </div>
              <p>
                Der Bag-Tag wird hochwertig verarbeitet und ist für langlebige Nutzung konzipiert. Die robuste Konstruktion 
                hält den Belastungen des Reisealltags stand – ob im Flugzeug, am Bahnhof oder auf dem Roadtrip.
              </p>

              <h2 id="aktivieren" className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Schritt 2: Tag aktivieren und Daten eingeben
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  🔍 Zwei Wege zur Aktivierung:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="font-semibold text-blue-600 mr-2">NFC:</span>
                    <span>Halten Sie Ihr Smartphone an den Tag – funktioniert automatisch</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-blue-600 mr-2">QR-Code:</span>
                    <span>Scannen Sie den Code mit der Kamera-App</span>
                  </li>
                </ul>
              </div>
              <p>
                Nach dem Scannen werden Sie zur Bag-Tag Website geleitet. Dort erstellen Sie ein Konto (oder melden sich an) 
                und geben Ihre Reise- und Kontaktdaten ein:
              </p>
              <ul>
                <li><strong>Kontaktdaten:</strong> Name, E-Mail, Telefonnummer</li>
                <li><strong>Reisedaten:</strong> Abflugort, Zielort, Flugdaten (optional)</li>
                <li><strong>Gepäckdetails:</strong> Kofferfarbe, besondere Merkmale</li>
              </ul>
              <p>
                Sie können jederzeit entscheiden, welche Informationen ein Finder sehen darf. Standardmäßig werden nur 
                grundlegende Kontaktmöglichkeiten freigegeben.
              </p>

              <h2 id="befestigen" className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Schritt 3: An Gepäck befestigen
              </h2>
              <p>
                Befestigen Sie den Bag-Tag sicher an Ihrem Gepäckstück. Die Befestigung ist:
              </p>
              <ul>
                <li><strong>Robust:</strong> Hält starken Belastungen stand</li>
                <li><strong>Wetterfest:</strong> Schützt vor Regen, Schnee und Sonne</li>
                <li><strong>Sichtbar:</strong> Auffälliges Design erleichtert das Auffinden</li>
                <li><strong>Universell:</strong> Passt an Koffer, Rucksäcke, Taschen</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Profi-Tipp:</p>
                <p className="text-gray-800">
                  Befestigen Sie den Tag an einer gut sichtbaren Stelle – am besten außen am Griff. So kann ein Finder 
                  ihn schnell entdecken und scannen.
                </p>
              </div>

              <h2 id="geschuetzt" className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Schritt 4: Geschützt reisen
              </h2>
              <p>
                Jetzt sind Sie optimal vorbereitet! Sollte Ihr Gepäck verloren gehen, kann der Finder:
              </p>
              <ol>
                <li><strong>Den Tag scannen</strong> – mit NFC oder QR-Code, ohne App-Installation</li>
                <li><strong>Ihre Kontaktseite sehen</strong> – mit den Informationen, die Sie freigegeben haben</li>
                <li><strong>Sie kontaktieren</strong> – per E-Mail, Telefon oder Nachricht</li>
                <li><strong>Fundort mitteilen</strong> – Sie werden sofort benachrichtigt</li>
              </ol>
              <p>
                Sie erhalten eine Benachrichtigung, sobald jemand Ihren Tag scannt. So wissen Sie sofort, wenn jemand 
                Ihr Gepäck gefunden hat.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                NFC vs. QR-Code: Doppelte Sicherheit
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Warum beide Technologien?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">✨ NFC-Chip</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ Ultraschnell (1 Sekunde)</li>
                      <li>✓ Funktioniert ohne Entsperren</li>
                      <li>✓ Kein Scannen nötig</li>
                      <li>✓ Auch bei schlechtem Licht</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">📱 QR-Code</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ Funktioniert mit jedem Smartphone</li>
                      <li>✓ Keine NFC-Unterstützung nötig</li>
                      <li>✓ Fallback-Option</li>
                      <li>✓ Universal kompatibel</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p>
                Mit beiden Technologien ist sichergestellt, dass Ihr Gepäck in jedem Fall gescannt werden kann – 
                unabhängig vom Smartphone-Modell des Finders.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Vorteile auf einen Blick
              </h2>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3">🔒 Datenschutz</h3>
                  <p className="text-gray-700">
                    Ihre persönlichen Daten sind nie sichtbar auf dem Tag. Sie entscheiden, was ein Finder sehen kann.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">⚡ Schnell & Einfach</h3>
                  <p className="text-gray-700">
                    Keine App-Installation erforderlich. Der Finder scannt und kontaktiert Sie sofort.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-900 mb-3">🌍 Weltweit</h3>
                  <p className="text-gray-700">
                    Funktioniert in jedem Land, mit jedem modernen Smartphone. Keine Roaming-Gebühren.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-900 mb-3">💰 Keine Folgekosten</h3>
                  <p className="text-gray-700">
                    Einmaliger Kauf, keine Abo-Gebühren, keine versteckten Kosten. Lebenslang nutzbar.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Häufige Fragen
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Muss der Finder eine App installieren?
                  </h3>
                  <p className="text-gray-700">
                    Nein. Der Bag-Tag funktioniert direkt über den Browser. Einfach scannen und die Kontaktseite öffnet sich automatisch.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Funktioniert das auch ohne Internet?
                  </h3>
                  <p className="text-gray-700">
                    Der Finder benötigt eine Internetverbindung zum Scannen. Sie werden offline benachrichtigt, sobald Sie wieder online sind.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Kann ich mehrere Tags verwalten?
                  </h3>
                  <p className="text-gray-700">
                    Ja! Sie können beliebig viele Tags in einem Konto verwalten – perfekt für Familien oder Vielflieger.
                  </p>
                </div>
              </div>
            </section>

            <RelatedLinksSection links={relatedLinks} />
            
            <CtaSection
              title="Bereit für sicheres Reisen?"
              description="Bestellen Sie jetzt Ihren Bag-Tag und schützen Sie Ihr Gepäck."
              buttonText="Jetzt kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
