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

const pageUrl = 'https://bag-tag.de/de/ratgeber/business-travel-gepaeck-sicherheit';
const pageTitle = 'Business Travel: Gepäcksicherheit für Geschäftsreisen 2026';
const pageDescription = 'Professionelle Tipps für sicheres Geschäftsgepäck: Dokumentenschutz, Tracking-Lösungen und was tun bei Gepäckverlust auf wichtigen Business-Trips.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'Business Travel, Geschäftsreise Gepäck, Vielflieger Gepäck, Gepäcksicherheit Business, NFC Kofferanhänger Business, Geschäftsreise Organisation',
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
        alt: 'Business Travel Gepäcksicherheit'
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
        'en': 'https://bag-tag.de/en/guides/business-travel-luggage-security',
        'x-default': 'https://bag-tag.de/en/guides/business-travel-luggage-security',
      },
    },
  };
}

export default function BusinessTravelPage() {
  const relatedLinks = getRelatedLinks('guideBusinessTravel', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Business Travel Gepäcksicherheit', url: pageUrl },
  ];

  const tldrPoints = [
    'Geschäftsreisende verlieren 3x häufiger Gepäck als Urlaubsreisende',
    'Dokumentensicherheit: Original-Verträge gehören ins Handgepäck, nie ins Aufgabegepäck',
    'NFC-Tags mit anonymem Kontakt schützen Ihre Business-Privatsphäre',
    'Backup wichtiger Präsentationen in Cloud und auf USB-Stick',
    'Check-in mindestens 90 Minuten vor Abflug bei internationalen Business-Trips',
    'Professionelle Gepäckverfolgung spart Zeit und Stress bei wichtigen Terminen',
  ];

  const steps = [
    {
      title: 'Dokumentenmanagement: Was wohin?',
      description: 'Verträge, Präsentationsunterlagen, Visa-Dokumente gehören IMMER ins Handgepäck. Scannen Sie alle wichtigen Dokumente und speichern Sie Kopien in der Cloud (OneDrive, Google Drive). Erstellen Sie einen verschlüsselten USB-Stick mit Backup-Präsentationen als Notfall-Lösung.',
    },
    {
      title: 'Professionelles Gepäck-Setup',
      description: 'Nutzen Sie einen hochwertigen Business-Trolley mit TSA-Schloss. Befestigen Sie einen Bag-Tag NFC-Anhänger außen UND einen zweiten innen. So können Finder Sie diskret kontaktieren, ohne Ihre geschäftlichen Details preiszugeben. Markieren Sie Ihren Koffer zusätzlich mit einem auffälligen, aber professionellen Band.',
    },
    {
      title: 'Smart Packing für Business',
      description: 'Packen Sie ein komplettes Business-Outfit ins Handgepäck: Hemd/Bluse, Hose/Rock, Socken, Unterwäsche. Bei wichtigen Meetings können Sie so notfalls ohne Koffer erscheinen. Laptop, Ladegeräte und Medikamente gehören ebenfalls ins Handgepäck.',
    },
    {
      title: 'Zeitmanagement am Flughafen',
      description: 'Business Traveler brauchen Buffer: Check-in 90 Minuten vor internationalen Flügen, 60 Minuten bei Inlandsflügen. Bei Umsteigeverbindungen mindestens 90-120 Minuten einplanen. Verspätetes Gepäck kann Sie wichtige Meetings kosten – Zeit ist wichtiger als Geld.',
    },
    {
      title: 'Tracking-Strategie',
      description: 'Fotografieren Sie Ihren Koffer und Gepäckabschnitt. Notieren Sie die Gepäcknummer in Ihrem Smartphone. Mit einem Bag-Tag erhalten Sie eine Benachrichtigung, wenn jemand Ihren Tag scannt. Aktivieren Sie Airline-Apps für Push-Benachrichtigungen zu Gepäckstatus.',
    },
    {
      title: 'Notfallplan bei Gepäckverlust',
      description: 'Speichern Sie Kontakte: Airline-Hotline, Hotel, Meeting-Partner, lokaler Assistent. Bei verlorenem Gepäck: Sofort PIR-Formular ausfüllen, Meeting-Partner informieren, bei Bedarf Ersatzkleidung kaufen (aufgabegepäck ist versichert bis 1.500€). Mit digitalem Kofferanhänger haben Sie bessere Chancen auf schnelle Rückgabe.',
    },
  ];

  const faqItems = [
    {
      question: 'Warum verlieren Business Traveler häufiger Gepäck?',
      answer: 'Geschäftsreisende haben oft knappe Umsteigezeiten, reisen zu Stoßzeiten und nutzen Anschlussflüge. Statistiken zeigen: Bei Umsteigezeit unter 60 Minuten steigt das Risiko für verspätetes Gepäck um 400%. Zudem reisen viele Business Traveler montags/freitags, wenn Flughäfen überlastet sind.',
    },
    {
      question: 'Kann ich AirTags in Business-Gepäck nutzen?',
      answer: 'Ja, AirTags sind erlaubt und helfen beim Tracking. ABER: Sie zeigen nur die Position, nicht den Kontakt zum Finder. Ein Bag-Tag NFC-Anhänger ermöglicht direkten, anonymen Kontakt – der Finder kann Sie erreichen, ohne Ihre Geschäftsadresse zu sehen. Das ist bei Business Travel wichtig für Privatsphäre.',
    },
    {
      question: 'Was tun bei verlorenem Gepäck vor wichtigem Meeting?',
      answer: 'Sofortmaßnahmen: 1) PIR-Formular am Flughafen ausfüllen 2) Meeting-Partner informieren (Transparenz ist besser als Ausreden) 3) Zum nächsten Kaufhaus: Hemd, Hose, Schuhe kaufen (bewahren Sie Quittungen!) 4) Hotel-Concierge um Hilfe bitten 5) Airline alle 6h kontaktieren. Mit Bag-Tag werden Sie informiert, wenn jemand Ihren Koffer findet.',
    },
    {
      question: 'Sind digitale Gepäckanhänger DSGVO-konform?',
      answer: 'Ja, Bag-Tag ist DSGVO-konform: Ihre Kontaktdaten werden verschlüsselt gespeichert. Der Finder sieht Ihre Daten NICHT – er kann nur eine Nachricht senden. Sie entscheiden, ob und wie Sie antworten. Für Business Traveler ideal: Keine Geschäftsadresse auf dem Koffer sichtbar, trotzdem erreichbar.',
    },
    {
      question: 'Wie schütze ich sensible Geschäftsdokumente im Gepäck?',
      answer: 'Regel 1: Originale NIE ins Aufgabegepäck! Nur Kopien oder bereits unterzeichnete, nicht-kritische Dokumente. Nutzen Sie einen abschließbaren Dokumentenkoffer im Handgepäck. Für elektronische Daten: Verschlüsselter USB-Stick + Cloud-Backup. Bei äußerst sensiblen Daten: Vorab per sicherem Kurier zum Zielort schicken.',
    },
    {
      question: 'Lohnt sich Vielfliegerstatus für Gepäcksicherheit?',
      answer: 'Absolut! Star Alliance Gold, Miles & More Senator etc. bedeuten: Priority Gepäckabfertigung (Ihr Koffer kommt ZUERST aufs Band), bevorzugte Behandlung bei Verlust, oft schnellere Wiederbeschaffung. Außerdem: Priority Boarding = mehr Handgepäck-Platz. Bei 20+ Flügen/Jahr rentiert sich der Status auch wegen besserer Gepäckhandhabung.',
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
                Business Travel: Gepäcksicherheit für Geschäftsreisen
              </h1>
              <p className="text-xl text-gray-600">
                Professionelles Gepäckmanagement für Geschäftsreisende: So schützen Sie wichtige Dokumente, 
                vermeiden kostspielige Verzögerungen und bleiben auch bei verlorenem Gepäck handlungsfähig.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Warum Geschäftsreisende besondere Anforderungen haben</h2>
              <p className="text-gray-700 mb-4">
                Als Business Traveler haben Sie nicht den Luxus, einen Tag auf verlorenes Gepäck zu warten. 
                Ein wichtiges Meeting, eine Präsentation vor Investoren, eine Vertragsunterzeichnung – all das 
                kann durch verspätetes Gepäck gefährdet werden.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Statistik:</strong> Geschäftsreisende verlieren mit einer 3x höheren Wahrscheinlichkeit 
                Gepäck als Urlaubsreisende. Der Grund: Mehr Umsteigeverbindungen, knappe Zeitfenster, häufigeres 
                Reisen zu Stoßzeiten (Montag morgens, Freitag abends).
              </p>
              <p className="text-gray-700 mb-6">
                Die Lösung liegt in professionellem Gepäckmanagement, intelligenten Tracking-Lösungen wie dem 
                <a href="https://bag-tag.de/de" className="text-blue-600 hover:text-blue-800"> Bag-Tag NFC-Kofferanhänger</a> und 
                einem soliden Notfallplan.
              </p>
            </section>

            <StepSection steps={steps} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kritische Fehler vermeiden</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Top 5 Fehler von Business Travelern</h3>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li><strong>Original-Dokumente im Aufgabegepäck:</strong> Niemals! Verträge, Visa, wichtige Unterlagen gehören ins Handgepäck.</li>
                  <li><strong>Nur ein Business-Outfit im Koffer:</strong> Immer ein komplettes Ersatz-Outfit ins Handgepäck packen.</li>
                  <li><strong>Keine Kontaktdaten am Koffer:</strong> Ein professioneller NFC-Tag ermöglicht anonymen Kontakt ohne Preisgabe Ihrer Geschäftsadresse.</li>
                  <li><strong>Zu knappe Umsteigezeiten:</strong> Unter 90 Minuten bei internationalen Anschlüssen = hohes Risiko.</li>
                  <li><strong>Keine Backups:</strong> Präsentationen nur auf Laptop = Katastrophe bei Geräteverlust. Cloud + USB-Stick sind Pflicht.</li>
                </ol>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Die richtige Ausrüstung</h3>
              <p className="text-gray-700 mb-4">
                Investieren Sie in Qualität – ein guter Business-Trolley hält Jahre und schützt Ihre wertvollen Inhalte:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Hochwertiger Hartschalenkoffer:</strong> Rimowa, Samsonite, Tumi – schützt Laptop und Elektronik</li>
                <li><strong>TSA-Schloss:</strong> Pflicht für USA-Reisen, verhindert gewaltsames Öffnen</li>
                <li><strong>Bag-Tag NFC-Kofferanhänger:</strong> Anonymer Kontakt, Benachrichtigungen, 2x am Gepäck (außen + innen)</li>
                <li><strong>Auffällige Markierung:</strong> Dezenter, aber erkennbarer Gurt in Firmenfarben</li>
                <li><strong>Gepäck-Tracker:</strong> Optional zusätzlich Apple AirTag oder Tile für GPS-Position</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Digitale Tools für Business Traveler</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Must-have Apps</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Airline-Apps</h4>
                  <p className="text-gray-700">Lufthansa, United, etc. – Push-Benachrichtigungen für Gepäckstatus, digitale Bordkarten, schnellere Gepäckmeldung</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Bag-Tag App</h4>
                  <p className="text-gray-700">Verwalten Sie Ihre NFC-Tags, erhalten Sie Benachrichtigungen wenn jemand Ihren Koffer findet, anonyme Kommunikation mit Findern</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">TripIt / Google Calendar</h4>
                  <p className="text-gray-700">Alle Flugdaten, Hotel-Kontakte, Meeting-Adressen zentral – bei Gepäckverlust sofort griffbereit</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Cloud-Storage</h4>
                  <p className="text-gray-700">OneDrive, Google Drive, Dropbox – alle wichtigen Dokumente synchronisiert, von überall abrufbar</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Spezialfall: Internationale Business Trips</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Zoll und Dokumentation</h3>
              <p className="text-gray-700 mb-4">
                Bei internationalen Reisen mit teurer Ausrüstung (Laptop, Kamera, Messegeräte):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Nämlichkeitsbescheinigung:</strong> Beim deutschen Zoll kostenlos ausstellen lassen (beweist, dass Geräte aus Deutschland stammen)</li>
                <li><strong>Rechnungen mitnehmen:</strong> Kaufbelege für teure Ausrüstung im Handgepäck</li>
                <li><strong>Carnet ATA:</strong> Für wiederholte Grenzübertritte mit Mustern/Equipment (IHK)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Versicherungen für Business Travel</h3>
              <p className="text-gray-700 mb-4">
                Standard-Airline-Haftung (1.500 €) reicht bei Business-Gepäck oft nicht:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Business-Reiseversicherung:</strong> Deckt höherwertige Gepäckinhalte (5.000-10.000 €)</li>
                <li><strong>Firmen-Rahmenvertrag:</strong> Viele Unternehmen haben Gruppenversicherungen für Geschäftsreisende</li>
                <li><strong>Kreditkarten-Schutz:</strong> Premium-Kreditkarten (Amex Platinum, Visa Infinite) bieten oft automatischen Reiseschutz</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Profi-Tipp:</p>
                <p className="text-gray-700">
                  Erstellen Sie eine digitale "Business Travel Emergency Card" mit allen wichtigen Kontakten, 
                  Versicherungsnummern, PIR-Prozess-Shortcuts. Als Screenshot auf dem Smartphone = im Notfall sofort verfügbar.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Wie Bag-Tag Business Traveler unterstützt</h2>
              <p className="text-gray-700 mb-4">
                Der Bag-Tag NFC-Kofferanhänger wurde mit Business Travelern im Hinterkopf entwickelt:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Anonymität:</strong> Finder sehen Ihre Geschäftsadresse nicht – Sie können eine separate Business-E-Mail hinterlegen</li>
                <li><strong>Sofort-Benachrichtigung:</strong> Push-Nachricht wenn jemand Ihren Tag scannt – Sie wissen sofort Bescheid</li>
                <li><strong>Multi-Device:</strong> Verwalten Sie mehrere Tags (Handgepäck, Aufgabegepäck, Laptop-Tasche) in einer App</li>
                <li><strong>Internationale Funktion:</strong> QR + NFC funktioniert weltweit, keine Sprachbarrieren</li>
                <li><strong>Diskretes Design:</strong> Professionell, nicht wie billiger Plastikhänger</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Besonders wertvoll: Wenn Ihr Koffer außerhalb des Airline-Systems verloren geht (Taxi, Hotel-Shuttle, 
                Konferenzraum), kann der Finder Sie direkt erreichen. Das spart bei wichtigen Business Trips entscheidende Stunden.
              </p>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Schützen Sie Ihr Business-Gepäck professionell"
              description="Investieren Sie in Sicherheit: Mit Bag-Tag bleiben Sie auch bei verlorenem Gepäck handlungsfähig und schützen Ihre geschäftliche Privatsphäre."
              buttonText="Bag-Tag für Business kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
