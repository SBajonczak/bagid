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
import { generateBreadcrumbSchema, generateArticleSchema, generateFAQPageSchema } from '@/lib/schema-utils';

const pageUrl = 'https://bag-tag.de/de/ratgeber/reisen-mit-kindern-gepaeck-sichern';
const pageTitle = 'Reisen mit Kindern: Gepäck sichern & organisieren | Ratgeber 2026';
const pageDescription = 'Praktische Tipps für Familien: Kindergepäck kennzeichnen, vor Verlust schützen und stressfrei verreisen. Mit Checkliste und NFC-Kofferanhängern für Kinder.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'Reisen mit Kindern Gepäck, Kinderkoffer kennzeichnen, Gepäck Kinder sichern, Familienurlaub Gepäck, Kofferanhänger Kinder, Kinderrucksack verloren, NFC Tag Kinder',
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
        alt: 'Reisen mit Kindern Gepäck Guide'
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
        'en': 'https://bag-tag.de/en/guides/traveling-with-kids-luggage-security',
        'x-default': 'https://bag-tag.de/en/guides/traveling-with-kids-luggage-security',
      },
    },
  };
}

export default function TravelWithKidsPage() {
  const relatedLinks = getRelatedLinks('guideTravelWithKids', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Reisen mit Kindern: Gepäck sichern', url: pageUrl },
  ];

  const tldrPoints = [
    'Farbcodierung: Jedes Kind eigene Farbe für Koffer und Rucksack',
    'NFC-Tags an Kindergepäck: Finder können Eltern kontaktieren ohne Adresse zu sehen',
    'Packliste für Kinder: Ersatzkleidung, Snacks, Spielzeug im Handgepäck',
    'Name innen UND außen: Zettel im Koffer, Tag am Griff',
    'Kinder-Checkliste: Vor Abflug gemeinsam kontrollieren, stärkt Verantwortung',
  ];

  const organizationSteps = [
    {
      title: 'Farbcodierung einführen',
      description: 'Weisen Sie jedem Familienmitglied eine Farbe zu: Mia = Rot, Tim = Blau, Mama = Grün. So erkennen alle sofort, welches Gepäck zu wem gehört – am Gepäckband, im Hotelzimmer, beim Packen. Nutzen Sie farbige Koffergurte, Anhänger oder Aufkleber. Auch die Bag-Tags können im Dashboard farblich markiert werden.',
    },
    {
      title: 'Kindergepäck sicher kennzeichnen',
      description: 'Kindername + Eltern-Kontakt an JEDEM Gepäckstück: Koffer, Rucksack, Kuscheltier-Tasche. Außen: NFC-Tag mit Eltern als Kontaktperson. Innen: Zettel mit "Gehört [Kindername], Eltern: [Tel/Email]". Wichtig: Keine vollständige Adresse – Sicherheitsrisiko!',
    },
    {
      title: 'Handgepäck intelligent packen',
      description: 'Jedes Kind ab 3 Jahren hat eigenen kleinen Rucksack mit: 1 Ersatz-Outfit, Snacks, Trinkflasche, Lieblings-Spielzeug, Kuscheltier. Vorteil: Kinder fühlen sich verantwortlich, und bei verlorenem Hauptgepäck haben Sie Essentials dabei.',
    },
    {
      title: 'Gepäckstück-Limit festlegen',
      description: 'Pro Kind maximal 2 Teile: 1 Koffer + 1 Rucksack. Mehr ist schwer zu überblicken. Kleinere Kinder (unter 5): nur Rucksack, Koffer zusammen mit Eltern-Gepäck. Klare Regel hilft bei Kontrolle am Flughafen und reduziert Verlust-Risiko.',
    },
    {
      title: 'Check-In Ritual etablieren',
      description: 'Vor dem Boarding gemeinsame Gepäck-Kontrolle: "Haben wir alles?" Kinder zählen ihr Gepäck laut mit. Das prägt sich ein und Kinder merken schnell, wenn etwas fehlt. Macht auch Spaß und stärkt Verantwortungsgefühl.',
    },
    {
      title: 'Fotos machen',
      description: 'Fotografieren Sie jedes Gepäckstück mit Kind vor der Reise. Bei Verlust haben Sie: klare Beschreibung für Lost & Found, Beweisfoto für Versicherung, Erinnerung für Kinder ("So sieht dein roter Koffer aus"). Speichern Sie die Fotos auf dem Smartphone.',
    },
  ];

  const faqItems = [
    {
      question: 'Ab welchem Alter können Kinder eigenes Gepäck tragen?',
      answer: 'Ab ca. 3-4 Jahren können Kinder einen kleinen Rucksack selbst tragen (max. 2-3 kg). Ab 6-7 Jahren auch einen kleinen Trolley ziehen. Wichtig: Nicht überladen! Kinder verlieren schnell Interesse an schwerem Gepäck.',
    },
    {
      question: 'Soll ich die vollständige Adresse auf den Kinderkoffer schreiben?',
      answer: 'Nein, aus Sicherheitsgründen NICHT die Wohnadresse nach außen schreiben. Nutzen Sie nur Vorname + Eltern-Telefon/E-Mail. Ein NFC-Tag ist ideal: Finder kontaktieren Sie, ohne die Adresse zu sehen.',
    },
    {
      question: 'Was gehört ins Kinder-Handgepäck?',
      answer: 'Ersatz-Outfit (falls Hauptgepäck verloren geht), Snacks und Getränke, Spielzeug/Tablet für Unterhaltung, Kuscheltier, evtl. Windeln/Feuchttücher für Kleinkinder. Medikamente gehören ins Eltern-Handgepäck!',
    },
    {
      question: 'Wie verhindere ich, dass Kinder Gepäck im Hotel vergessen?',
      answer: 'Abends vor Abreise: gemeinsames Packen mit Checkliste. Morgens: Gepäck vor die Zimmertür stellen (visueller Check). NFC-Tag hilft auch hier: Hotelpersonal kann Sie kontaktieren, wenn etwas liegen bleibt.',
    },
    {
      question: 'Sind NFC-Tags sicher für Kleinkinder?',
      answer: 'Ja, absolut. NFC-Tags haben keine Batterie (keine Verschluckungsgefahr), keine scharfen Kanten und sind robust. Dennoch: Befestigen Sie den Tag außerhalb der Reichweite von Kleinkindern (z.B. an Griffen, nicht an Außentaschen).',
    },
    {
      question: 'Was tun, wenn Kinderkoffer am Flughafen verloren geht?',
      answer: 'Sofort zum Lost & Found. Zeigen Sie das Foto des Koffers. Oft haben Flughäfen spezielle "Kids Lost & Found" mit Spielzeug zur Überbrückung. Wenn der Koffer einen NFC-Tag hat, werden Sie kontaktiert sobald er gefunden wird.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = generateFAQPageSchema(faqItems);
  const articleSchema = generateArticleSchema({
    headline: pageTitle,
    description: pageDescription,
    author: 'Bag-Tag Team',
    datePublished: '2026-01-20',
    dateModified: '2026-02-05',
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
                Reisen mit Kindern: Gepäck sichern & organisieren
              </h1>
              <p className="text-xl text-gray-600">
                Schluss mit Gepäck-Chaos! Praktische Strategien, wie Sie Kinder-Gepäck clever organisieren und vor Verlust schützen.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Warum Kinder-Gepäck oft verloren geht</h2>
              <p className="text-gray-700 mb-4">
                Familienreisen sind wundervoll – aber stressig. Mit Kindern im Flugzeug, quengelnden Kleinkindern 
                und mehreren Gepäckstücken geht schnell etwas verloren. Statistisch verlieren Familien 3x häufiger Gepäck als Einzelreisende.
              </p>
              <p className="text-gray-700 mb-4">
                Häufigste Gründe:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Zu viele verschiedene Gepäckstücke – Überblick geht verloren</li>
                <li>Kinder vergessen Rucksack im Flugzeug oder am Gate</li>
                <li>Ähnliche Kinderkoffer werden am Gepäckband verwechselt</li>
                <li>Hektik beim Boarding – etwas bleibt liegen</li>
                <li>Hotel Check-out: Spielzeug oder Kleidung wird vergessen</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Eltern-Tipp:</p>
                <p className="text-gray-700">
                  Führen Sie eine "Gepäck-Check" Routine ein: Vor jedem Ortswechsel (Flugzeug, Hotel, Mietwagen) 
                  zählen alle gemeinsam laut die Gepäckstücke. Kinder lernen so, auf ihre Sachen zu achten.
                </p>
              </div>
            </section>

            <StepSection steps={organizationSteps} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Packliste für Kinder-Gepäck</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Handgepäck (Rucksack, ab 3 Jahre)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>1 Ersatz-Outfit (T-Shirt, Hose, Unterwäsche)</li>
                <li>Snacks in Tüte (Müsliriegel, Kekse, Obst)</li>
                <li>Leere Trinkflasche (nach Sicherheitskontrolle füllen)</li>
                <li>Lieblings-Kuscheltier oder -Spielzeug (gegen Langeweile)</li>
                <li>Malbuch + Stifte (oder Tablet mit Kopfhörern)</li>
                <li>Kleines Kissen oder Decke für langen Flug</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Aufgabe-Gepäck (Koffer, ab 6 Jahre)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Kleidung für Reisedauer (in Packwürfeln organisiert)</li>
                <li>Schuhe (in Beutel getrennt)</li>
                <li>Hygiene-Artikel (Zahnbürste, Shampoo in verschließbarem Beutel)</li>
                <li>Badehose/Badeanzug</li>
                <li>Leichte Jacke oder Pullover</li>
                <li>Ersatz-Spielzeug (falls Hauptspielzeug im Handgepäck verloren geht)</li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">⚠️ Wichtig:</p>
                <p className="text-gray-700">
                  Lebensnotwendige Medikamente, Inhalatoren oder spezielle Nahrung gehören ins ELTERN-Handgepäck! 
                  Kinder vergessen Taschen eher, und Aufgabe-Gepäck kann verloren gehen.
                </p>
              </div>
            </section>

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">NFC-Tags für Kindergepäck</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Warum NFC-Tags ideal für Kinder sind</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Keine Batterie:</strong> Kein Verschluckrisiko, keine Wartung</li>
                <li><strong>Robust:</strong> Übersteht raue Behandlung durch Kinder</li>
                <li><strong>Datenschutz:</strong> Finder sehen nur Eltern-Kontakt, keine Wohnadresse</li>
                <li><strong>Einfach:</strong> Kinder können selbst zeigen, wie man scannt (fühlen sich groß!)</li>
                <li><strong>Günstig:</strong> 10-15€ pro Tag – auch bei mehreren Kindern bezahlbar</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Wie Sie Tags für Kinder einrichten</h3>
              <p className="text-gray-700 mb-4">
                Bei der Registrierung des Kinder-Tags:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Tag-Name:</strong> "Mias roter Koffer" oder "Tims Dino-Rucksack"</li>
                <li><strong>Kontakt:</strong> Eltern-Handy + E-Mail (nicht die des Kindes!)</li>
                <li><strong>Nachricht:</strong> "Gehört meiner Tochter Mia (6 Jahre), bitte Eltern kontaktieren. Danke!"</li>
                <li><strong>Farbe im Dashboard:</strong> Passend zur Koffer-Farbe für schnelle Erkennung</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Kindgerechte Erklärung</h3>
              <p className="text-gray-700 mb-4">
                So erklären Sie Ihrem Kind den NFC-Tag:
              </p>
              <p className="text-gray-700 italic mb-4">
                "Das ist dein magischer Koffer-Aufkleber! Wenn jemand deine Tasche findet und nicht weiß, 
                wem sie gehört, hält er sein Handy dran – dann kann er Mama und Papa anrufen. 
                Aber er sieht nicht, wo wir wohnen. Cool, oder?"
              </p>
              <p className="text-gray-700">
                Kinder ab 5 Jahren verstehen das Konzept schnell und fühlen sich "sicherer" mit diesem "Special Tag".
              </p>
            </section>

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Gepäck-Organisation am Flughafen</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Check-in</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Zählen Sie laut alle Gepäckstücke vor dem Abgeben</li>
                <li>Jedes Kind sagt seinen Koffer-Farbe ("Meiner ist rot!")</li>
                <li>Fotografieren Sie Gepäckanhänger-Barcodes der Airline</li>
                <li>Prüfen Sie, ob Zielflughafen-Code korrekt ist (z.B. BCN für Barcelona)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Gepäckausgabe</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Stellen Sie sich gemeinsam ans Band – Kinder zeigen "ihren" Koffer</li>
                <li>Bei vielen Koffern: Ein Elternteil nimmt Gepäck vom Band, das andere passt auf Kinder auf</li>
                <li>Erst wenn ALLE Gepäckstücke da sind, zum Ausgang gehen</li>
                <li>Bei fehlendem Gepäck: Sofort zu Lost & Found, Kinder mitnehmen (verlieren sonst Geduld)</li>
              </ul>
            </section>

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Häufige Situationen & Lösungen</h2>
              
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Problem: Kind vergisst Rucksack im Flugzeug
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Vorbeugung:</strong> Vor dem Aussteigen fragen Sie jedes Kind: "Hast du deinen Rucksack?" 
                    Visueller Check: Schauen Sie unter den Sitz und ins Gepäckfach.
                  </p>
                  <p className="text-gray-700">
                    <strong>Notfall:</strong> Melden Sie sich sofort beim Boarding-Personal. Crew findet Rucksack oft noch vor Abflug. 
                    NFC-Tag hilft: Wenn Reinigungspersonal den Tag scannt, werden Sie kontaktiert.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Problem: Koffer sehen alle gleich aus (z.B. Disney-Motive)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Lösung:</strong> Machen Sie Ihren Kinderkoffer einzigartig:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Farbiger Koffergurt in Lieblingsfarbe</li>
                    <li>Persönliche Aufkleber (Name, Lieblings-Tier)</li>
                    <li>Buntes Tuch an den Griff binden</li>
                    <li>NFC-Tag mit individuellem Design</li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Problem: Kind will eigenen großen Koffer (kann ihn aber nicht tragen)
                  </h3>
                  <p className="text-gray-700">
                    <strong>Kompromiss:</strong> Kleiner Kinder-Trolley (Handgepäck-Größe) + Eltern übernehmen Aufgabe-Koffer. 
                    Vorteil: Kind fühlt sich selbstständig, aber Gepäck bleibt überschaubar. 
                    Ab 10 Jahren: eigener Aufgabe-Koffer okay.
                  </p>
                </div>
              </div>
            </section>

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkliste: Gepäck-Check vor Abreise</h2>
              
              <p className="text-gray-700 mb-4">
                Drucken Sie diese Liste aus oder speichern Sie sie auf dem Handy:
              </p>

              <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Einen Tag vor Abreise</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Alle Koffer & Rucksäcke an einem Ort sammeln</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Jedes Gepäckstück hat Name + Eltern-Kontakt (innen UND außen)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>NFC-Tags an allen Gepäckstücken befestigt und getestet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Fotos von allen Gepäckstücken gemacht (für Verlustmeldung)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Kinder wissen, welche Farbe ihr Gepäck hat</span>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Am Abreisetag</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Handgepäck gepackt (Ersatzkleidung, Snacks, Spielzeug)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Medikamente im Eltern-Handgepäck</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Kinder haben eigene kleine Tasche/Rucksack bei sich</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Wichtige Dokumente kopiert (Pass, Versicherung)</span>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Vor jedem Ortswechsel</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Laut gemeinsam Gepäckstücke zählen: "1, 2, 3, 4..."</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Jedes Kind bestätigt: "Ich habe meinen Rucksack!"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">☐</span>
                    <span>Visueller Check: Alles dabei? Nichts unter Sitzen?</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Spezielle Tipps nach Altersgruppe</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Kleinkinder (0-3 Jahre)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Kein eigenes Gepäck – Eltern tragen alles</li>
                <li>Wickeltasche mit NFC-Tag (oft liegen gelassen!)</li>
                <li>Buggy/Kinderwagen mit Adress-Tag versehen</li>
                <li>Lieblings-Kuscheltier mit Mini-Tag (falls es verloren geht)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Kindergartenkinder (3-6 Jahre)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Kleiner Rucksack (max. 2-3 kg) mit Lieblingssachen</li>
                <li>NFC-Tag außen am Rucksack + Namensschild innen</li>
                <li>Bunter Koffer (gemeinsam mit Eltern-Gepäck aufgegeben)</li>
                <li>Üben Sie zu Hause: "Was nimmst du mit? Was lässt du hier?"</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Schulkinder (6-12 Jahre)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Eigener kleiner Koffer + Rucksack möglich</li>
                <li>NFC-Tag an beiden Gepäckstücken</li>
                <li>Kind ist verantwortlich für seinen Rucksack</li>
                <li>Packen gemeinsam mit Checkliste – lernen Selbstständigkeit</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Teenager (13+ Jahre)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Komplett eigenständig – eigener Koffer und Handgepäck</li>
                <li>Eigener Bag-Tag Account möglich (mit Eltern-Zugriff)</li>
                <li>Verantwortung für Packliste und Gepäck-Check</li>
                <li>Notfall-Kontakte: Eltern UND eigene Nummer hinterlegen</li>
              </ul>
            </section>

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notfallplan: Was tun, wenn Kindergepäck verloren geht?</h2>
              
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>Ruhe bewahren:</strong> Erklären Sie dem Kind, dass der Koffer bald wiederkommt. 
                  Vermeiden Sie Panik – Kinder spüren Ihre Nervosität.
                </li>
                <li>
                  <strong>Lost & Found aufsuchen:</strong> Nehmen Sie das Kind mit (wartet ungern alleine). 
                  Viele Flughäfen haben Spielecken in der Nähe.
                </li>
                <li>
                  <strong>Kind einbinden:</strong> "Welche Farbe hat dein Koffer? Was ist drauf?" 
                  Kinder können oft Details besser beschreiben als Eltern.
                </li>
                <li>
                  <strong>Foto zeigen:</strong> Das vorher gemachte Gepäck-Foto beschleunigt die Suche enorm.
                </li>
                <li>
                  <strong>Ersatzkäufe:</strong> Kleidung und Notwendiges für Kind kaufen (Airline erstattet dies meist). 
                  Bewahren Sie Quittungen auf.
                </li>
                <li>
                  <strong>NFC-Tag hilft:</strong> Wenn Flughafenpersonal oder Finder den Tag scannt, 
                  werden Sie automatisch benachrichtigt.
                </li>
              </ol>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">👨‍👩‍👧‍👦 Eltern-Trick:</p>
                <p className="text-gray-700">
                  Packen Sie in jeden Koffer (auch Eltern-Gepäck) ein Ersatz-Outfit fürs Kind. 
                  So haben Sie immer frische Kleidung, egal welcher Koffer ankommt.
                </p>
              </div>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Bag-Tag für die ganze Familie"
              description="Schützen Sie Kinder-Gepäck mit NFC-Technologie – sicher, einfach und kindgerecht. Keine Batterie, kein Abo."
              buttonText="Jetzt Bag-Tag für Kinder kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
