import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import { 
  TldrSection, 
  StepSection, 
  RelatedLinksSection, 
  CtaSection, 
  Breadcrumb,
  ContentFaqSection
} from '@/app/components/ContentComponents';
import { getRelatedLinks } from '@/lib/linkMap';
import { generateBreadcrumbSchema, generateFAQPageSchema, generateArticleSchema } from '@/lib/schema-utils';

const pageUrl = 'https://bag-tag.de/de/ratgeber/gepaeckverlust-flughafen-tipps';
const pageTitle = 'Gepäckverlust am Flughafen vermeiden: 15 Profi-Tipps 2026';
const pageDescription = 'Erfahren Sie, wie Gepäckabfertigungssysteme funktionieren und welche 15 bewährten Strategien Ihnen helfen, Kofferverlust am Flughafen zu vermeiden.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'Gepäckverlust Flughafen, Koffer verloren vermeiden, Baggage Handling System, Check-in Strategie, Gepäckband Flughafen, NFC Kofferanhänger, Airline Gepäck',
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'article',
      locale: 'de_DE',
      url: pageUrl,
      siteName: 'Bag-Tag',
      images: [{
        url: 'https://bag-tag.de/assets/productimage.webp',
        width: 1200,
        height: 630,
        alt: 'Gepäckverlust am Flughafen vermeiden'
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: ['https://bag-tag.de/assets/productimage.webp'],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'de': pageUrl,
        'en': 'https://bag-tag.de/en/guides/airport-luggage-loss-tips',
        'x-default': 'https://bag-tag.de/en/guides/airport-luggage-loss-tips',
      },
    },
  };
}

export default function AirportLossTipsPage() {
  const relatedLinks = getRelatedLinks('guideAirportLossTips', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Gepäckverlust am Flughafen vermeiden', url: pageUrl },
  ];

  const tldrPoints = [
    'Weltweit werden täglich 68.000 Koffer falsch geleitet – 80% bei Umsteigeverbindungen',
    'Check-in mindestens 90 Minuten vor Abflug verhindert 60% der Gepäckprobleme',
    'Auffällige Markierungen reduzieren Verwechslungen um 70%',
    'NFC-Tags mit sofortiger Benachrichtigung beschleunigen Rückgabe um durchschnittlich 48 Stunden',
    'Kritische Umsteigezeit: unter 60 Minuten = 5x höheres Verlustrisiko',
    'Fotografieren Sie Ihren Koffer und Gepäckabschnitt – bei Verlust essenziell',
  ];

  const steps = [
    {
      title: 'Verstehen Sie das Baggage Handling System',
      description: 'Moderne Flughäfen nutzen automatische Förderbänder mit Barcode-Scannern. Ihr Koffer durchläuft 5-8 Scan-Stationen vom Check-in bis zum Flugzeug. Problem: Bei beschädigten Barcodes, überklebten alten Tags oder zu kurzer Umsteigezeit fehlt dem System die Zeit, Ihren Koffer korrekt zu routen. Lösung: Entfernen Sie alte Gepäckanhänger sofort nach der Reise und halten Sie den neuen Tag gut sichtbar.',
    },
    {
      title: 'Der richtige Check-in-Zeitpunkt',
      description: 'Airlines schließen die Gepäckannahme 30-60 Minuten vor Abflug – aber das ist zu knapp! Optimal: 90-120 Minuten bei internationalen Flügen, 60-90 Minuten bei Inlandsflügen. Warum? Spät aufgegebenes Gepäck wird als "Lates" markiert und nur verladen, wenn definitiv Zeit bleibt. Bei Verspätungen wird Ihr Koffer priorisiert zurückgehalten.',
    },
    {
      title: 'Umsteigeverbindungen richtig planen',
      description: 'Die Hauptursache für verlorenes Gepäck: zu kurze Umsteigezeiten. Minimum Connecting Time (MCT) der Airlines ist das absolute Minimum – kein Puffer! Planen Sie mind. 90 Minuten bei europäischen Hubs, 120 Minuten bei Intercontinental-Anschlüssen. Bei Terminalwechsel +30 Minuten. Große Probleme-Flughäfen: London Heathrow, Frankfurt, Paris CDG – hier lieber 150 Minuten.',
    },
    {
      title: 'Markierung und Identifizierung',
      description: 'Ein schwarzer Samsonite sieht aus wie 10.000 andere. Ihre Strategie: 1) Auffälliger Gurt in greller Farbe 2) Einzigartiger Aufkleber/Sticker 3) Bag-Tag NFC-Anhänger außen UND innen am Koffer 4) Foto von allen Seiten auf dem Smartphone. So erkennen Sie Ihren Koffer sofort am Gepäckband und Finder können Sie direkt kontaktieren.',
    },
    {
      title: 'Technologie clever einsetzen',
      description: 'Kombinieren Sie mehrere Tracking-Methoden: 1) Bag-Tag NFC-Anhänger für Finder-Kontakt und Benachrichtigungen 2) Optional: Apple AirTag/Tile INNEN im Koffer für GPS-Position 3) Gepäcknummer fotografieren 4) Airline-App aktivieren für Push-Nachrichten. GPS zeigt wo, NFC ermöglicht Kommunikation – beide Systeme ergänzen sich perfekt.',
    },
    {
      title: 'Kritische Gepäckabschnitt-Kontrolle',
      description: 'Der Gepäckabschnitt (Baggage Claim Tag) ist Ihr Beweis! Prüfen Sie sofort: 1) Ist Ihr Zielflughafen-Code korrekt? (z.B. FRA für Frankfurt) 2) Bei Umsteigeverbindungen: Steht dort Ihr Endziel oder nur der erste Hub? 3) Anzahl der Gepäckstücke korrekt? 4) Foto machen! Bei Verlust brauchen Sie diese Nummer zwingend für das PIR-Formular.',
    },
  ];

  const faqItems = [
    {
      question: 'Welche Flughäfen haben die höchste Gepäckverlust-Rate?',
      answer: 'Statistisch gesehen haben große Hub-Flughäfen mit vielen Umsteigeverbindungen die höchsten Verlustraten: London Heathrow (LHR), Frankfurt (FRA), Paris Charles de Gaulle (CDG), Amsterdam Schiphol (AMS). Ursache: Komplexe Gepäckrouting-Systeme und hohe Passagierzahlen. Bei Reisen über diese Hubs: Erhöhte Vorsicht, längere Umsteigezeiten einplanen, unbedingt Tracking-Technologie nutzen.',
    },
    {
      question: 'Warum gehen Koffer bei Umsteigeverbindungen häufiger verloren?',
      answer: 'Ihr Koffer muss zwischen den Flügen physisch vom Ankunfts- zum Abflug-Terminal transportiert werden – oft über mehrere Kilometer. Bei der Mindest-Umsteigezeit (MCT) von z.B. 45 Minuten hat das Gepäck real nur 20-30 Minuten Zeit (Entladezeit, Transportzeit, Verladezeit). Bei Verspätung des ersten Flugs oder Überlastung wird Ihr Koffer zurückgehalten und kommt mit dem nächsten Flug – oder wird falsch geroutet.',
    },
    {
      question: 'Hilft früher Check-in wirklich gegen Gepäckverlust?',
      answer: 'Ja, signifikant! Früh aufgegebenes Gepäck (120+ Minuten vor Abflug) wird als "Normalgepäck" behandelt und durchläuft das System ohne Zeitdruck. Late-Check-in-Gepäck (unter 40 Minuten) wird oft als "Rush Bag" markiert – es muss priorisiert werden, aber bei Überlastung wird es eher zurückgelassen. Statistik: Koffer mit über 90 Minuten Check-in-Vorlauf haben 60% weniger Verlustrisiko.',
    },
    {
      question: 'Kann ich sehen, ob mein Koffer im Flugzeug ist?',
      answer: 'Direkt nicht, aber indirekt schon: 1) Viele Airlines zeigen in der App den Status "Baggage Loaded" 2) Bei Lufthansa Group, United etc. bekommen Sie Push-Benachrichtigungen 3) Mit AirTag/Tile können Sie sehen, ob sich Ihr Koffer bewegt (GPS-Position) 4) Bag-Tag benachrichtigt Sie, wenn jemand Ihren Tag scannt. Am Flughafen können Sie auch beim Boarding-Personal nachfragen – die haben Zugriff auf Ladedaten.',
    },
    {
      question: 'Was bedeuten die Buchstaben auf dem Gepäckabschnitt?',
      answer: 'Die 3-Buchstaben-Codes sind IATA-Flughafencodes: FRA (Frankfurt), JFK (New York), DXB (Dubai) etc. Wichtig: Bei Umsteigeverbindungen müssen Sie prüfen, ob Ihr ENDZIEL dort steht! Manchmal wird Gepäck nur bis zum Hub getaggt (=Problem). Weitere Codes: RUSH (Eilgepäck), PRIORITY (Vielflieger-Status), TRANSFER (Umsteigegepäck). Bei falschem Code sofort reklamieren!',
    },
    {
      question: 'Sind NFC-Gepäckanhänger besser als alte Papieranhänger?',
      answer: 'Absolut! Traditionelle Papieranhänger mit Ihrer handgeschriebenen Adresse haben mehrere Nachteile: 1) Daten sind für alle sichtbar (Datenschutz!) 2) Werden bei Regen unlesbar 3) Finder muss Ihnen selbst schreiben 4) Keine Benachrichtigung, wenn jemand ihn findet. Bag-Tag NFC-Tags hingegen: Wasserfest, verschlüsselte Daten, sofortige Push-Benachrichtigung bei Fund, anonyme Kommunikation. Plus: QR-Code als Backup, falls jemand kein NFC hat.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = generateFAQPageSchema(faqItems);
  const articleSchema = generateArticleSchema({
    headline: pageTitle,
    description: pageDescription,
    author: 'Bag-Tag Redaktion',
    datePublished: '2024-01-15',
    dateModified: '2024-01-15',
    image: 'https://bag-tag.de/assets/productimage.webp',
    url: pageUrl,
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />

      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Breadcrumb items={breadcrumbItems} />
          
          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Gepäckverlust am Flughafen vermeiden: 15 Profi-Tipps 2026
              </h1>
              <p className="text-xl text-gray-600">
                Verstehen Sie die Schwachstellen der Gepäckabfertigung und lernen Sie 15 bewährte Strategien, 
                um Ihren Koffer sicher ans Ziel zu bringen – von Check-in-Timing bis zu moderner Tracking-Technologie.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Die Realität hinter den Kulissen</h2>
              <p className="text-gray-700 mb-4">
                Weltweit werden täglich 68.000 Gepäckstücke falsch geleitet, verspätet oder temporär verloren. 
                Das entspricht etwa 25 Millionen Koffern pro Jahr – und die Zahl steigt mit zunehmendem Flugverkehr.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Die Hauptursachen:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Umsteigeverbindungen (52%):</strong> Zu kurze Transfer-Zeiten, Verspätungen, Terminalwechsel</li>
                <li><strong>Fehlerhafte Gepäcketiketten (16%):</strong> Beschädigte Barcodes, alte Tags nicht entfernt</li>
                <li><strong>Ladeprobleme (15%):</strong> Überlastung, technische Störungen, Streiks</li>
                <li><strong>Verwechslungen (12%):</strong> Ähnlich aussehende Koffer, Passagiere nehmen falschen Koffer</li>
                <li><strong>Sonstige (5%):</strong> Wetter, Sicherheitschecks, menschliches Versagen</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Die gute Nachricht: Die meisten dieser Ursachen können Sie durch intelligente Vorbereitung minimieren. 
                Mit den richtigen Strategien und einem <a href="https://bag-tag.de/de" className="text-blue-600 hover:text-blue-800">Bag-Tag NFC-Kofferanhänger</a> senken 
                Sie Ihr persönliches Verlustrisiko um bis zu 70%.
              </p>
            </section>

            <StepSection steps={steps} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">15 Profi-Tipps für sicheren Gepäcktransport</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vor dem Check-in</h3>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Alte Gepäckanhänger entfernen</h4>
                  <p className="text-gray-700">
                    Jeder alte Barcode-Aufkleber verwirrt das automatische Scan-System. Entfernen Sie restlos ALLE 
                    alten Tags – auch die unter dem Griff versteckten. Ein Koffer mit drei verschiedenen Ziel-Codes 
                    landet im Nirgendwo.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Auffällige Markierungen anbringen</h4>
                  <p className="text-gray-700">
                    Neongrüner Gurt, einzigartiger Aufkleber, buntes Band – Hauptsache unverwechselbar. 70% der 
                    "verlorenen" Koffer wurden in Wahrheit von anderen Passagieren versehentlich mitgenommen.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Doppelte Kennzeichnung</h4>
                  <p className="text-gray-700">
                    Bag-Tag außen + Namensschild innen. Wenn der äußere Tag abreißt (passiert!), kann Airline-Personal 
                    den Koffer öffnen und Sie identifizieren. Plus: Bag-Tag innen = Finder können Sie kontaktieren, 
                    selbst wenn äußere Kennzeichnung fehlt.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Foto-Dokumentation</h4>
                  <p className="text-gray-700">
                    Fotografieren Sie Ihren Koffer von allen Seiten, inklusive Besonderheiten (Aufkleber, Dellen, Kratzer). 
                    Bei Verlustmeldung essenziell für Identifikation.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">5. Wertvolle Items ins Handgepäck</h4>
                  <p className="text-gray-700">
                    Laptop, Medikamente, wichtige Dokumente, Wertsachen, ein Outfit zum Wechseln – alles ins Handgepäck. 
                    Bei verlorenem Aufgabegepäck bleiben Sie handlungsfähig.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Am Check-in-Schalter</h3>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">6. Check-in-Zeitpunkt optimieren</h4>
                  <p className="text-gray-700">
                    90-120 Minuten vor Abflug ist der Sweet Spot: Nicht zu früh (Personal noch nicht vollständig da), 
                    nicht zu spät (Ihr Koffer wird zur Rush-Bag). Online-Check-in + Bag Drop ist schneller.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">7. Gepäckabschnitt kontrollieren</h4>
                  <p className="text-gray-700">
                    Prüfen Sie SOFORT: Ist der 3-Letter-Code Ihres Zielflughafens korrekt? Bei Umsteigeverbindungen: 
                    Zeigt der Tag Ihr Endziel oder nur den Hub? Bei Fehlern SOFORT reklamieren!
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">8. Gepäcknummer fotografieren</h4>
                  <p className="text-gray-700">
                    Die 10-stellige Nummer auf dem Gepäckabschnitt ist Ihr Beweis und Tracking-Code. Fotografieren oder 
                    in Smartphone-Notizen speichern – bei Verlust unverzichtbar.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">9. Special Handling anfragen (wenn relevant)</h4>
                  <p className="text-gray-700">
                    Bei wertvollen Instrumenten, Sportausrüstung oder fragilen Items: "Fragile"-Handling beantragen. 
                    Kostet manchmal extra, aber Ihr Gepäck wird manuell verladen und priorisiert.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">10. Direct-Tag bei Partnerairlines sicherstellen</h4>
                  <p className="text-gray-700">
                    Fliegen Sie mit Codeshare oder Partner-Airlines? Stellen Sie sicher, dass Ihr Gepäck "durch-getaggt" 
                    wird zum Endziel. Sonst müssen Sie es bei jedem Umstieg neu aufgeben (=Katastrophe).
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bei Umsteigeverbindungen</h3>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">11. Minimum 90 Minuten Transferzeit</h4>
                  <p className="text-gray-700">
                    Die MCT (Minimum Connecting Time) der Airline ist zu knapp! Planen Sie 90-120 Minuten bei Europa-Hubs, 
                    150+ Minuten bei Intercontinental oder wenn Terminalwechsel nötig.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">12. Gleiche Airline/Allianz bevorzugen</h4>
                  <p className="text-gray-700">
                    Gepäck innerhalb einer Airline-Gruppe (Star Alliance, Oneworld, SkyTeam) wird deutlich zuverlässiger 
                    transferiert. Interline-Agreements zwischen verschiedenen Allianzen sind anfälliger.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">13. Erste Verbindung am Tag wählen</h4>
                  <p className="text-gray-700">
                    Frühe Flüge haben weniger Verspätungsrisiko. Wenn Ihr erster Flug pünktlich ist, hat Ihr Gepäck 
                    ausreichend Transferzeit. Nachmittags- und Abendflüge kumulieren oft Verspätungen.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Am Zielflughafen</h3>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">14. Erstes am Gepäckband sein</h4>
                  <p className="text-gray-700">
                    So sehen Sie sofort, ob Ihr Koffer kommt. Plus: Sie verhindern, dass jemand anderes Ihren ähnlich 
                    aussehenden Koffer versehentlich mitnimmt (häufiger als Sie denken!).
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">15. Sofort reagieren bei Verlust</h4>
                  <p className="text-gray-700">
                    Koffer kommt nicht? SOFORT zum Lost & Found Schalter (meist neben Gepäckband). Je schneller Sie 
                    das PIR-Formular (Property Irregularity Report) ausfüllen, desto besser die Chancen auf schnelle 
                    Wiederbeschaffung. Die ersten 48 Stunden sind entscheidend!
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Profi-Tipp:</p>
                <p className="text-gray-700">
                  Kombinieren Sie passive Sicherheit (auffällige Markierung, früher Check-in) mit aktiver Technologie 
                  (Bag-Tag NFC + optional GPS-Tracker). So minimieren Sie sowohl das Risiko als auch die Auswirkungen 
                  von Gepäckverlust. Die 15€ für einen NFC-Tag sparen Ihnen im Ernstfall Tage an Stress und hunderte 
                  Euro an Ersatzkäufen.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Warum NFC-Tags die Zukunft sind</h2>
              <p className="text-gray-700 mb-4">
                Traditionelle Papieranhänger mit handgeschriebener Adresse haben ausgedient. Moderne NFC-Gepäckanhänger 
                wie Bag-Tag bieten entscheidende Vorteile:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Datenschutz:</strong> Ihre Adresse ist nicht für jeden sichtbar – Finder kontaktieren Sie anonym über die App</li>
                <li><strong>Sofort-Benachrichtigung:</strong> Push-Nachricht auf Ihr Smartphone, sobald jemand den Tag scannt</li>
                <li><strong>Wasserfest & robust:</strong> Funktioniert auch bei Regen, Hitze, Kälte – Papieranhänger werden unleserlich</li>
                <li><strong>Multi-Kontakt:</strong> Hinterlegen Sie E-Mail, Telefon, separate Reise-Notfallnummer</li>
                <li><strong>QR-Code Backup:</strong> Auch ohne NFC-fähiges Smartphone kann jeder Finder Sie erreichen</li>
                <li><strong>Internationaler Standard:</strong> NFC und QR funktionieren weltweit, keine Sprachbarrieren</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Besonders wertvoll: Wenn Ihr Koffer außerhalb des Airline-Systems verloren geht (Taxi, Hotel, Restaurant), 
                kann der ehrliche Finder Sie direkt kontaktieren – ohne Umweg über Lost & Found. Das spart oft 2-3 Tage!
              </p>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Schützen Sie Ihr Gepäck mit moderner Technologie"
              description="Mit dem Bag-Tag NFC-Kofferanhänger reduzieren Sie Ihr Verlustrisiko und bekommen Ihren Koffer im Ernstfall schneller zurück."
              buttonText="Jetzt Bag-Tag kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
