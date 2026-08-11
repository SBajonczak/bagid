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

const pageUrl = 'https://bag-tag.de/de/ratgeber/reise-checkliste-gepaeck-sichern';
const pageTitle = 'Ultimative Reise-Checkliste: Gepäck sichern & organisieren';
const pageDescription = 'Komplette Checkliste für sichere Reisen: Von der Vorbereitung über Check-in bis zur Ankunft. Verpassen Sie keinen wichtigen Schritt zum Gepäckschutz.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'Reise Checkliste, Gepäck sichern, Koffer packen, Reisevorbereitung, Flughafen Checkliste, NFC Kofferanhänger, Bag-Tag',
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
        alt: 'Reise Checkliste für sicheres Gepäck'
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
        'en': 'https://bag-tag.de/en/guides/travel-checklist-secure-luggage',
        'x-default': 'https://bag-tag.de/en/guides/travel-checklist-secure-luggage',
      },
    },
  };
}

export default function TravelChecklistPage() {
  const relatedLinks = getRelatedLinks('guideTravelChecklist', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Reise-Checkliste Gepäck sichern', url: pageUrl },
  ];

  const tldrPoints = [
    'Gepäckverlust ist zu 80% durch richtige Vorbereitung vermeidbar',
    'Kritischste Phase: 72 Stunden vor Abflug – hier entscheidet sich Erfolg oder Chaos',
    'Handgepäck-Backup: Immer ein komplettes Outfit + wichtige Dokumente mitnehmen',
    'Check-in 90-120 Minuten vorher = 60% weniger Gepäckprobleme',
    'Dokumentation (Fotos, Gepäcknummer, Inventarliste) spart im Notfall Stunden',
    'NFC-Tag anbringen ist 5-Minuten-Aufgabe, die Tage an Stress verhindern kann',
  ];

  const steps = [
    {
      title: '1 Woche vor der Reise: Ausrüstung vorbereiten',
      description: 'Koffer aus Keller holen, auf Schäden prüfen (Rollen, Griff, Reißverschluss). TSA-Schloss testen, Ersatzbatterien besorgen falls nötig. Bag-Tag NFC-Anhänger bestellen oder auspacken, App installieren, Kontaktdaten hinterlegen. Alte Gepäckanhänger vom letzten Urlaub entfernen – jeder alte Barcode verwirrt das Baggage Handling System!',
    },
    {
      title: '72 Stunden vor Abflug: Packen & Sichern',
      description: 'Systematisch packen mit Checkliste (siehe unten). Wichtig: Wertvolle Items, Medikamente, ein Outfit zum Wechseln ins Handgepäck. Kofferinhalt fotografieren für Versicherung. Bag-Tag außen am Griff befestigen, zweiten Tag (oder Namensschild) innen anbringen. Auffälligen Gurt oder Aufkleber als Verwechslungsschutz. Koffer wiegen – Übergepäck kostet!',
    },
    {
      title: '24 Stunden vor Abflug: Dokumente & Online Check-in',
      description: 'Online Check-in öffnet 24h vorher – sofort machen! Sie sparen Zeit am Flughafen und sichern sich Sitzplatz. Bordkarte auf Smartphone + ausdrucken (Backup). Reisepass/Personalausweis prüfen (gültig?), Visum checken falls nötig. Wichtige Dokumente scannen, in Cloud speichern (Dropbox, OneDrive). Flugstatus prüfen – bei Verspätungen umbuchen erwägen.',
    },
    {
      title: 'Am Abflugtag: Check-in & Gepäckaufgabe',
      description: '90-120 Minuten vor Abflug am Flughafen. Bag Drop für online eingecheckte Passagiere (schneller!). Gepäckabschnitt SOFORT kontrollieren: Richtiger Flughafen-Code? Bei Umsteigeverbindungen: Zeigt Endziel? Gepäcknummer fotografieren. Gepäckabschnitt am Handgepäck befestigen (nicht lose in Tasche!). Koffer fotografieren vor Aufgabe – bei Verlust essentiell.',
    },
    {
      title: 'Während des Flugs: Tracking aktivieren',
      description: 'Falls Sie AirTag oder GPS-Tracker nutzen: Position checken bei Landung. Bag-Tag App: Push-Benachrichtigungen aktiviert? Bei Umsteigeverbindungen: Checken Sie im Airline-System, ob Ihr Gepäck als "transferred" markiert ist. Manche Airlines zeigen Status in der App. Bei knapper Umsteigezeit: Boarding-Personal fragen, ob Gepäck nachkommt.',
    },
    {
      title: 'Bei Ankunft: Gepäck kontrollieren',
      description: 'Erster am Gepäckband sein (verhindert Verwechslungen). Koffer kommt nicht nach 30 Minuten? Sofort zu Lost & Found! PIR-Formular ausfüllen, Fotos zeigen, Gepäcknummer angeben, Zustelladresse präzise. Koffer erhalten? Vor Verlassen des Flughafens öffnen und auf Schäden/Diebstahl prüfen – Reklamation muss sofort erfolgen!',
    },
  ];

  const faqItems = [
    {
      question: 'Wie früh sollte ich wirklich am Flughafen sein?',
      answer: 'Die oft genannten "2 Stunden bei internationalen Flügen" sind ein Minimum, kein Optimum! Empfehlung: 2,5-3 Stunden bei Interkontinental-Flügen (Sicherheitskontrollen können 60+ Minuten dauern), 2 Stunden bei EU-Flügen, 1,5 Stunden bei Inlandsflügen. Besonders wichtig: Früh sein bei Stoßzeiten (Montag morgen, Freitag abend, Ferienstart). Früher Check-in = Ihr Gepäck hat mehr Zeit im System = 60% weniger Verlustrisiko.',
    },
    {
      question: 'Was gehört unbedingt ins Handgepäck?',
      answer: 'Die "Überlebens-Essentials": 1) Alle wichtigen Dokumente (Reisepass, Visum, Versicherungen, Buchungsbestätigungen) 2) Medikamente (auch rezeptfreie wie Schmerzmittel) 3) Wertsachen (Laptop, Kamera, Schmuck) 4) Ein komplettes Outfit zum Wechseln (Unterwäsche, Socken, Hemd/Bluse, Hose) 5) Ladegeräte für Elektronik 6) Toilettenartikel in 100ml-Behältern (optional) 7) Snacks für lange Flüge. Faustregel: "Kann ich 24h ohne Koffer überleben?" Wenn ja, ist Ihr Handgepäck richtig gepackt.',
    },
    {
      question: 'Sollte ich meinen Kofferinhalt fotografieren?',
      answer: 'Absolut ja! Mehrere Gründe: 1) Versicherungsnachweis: Bei permanent verlorenem Gepäck müssen Sie nachweisen, was drin war. Foto = Beweis! 2) Schnellere Schadensabwicklung: Versicherung kann Wert sofort schätzen 3) Mentale Checkliste: Beim Rückflug packen Sie nichts Vergessen 4) Diebstahl-Nachweis: Bei geöffnetem Koffer sehen Sie sofort, was fehlt. Tipp: Ein Video durchs Gepäck vor dem Schließen = noch besser als Fotos.',
    },
    {
      question: 'Wie organisiere ich Umsteigeverbindungen optimal?',
      answer: 'Die goldenen Regeln: 1) Minimum 90 Minuten Transferzeit, besser 120 Minuten 2) Gleiche Airline oder Allianz buchen (besseres Gepäck-Handling) 3) Bei Buchung "through checked baggage" sicherstellen (Gepäck wird durchgecheckt) 4) Erste Verbindung am Tag wählen (weniger Verspätungsrisiko) 5) Bei kritischen Reisen (Hochzeit, Business-Meeting): Direktflug buchen, koste es was es wolle 6) Plan B vorbereiten: Nächste Alternative raussuchen, bevor Sie abfliegen.',
    },
    {
      question: 'Wann lohnt sich eine Reiseversicherung für Gepäck?',
      answer: 'Airlines haften nur bis max. 1.700 SDR (ca. 1.900€) bei verlorenem Gepäck – was oft nicht reicht. Reiseversicherung lohnt sich bei: 1) Kofferinhalt über 2.000€ Wert (teure Kleidung, Elektronik, Sportausrüstung) 2) Business-Trips mit wichtigen Dokumenten 3) Fernreisen (höheres Verlustrisiko, teurere Ersatzbeschaffung) 4) Reisen mit mehreren Umsteigeverbindungen. Kostet: 10-30€ je nach Reisedauer. Tipp: Viele Premium-Kreditkarten (Amex Gold, Visa Platinum) haben Reiseversicherung inklusive – prüfen!',
    },
    {
      question: 'Wie kann ich mein Gepäck gegen Diebstahl sichern?',
      answer: 'Mehrschichtiger Schutz: 1) TSA-Schloss (bei USA-Reisen Pflicht, sonst wird Koffer aufgebrochen) 2) Auffällige Markierung (Diebe meiden auffälliges Gepäck) 3) Wertvolle Items ins Handgepäck (niemals Laptop, Kamera ins Aufgabegepäck!) 4) Bag-Tag NFC innen UND außen (bei Diebstahl kann ehrlicher Finder Sie kontaktieren) 5) Kofferinhalt fotografieren (Beweis bei Diebstahl) 6) Am Gepäckband: Erster sein und Koffer sofort erkennen (verhindert Verwechslungs-Diebstahl). Realität: Diebstahl aus Koffern ist selten (0,02%), aber bei Wertgegenständen verheerend.',
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
                Ultimative Reise-Checkliste: Gepäck sichern & organisieren
              </h1>
              <p className="text-xl text-gray-600">
                Von der Vorbereitung bis zur Ankunft: Die komplette Schritt-für-Schritt-Checkliste für stressfreies 
                Reisen mit sicherem Gepäck. Verpassen Sie keinen wichtigen Punkt mehr!
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Warum eine Checkliste entscheidend ist</h2>
              <p className="text-gray-700 mb-4">
                80% aller Gepäckprobleme sind vermeidbar – durch richtige Vorbereitung. Die häufigsten Fehler: 
                Zu spät am Flughafen, wichtige Dokumente im Aufgabegepäck, keine Gepäckkennzeichnung, 
                zu kurze Umsteigezeiten.
              </p>
              <p className="text-gray-700 mb-4">
                Eine systematische Checkliste stellt sicher, dass Sie jeden wichtigen Schritt abhaken. Das 
                spart nicht nur Stress, sondern auch echtes Geld (Ersatzkäufe, Express-Lieferungen, verpasste 
                Meetings).
              </p>
              <p className="text-gray-700 mb-6">
                Diese Checkliste basiert auf Best Practices von Vielfliegern, Airline-Mitarbeitern und 
                Gepäck-Experten. Kombiniert mit einem <a href="https://bag-tag.de/de" className="text-blue-600 hover:text-blue-800">Bag-Tag NFC-Kofferanhänger</a> maximieren 
                Sie Ihre Chancen auf problemfreie Reisen.
              </p>
            </section>

            <StepSection steps={steps} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Detaillierte Checklisten für jede Phase</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">📋 Vor der Reise (1 Woche vorher)</h3>
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Ausrüstung & Dokumente</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Koffer aus Lager holen, auf Schäden prüfen (Rollen, Reißverschluss, Griff)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Alle alten Gepäckanhänger entfernen (auch versteckte unter Griffen!)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Bag-Tag NFC-Anhänger anbringen und in App aktivieren</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Zweiten Tag innen im Koffer befestigen (Backup)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>TSA-Schloss testen, Ersatzschlüssel bereitlegen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Reisepass prüfen (gültig min. 6 Monate nach Rückreise)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Visum beantragen/prüfen (falls nötig)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Reiseversicherung abschließen (inkl. Gepäckversicherung)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Alle Buchungsbestätigungen (Flug, Hotel, Mietwagen) in eine Reise-App kopieren</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Auslandskrankenversicherung prüfen (bei EU: EHIC-Karte)</span>
                  </li>
                </ul>

                <h4 className="font-semibold text-gray-900 mb-3 mt-6">Technologie vorbereiten</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Smartphone-Speicher freimachen (für Fotos, offline Maps)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Bag-Tag App installieren, Account erstellen, Kontaktdaten hinterlegen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Airline-App installieren für Push-Benachrichtigungen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>AirTag/Tile (falls genutzt) aktivieren und Batterie prüfen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Powerbank aufladen (max. 27.000 mAh für Handgepäck erlaubt)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Offline-Karten herunterladen (Google Maps, Maps.me)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Roaming aktivieren oder eSIM/lokale SIM-Karte organisieren</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🎒 72h vor Abflug: Packen</h3>
              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Aufgabegepäck (Koffer)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Kleidung rollen (spart 30% Platz vs. falten)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Packing Cubes nutzen für Organisation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Schuhe mit Socken füllen (Platz sparen)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Wäschebeutel für Schmutzwäsche einpacken</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Toilettenartikel in Druckverschlussbeutel (bei Platzen)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Adapter/Reisestecker für Zielland</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Kleine Reiseapotheke (Durchfall, Erkältung, Blasenpflaster)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Koffer wiegen (max. 23kg Economy, 32kg Business meist)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Video/Fotos vom gepackten Kofferinhalt machen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Inventarliste erstellen (für Versicherung)</span>
                  </li>
                </ul>

                <h4 className="font-semibold text-gray-900 mb-3 mt-6">Handgepäck (KRITISCH!)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">☑</span>
                    <span><strong>Reisepass/Personalausweis + Visum</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☑</span>
                    <span><strong>Bordkarten (digital + ausgedruckt)</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☑</span>
                    <span><strong>Alle Medikamente in Original-Verpackung</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☑</span>
                    <span><strong>1x komplettes Outfit (falls Koffer verloren geht)</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☑</span>
                    <span><strong>Laptop, Tablet, Kamera (Elektronik nie ins Aufgabegepäck!)</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Alle Ladegeräte + Powerbank</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Kopfhörer (Noise-Cancelling für Langstrecke empfohlen)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Geldbeutel mit Bargeld (100-200€/$ in Zielwährung)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Kreditkarten (min. 2 verschiedene, falls eine gesperrt wird)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Snacks + leere Trinkflasche (nach Security auffüllen)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Nackenkissen + Augenmaske für Langstrecke</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Desinfektionstücher (Armlehnen, Tablett reinigen)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Stift (für Einreisekarten im Flugzeug)</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">✈️ 24h vor Abflug: Letzte Checks</h3>
              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Online Check-in machen (öffnet 24h vorher)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Sitzplatz wählen/bestätigen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Bordkarte auf Smartphone + ausdrucken (Backup!)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Flugstatus prüfen (Verspätungen? Gate geändert?)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Wetter am Zielort checken (letzte Anpassungen beim Packen)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Hotel/Unterkunft: Check-in-Zeit, Adresse, Kontakt speichern</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Wichtige Dokumente scannen, in Cloud speichern</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Notfall-Kontakte hinterlegen (Familie weiß, wo Sie sind)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Alle Geräte vollständig aufladen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Haustür-Schlüssel hinterlegen (falls Notfall während Ihrer Abwesenheit)</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🛫 Am Flughafen: Check-in & Security</h3>
              <div className="bg-purple-50 p-6 rounded-lg mb-8">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>90-120 Minuten vor Abflug am Flughafen ankommen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Bei Online-Check-in: Direkt zum Bag Drop (schneller!)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Koffer von allen Seiten fotografieren (bei Verlust wichtig)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Koffer aufgeben, Gepäckabschnitt erhalten</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☑</span>
                    <span><strong>Gepäckabschnitt SOFORT prüfen: Richtiger Flughafen-Code? Endziel bei Umstieg?</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☑</span>
                    <span><strong>Gepäcknummer fotografieren (10-stellige Nummer)</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Gepäckabschnitt an Handgepäck befestigen (nicht lose!)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Sicherheitskontrolle: Laptop/Tablet rausnehmen, Flüssigkeiten im Beutel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Nach Security: Gate finden, geschätzte Gehzeit prüfen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Trinkflasche auffüllen (nach Security erlaubt)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Bei langer Wartezeit: Lounge (bei Status/Priority Pass) oder ruhigen Platz suchen</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🛬 Bei Ankunft: Gepäck abholen</h3>
              <div className="bg-red-50 p-6 rounded-lg mb-8">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Gepäckband-Nummer auf Monitors checken</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Erster am Gepäckband (verhindert Verwechslungen!)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Koffer identifizieren anhand Ihrer Markierungen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☑</span>
                    <span><strong>Koffer kommt nach 30 Min nicht? SOFORT zu Lost & Found!</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Bei Verlust: PIR-Formular ausfüllen, Fotos zeigen, Gepäcknummer angeben</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Zustelladresse präzise angeben (Hotel-Adresse + Telefon)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>PIR-Referenznummer fotografieren/notieren</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Koffer erhalten? Vor Verlassen Flughafen öffnen und auf Schäden prüfen!</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Bei Schäden/Diebstahl: Sofort reklamieren am Schalter (Frist: 24h!)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">☐</span>
                    <span>Zoll-Durchgang (bei Non-EU: Deklaration ausfüllen)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Power-Tipp für Vielflieger:</p>
                <p className="text-gray-700">
                  Speichern Sie diese Checkliste als Foto auf Ihrem Smartphone oder nutzen Sie Apps wie 
                  Packpoint oder TripList. So haben Sie sie bei jeder Reise griffbereit. Erfahrene 
                  Reisende passen die Checkliste an ihre individuellen Bedürfnisse an (Business vs. Urlaub, 
                  Kurz- vs. Langstrecke) und haben mehrere Versionen gespeichert.
                </p>
              </div>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Vergessen Sie nie wieder wichtige Gepäckschutz-Maßnahmen"
              description="Mit Bag-Tag haben Sie einen essenziellen Punkt der Checkliste dauerhaft erledigt: Professionelle Gepäckkennzeichnung."
              buttonText="Jetzt Bag-Tag kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
