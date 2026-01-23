import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import { 
  TldrSection, 
  RelatedLinksSection, 
  CtaSection, 
  Breadcrumb,
  ContentFaqSection
} from '@/app/components/ContentComponents';
import { getRelatedLinks } from '@/lib/linkMap';
import { generateBreadcrumbSchema, generateArticleSchema, generateFAQPageSchema } from '@/lib/schema-utils';

const pageUrl = 'https://bag-tag.de/de/ratgeber/gepaeck-verlust-vermeiden';
const pageTitle = 'Gepäckverlust vermeiden: 12 Profi-Tipps für sicheres Reisen';
const pageDescription = 'So schützen Sie Ihr Gepäck vor Verlust: Praktische Tipps zur Vorbereitung, smarte Technologie und bewährte Strategien von Vielfliegern.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'Gepäckverlust vermeiden, Koffer schützen, Gepäck sicher, Kofferanhänger, NFC-Tag, Reise-Tipps, Gepäckverwechslung, Smart Luggage',
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
        alt: 'Gepäckverlust vermeiden - Profi-Tipps'
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
        'en': 'https://bag-tag.de/en/guides/prevent-luggage-loss',
        'x-default': 'https://bag-tag.de/en/guides/prevent-luggage-loss',
      },
    },
  };
}

export default function GepaeckVerlustVermeidenPage() {
  const relatedLinks = getRelatedLinks('gepaeck-verlust-vermeiden', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Gepäckverlust vermeiden', url: pageUrl },
  ];

  const tldrPoints = [
    'Verwenden Sie auffällige Koffer und kennzeichnen Sie diese innen UND außen',
    'Nutzen Sie moderne Technologie wie NFC-Tags oder GPS-Tracker',
    'Fotografieren Sie Ihren Koffer und erstellen Sie eine Packliste',
    'Bevorzugen Sie Direktflüge und planen Sie ausreichend Umsteigezeit ein',
    'Checken Sie Gepäck frühzeitig ein und prüfen Sie die Gepäckanhänger',
    'Vermeiden Sie ähnlich aussehende Standard-Koffer in Schwarz oder Dunkelblau',
  ];

  const faqItems = [
    {
      question: 'Wie hoch ist die Wahrscheinlichkeit, dass mein Koffer verloren geht?',
      answer: 'Statistisch geht ca. 1 von 150 Gepäckstücken verloren oder verspätet sich (ca. 0,67%). Das Risiko steigt bei Umsteigeverbindungen, in der Hauptreisezeit und bei langen Strecken. Die gute Nachricht: 95% der verspäteten Koffer werden innerhalb von 48 Stunden gefunden.',
    },
    {
      question: 'Sind teure Smart-Luggage-Koffer die Lösung?',
      answer: 'Nicht unbedingt. GPS-Tracker im Koffer können helfen, aber nur wenn der Akku geladen ist und in Flugzeugmodus. Ein einfacher NFC-Tag oder QR-Code wie Bag-Tag ist praktischer: batterielos, immer funktionsfähig, keine Probleme mit Flugsicherheit.',
    },
    {
      question: 'Sollte ich Wertsachen im Koffer versichern?',
      answer: 'Airlines haften nur bis ca. 1.500 € und oft nicht für Wertsachen. Transportieren Sie Elektronik, Schmuck und Dokumente im Handgepäck. Für besonders wertvolles aufgegebenes Gepäck können Sie eine Zusatzversicherung abschließen oder eine "Excess Value Declaration" beim Check-in machen.',
    },
    {
      question: 'Wie funktionieren NFC-Tags am Koffer?',
      answer: 'Ein NFC-Tag (wie Bag-Tag) wird am Koffer befestigt. Finder scannen ihn mit ihrem Smartphone und können Sie anonym kontaktieren – ohne Ihre Adresse zu sehen. Sie erhalten eine Benachrichtigung. Das funktioniert weltweit, ohne Akku und ohne App-Zwang.',
    },
    {
      question: 'Was ist besser: NFC oder QR-Code?',
      answer: 'Ideal ist beides – genau das bietet Bag-Tag. NFC funktioniert besonders einfach (nur Smartphone dranhalten), QR-Codes funktionieren mit jedem Smartphone ohne NFC-Chip. Zusammen erreichen Sie die meisten Finder.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = generateFAQPageSchema(faqItems);
  const articleSchema = generateArticleSchema({
    headline: pageTitle,
    description: pageDescription,
    image: 'https://bag-tag.de/og-image-prevent-loss.jpg',
    datePublished: '2024-01-15',
    dateModified: '2024-01-15',
    author: 'Bag-Tag',
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
                Gepäckverlust vermeiden
              </h1>
              <p className="text-xl text-gray-600">
                Mit diesen 12 bewährten Strategien minimieren Sie das Risiko, dass Ihr Koffer verloren geht oder verwechselt wird.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Warum geht Gepäck überhaupt verloren?</h2>
              <p className="text-gray-700 mb-4">
                Weltweit werden jährlich über 25 Millionen Gepäckstücke falsch geleitet, verspätet oder verloren. 
                Die Hauptgründe:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Umsteigeverbindungen (58%):</strong> Zu kurze Umsteigezeit, Verspätungen, falsche Weitergabe</li>
                <li><strong>Etikettenfehler (15%):</strong> Falsche oder unleserliche Gepäckanhänger</li>
                <li><strong>Verwechslung (12%):</strong> Ähnlich aussehende Koffer werden vertauscht</li>
                <li><strong>Systemfehler (10%):</strong> Technische Probleme bei der Gepäckabfertigung</li>
                <li><strong>Sonstige (5%):</strong> Verlust außerhalb des Flughafens, Diebstahl</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Die gute Nachricht: Die meisten dieser Ursachen können Sie durch Vorbereitung minimieren.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">📊 Statistik:</p>
                <p className="text-gray-700">
                  Laut SITA Baggage IT Insights 2023 sank die Rate falsch gehandhabter Gepäckstücke auf 7 pro 1.000 Passagiere. 
                  Das Risiko ist bei Direktflügen nur 0,3%, steigt aber bei Umsteigeverbindungen auf bis zu 2%.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Die 12 besten Tipps zur Gepäcksicherung</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">1. Auffälliges Kofferdesign wählen</h3>
              <p className="text-gray-700 mb-4">
                Schwarze und dunkelblaue Koffer dominieren die Gepäckbänder – und werden am häufigsten verwechselt. 
                Setzen Sie auf:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Helle, leuchtende Farben (Rot, Orange, Türkis)</li>
                <li>Auffällige Muster oder Designs</li>
                <li>Individuelle Aufkleber oder Bänder (bunt, unverwechselbar)</li>
                <li>Personalisierten Kofferanhänger mit eindeutigem Design</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">2. Doppelte Beschriftung (außen + innen)</h3>
              <p className="text-gray-700 mb-4">
                Äußere Kofferanhänger können abreißen. Sichern Sie sich doppelt ab:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Außen:</strong> Robuster Kofferanhänger mit Namen, Telefon, E-Mail (keine Adresse!)</li>
                <li><strong>Innen:</strong> Visitenkarte oder Zettel mit Kontaktdaten im Koffer</li>
                <li><strong>Tipp:</strong> Nutzen Sie berufliche Kontaktdaten, um Ihre Privatadresse zu schützen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">3. NFC-Tag oder QR-Code anbringen</h3>
              <p className="text-gray-700 mb-4">
                Moderne Technologie macht die Rückgabe einfacher:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Bag-Tag NFC-Anhänger:</strong> Finder scannen mit Smartphone, kontaktieren Sie anonym</li>
                <li><strong>Vorteil:</strong> Funktioniert weltweit, ohne App-Zwang, ohne Akku</li>
                <li><strong>Privatsphäre:</strong> Ihre Adresse bleibt geheim, nur Sie erhalten eine Nachricht</li>
                <li><strong>Benachrichtigung:</strong> Sie sehen sofort, wenn jemand den Tag scannt</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">4. Koffer fotografieren</h3>
              <p className="text-gray-700 mb-4">
                Ein Foto sagt mehr als 1000 Worte – besonders bei der Verlustmeldung:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Fotografieren Sie Ihren Koffer von allen Seiten (auch Details, Kratzer)</li>
                <li>Machen Sie ein Foto vom gepackten Inhalt</li>
                <li>Speichern Sie Fotos auf dem Smartphone (offline verfügbar)</li>
                <li>Erleichtert die Beschreibung bei Lost & Found enorm</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">5. Packliste erstellen und speichern</h3>
              <p className="text-gray-700 mb-4">
                Wichtig für Entschädigungsforderungen bei Verlust:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Listen Sie wertvolle Gegenstände auf (mit geschätztem Wert)</li>
                <li>Fotografieren Sie teure Items (z.B. neue Kleidung mit Preisetiketten)</li>
                <li>Speichern Sie Kaufbelege digital</li>
                <li>Legen Sie eine Kopie der Liste in den Koffer</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">6. Direktflüge bevorzugen</h3>
              <p className="text-gray-700 mb-4">
                Je weniger Umsteigevorgänge, desto geringer das Risiko:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Direktflug:</strong> Verlustrisiko nur 0,3%</li>
                <li><strong>1x Umsteigen:</strong> Risiko steigt auf ca. 1,5%</li>
                <li><strong>2x Umsteigen:</strong> Risiko über 3%</li>
                <li>Wenn Umsteigen nötig: Mindestens 90 Minuten Umsteigezeit einplanen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">7. Gepäckanhänger beim Check-in prüfen</h3>
              <p className="text-gray-700 mb-4">
                Kontrollieren Sie nach dem Aufgeben:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Flughafencode:</strong> Stimmt das Ziel? (3-Buchstaben-Code wie FRA, JFK)</li>
                <li><strong>Flugnummer:</strong> Ist es Ihr Flug?</li>
                <li><strong>Anzahl Gepäckstücke:</strong> Auf Boarding Pass vermerkt?</li>
                <li><strong>Alte Anhänger:</strong> Entfernen Sie alte Gepäckanhänger von früheren Flügen</li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">⚠️ Wichtig:</p>
                <p className="text-gray-700">
                  Alte Gepäckanhänger mit falschen Zielcodes sind eine häufige Ursache für Fehlleitung! 
                  Entfernen Sie diese immer vor dem Check-in.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">8. Früh einchecken</h3>
              <p className="text-gray-700 mb-4">
                Zeitdruck ist Gift für die Gepäckabfertigung:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Geben Sie Gepäck mindestens 60 Minuten vor Abflug auf</li>
                <li>Bei großen Flughäfen oder Hauptreisezeit: 90 Minuten</li>
                <li>Late Check-in erhöht das Risiko, dass Koffer nicht rechtzeitig verladen wird</li>
                <li>Online Check-in nutzen, dann am Gepäckschalter nur aufgeben</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">9. Wertsachen ins Handgepäck</h3>
              <p className="text-gray-700 mb-4">
                Airlines haften nicht für alle Gegenstände:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Immer ins Handgepäck:</strong> Laptop, Tablet, Kamera, Schmuck, Bargeld, Dokumente</li>
                <li><strong>Medikamente:</strong> Notwendige Medikamente für mindestens 2-3 Tage im Handgepäck</li>
                <li><strong>Wechselkleidung:</strong> 1-2 Outfits im Handgepäck (für Gepäckverspätung)</li>
                <li><strong>Wichtige Unterlagen:</strong> Reisepass, Tickets, Buchungsbestätigungen, Versicherungen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">10. TSA-Schloss verwenden</h3>
              <p className="text-gray-700 mb-4">
                Sichern Sie Ihren Koffer, ohne Kontrollen zu behindern:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>TSA-Schloss:</strong> US-Sicherheitsbehörden können es mit Generalschlüssel öffnen</li>
                <li><strong>Vorteil:</strong> Koffer bleibt verschlossen, wird aber nicht aufgebrochen bei Kontrollen</li>
                <li><strong>Schutz:</strong> Verhindert, dass Koffer versehentlich aufgeht oder Dritte hineingreifen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">11. Hauptreisezeit meiden</h3>
              <p className="text-gray-700 mb-4">
                Zu Stoßzeiten steigt das Gepäckverlust-Risiko:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Hochsaison:</strong> Juli/August, Weihnachten, Ostern – erhöhte Verlustrate</li>
                <li><strong>Alternative:</strong> Nebensaison oder Wochentage statt Wochenende</li>
                <li><strong>Frühe Flüge:</strong> Morgens sind Flughäfen weniger überlastet</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">12. Gepäckabschnitt aufbewahren</h3>
              <p className="text-gray-700 mb-4">
                Klein, aber unverzichtbar:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Der Gepäckabschnitt (Baggage Claim Tag) ist Ihr Eigentumsnachweis</li>
                <li>Ohne ihn wird die Rückgabe bei Verlust kompliziert</li>
                <li>Fotografieren Sie den Abschnitt zusätzlich</li>
                <li>Bewahren Sie ihn bis zur Gepäckausgabe am Zielort auf</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Technologie: GPS vs. NFC vs. QR-Code</h2>
              
              <div className="overflow-x-auto my-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Technologie</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Vorteile</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Nachteile</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">GPS-Tracker</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Echtzeit-Ortung möglich</li>
                          <li>Sie sehen Standort</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Braucht Akku (hält 1-7 Tage)</li>
                          <li>Teuer (50-150 €)</li>
                          <li>Monatliche Kosten für SIM</li>
                          <li>Flugverbote bei Lithium-Akkus</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">NFC-Tag</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Kein Akku nötig – ewig haltbar</li>
                          <li>Keine laufenden Kosten</li>
                          <li>Einfaches Scannen mit Smartphone</li>
                          <li>Anonymer Finder-Kontakt</li>
                          <li>Günstig (10-25 €)</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Keine Echtzeit-Ortung</li>
                          <li>Finder muss aktiv scannen</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">QR-Code</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Funktioniert mit jedem Smartphone</li>
                          <li>Kein NFC nötig</li>
                          <li>Sehr günstig (5-15 €)</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Manuelles Scannen nötig</li>
                          <li>Kann verschmutzen/beschädigen</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Bag-Tag (NFC + QR)</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-4 space-y-1">
                          <li><strong>Kombination beider Technologien</strong></li>
                          <li>Maximale Kompatibilität</li>
                          <li>Kein Akku, keine Folgekosten</li>
                          <li>Anonymer Kontakt</li>
                          <li>Benachrichtigung bei Scan</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Keine Echtzeit-Ortung</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Empfehlung:</p>
                <p className="text-gray-700">
                  Für die meisten Reisenden ist ein NFC-Tag mit QR-Code (wie Bag-Tag) die beste Lösung: 
                  Einfach, zuverlässig, günstig – und funktioniert ohne Akku oder Abo weltweit.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Packstrategien für mehr Sicherheit</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Die 50/50-Regel</h3>
              <p className="text-gray-700 mb-4">
                Bei Reisen zu zweit: Verteilen Sie die Kleidung auf beide Koffer. Wenn ein Koffer verloren geht, 
                hat jeder zumindest etwas zum Wechseln.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Carry-on Essentials</h3>
              <p className="text-gray-700 mb-4">
                Packen Sie ins Handgepäck, was Sie in den ersten 48 Stunden brauchen:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>1-2 Outfits (Unterwäsche, Socken, Shirt)</li>
                <li>Toilettenartikel (100ml-Flaschen)</li>
                <li>Wichtige Medikamente</li>
                <li>Wertsachen und Elektronik</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Farb-Kodierung für Familien</h3>
              <p className="text-gray-700 mb-4">
                Jedes Familienmitglied bekommt eine Farbe (Kofferband, Aufkleber). 
                So erkennt jeder sofort seinen Koffer am Gepäckband – weniger Verwechslungsgefahr.
              </p>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Maximale Sicherheit mit Bag-Tag"
              description="NFC + QR-Code: Doppelter Schutz für Ihr Gepäck. Batterielos, weltweit, anonym."
              buttonText="Bag-Tag entdecken"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
