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
import { generateBreadcrumbSchema, generateHowToSchema, generateFAQPageSchema } from '@/lib/schema-utils';

const pageUrl = 'https://bag-tag.de/de/ratgeber/koffer-verloren-was-tun';
const pageTitle = 'Koffer verloren - was tun? Sofort-Hilfe & Entschädigung';
const pageDescription = 'Ihr Koffer ist weg? Hier finden Sie die wichtigsten Schritte bei verlorenem Gepäck: Meldung, Rechte, Entschädigung und wie Bag-Tag hilft.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'Koffer verloren, Gepäck verloren, verlorenes Gepäck, Gepäckverlust melden, Entschädigung Gepäckverlust, Fluggastrechte, Lost and Found Flughafen',
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'article',
      locale: 'de_DE',
      url: pageUrl,
      siteName: 'Bag-Tag',
      images: [{
        url: 'https://bag-tag.de/og-image-lost-luggage.jpg',
        width: 1200,
        height: 630,
        alt: 'Koffer verloren - Sofort-Hilfe Guide'
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: ['https://bag-tag.de/og-image-lost-luggage.jpg'],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'de': pageUrl,
        'en': 'https://bag-tag.de/en/guides/lost-luggage-what-to-do',
        'x-default': 'https://bag-tag.de/en/guides/lost-luggage-what-to-do',
      },
    },
  };
}

export default function KofferVerlorenPage() {
  const relatedLinks = getRelatedLinks('koffer-verloren-was-tun', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Koffer verloren - was tun?', url: pageUrl },
  ];

  const tldrPoints = [
    'Melden Sie den Verlust sofort am Lost & Found Schalter am Flughafen',
    'Füllen Sie das PIR-Formular (Property Irregularity Report) vollständig aus',
    'Fotografieren Sie alle Dokumente und notieren Sie die PIR-Referenznummer',
    'Folgen Sie dem Status online und kontaktieren Sie die Airline nach 5-7 Tagen',
    'Sie haben Anspruch auf Entschädigung bis zu 1.500 € nach Montrealer Übereinkommen',
    'Mit einem Bag-Tag NFC-Kofferanhänger wird Ihr Gepäck schneller gefunden',
  ];

  const steps = [
    {
      title: 'Sofort am Flughafen: Lost & Found Schalter aufsuchen',
      description: 'Gehen Sie noch am Flughafen zum Gepäckermittlungsschalter (Lost & Found oder Baggage Service). Dieser befindet sich meist in der Nähe der Gepäckausgabe. Melden Sie den Verlust dort umgehend – je schneller, desto besser die Chancen.',
    },
    {
      title: 'PIR-Formular ausfüllen',
      description: 'Sie erhalten ein Property Irregularity Report (PIR) Formular. Füllen Sie dieses sorgfältig aus: Beschreiben Sie Ihren Koffer genau (Farbe, Marke, Größe, besondere Merkmale), listen Sie den Inhalt auf und geben Sie Ihre Kontaktdaten an. Die PIR-Referenznummer ist wichtig für alle weiteren Schritte.',
    },
    {
      title: 'Dokumentation sichern',
      description: 'Fotografieren Sie das ausgefüllte PIR-Formular und Ihren Gepäckabschnitt. Notieren Sie Namen und Kontaktdaten der Mitarbeiter. Bewahren Sie Ihren Boarding Pass und alle Belege auf – diese brauchen Sie für eventuelle Entschädigungsforderungen.',
    },
    {
      title: 'Online-Tracking nutzen',
      description: 'Die meisten Airlines bieten Online-Tracking mit Ihrer PIR-Nummer an. Prüfen Sie regelmäßig den Status. Falls Ihr Koffer einen Bag-Tag NFC-Anhänger hat, können ehrliche Finder Sie auch direkt kontaktieren – ohne Ihre Privatsphäre zu gefährden.',
    },
    {
      title: 'Nachfassen nach 5-7 Tagen',
      description: 'Wenn Ihr Gepäck nach einer Woche nicht aufgetaucht ist, kontaktieren Sie die Airline aktiv. Schreiben Sie eine E-Mail mit Ihrer PIR-Nummer und fordern Sie ein Update an. Behalten Sie alle Korrespondenz für spätere Entschädigungsforderungen.',
    },
    {
      title: 'Entschädigung geltend machen',
      description: 'Bei verspätetem Gepäck können Sie Ersatzkäufe (Kleidung, Toilettenartikel) geltend machen – bewahren Sie alle Quittungen auf. Bei dauerhaftem Verlust (nach 21 Tagen) steht Ihnen Entschädigung für Koffer und Inhalt zu. Reichen Sie alle Belege ein.',
    },
  ];

  const faqItems = [
    {
      question: 'Wie lange muss ich warten, bis ein Koffer als "verloren" gilt?',
      answer: 'Nach internationalem Recht gilt Gepäck nach 21 Tagen als endgültig verloren. Airlines suchen jedoch meist bis zu 100 Tage weiter. Statistisch werden 95% der verspäteten Koffer innerhalb von 48 Stunden gefunden.',
    },
    {
      question: 'Welche Entschädigung steht mir zu?',
      answer: 'Nach dem Montrealer Übereinkommen haften Airlines bis zu ca. 1.500 € für verlorenes Gepäck. Bei verspätetem Gepäck können Sie notwendige Ersatzkäufe (Kleidung, Hygieneartikel) geltend machen. Bewahren Sie alle Quittungen auf.',
    },
    {
      question: 'Was mache ich, wenn mein Anschlussflug mit anderer Airline war?',
      answer: 'Bei durchgebuchten Flügen ist immer die letzte Airline (die das Gepäck verloren hat) zuständig – auch wenn Sie bei einer anderen gebucht haben. Melden Sie den Verlust trotzdem am Zielflughafen.',
    },
    {
      question: 'Wie hilft ein Bag-Tag NFC-Anhänger?',
      answer: 'Ein Bag-Tag enthält NFC-Chip und QR-Code. Ehrliche Finder können Sie anonym kontaktieren – ohne Ihre Adresse zu sehen. Das beschleunigt die Rückgabe erheblich, besonders wenn der Koffer außerhalb des offiziellen Systems verloren geht.',
    },
    {
      question: 'Muss ich den Verlust auch schriftlich melden?',
      answer: 'Ja, melden Sie den Verlust innerhalb von 7 Tagen schriftlich bei der Airline (zusätzlich zum PIR am Flughafen). Nur so wahren Sie Ihre Ansprüche. Nutzen Sie E-Mail oder das Beschwerdeformular der Airline.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = generateFAQPageSchema(faqItems);
  const howToSchema = generateHowToSchema({
    name: 'Was tun bei verlorenem Koffer?',
    description: 'Schritt-für-Schritt Anleitung: So gehen Sie vor, wenn Ihr Koffer am Flughafen verloren gegangen ist.',
    image: 'https://bag-tag.de/og-image-lost-luggage.jpg',
    steps: steps.map(step => ({
      name: step.title,
      text: step.description,
    })),
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />

      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Breadcrumb items={breadcrumbItems} />
          
          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Koffer verloren - was tun?
              </h1>
              <p className="text-xl text-gray-600">
                Sofort-Hilfe bei verlorenem Gepäck: Die wichtigsten Schritte, Ihre Rechte und wie Sie schnell zu Ihrem Koffer zurückkommen.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Schritt-für-Schritt: So gehen Sie vor</h2>
              <p className="text-gray-700 mb-6">
                Jährlich gehen weltweit über 25 Millionen Gepäckstücke verloren oder verspäten sich. Die gute Nachricht: 
                95% werden innerhalb von 48 Stunden wiedergefunden. Entscheidend ist, dass Sie sofort richtig handeln.
              </p>
            </section>

            <StepSection steps={steps} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kontakt mit Flughafen & Airline</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Am Flughafen</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Gepäckermittlung/Lost & Found:</strong> Meist in der Nähe der Gepäckausgabe ausgeschildert</li>
                <li><strong>Öffnungszeiten:</strong> Oft rund um die Uhr, bei kleineren Flughäfen eingeschränkt</li>
                <li><strong>Was mitbringen:</strong> Boarding Pass, Gepäckabschnitt, Ausweis, PIR-Formular wird vor Ort ausgefüllt</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Airline kontaktieren</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Kundenservice:</strong> Hotline der Airline (Nummer auf Ihrer Buchungsbestätigung)</li>
                <li><strong>E-Mail:</strong> Schriftliche Meldung mit PIR-Nummer und Flugnummer</li>
                <li><strong>Social Media:</strong> Airlines reagieren oft schnell auf Twitter/Facebook-Anfragen</li>
                <li><strong>Online-Portal:</strong> Viele Airlines haben spezielle Gepäck-Tracking-Seiten</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Profi-Tipp:</p>
                <p className="text-gray-700">
                  Notieren Sie bei jedem Kontakt Datum, Uhrzeit, Name des Mitarbeiters und Gesprächsinhalt. 
                  Das hilft enorm, wenn Sie später Entschädigung fordern.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Ihre Rechte und Entschädigung</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Verspätetes Gepäck</h3>
              <p className="text-gray-700 mb-4">
                Wenn Ihr Koffer verspätet ankommt, haben Sie Anspruch auf Ersatz für notwendige Einkäufe:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Kleidung und Unterwäsche</li>
                <li>Hygieneartikel und Kosmetik</li>
                <li>Medikamente (falls im Koffer)</li>
                <li>Geschäftskleidung bei Geschäftsreisen</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>Wichtig:</strong> Kaufen Sie nur das Nötigste und bewahren Sie alle Quittungen auf. 
                Angemessene Beträge: 50-150 € für Kurzstrecke, bis 300 € für Langstrecke.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Endgültig verlorenes Gepäck</h3>
              <p className="text-gray-700 mb-4">
                Nach 21 Tagen gilt Gepäck als verloren. Die Airline haftet nach Montrealer Übereinkommen bis zu:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Ca. 1.500 € (1.288 SZR)</strong> für Koffer und Inhalt zusammen</li>
                <li>Berechnung: Zeitwert des Inhalts + Koffer (kein Neuwert!)</li>
                <li>Wertsachen sind meist nicht versichert (siehe AGB der Airline)</li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">⚠️ Wichtig:</p>
                <p className="text-gray-700">
                  Wertsachen (Schmuck, Elektronik, Dokumente) gehören ins Handgepäck! Airlines haften dafür meist nicht. 
                  Bei besonders wertvollem Gepäck können Sie eine Zusatzversicherung abschließen.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Gepäckverlust verhindern</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vorbereitung ist alles</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Kofferanhänger:</strong> Außen UND innen mit Kontaktdaten versehen</li>
                <li><strong>Bag-Tag NFC-Tag:</strong> Ehrliche Finder können Sie anonym kontaktieren</li>
                <li><strong>Foto des Koffers:</strong> Erleichtert die Beschreibung enorm</li>
                <li><strong>Packliste:</strong> Dokumentieren Sie wertvollen Inhalt (für Entschädigung)</li>
                <li><strong>Auffälliges Design:</strong> Farbiger Koffer oder auffällige Aufkleber helfen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Am Flughafen</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Check-in:</strong> Prüfen Sie, ob die richtigen Codes (Zielflughafen) auf dem Gepäckanhänger sind</li>
                <li><strong>Umsteigezeit:</strong> Mindestens 60-90 Minuten bei Anschlussflügen</li>
                <li><strong>Direktflüge:</strong> Bevorzugen Sie Direktverbindungen – weniger Umsteigevorgänge = weniger Risiko</li>
                <li><strong>Früh aufgeben:</strong> Geben Sie Gepäck nicht in letzter Minute ab</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Wie Bag-Tag hilft</h3>
              <p className="text-gray-700 mb-4">
                Ein Bag-Tag NFC-Kofferanhänger bietet doppelten Schutz:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>NFC-Chip:</strong> Mit dem Smartphone scanbar – Finder sehen Ihre Kontaktdaten nicht, können aber eine Nachricht senden</li>
                <li><strong>QR-Code:</strong> Funktioniert mit jedem Smartphone ohne NFC</li>
                <li><strong>Anonymer Kontakt:</strong> Ihre Privatsphäre bleibt geschützt</li>
                <li><strong>Notification:</strong> Sie werden sofort informiert, wenn jemand den Tag scannt</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Besonders wertvoll: Wenn Ihr Koffer außerhalb des offiziellen Systems verloren geht (z.B. im Taxi, Hotel), 
                kann der Finder Sie direkt erreichen – ohne Umweg über Lost & Found.
              </p>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Schützen Sie Ihr Gepäck mit Bag-Tag"
              description="Erhöhen Sie die Chancen, verlorenes Gepäck schnell wiederzufinden – mit NFC und QR-Code Technologie."
              buttonText="Jetzt Bag-Tag kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
