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

const pageUrl = 'https://bag-tag.de/de/ratgeber/smart-luggage-tag-2026-vergleich';
const pageTitle = 'Smart Luggage Tags 2026: Technologie-Vergleich & Kaufberatung';
const pageDescription = 'Umfassender Vergleich: NFC vs QR vs AirTag vs RFID Gepäckanhänger. Erfahren Sie, welche Technologie für Ihre Reisebedürfnisse optimal ist.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'Smart Luggage Tag Vergleich, NFC Gepäckanhänger, AirTag Koffer, RFID Tag, QR Code Kofferanhänger, Gepäck Tracking 2026, Bag-Tag',
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
        alt: 'Smart Luggage Tag Technologie Vergleich'
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
        'en': 'https://bag-tag.de/en/guides/smart-luggage-tag-2026-comparison',
        'x-default': 'https://bag-tag.de/en/guides/smart-luggage-tag-2026-comparison',
      },
    },
  };
}

export default function SmartTagComparisonPage() {
  const relatedLinks = getRelatedLinks('guideSmartTagComparison', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Smart Luggage Tags Vergleich', url: pageUrl },
  ];

  const tldrPoints = [
    'NFC-Tags ermöglichen direkte Kommunikation mit Findern – GPS-Tracker zeigen nur Position',
    'AirTags/Tiles sind GPS-Tracker, keine Kontakt-Lösung – beides kombinieren ist optimal',
    'QR-Codes funktionieren ohne App, aber ohne Benachrichtigung für Sie',
    'RFID wird von Airlines genutzt, nicht für Passagier-Tracking konzipiert',
    'Beste Lösung 2026: NFC + QR Kombination wie Bag-Tag (Kontakt + Backup)',
    'Batterie-Laufzeit: NFC = 5+ Jahre, AirTag = 1 Jahr, elektronische E-Ink Tags = 2 Jahre',
  ];

  const steps = [
    {
      title: 'NFC-Technologie: Kontakt ohne Kompromisse',
      description: 'Near Field Communication (NFC) ist die gleiche Technologie wie beim kontaktlosen Bezahlen. Jeder mit einem modernen Smartphone kann Ihren Tag antippen und sieht eine Nachricht-Option – OHNE Ihre persönlichen Daten zu sehen. Bag-Tag nutzt verschlüsselte Cloud-Verbindung: Finder sendet Nachricht, Sie entscheiden, ob/wie Sie antworten. Vorteile: Keine App nötig für Finder, keine Batterie (passiv), datenschutzkonform, international nutzbar. Batterie-Laufzeit: unbegrenzt (passiv).',
    },
    {
      title: 'GPS-Tracker (AirTag, Tile, Samsung SmartTag)',
      description: 'GPS-Tracker zeigen die Position Ihres Koffers in Echtzeit – aber NICHT, wer ihn hat oder wie Sie ihn zurückbekommen. Funktionieren über Bluetooth-Mesh: Andere Apple/Samsung-Geräte in der Nähe leiten Position weiter. Ideal für: "Wo ist mein Koffer?" Nicht ideal für: "Wer hat ihn gefunden?" Sie können die Position sehen, aber der Finder kann Sie NICHT kontaktieren. Batterie-Laufzeit: ca. 1 Jahr (austauschbar). Kombination mit NFC-Tag = perfekt!',
    },
    {
      title: 'QR-Code-Tags: Universal aber passiv',
      description: 'QR-Codes funktionieren mit jedem Smartphone (Kamera-App reicht). Finder scannt Code → landet auf Webseite mit Kontaktmöglichkeit. Vorteil: Keine spezielle Hardware/App nötig, funktioniert immer. Nachteil: SIE erhalten keine Benachrichtigung beim Scannen, nur wenn Finder aktiv eine Nachricht schreibt. Gut als Backup-System, nicht als Haupt-Tracking. Bag-Tag kombiniert NFC + QR: NFC-Scan = Push-Benachrichtigung, QR = Backup für ältere Smartphones.',
    },
    {
      title: 'RFID-Tags: Airlines, nicht für Passagiere',
      description: 'RFID (Radio-Frequency Identification) wird von Airlines für interne Gepäckverfolgung genutzt (die Barcodes am Gepäckabschnitt sind oft RFID-Enhanced). ABER: Passagiere haben keinen Zugriff auf diese Daten! RFID-Tags für Privatnutzer existieren, haben aber denselben Nachteil wie QR: Finder kann Sie nicht kontaktieren, Sie bekommen keine Benachrichtigung. RFID ist für Logistik, nicht für Lost & Found optimiert.',
    },
    {
      title: 'Elektronische E-Ink-Tags (Airlines)',
      description: 'Einige Airlines bieten elektronische Gepäckanhänger mit E-Ink-Display (wie eBook-Reader). Sie aktivieren diese per App, Display zeigt Barcode + Flugdaten. Vorteil: Kein Papier-Tag am Check-in nötig, sieht futuristisch aus. Nachteile: Teuer (60-100€), funktioniert nur mit unterstützten Airlines, Batterie hält 2-3 Jahre, bei technischem Defekt ist Ihr Tag wertlos. Für Vielflieger einer Airline interessant, für normale Reisende überdimensioniert.',
    },
    {
      title: 'Warum Bag-Tag die beste Lösung ist',
      description: 'Bag-Tag kombiniert die Vorteile mehrerer Technologien: 1) NFC für sofortige Benachrichtigungen + anonyme Kommunikation 2) QR-Code als Backup für ältere Smartphones 3) Keine Batterie = unbegrenzte Lebensdauer 4) Wasserfest, robust, diskret 5) DSGVO-konform 6) Mehrsprachige Web-App 7) Multiple Kontaktmethoden hinterlegbar. Einmalpreis 15€, keine Abo-Kosten, funktioniert weltweit, lebenslang nutzbar.',
    },
  ];

  const faqItems = [
    {
      question: 'Kann ich AirTag und NFC-Tag gleichzeitig nutzen?',
      answer: 'Ja, das ist sogar die optimale Kombination! AirTag (oder Tile/SmartTag) legen Sie INNEN in den Koffer für GPS-Position. Bag-Tag NFC-Anhänger kommt AUßEN an den Koffer für Finder-Kontakt. So haben Sie beides: Wissen, wo Ihr Koffer ist (GPS) UND Finder können Sie erreichen (NFC). AirTag zeigt "Koffer ist am Flughafen Madrid", Bag-Tag ermöglicht "Finder schreibt: Habe Ihren Koffer am Gepäckband gefunden".',
    },
    {
      question: 'Warum nicht nur einen QR-Code selbst ausdrucken?',
      answer: 'Selbst gemachte QR-Codes haben mehrere Nachteile: 1) Sie erhalten KEINE Benachrichtigung, wenn jemand den Code scannt – Sie warten auf Nachrichten, die vielleicht nie kommen 2) Ihre Kontaktdaten sind direkt im Code = jeder kann sie extrahieren (Spam-Risiko!) 3) Papier wird nass, unleserlich, reißt ab 4) Keine verschlüsselte Kommunikation 5) Keine Multi-Device-Verwaltung. Bag-Tag kostet 15€ einmalig und löst all diese Probleme professionell.',
    },
    {
      question: 'Sind elektronische E-Ink-Tags ihr Geld wert?',
      answer: 'Nur für Vielflieger, die fast ausschließlich mit einer unterstützten Airline fliegen. Vorteile: Schnellerer Check-in, kein Papier-Tag, Status in Echtzeit. Nachteile: 60-100€ Anschaffung, 2-3 Jahre Batterie-Laufzeit, funktionieren oft nur mit Lufthansa, BA oder wenigen anderen Airlines, bei Defekt teurer Ersatz. Für 90% der Reisenden ist die Kombination "normaler Airline-Tag + Bag-Tag NFC (15€)" deutlich sinnvoller und flexibler.',
    },
    {
      question: 'Funktionieren NFC-Tags auch bei Flugreisen?',
      answer: 'Ja, NFC ist im Flugzeug erlaubt! Es ist eine passive Technologie (sendet nicht aktiv), genau wie die NFC-Chips in Ihrem Reisepass oder Kreditkarte. Im Gegensatz zu GPS-Trackern (die oft im Flugmodus sein müssen) funktioniert NFC jederzeit, überall, ohne Strom zu senden. Airlines, TSA und internationale Sicherheitsbehörden haben keine Einwände gegen NFC-Tags am Gepäck.',
    },
    {
      question: 'Was passiert, wenn der Finder kein NFC-fähiges Smartphone hat?',
      answer: 'Deshalb hat Bag-Tag einen QR-Code als Backup! Ältere Smartphones oder Geräte ohne NFC können den QR-Code mit der Kamera-App scannen und landen auf derselben Kontakt-Seite. NFC ist die Haupt-Technologie (schneller, mit Push-Benachrichtigung), QR ist der Fallback. So erreichen Sie 99,9% aller Smartphone-Nutzer weltweit, unabhängig von Gerät oder Alter.',
    },
    {
      question: 'Wie lange halten die verschiedenen Tag-Typen?',
      answer: 'Vergleich der Lebensdauer: **NFC-Tags (Bag-Tag):** unbegrenzt, keine Batterie, wasserfest = 5-10+ Jahre nutzbar. **AirTag/Tile:** ca. 1 Jahr pro Batterie (CR2032 austauschbar) = theoretisch unbegrenzt, praktisch 3-5 Jahre bis Gerät veraltet. **E-Ink-Tags:** 2-3 Jahre Akku-Laufzeit, danach Aufladung oder Ersatz nötig. **Papier-QR-Codes:** 1-5 Reisen, abhängig von Wetter und Behandlung. Beste Langzeitinvestition: NFC + QR Kombination wie Bag-Tag.',
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
                Smart Luggage Tags 2026: Technologie-Vergleich & Kaufberatung
              </h1>
              <p className="text-xl text-gray-600">
                Welche Tracking-Technologie passt zu Ihren Reisebedürfnissen? Detaillierter Vergleich von NFC, 
                GPS-Trackern, QR-Codes und RFID – mit klaren Empfehlungen für jeden Reisetyp.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Der Markt für Smart Luggage Tags 2026</h2>
              <p className="text-gray-700 mb-4">
                Der Markt für intelligente Gepäckanhänger boomt: Von günstigen QR-Code-Tags für 5€ bis zu 
                elektronischen E-Ink-Displays für 100€+ ist alles verfügbar. Doch welche Technologie macht 
                wirklich Sinn?
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Die Kern-Frage:</strong> Wollen Sie wissen, WO Ihr Koffer ist (GPS-Tracking) oder wollen 
                Sie, dass Finder Sie KONTAKTIEREN können (NFC/QR)? Das sind zwei unterschiedliche Anwendungsfälle – 
                und die beste Lösung kombiniert beides.
              </p>
              <p className="text-gray-700 mb-6">
                In diesem Guide vergleichen wir objektiv alle verfügbaren Technologien und zeigen, warum der 
                <a href="https://bag-tag.de/de" className="text-blue-600 hover:text-blue-800"> Bag-Tag NFC-Kofferanhänger</a> für 
                die meisten Reisenden die optimale Preis-Leistungs-Lösung darstellt.
              </p>
            </section>

            <StepSection steps={steps} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Detaillierter Technologie-Vergleich</h2>
              
              <div className="overflow-x-auto my-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Kriterium</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">NFC (Bag-Tag)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">GPS (AirTag)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">QR-Code</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">E-Ink-Tag</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Kosten</td>
                      <td className="border border-gray-300 px-4 py-2">15€ einmalig</td>
                      <td className="border border-gray-300 px-4 py-2">35€ + Batterie</td>
                      <td className="border border-gray-300 px-4 py-2">5-10€</td>
                      <td className="border border-gray-300 px-4 py-2">60-100€</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Batterie</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Keine (passiv)</td>
                      <td className="border border-gray-300 px-4 py-2">✅ 1 Jahr</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Keine</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ 2-3 Jahre</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Finder-Kontakt</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Ja, anonym</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Nein</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Ja</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Nein</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">GPS-Position</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Nein</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Ja, Echtzeit</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Nein</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Nein</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Benachrichtigung</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Push</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Position</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Nein</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ Nur Status</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Datenschutz</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Verschlüsselt</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Sicher</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ Daten sichtbar</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Sicher</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">App erforderlich</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ Für Sie ja</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Ja (iOS/Android)</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Nein</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Airline-App</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Lebensdauer</td>
                      <td className="border border-gray-300 px-4 py-2">10+ Jahre</td>
                      <td className="border border-gray-300 px-4 py-2">3-5 Jahre</td>
                      <td className="border border-gray-300 px-4 py-2">1-2 Jahre</td>
                      <td className="border border-gray-300 px-4 py-2">2-3 Jahre</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Anwendungsfall-basierte Empfehlung</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Für Gelegenheitsreisende (1-3 Reisen/Jahr)</h3>
              <div className="p-6 bg-blue-50 border-l-4 border-blue-500 mb-6">
                <p className="text-gray-700 mb-3">
                  <strong>Empfehlung: Bag-Tag NFC + QR (15€)</strong>
                </p>
                <p className="text-gray-700">
                  Warum? Sie brauchen keine teure Technologie für seltene Reisen. Ein robuster NFC-Tag mit QR-Backup 
                  hält 10+ Jahre, keine Batterie-Sorgen, keine Folgekosten. Falls Ihr Koffer verloren geht, kann 
                  der Finder Sie sofort erreichen – das ist wichtiger als GPS-Tracking für Gelegenheitsreisende.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Für Vielflieger (10+ Reisen/Jahr)</h3>
              <div className="p-6 bg-green-50 border-l-4 border-green-500 mb-6">
                <p className="text-gray-700 mb-3">
                  <strong>Empfehlung: Bag-Tag NFC + AirTag innen (50€ gesamt)</strong>
                </p>
                <p className="text-gray-700">
                  Warum? Bei häufigem Reisen lohnt sich die Investition in Redundanz. AirTag innen für GPS-Position 
                  (Sie wissen immer, wo Ihr Koffer ist), Bag-Tag außen für Finder-Kontakt. Doppelte Sicherheit bei 
                  höherem Verlustrisiko durch viele Flüge. Optional: E-Ink-Tag zusätzlich, wenn Sie hauptsächlich 
                  mit einer Airline fliegen.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Für Budget-Bewusste</h3>
              <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 mb-6">
                <p className="text-gray-700 mb-3">
                  <strong>Empfehlung: Bag-Tag NFC (15€)</strong>
                </p>
                <p className="text-gray-700">
                  Warum? Beste Preis-Leistung am Markt. Günstiger als AirTag, aber mit Finder-Kontakt-Funktion 
                  die AirTag NICHT hat. QR-Code als Backup inklusive. Lebenslange Nutzbarkeit ohne Folgekosten. 
                  Selbstgemachte QR-Code-Lösungen sind zwar billiger, bieten aber keine Benachrichtigungen oder 
                  Datenschutz.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Für Technik-Enthusiasten</h3>
              <div className="p-6 bg-purple-50 border-l-4 border-purple-500 mb-6">
                <p className="text-gray-700 mb-3">
                  <strong>Empfehlung: Alle Technologien kombinieren (120€+)</strong>
                </p>
                <p className="text-gray-700">
                  E-Ink-Tag für schnellen Check-in, AirTag innen für GPS, Bag-Tag außen für Finder-Kontakt. 
                  Maximale Redundanz und Technologie-Stack. Realistisch gesehen: Overkill für 99% der Reisenden, 
                  aber wer das Neueste vom Neuesten haben will, kann hier kombinieren.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Häufige Missverständnisse</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">❌ "AirTag reicht doch, oder?"</h4>
                  <p className="text-gray-700">
                    Nein! AirTag zeigt Ihnen die POSITION Ihres Koffers, aber der Finder kann Sie NICHT kontaktieren. 
                    Sie sehen "Koffer ist am Flughafen Terminal 2" – aber der ehrliche Finder, der Ihren Koffer beim 
                    Gepäckband gefunden hat, hat keine Möglichkeit, Sie zu erreichen. Er gibt den Koffer ab beim 
                    Lost & Found, Sie warten 3 Tage auf Rückgabe.
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">❌ "QR-Code selbst ausdrucken spart Geld"</h4>
                  <p className="text-gray-700">
                    Problem 1: Papier hält 1-2 Reisen, wird unleserlich. Problem 2: Ihre Kontaktdaten sind direkt 
                    im QR-Code = jeder kann sie extrahieren und für Spam nutzen. Problem 3: Sie erhalten KEINE 
                    Benachrichtigung, wenn jemand den Code scannt. Bag-Tag kostet 15€ und löst all diese Probleme.
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">❌ "E-Ink-Tags sind die Zukunft"</h4>
                  <p className="text-gray-700">
                    E-Ink-Tags sind praktisch für Check-in, aber: 1) Funktionieren nur mit wenigen Airlines 2) Kosten 
                    60-100€ 3) Batterie hält nur 2-3 Jahre 4) Bei Defekt teurer Ersatz 5) Helfen NICHT bei verlorenem 
                    Gepäck, da sie keine Finder-Kontakt-Funktion haben. Für die meisten Reisenden überteuert und 
                    unnötig.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Fazit der Redaktion:</p>
                <p className="text-gray-700">
                  Für 90% aller Reisenden ist die Kombination aus NFC + QR (wie Bag-Tag) die optimale Lösung: 
                  Erschwinglich, robust, lebenslang nutzbar, datenschutzkonform und mit der wichtigsten Funktion – 
                  Finder können Sie kontaktieren. Wer zusätzlich GPS-Position möchte: AirTag innen kombinieren. 
                  E-Ink-Tags sind Luxus ohne Mehrwert für Gepäcksicherheit.
                </p>
              </div>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Die smarte Wahl: Bag-Tag NFC + QR"
              description="Warum mehr bezahlen für weniger Funktion? Bag-Tag kombiniert bewährte Technologie mit bestem Preis-Leistungs-Verhältnis."
              buttonText="Jetzt Bag-Tag kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
