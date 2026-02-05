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

const pageUrl = 'https://bag-tag.de/de/ratgeber/digitaler-gepaeckanhaenger-anleitung';
const pageTitle = 'Digitaler Gepäckanhänger: Komplette Anleitung NFC & QR 2026';
const pageDescription = 'Schritt-für-Schritt-Anleitung für digitale Gepäckanhänger: Setup, Nutzung, Troubleshooting. Alles was Sie über NFC- und QR-basierte Tags wissen müssen.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'Digitaler Gepäckanhänger Anleitung, NFC Tag einrichten, QR Code Kofferanhänger, Bag-Tag Setup, Smart Luggage Tag Tutorial, NFC Gepäck nutzen',
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
        alt: 'Digitaler Gepäckanhänger Anleitung'
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
        'en': 'https://bag-tag.de/en/guides/digital-luggage-tag-manual',
        'x-default': 'https://bag-tag.de/en/guides/digital-luggage-tag-manual',
      },
    },
  };
}

export default function DigitalTagManualPage() {
  const relatedLinks = getRelatedLinks('guideDigitalTagManual', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Digitaler Gepäckanhänger Anleitung', url: pageUrl },
  ];

  const tldrPoints = [
    'Setup dauert 5 Minuten: App installieren → Account erstellen → Tag scannen → Daten hinterlegen',
    'NFC funktioniert passiv ohne Batterie – Tag hält 10+ Jahre',
    'QR-Code ist automatisches Backup für Geräte ohne NFC',
    'Push-Benachrichtigungen zeigen sofort, wenn jemand Ihren Tag scannt',
    'Ein Tag kann für mehrere Gepäckstücke wiederverwendet werden (umkonfigurierbar)',
    'Finder sieht Ihre Daten NICHT – nur anonyme Kontakt-Möglichkeit',
  ];

  const steps = [
    {
      title: 'Schritt 1: App installieren & Account erstellen',
      description: 'Laden Sie die Bag-Tag App aus dem App Store (iOS) oder Google Play Store (Android) herunter. Öffnen Sie die App und erstellen Sie einen Account mit Ihrer E-Mail-Adresse. Verifizieren Sie Ihre E-Mail über den Link in der Bestätigsmail. Wichtig: Verwenden Sie eine E-Mail, die Sie regelmäßig checken – hier kommen Benachrichtigungen bei gefundenem Gepäck an!',
    },
    {
      title: 'Schritt 2: Tag aktivieren',
      description: 'Öffnen Sie die App, tippen Sie auf "Neuen Tag hinzufügen". Halten Sie Ihr Smartphone nah an den NFC-Tag (Rückseite des Tags). Bei NFC-Problemen: QR-Code scannen funktioniert auch! App erkennt den Tag automatisch und zeigt eindeutige Tag-ID an. Geben Sie Ihrem Tag einen Namen (z.B. "Hauptkoffer", "Handgepäck", "Surfboard") – hilft bei mehreren Tags.',
    },
    {
      title: 'Schritt 3: Kontaktdaten hinterlegen',
      description: 'Tragen Sie Ihre Kontaktinformationen ein: E-Mail (Pflicht), Telefonnummer (empfohlen), alternative Notfallnummer (optional, z.B. Reisebegleiter). Wählen Sie bevorzugte Kontaktmethode. Diese Daten werden verschlüsselt gespeichert – Finder sehen sie NICHT direkt, sondern nur "Nachricht senden"-Button. Sie können verschiedene Profile erstellen (z.B. "Business-Reise" mit Business-E-Mail, "Privatreise" mit privater E-Mail).',
    },
    {
      title: 'Schritt 4: Tag am Gepäck befestigen',
      description: 'Befestigen Sie den Tag außen am Koffergriff – gut sichtbar und leicht zu scannen. Nutzen Sie die mitgelieferte Schlaufe oder Kabelbinder (sicherer als billige Plastikschlaufen). Profi-Tipp: Bringen Sie zweiten Tag INNEN im Koffer an (Backup, falls äußerer Tag abreißt). Testen Sie: Halten Sie Ihr Smartphone an den Tag – öffnet sich die Kontaktseite? Wenn ja: Perfect!',
    },
    {
      title: 'Schritt 5: Push-Benachrichtigungen aktivieren',
      description: 'In den App-Einstellungen: Push-Benachrichtigungen erlauben. So erhalten Sie sofort eine Meldung, wenn jemand Ihren Tag scannt! Optional: E-Mail-Benachrichtigungen zusätzlich aktivieren (doppelte Sicherheit). Testen Sie die Benachrichtigung: Scannen Sie Ihren eigenen Tag mit dem Smartphone eines Freundes – kommt die Push-Nachricht an? Wenn ja: System funktioniert!',
    },
    {
      title: 'Schritt 6: Für die Reise vorbereiten',
      description: 'Vor jeder Reise: App öffnen, prüfen ob Tag noch aktiv ist (Status: "Aktiv"). Kontaktdaten aktualisieren falls nötig (z.B. Hotel-Nummer hinterlegen). Bei Auslandsreisen: Überlegen Sie, ob Sie lieber E-Mail oder WhatsApp als Kontakt angeben (internationale Anrufe können teuer sein). Fotografieren Sie Ihren Koffer inklusive Tag – bei Verlust hilfreich für Identifikation.',
    },
  ];

  const faqItems = [
    {
      question: 'Wie funktioniert NFC-Technologie bei Gepäckanhängern?',
      answer: 'NFC (Near Field Communication) ist eine passive, drahtlose Technologie für kurze Distanzen (bis 4cm). Ihr Bag-Tag enthält einen winzigen NFC-Chip ohne Batterie. Wenn jemand ein NFC-fähiges Smartphone an den Tag hält, wird der Chip durch das elektromagnetische Feld des Smartphones aktiviert und überträgt eine eindeutige ID + Link zu Ihrer Kontaktseite. Das Smartphone öffnet automatisch die Webseite, auf der der Finder eine Nachricht senden kann – ohne Ihre Daten zu sehen. Funktioniert mit jedem iPhone (ab 7) und Android-Gerät (ab 2014).',
    },
    {
      question: 'Was ist, wenn das Smartphone des Finders kein NFC hat?',
      answer: 'Deshalb hat Bag-Tag immer einen QR-Code als Backup! Ältere Smartphones, Geräte mit defektem NFC oder Nutzer, die NFC deaktiviert haben, können den QR-Code mit der normalen Kamera-App scannen. Resultat ist identisch: Webseite öffnet sich, Finder kann Nachricht senden. Unterschied: Bei NFC-Scan erhalten Sie zusätzlich automatisch eine Push-Benachrichtigung, bei QR nur wenn Finder tatsächlich eine Nachricht schreibt. QR-Code deckt 99,9% aller Smartphone-Nutzer weltweit ab.',
    },
    {
      question: 'Kann ich einen Tag für mehrere Koffer verwenden?',
      answer: 'Ja, aber nicht gleichzeitig! Ein Bag-Tag kann umkonfiguriert werden: In der App Tag auswählen → "Umziehen" → Neuem Gepäckstück zuordnen. Praktisch bei: Wechsel zwischen Sommer- und Winter-Koffer, Sportgepäck nur für bestimmte Reisen, Kinderkoffer die wachsen. Für gleichzeitige Nutzung mehrerer Gepäckstücke: Mehrere Tags kaufen (je 15€). Vorteil mehrerer Tags: Jeder kann eigene Kontaktdaten haben (z.B. Kinderkoffer mit Eltern-Nummer) und verschiedene Namen ("Hauptkoffer", "Handgepäck").',
    },
    {
      question: 'Wie ändere ich meine Kontaktdaten vor einer Reise?',
      answer: 'Super einfach: App öffnen → Ihren Tag auswählen → "Kontaktdaten bearbeiten" → Neue Daten eingeben → Speichern. Änderungen sind sofort aktiv! Keine neue Aktivierung nötig, der physische Tag bleibt unverändert. Typische Anwendungsfälle: Hotel-Telefonnummer vor Auslandsreise hinterlegen, Business-E-Mail für Geschäftsreisen, private E-Mail für Urlaub, alternative Notfallnummer hinzufügen, Sprache der Kontaktseite ändern (automatisch basierend auf Account-Einstellungen).',
    },
    {
      question: 'Was sieht der Finder, wenn er meinen Tag scannt?',
      answer: 'Der Finder sieht: 1) Eine Überschrift "Sie haben einen verlorenen Gegenstand gefunden!" 2) Bild des generischen Koffers (NICHT Foto Ihres Koffers – Datenschutz!) 3) Text: "Der Besitzer wurde benachrichtigt und wird sich bei Ihnen melden" 4) Button "Nachricht an Besitzer senden" 5) Optionales Textfeld für Details (z.B. "Gefunden am Gepäckband 5, Terminal 1"). Was der Finder NICHT sieht: Ihren Namen, Adresse, Telefonnummer, E-Mail. Erst wenn er Nachricht sendet und Sie antworten, können Sie entscheiden, welche Infos Sie teilen.',
    },
    {
      question: 'Funktioniert der Tag auch ohne Internet?',
      answer: 'Ja und Nein: Der TAG selbst funktioniert ohne Internet (NFC ist offline). Der FINDER braucht Internet, um die Kontaktseite zu laden und Nachricht zu senden. SIE brauchen Internet, um die Push-Benachrichtigung zu empfangen. Worst-Case-Szenario: Finder in Flugzeug-Modus scannt Tag → sieht "Keine Verbindung" → sobald er landet und Internet hat, kann er Seite aufrufen. Ihre Benachrichtigung kommt sofort, wenn Sie online sind. Fazit: System ist sehr robust, funktioniert auch bei temporärem Offline-Status.',
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
                Digitaler Gepäckanhänger: Komplette Anleitung NFC & QR 2026
              </h1>
              <p className="text-xl text-gray-600">
                Von der ersten Einrichtung bis zum fortgeschrittenen Gebrauch: Alles was Sie über die Nutzung 
                digitaler Gepäckanhänger wissen müssen – mit Schritt-für-Schritt-Anleitung und Troubleshooting.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Was ist ein digitaler Gepäckanhänger?</h2>
              <p className="text-gray-700 mb-4">
                Ein digitaler Gepäckanhänger ist ein moderner Ersatz für traditionelle Papieranhänger mit 
                handgeschriebener Adresse. Statt Ihre persönlichen Daten für jeden sichtbar am Koffer zu haben, 
                nutzt ein digitaler Tag drahtlose Technologien wie NFC (Near Field Communication) und QR-Codes.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Die Vorteile:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Datenschutz:</strong> Ihre Kontaktdaten sind verschlüsselt, nicht öffentlich sichtbar</li>
                <li><strong>Benachrichtigungen:</strong> Sie wissen sofort, wenn jemand Ihren Tag scannt</li>
                <li><strong>Anonyme Kommunikation:</strong> Finder kontaktiert Sie über Plattform, nicht direkt</li>
                <li><strong>Keine Batterie:</strong> NFC-Tags funktionieren passiv, halten ewig</li>
                <li><strong>Wasserfest & robust:</strong> Funktioniert bei jedem Wetter, in jedem Klima</li>
                <li><strong>International:</strong> Funktioniert weltweit ohne Sprachbarrieren</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Der <a href="https://bag-tag.de/de" className="text-blue-600 hover:text-blue-800">Bag-Tag NFC-Kofferanhänger</a> kombiniert 
                NFC und QR-Code für maximale Kompatibilität. Diese Anleitung zeigt Ihnen, wie Sie ihn optimal nutzen.
              </p>
            </section>

            <StepSection steps={steps} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Detaillierte Setup-Anleitung</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technische Voraussetzungen</h3>
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Für Besitzer (Sie):</h4>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>✅ Smartphone mit iOS 14+ oder Android 8+</li>
                  <li>✅ NFC-Funktion (für Aktivierung, bei den meisten Smartphones ab 2016 vorhanden)</li>
                  <li>✅ Internetverbindung (für App-Download und Aktivierung)</li>
                  <li>✅ E-Mail-Adresse (für Account-Erstellung)</li>
                  <li>✅ Push-Benachrichtigungen erlaubt (optional aber empfohlen)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mb-3">Für Finder:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Beliebiges Smartphone mit Kamera (für QR-Code) ODER NFC</li>
                  <li>✅ Internetverbindung (zum Laden der Kontaktseite)</li>
                  <li>❌ Keine App-Installation nötig!</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Schritt-für-Schritt: Erster Setup</h3>
              
              <div className="space-y-6 mb-8">
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">⏱️ Minute 1-2: App installieren</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>Öffnen Sie App Store (iOS) oder Google Play Store (Android)</li>
                    <li>Suchen Sie nach "Bag-Tag" oder nutzen Sie QR-Code auf Verpackung</li>
                    <li>Tippen Sie "Installieren" / "Laden"</li>
                    <li>Warten Sie, bis App vollständig installiert ist</li>
                    <li>Öffnen Sie die App (Icon: Kofferanhänger mit NFC-Symbol)</li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">⏱️ Minute 2-3: Account erstellen</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>Tippen Sie auf "Neuen Account erstellen"</li>
                    <li>Geben Sie Ihre E-Mail-Adresse ein (wichtig: regelmäßig checken!)</li>
                    <li>Wählen Sie ein sicheres Passwort (min. 8 Zeichen)</li>
                    <li>Akzeptieren Sie Nutzungsbedingungen und Datenschutz</li>
                    <li>Tippen Sie "Account erstellen"</li>
                    <li>Checken Sie Ihr E-Mail-Postfach für Verifizierungs-Link</li>
                    <li>Klicken Sie auf Link in der E-Mail → Account ist aktiviert!</li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">⏱️ Minute 3-4: Tag aktivieren</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>Loggen Sie sich in der App ein</li>
                    <li>Tippen Sie auf großen "+" Button oder "Neuen Tag hinzufügen"</li>
                    <li>Wählen Sie "NFC Tag scannen" oder "QR Code scannen"</li>
                    <li>Bei NFC: Halten Sie Smartphone-Rückseite nah an den Bag-Tag (1-2cm Abstand)</li>
                    <li>Bei QR: Richten Sie Kamera auf QR-Code auf dem Tag</li>
                    <li>App erkennt Tag automatisch, zeigt Tag-ID (z.B. "BT-A1B2C3D4")</li>
                    <li>Geben Sie dem Tag einen Namen (z.B. "Mein Hauptkoffer")</li>
                    <li>Tippen Sie "Weiter"</li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">⏱️ Minute 4-5: Kontaktdaten hinterlegen</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>E-Mail: Ihre Haupt-E-Mail (wird bereits ausgefüllt sein von Account)</li>
                    <li>Telefon: Ihre Mobilnummer mit Ländercode (z.B. +49 171 1234567)</li>
                    <li>Alternative Nummer (optional): Z.B. Reisepartner, Familie</li>
                    <li>Bevorzugte Kontaktmethode: E-Mail oder SMS/WhatsApp</li>
                    <li>Sprache: Automatisch basierend auf Account (änderbar)</li>
                    <li>Tippen Sie "Speichern" → Tag ist jetzt AKTIV! ✅</li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">⏱️ Minute 5: Testen & Befestigen</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>Öffnen Sie Kamera-App auf Ihrem oder einem zweiten Smartphone</li>
                    <li>Halten Sie Smartphone an NFC-Tag oder scannen Sie QR-Code</li>
                    <li>Browser öffnet automatisch → "Gegenstand gefunden" Seite erscheint</li>
                    <li>Check: Bekommen Sie Push-Benachrichtigung in der App? ✅</li>
                    <li>Befestigen Sie Tag am Koffergriff (gut sichtbar!)</li>
                    <li>Optional: Zweiten Tag innen im Koffer anbringen (Backup)</li>
                  </ol>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Troubleshooting: Häufige Probleme</h2>
              
              <div className="space-y-4 mb-8">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">❌ Problem: NFC funktioniert nicht</h4>
                  <p className="text-gray-700 mb-2"><strong>Lösungen:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Prüfen Sie, ob NFC in Smartphone-Einstellungen aktiviert ist</li>
                    <li>Entfernen Sie dicke Handyhülle (Metall blockiert NFC!)</li>
                    <li>Halten Sie Smartphone GENAU an NFC-Symbol auf dem Tag (1-2cm Abstand)</li>
                    <li>Bewegen Sie Smartphone langsam über den Tag (NFC-Position variiert je nach Modell)</li>
                    <li>Backup-Option: Nutzen Sie QR-Code stattdessen</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">❌ Problem: Keine Push-Benachrichtigungen</h4>
                  <p className="text-gray-700 mb-2"><strong>Lösungen:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Öffnen Sie Smartphone-Einstellungen → Apps → Bag-Tag → Benachrichtigungen → Alle erlauben</li>
                    <li>Prüfen Sie, ob "Nicht stören"-Modus aktiv ist</li>
                    <li>iOS: Einstellungen → Mitteilungen → Bag-Tag → Benachrichtigungen erlauben</li>
                    <li>Android: Einstellungen → Apps → Bag-Tag → Benachrichtigungen → Wichtigkeit auf "Hoch"</li>
                    <li>App einmal schließen und neu öffnen</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">❌ Problem: QR-Code scannt nicht</h4>
                  <p className="text-gray-700 mb-2"><strong>Lösungen:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Reinigen Sie QR-Code (Schmutz, Kratzer behindern Scan)</li>
                    <li>Sorgen Sie für gute Beleuchtung (QR-Codes brauchen Kontrast)</li>
                    <li>Halten Sie Kamera 10-20cm entfernt (nicht zu nah!)</li>
                    <li>iOS: Kamera-App öffnen, auf QR-Code richten, gelbes Banner erscheint → antippen</li>
                    <li>Android: Google Lens oder separate QR-Scanner-App nutzen</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Experten-Tipp:</p>
                <p className="text-gray-700">
                  Testen Sie Ihren Tag VOR jeder wichtigen Reise! Bitten Sie einen Freund, den Tag zu scannen – 
                  so stellen Sie sicher, dass Benachrichtigungen funktionieren. Aktualisieren Sie Kontaktdaten 
                  bei Auslandsreisen (Hotel-Nummer statt Heimnummer). Die 2 Minuten Vorbereitung können im Ernstfall 
                  Tage an Stress sparen.
                </p>
              </div>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Bereit für sorgenfreies Reisen?"
              description="Mit dieser Anleitung sind Sie perfekt vorbereitet. Holen Sie sich jetzt Ihren Bag-Tag und erleben Sie, wie einfach moderner Gepäckschutz sein kann."
              buttonText="Jetzt Bag-Tag kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
