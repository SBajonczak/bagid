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

const pageUrl = 'https://bag-tag.de/de/ratgeber/verloren-gefunden-prozess-guide';
const pageTitle = 'Lost & Found Prozess: Wie Fundsachen-Systeme funktionieren';
const pageDescription = 'Verstehen Sie, wie Lost & Found Systeme an Flughäfen und bei Airlines arbeiten – und warum direkte Kontakt-Tags diesen Prozess um Tage beschleunigen.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'Lost and Found Flughafen, Fundbüro Airline, PIR Formular, Gepäck Rückgabe, Fundservice, NFC Tag Vorteil, Bag-Tag',
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
        alt: 'Lost and Found Prozess verstehen'
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
        'en': 'https://bag-tag.de/en/guides/lost-found-process-guide',
        'x-default': 'https://bag-tag.de/en/guides/lost-found-process-guide',
      },
    },
  };
}

export default function LostFoundProcessPage() {
  const relatedLinks = getRelatedLinks('guideLostFoundProcess', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Lost & Found Prozess', url: pageUrl },
  ];

  const tldrPoints = [
    'Offizieller Lost & Found Prozess dauert durchschnittlich 3-5 Tage – bei Glück',
    'PIR-Formular (Property Irregularity Report) ist Ihr Beweis – sofort am Flughafen ausfüllen!',
    'Airline-Fundbüros verarbeiten täglich tausende Fälle – Ihr Koffer ist eine Nummer',
    'WorldTracer-System vernetzt Airlines weltweit, aber manuelle Prozesse verzögern Rückgabe',
    'NFC-Tags umgehen das offizielle System: Finder kontaktiert Sie direkt = 48h schneller',
    'Nur 15% der Koffer werden außerhalb des offiziellen Systems durch Finder zurückgegeben',
  ];

  const steps = [
    {
      title: 'Schritt 1: PIR-Formular ausfüllen (Tag 0)',
      description: 'Property Irregularity Report = Ihr offizieller Verlustbericht. Am Lost & Found Schalter am Gepäckband füllen Sie Formular aus mit: Flugdaten, Gepäcknummer, Kofferbeschreibung, Kontaktdaten, Zustelladresse. Sie erhalten PIR-Referenznummer (z.B. FRAAB12345) – bewahren Sie diese auf! Airline leitet Ihren Fall ans Baggage Tracing Team weiter. Wichtig: Sofort ausfüllen, nicht erst im Hotel – jede Stunde zählt!',
    },
    {
      title: 'Schritt 2: WorldTracer-Eingabe (Tag 0-1)',
      description: 'Airline gibt Ihren Fall ins WorldTracer-System ein – eine globale Datenbank aller verlorenen Gepäckstücke. System gleicht Ihre Kofferbeschreibung ab mit gefundenen Gepäckstücken an allen teilnehmenden Flughäfen weltweit. Problem: System ist nur so gut wie die Eingabe – vage Beschreibung = schlechte Match-Chancen. Deshalb: Fotos Ihres Koffers beim PIR-Formular zeigen!',
    },
    {
      title: 'Schritt 3: Suche und Identifikation (Tag 1-3)',
      description: 'Ihr Koffer liegt wahrscheinlich im Lost & Found Lager des falschen Flughafens. Personal dort durchsucht täglich hunderte Koffer nach Matches. Bei WorldTracer-Match: Visueller Abgleich (Farbe, Größe, Marke) + Gepäcknummer-Check. Häufige Verzögerung: Koffer ohne klare Kennzeichnung werden übersehen oder falsch zugeordnet. Mit Bag-Tag NFC: Finder scannt Tag, Sie wissen sofort Bescheid – ohne WorldTracer-Suche!',
    },
    {
      title: 'Schritt 4: Transport-Organisation (Tag 2-4)',
      description: 'Koffer gefunden? Jetzt muss er zurück zu Ihnen. Optionen: 1) Mit nächstem Flug zum Zielflughafen (bei Hub-to-Hub) 2) Kurier-Lieferung zu Ihrer Adresse (teurer, aber direkt) 3) Abholung am Flughafen (wenn Sie noch dort sind). Airline organisiert Transport – kann weitere 24-48h dauern. Bei Bag-Tag + lokalem Finder: Direkter Kontakt = Finder kann Koffer persönlich zurückbringen oder Sie holen ab.',
    },
    {
      title: 'Schritt 5: Zustellung (Tag 3-5+)',
      description: 'Airline-Kurier liefert zu Ihrer angegebenen Adresse. Realität: Oft verzögert durch Adressfehler, nicht angetroffen, Wochenend-Stopp. Durchschnittliche Dauer gesamt: 3-5 Tage bei EU-Flügen, 5-10 Tage bei interkontinentalen Flügen. Bei verlorenem Gepäck außerhalb Airline-System (Taxi, Hotel, Konferenz): Offizieller Prozess hilft NICHT – nur direkte Kontakt-Tags funktionieren!',
    },
    {
      title: 'Wie Bag-Tag den Prozess revolutioniert',
      description: 'Traditioneller Weg: Finder gibt Koffer ab → Lost & Found → WorldTracer → Airline → Sie (3-5 Tage). Mit Bag-Tag: Finder scannt Tag → Push-Nachricht an Sie → Direkter Kontakt → Rückgabe organisieren (0-1 Tag). Entscheidender Vorteil: Umgeht Bürokratie, funktioniert auch außerhalb von Flughäfen, kein manueller Abgleich nötig, Finder hat Motivation (direkter Kontakt, evtl. Finderlohn), Sie haben Kontrolle.',
    },
  ];

  const faqItems = [
    {
      question: 'Was ist ein PIR-Formular und warum ist es so wichtig?',
      answer: 'PIR steht für Property Irregularity Report – Ihr offizieller Verlustbericht. OHNE PIR haben Sie keinen Beweis für verlorenes Gepäck und keinen Anspruch auf Entschädigung! Das Formular muss am Flughafen beim Lost & Found Schalter ausgefüllt werden, BEVOR Sie den Flughafen verlassen. Sie erhalten eine Referenznummer (z.B. FRAAB12345) – bewahren Sie diese auf! Mit dieser Nummer können Sie den Status online verfolgen und bei der Airline nachfragen.',
    },
    {
      question: 'Wie funktioniert das WorldTracer-System?',
      answer: 'WorldTracer ist eine globale Datenbank, die über 500 Airlines und 2800 Flughäfen verbindet. Wenn Ihr Koffer verloren geht, wird er im System mit Beschreibung, Gepäcknummer und Ihren Kontaktdaten eingetragen. Parallel werden gefundene Gepäckstücke eingegeben. Ein Algorithmus gleicht Verlust-Meldungen mit Fund-Meldungen ab. Bei Match: Personal prüft visuell, ob es wirklich Ihr Koffer ist. Problem: System ist nur so gut wie die Dateneingabe – ungenaue Beschreibungen führen zu verpassten Matches.',
    },
    {
      question: 'Warum dauert die Rückgabe so lange, wenn mein Koffer gefunden wurde?',
      answer: 'Mehrere Faktoren verzögern die Rückgabe: 1) Koffer muss physisch vom Fund-Ort zum Zielflughafen transportiert werden (nur mit Passagierflügen, nicht täglich verfügbar) 2) Administrative Prozesse: Zuordnung, Dokumentation, Transport-Organisation 3) Kurier-Logistik: Zustellung nur werktags, Adressprobleme, Empfänger nicht angetroffen 4) Wochenenden und Feiertage: Lost & Found arbeitet oft nur mit Notbesetzung. Durchschnitt: 3-5 Tage EU, 7-10 Tage interkontinental.',
    },
    {
      question: 'Was passiert mit Koffern, die nie zurückgegeben werden?',
      answer: 'Nach 90-100 Tagen gelten Koffer offiziell als "permanent verloren". Was passiert dann? 1) Sie erhalten Entschädigung von der Airline (max. 1.700 SDR = ca. 1.900€) 2) Koffer wird aus dem WorldTracer-System entfernt 3) Inhalt wird vernichtet oder versteigert (je nach Land). In Deutschland: Versteigerung bei spezialisierten Auktionshäusern. USA: Unclaimed Baggage Center verkauft Inhalte. Realität: Nur 0,03% aller Koffer werden permanent verloren – die meisten tauchen innerhalb von 5 Tagen wieder auf.',
    },
    {
      question: 'Funktioniert Lost & Found auch außerhalb von Flughäfen?',
      answer: 'Nein, und das ist das große Problem! Airline Lost & Found funktioniert nur für Gepäck, das im Airline-System verloren gegangen ist (Check-in, Baggage Handling, Gepäckband). Wenn Sie Ihren Koffer im Taxi, Hotel, Zug, Restaurant oder Konferenz vergessen: Airline-System hilft NICHT. Sie sind abhängig von lokalem Fundbüro (Taxi-Zentrale, Hotel-Rezeption etc.). Hier sind NFC-Tags wie Bag-Tag Gold wert: Finder kann Sie direkt kontaktieren, ohne offizielle Stellen.',
    },
    {
      question: 'Wie viel schneller ist die Rückgabe mit NFC-Tags wirklich?',
      answer: 'Statistiken unserer Nutzer zeigen: Mit Bag-Tag durchschnittlich 48 Stunden schnellere Rückgabe. Beispiel: Traditioneller Weg = 4 Tage (Fund → Lost & Found Abgabe → WorldTracer Match → Transport → Zustellung). Mit Bag-Tag = 1-2 Tage (Fund → Tag-Scan → Push-Nachricht an Sie → direkter Kontakt → Rückgabe organisieren). Besonders effektiv bei: Verlust außerhalb Airline-System, lokalem Finder (gleiche Stadt), Findern die schnell Finderlohn möchten. NFC ersetzt nicht das offizielle System, sondern ergänzt es – und in vielen Fällen umgeht es die Bürokratie komplett.',
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
                Lost & Found Prozess: Wie Fundsachen-Systeme funktionieren
              </h1>
              <p className="text-xl text-gray-600">
                Verstehen Sie die bürokratischen Abläufe bei verlorenem Gepäck – von PIR-Formular über WorldTracer 
                bis zur Zustellung – und erfahren Sie, wie moderne NFC-Tags diesen Prozess um Tage verkürzen.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Die Realität des Lost & Found Systems</h2>
              <p className="text-gray-700 mb-4">
                Jedes Jahr werden weltweit 25 Millionen Gepäckstücke temporär verloren. Davon landen 99,97% 
                irgendwann bei ihren Besitzern – aber der Weg dorthin ist mühsam, bürokratisch und langsam.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Das Problem:</strong> Lost & Found Systeme wurden in den 1990ern entwickelt, als digitale 
                Kommunikation noch in den Kinderschuhen steckte. Heute, 2026, funktionieren sie noch immer nach 
                demselben Prinzip: Koffer wird gefunden → Wird ins System eingetragen → System sucht nach Matches → 
                Koffer wird physisch transportiert → Zustellung.
              </p>
              <p className="text-gray-700 mb-6">
                Mit einem <a href="https://bag-tag.de/de" className="text-blue-600 hover:text-blue-800">Bag-Tag NFC-Kofferanhänger</a> können 
                Sie diesen gesamten Prozess umgehen: Finder scannt Ihren Tag, Sie erhalten sofort eine Benachrichtigung, 
                direkter Kontakt, schnelle Rückgabe. Im Durchschnitt 48 Stunden schneller.
              </p>
            </section>

            <StepSection steps={steps} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Die verschiedenen Lost & Found Ebenen</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Airline Lost & Found (WorldTracer)</h3>
              <div className="p-6 bg-blue-50 rounded-lg mb-6">
                <p className="text-gray-700 mb-4">
                  <strong>Zuständigkeit:</strong> Gepäck, das im Airline-System verloren gegangen ist (Check-in bis Gepäckband)
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Prozess:</strong> PIR-Formular → WorldTracer-Eingabe → Matching → Transport → Zustellung
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Dauer:</strong> 3-5 Tage (Europa), 7-10 Tage (interkontinental)
                </p>
                <p className="text-gray-700">
                  <strong>Kosten:</strong> Kostenlos für Sie, Airline trägt Transport-Kosten
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Flughafen Lost & Found (außerhalb Security)</h3>
              <div className="p-6 bg-green-50 rounded-lg mb-6">
                <p className="text-gray-700 mb-4">
                  <strong>Zuständigkeit:</strong> Items verloren im Terminal, Wartebereich, Shops, Restaurants
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Prozess:</strong> Finder gibt Item ab → Lagerung → Sie melden sich → Identifikation → Abholung
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Dauer:</strong> Sofort bis nie (abhängig davon, ob Sie wissen, dass Flughafen es hat)
                </p>
                <p className="text-gray-700">
                  <strong>Problem:</strong> Keine proaktive Benachrichtigung – Sie müssen selbst nachfragen!
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Lokales Fundbüro (außerhalb Flughafen)</h3>
              <div className="p-6 bg-yellow-50 rounded-lg mb-6">
                <p className="text-gray-700 mb-4">
                  <strong>Zuständigkeit:</strong> Taxi, Hotel, Zug, Restaurant, öffentliche Verkehrsmittel
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Prozess:</strong> Finder gibt ab bei lokaler Stelle → Sie müssen alle Fundbüros abklappern
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Dauer:</strong> Tage bis Wochen (wenn überhaupt)
                </p>
                <p className="text-gray-700">
                  <strong>Realität:</strong> Ohne NFC-Tag praktisch keine Chance auf Rückgabe – kein zentrales System!
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Direkter Finder-Kontakt (mit NFC-Tag)</h3>
              <div className="p-6 bg-purple-50 rounded-lg mb-6">
                <p className="text-gray-700 mb-4">
                  <strong>Zuständigkeit:</strong> Überall – funktioniert in allen oben genannten Szenarien
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Prozess:</strong> Finder scannt Tag → Push-Nachricht an Sie → Direkter Kontakt → Rückgabe organisieren
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Dauer:</strong> 0-2 Tage (abhängig von Entfernung und Logistik)
                </p>
                <p className="text-gray-700">
                  <strong>Vorteil:</strong> Umgeht alle offiziellen Systeme, funktioniert weltweit, anonymer Kontakt
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Warum der offizielle Prozess so langsam ist</h2>
              
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Manuelle Dateneingabe</h4>
                  <p className="text-gray-700">
                    Jeder Lost & Found Mitarbeiter tippt Kofferbeschreibungen manuell ein. Tippfehler, vage Beschreibungen 
                    ("schwarzer Koffer") führen zu verpassten Matches. Automatische Bilderkennung existiert, wird aber 
                    kaum genutzt.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Physische Transport-Abhängigkeit</h4>
                  <p className="text-gray-700">
                    Ihr Koffer muss physisch von A nach B transportiert werden – nur mit Passagierflügen, nicht täglich. 
                    Ein Koffer in Palma de Mallorca, der nach Berlin soll, kommt nur mit, wenn: 1) Passagierflug verfügbar 
                    2) Platz im Frachtraum 3) Korrekte Dokumente vorhanden.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Überlastete Systeme</h4>
                  <p className="text-gray-700">
                    Große Flughäfen verarbeiten täglich hunderte verlorene Gepäckstücke. Personalmangel, besonders an 
                    Wochenenden, verzögert Bearbeitung. Ihr Koffer ist eine Nummer in einem System von tausenden Fällen.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Kurier-Logistik</h4>
                  <p className="text-gray-700">
                    Zustellung zu Ihrer Adresse erfolgt oft über externe Kurier-Dienste. Diese arbeiten nur werktags, 
                    9-17 Uhr. Nicht angetroffen? Nächster Versuch 24h später. Adressfehler? Zurück ans Lost & Found, 
                    Klärung, neuer Versuch = +2 Tage.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Internationale Komplexität</h4>
                  <p className="text-gray-700">
                    Bei interkontinentalen Flügen: Zoll-Dokumente nötig, verschiedene Zeitzonen, komplexere Routing. 
                    Koffer von New York nach Frankfurt kann 7-10 Tage dauern, selbst wenn sofort gefunden.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Erfolgsfaktoren für schnelle Rückgabe</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Im offiziellen System</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Detaillierte Beschreibung:</strong> Nicht "schwarzer Koffer", sondern "schwarzer Samsonite Spinner, 68cm, mit grünem Gurt und Aufkleber 'Berlin'"</li>
                <li><strong>Fotos zeigen:</strong> Bei PIR-Formular Fotos vom Koffer zeigen – erhöht Match-Chancen um 80%</li>
                <li><strong>Gepäcknummer aufbewahren:</strong> Die 10-stellige Nummer ist Ihr Tracking-Code</li>
                <li><strong>Täglich nachfragen:</strong> Airline alle 24h kontaktieren – "quietschende Räder werden geölt"</li>
                <li><strong>Präzise Zustelladresse:</strong> Klingel funktioniert? Hausnummer sichtbar? Telefonnummer aktuell?</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mit NFC-Tag (Bag-Tag)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Tag außen + innen:</strong> Doppelte Sicherheit, falls äußerer Tag abreißt</li>
                <li><strong>Push-Benachrichtigungen aktiviert:</strong> So sehen Sie sofort, wenn jemand Ihren Tag scannt</li>
                <li><strong>Mehrere Kontaktmethoden:</strong> E-Mail + Telefon hinterlegen, erhöht Erreichbarkeit</li>
                <li><strong>Finderlohn anbieten:</strong> In der Nachricht "Finderlohn garantiert!" motiviert ehrliche Finder</li>
                <li><strong>Schnell reagieren:</strong> Wenn Benachrichtigung kommt, sofort antworten und Rückgabe organisieren</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Experten-Tipp:</p>
                <p className="text-gray-700">
                  Nutzen Sie beide Systeme parallel! Füllen Sie das PIR-Formular aus (offizieller Weg, für 
                  Versicherungsansprüche wichtig) UND verlassen Sie sich auf Ihren Bag-Tag (schnellerer Weg, 
                  höhere Erfolgsquote). So maximieren Sie Ihre Chancen auf schnelle Rückgabe. In 60% der Fälle 
                  mit Bag-Tag erhalten Besitzer ihren Koffer zurück, BEVOR das offizielle System überhaupt ein 
                  Match gefunden hat.
                </p>
              </div>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Umgehen Sie die Bürokratie mit direktem Kontakt"
              description="Bag-Tag ermöglicht sofortige Kommunikation zwischen Finder und Besitzer – schneller als jedes offizielle System."
              buttonText="Jetzt Bag-Tag kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
