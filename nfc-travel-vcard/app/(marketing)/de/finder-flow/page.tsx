import type { Metadata } from 'next';
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
  const title = 'So hilft der Finder Ihnen – Bag-Tag Finder-Prozess | Bag-Tag';
  const description = 'Erfahren Sie, wie der Finder Ihres verlorenen Gepäcks Sie kontaktiert. Datenschutz garantiert: Ihre Daten bleiben privat, während Sie schnell gefunden werden.';
  const url = 'https://bag-tag.de/de/finder-flow';

  return {
    title,
    description,
    keywords: 'Bag-Tag Finder, Gepäck gefunden, verlorenes Gepäck zurückgeben, NFC Tag scannen, Finder Prozess',
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
          alt: 'Bag-Tag Finder Prozess',
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
        de: '/de/finder-flow',
        en: '/en/finder-flow',
        'x-default': '/de/finder-flow',
      },
    },
  };
}

export default function FinderFlowPage() {
  const relatedLinks = getRelatedLinks('finder-flow', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Finder-Prozess', url: 'https://bag-tag.de/de/finder-flow' },
  ];

  const finderSteps = [
    {
      name: 'Gepäck finden',
      text: 'Der Finder entdeckt Ihr verlorenes Gepäckstück mit dem Bag-Tag am Griff.',
      url: 'https://bag-tag.de/de/finder-flow#finden',
    },
    {
      name: 'Tag scannen',
      text: 'Der Finder hält sein Smartphone an den NFC-Chip oder scannt den QR-Code – ohne App-Installation.',
      url: 'https://bag-tag.de/de/finder-flow#scannen',
    },
    {
      name: 'Kontaktseite öffnen',
      text: 'Die Bag-Tag Kontaktseite öffnet sich automatisch im Browser mit den freigegebenen Kontaktinformationen.',
      url: 'https://bag-tag.de/de/finder-flow#kontakt',
    },
    {
      name: 'Sie kontaktieren',
      text: 'Der Finder sendet Ihnen eine Nachricht über das sichere Kontaktformular. Sie erhalten sofort eine Benachrichtigung.',
      url: 'https://bag-tag.de/de/finder-flow#benachrichtigung',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const howToSchema = generateHowToSchema({
    name: 'So funktioniert der Bag-Tag Finder-Prozess',
    description: 'Schritt-für-Schritt Anleitung, wie ein Finder Ihr verlorenes Gepäck zurückgeben kann.',
    image: 'https://bag-tag.de/assets/productimage.webp',
    steps: finderSteps,
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
                So hilft der Finder Ihnen
              </h1>
              <p className="text-xl text-gray-600">
                Der einfache Weg, verlorenes Gepäck zurückzugeben – datenschutzfreundlich
              </p>
            </header>

            <TldrSection
              title="Das Wichtigste in Kürze"
              points={[
                'Der Finder braucht keine App – einfach scannen und Browser öffnet sich',
                'Ihre privaten Daten bleiben geschützt – nur freigegebene Infos sind sichtbar',
                'Sie erhalten sofort eine Benachrichtigung, wenn Ihr Tag gescannt wird',
                'Sichere Kommunikation über das Bag-Tag System, keine direkten Kontaktdaten nötig',
              ]}
            />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 id="finden" className="text-3xl font-bold text-gray-900 mb-6">
                Schritt 1: Gepäck wird gefunden
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-8">
                <p className="text-gray-800 text-lg">
                  Ihr Koffer bleibt am Flughafen zurück, landet in einem falschen Hotel oder wird im Zug vergessen. 
                  Ein hilfsbereiter Finder entdeckt Ihren Bag-Tag am Gepäck.
                </p>
              </div>
              <p>
                Der Bag-Tag ist so gestaltet, dass er sofort auffällt. Das moderne Design und die klare Beschriftung 
                "Scan me to return" oder "Scannen zum Zurückgeben" signalisieren dem Finder, dass er das Gepäck 
                einfach zurückgeben kann.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Warum Menschen helfen:</p>
                <p className="text-gray-800">
                  Studien zeigen, dass über 85% der Menschen bereit sind zu helfen, wenn der Prozess einfach ist. 
                  Bag-Tag macht es so einfach wie möglich – ein kurzer Scan genügt.
                </p>
              </div>

              <h2 id="scannen" className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Schritt 2: Tag wird gescannt
              </h2>
              <p>
                Der Finder hat zwei Möglichkeiten, den Tag zu scannen:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    📱 NFC-Scan (schnellste Methode)
                  </h3>
                  <ol className="space-y-2 text-gray-700">
                    <li><strong>1.</strong> Smartphone an den Tag halten</li>
                    <li><strong>2.</strong> Automatische Erkennung</li>
                    <li><strong>3.</strong> Browser öffnet sich</li>
                  </ol>
                  <p className="text-sm text-gray-600 mt-4">
                    ⚡ Dauer: ~1 Sekunde
                  </p>
                </div>
                <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-900 mb-4">
                    📷 QR-Code-Scan (Fallback)
                  </h3>
                  <ol className="space-y-2 text-gray-700">
                    <li><strong>1.</strong> Kamera-App öffnen</li>
                    <li><strong>2.</strong> QR-Code scannen</li>
                    <li><strong>3.</strong> Link antippen</li>
                  </ol>
                  <p className="text-sm text-gray-600 mt-4">
                    ⚡ Dauer: ~3-5 Sekunden
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">✅ Keine App-Installation erforderlich</p>
                <p className="text-gray-800">
                  Der größte Vorteil: Der Finder muss keine App herunterladen oder installieren. Das erhöht die 
                  Wahrscheinlichkeit drastisch, dass Ihr Gepäck zurückgegeben wird.
                </p>
              </div>

              <h2 id="kontakt" className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Schritt 3: Kontaktseite öffnet sich
              </h2>
              <p>
                Nach dem Scannen öffnet sich automatisch Ihre personalisierte Kontaktseite im Browser des Finders. 
                Diese Seite zeigt:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 my-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Was der Finder sieht:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <div>
                      <strong>Bestätigung:</strong> "Dieses Gepäck gehört [Ihr Name]"
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <div>
                      <strong>Kontaktformular:</strong> Einfaches Nachrichtenfeld zum Senden einer Mitteilung
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <div>
                      <strong>Optional:</strong> Zusätzliche Infos wie Reiseziel, wenn Sie diese freigegeben haben
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-6 my-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Was der Finder NICHT sieht:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <div>
                      <strong>Ihre Telefonnummer</strong> (außer Sie haben sie explizit freigegeben)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <div>
                      <strong>Ihre E-Mail-Adresse</strong> (außer Sie haben sie explizit freigegeben)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <div>
                      <strong>Ihre Heimadresse</strong> (niemals sichtbar)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <div>
                      <strong>Weitere persönliche Daten</strong> (bleiben immer privat)
                    </div>
                  </li>
                </ul>
              </div>

              <h2 id="benachrichtigung" className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Schritt 4: Sie werden benachrichtigt
              </h2>
              <p>
                Sobald der Finder auf "Nachricht senden" klickt, passiert Folgendes:
              </p>
              
              <div className="space-y-4 my-8">
                <div className="flex items-start bg-white border-2 border-blue-200 rounded-lg p-4">
                  <span className="text-2xl mr-4">📧</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">E-Mail-Benachrichtigung</h4>
                    <p className="text-gray-700">
                      Sie erhalten sofort eine E-Mail mit der Nachricht des Finders und weiteren Details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-white border-2 border-green-200 rounded-lg p-4">
                  <span className="text-2xl mr-4">📱</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Push-Benachrichtigung (optional)</h4>
                    <p className="text-gray-700">
                      Wenn aktiviert, erhalten Sie auch eine Push-Nachricht auf Ihrem Smartphone.
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-white border-2 border-purple-200 rounded-lg p-4">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Standort-Info (wenn verfügbar)</h4>
                    <p className="text-gray-700">
                      Falls der Finder seinen Standort teilt, sehen Sie ungefähr, wo Ihr Gepäck gefunden wurde.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Schritt 5: Rückgabe koordinieren
              </h2>
              <p>
                Jetzt können Sie mit dem Finder kommunizieren und die Rückgabe organisieren:
              </p>
              <ul>
                <li><strong>Antworten:</strong> Sie können direkt über das Bag-Tag System antworten</li>
                <li><strong>Treffpunkt vereinbaren:</strong> Hotel, Flughafen, oder andere öffentliche Orte</li>
                <li><strong>Alternative Optionen:</strong> Versand, Abgabe bei Lost & Found, etc.</li>
                <li><strong>Dankeschön:</strong> Option, dem Finder eine Belohnung anzubieten (optional)</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Beispiel-Szenarien
              </h2>
              
              <div className="space-y-6 my-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    🛫 Szenario 1: Flughafen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Ihr Koffer bleibt am Gepäckband in München zurück. Ein anderer Reisender findet ihn 30 Minuten später.
                  </p>
                  <div className="bg-white rounded p-4 text-sm">
                    <p className="font-semibold mb-2">Ablauf:</p>
                    <ol className="space-y-1 text-gray-700">
                      <li>✓ Finder scannt den Bag-Tag (10 Uhr)</li>
                      <li>✓ Sie erhalten Benachrichtigung (10:01 Uhr)</li>
                      <li>✓ Finder gibt Koffer bei Lost & Found ab</li>
                      <li>✓ Sie holen ihn beim nächsten Flug ab – oder lassen ihn zu Ihnen senden</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    🏨 Szenario 2: Hotel
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Sie vergessen Ihren Rucksack im Hotelzimmer in Barcelona. Das Reinigungspersonal findet ihn.
                  </p>
                  <div className="bg-white rounded p-4 text-sm">
                    <p className="font-semibold mb-2">Ablauf:</p>
                    <ol className="space-y-1 text-gray-700">
                      <li>✓ Hotelmitarbeiter scannt den Tag</li>
                      <li>✓ Sie sehen: "Gefunden im Hotel Marina, Barcelona"</li>
                      <li>✓ Hotel bietet an, den Rucksack zu verwahren oder zu versenden</li>
                      <li>✓ Sie entscheiden über die beste Option</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    🚆 Szenario 3: Zug
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Ihre Reisetasche bleibt im ICE von Hamburg nach Berlin liegen. Ein Mitreisender bemerkt es.
                  </p>
                  <div className="bg-white rounded p-4 text-sm">
                    <p className="font-semibold mb-2">Ablauf:</p>
                    <ol className="space-y-1 text-gray-700">
                      <li>✓ Mitreisender scannt den Bag-Tag</li>
                      <li>✓ Nachricht: "Habe Ihre Tasche, steige in Berlin aus"</li>
                      <li>✓ Sie vereinbaren Treffpunkt am Berliner Hauptbahnhof</li>
                      <li>✓ Erfolgreiche Rückgabe – Krise abgewendet!</li>
                    </ol>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Datenschutz & Sicherheit
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">
                  🔒 Ihre Daten sind sicher
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Keine persönlichen Daten auf dem physischen Tag</li>
                  <li>✓ Sie kontrollieren, was Finder sehen können</li>
                  <li>✓ Kommunikation läuft über sichere Bag-Tag Server</li>
                  <li>✓ Ihre E-Mail-Adresse bleibt verborgen (außer Sie geben sie frei)</li>
                  <li>✓ GDPR-konform, Server in Deutschland</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Häufige Fragen
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Was passiert, wenn der Finder kein Smartphone hat?
                  </h3>
                  <p className="text-gray-700">
                    Der Finder kann den QR-Code auch mit einem Tablet oder Computer scannen. Alternativ steht eine 
                    Hotline-Nummer auf dem Tag für den Notfall.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Kann ich sehen, wer meinen Tag gescannt hat?
                  </h3>
                  <p className="text-gray-700">
                    Sie sehen nur die Informationen, die der Finder freiwillig teilt (Name, Nachricht, ggf. Standort). 
                    Die Privatsphäre wird auf beiden Seiten respektiert.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Was, wenn jemand meinen Tag aus Spaß scannt?
                  </h3>
                  <p className="text-gray-700">
                    Sie erhalten eine Benachrichtigung mit Zeitstempel und können entscheiden, ob Sie reagieren möchten. 
                    Missbräuchliche Scans können Sie melden.
                  </p>
                </div>
              </div>
            </section>

            <RelatedLinksSection links={relatedLinks} />
            
            <CtaSection
              title="Machen Sie Ihr Gepäck findbar"
              description="Bestellen Sie jetzt Ihren Bag-Tag und reisen Sie sorgenfrei."
              buttonText="Jetzt schützen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
