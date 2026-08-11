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
import { generateBreadcrumbSchema, generateFAQPageSchema, generateArticleSchema } from '@/lib/schema-utils';

const pageUrl = 'https://bag-tag.de/de/ratgeber/datenschutz-nfc-gepaeckanhaenger';
const pageTitle = 'Datenschutz bei NFC-Gepäckanhängern: DSGVO & Sicherheit 2026';
const pageDescription = 'Wie sicher sind NFC-Gepäckanhänger? Alles über Datenschutz, DSGVO-Konformität, Verschlüsselung und Privatsphäre bei digitalen Kofferanhängern.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'NFC Datenschutz, DSGVO Gepäckanhänger, NFC Sicherheit, digitaler Kofferanhänger Datenschutz, Privatsphäre Reise, NFC Verschlüsselung',
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
        alt: 'NFC Datenschutz und Sicherheit'
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
        'en': 'https://bag-tag.de/en/guides/privacy-nfc-luggage-tag',
        'x-default': 'https://bag-tag.de/en/guides/privacy-nfc-luggage-tag',
      },
    },
  };
}

export default function PrivacyNfcPage() {
  const relatedLinks = getRelatedLinks('guidePrivacyNfc', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Datenschutz NFC-Gepäckanhänger', url: pageUrl },
  ];

  const tldrPoints = [
    'NFC-Tags speichern Daten verschlüsselt – nur Sie kontrollieren, wer was sieht',
    'DSGVO-konform: Finder sehen Ihre Adresse NICHT, können aber Nachricht senden',
    'Traditionelle Papieranhänger zeigen ALLE Daten öffentlich – NFC schützt Privatsphäre',
    'Sie können Daten jederzeit ändern oder Tag deaktivieren',
    'Keine GPS-Überwachung: NFC funktioniert nur bei aktiver Annäherung (< 5cm)',
    'Deutsche Server, DSGVO-konforme Datenspeicherung',
  ];

  const faqItems = [
    {
      question: 'Können Fremde meine Daten vom NFC-Tag auslesen?',
      answer: 'Nein! Der NFC-Chip speichert keine lesbaren persönlichen Daten. Er enthält nur eine verschlüsselte ID, die auf eine sichere Webseite verweist. Erst dort kann ein Finder eine Nachricht senden – ohne Ihre Adresse, Telefonnummer oder E-Mail zu sehen. Sie entscheiden, ob und wie Sie antworten.',
    },
    {
      question: 'Ist Bag-Tag DSGVO-konform?',
      answer: 'Ja, vollständig. Bag-Tag speichert Ihre Daten auf deutschen Servern, verschlüsselt und DSGVO-konform. Sie haben jederzeit Recht auf Auskunft, Löschung und Datenübertragbarkeit. Ihre Kontaktdaten werden nur verwendet, um Finder mit Ihnen in Kontakt zu bringen – niemals für Werbung oder Weitergabe an Dritte.',
    },
    {
      question: 'Kann mich jemand über NFC tracken oder verfolgen?',
      answer: 'Nein. NFC hat extrem kurze Reichweite (< 5cm) und funktioniert nur bei aktiver Annäherung. Es gibt keine GPS-Funktion, kein Bluetooth-Broadcasting, keine Hintergrundverfolgung. Der Tag sendet erst, wenn jemand bewusst sein Smartphone direkt daran hält. Anders als AirTags gibt es kein permanentes Tracking.',
    },
    {
      question: 'Was sieht der Finder, wenn er meinen Tag scannt?',
      answer: 'Der Finder sieht eine Webseite mit neutralem Text wie "Dieses Gepäckstück wurde verloren. Bitte helfen Sie dem Besitzer." Dazu ein Kontaktformular. Ihre Adresse, Name, Telefonnummer – nichts davon ist sichtbar. Der Finder kann nur eine Nachricht mit seiner Kontaktmöglichkeit schicken. Sie erhalten die Nachricht und entscheiden, ob Sie antworten.',
    },
    {
      question: 'Kann ich verschiedene Kontaktdaten für verschiedene Reisen hinterlegen?',
      answer: 'Ja! Sie können Ihre Daten jederzeit in der Bag-Tag App ändern. Für Geschäftsreisen hinterlegen Sie Ihre Business-E-Mail, für Privatreisen Ihre private. Sie können auch temporäre Daten hinterlegen (z.B. Hotel-Telefon während der Reise) und nach Rückkehr wieder ändern.',
    },
    {
      question: 'Was passiert, wenn ich den Tag nicht mehr nutzen will?',
      answer: 'Sie können Ihren Tag jederzeit in der App deaktivieren. Dann zeigt der Scan nur noch "Dieser Tag ist nicht mehr aktiv". Alternativ löschen Sie Ihre Daten komplett – nach DSGVO-Richtlinien werden sie dann innerhalb von 30 Tagen vollständig entfernt. Der physische Tag wird unbrauchbar (aber Sie können ihn reaktivieren, wenn Sie möchten).',
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
                Datenschutz bei NFC-Gepäckanhängern
              </h1>
              <p className="text-xl text-gray-600">
                Wie sicher sind digitale Kofferanhänger? Alles über DSGVO-Konformität, Datenschutz, 
                Verschlüsselung und warum NFC-Tags Ihre Privatsphäre besser schützen als traditionelle Anhänger.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Das Problem mit traditionellen Gepäckanhängern</h2>
              <p className="text-gray-700 mb-4">
                Werfen wir einen Blick auf klassische Papier- oder Plastikanhänger:
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
                <h3 className="font-semibold text-gray-900 mb-3">Was jeder sehen kann:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Ihr vollständiger Name</li>
                  <li>Ihre Wohnadresse (Straße, Hausnummer, PLZ, Stadt)</li>
                  <li>Ihre Telefonnummer</li>
                  <li>Oft sogar Ihre E-Mail-Adresse</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  <strong>Risiko:</strong> Jeder am Gepäckband, jedes Flughafenpersonal, jeder Mitreisende kann diese Daten 
                  lesen, fotografieren und missbrauchen. Kriminelle wissen genau, wann Sie nicht zuhause sind.
                </p>
              </div>

              <p className="text-gray-700 mb-6">
                <strong>NFC-Gepäckanhänger lösen dieses Problem:</strong> Ihre Daten sind nicht öffentlich sichtbar. 
                Der Finder kann Sie kontaktieren, sieht aber Ihre Adresse nicht. Das ist echter Datenschutz.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Wie funktioniert Datenschutz bei NFC-Tags?</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Schritt 1: Verschlüsselte Speicherung</h3>
              <p className="text-gray-700 mb-4">
                Der NFC-Chip in Ihrem <a href="https://bag-tag.de/de" className="text-blue-600 hover:text-blue-800">Bag-Tag Kofferanhänger</a> speichert 
                keine persönlichen Daten im Klartext. Stattdessen enthält er nur eine eindeutige, verschlüsselte ID – ähnlich 
                wie ein QR-Code. Diese ID ist für Außenstehende nutzlos.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Schritt 2: Sichere Datenbank</h3>
              <p className="text-gray-700 mb-4">
                Ihre echten Kontaktdaten (Name, E-Mail, Telefon) werden auf sicheren, DSGVO-konformen Servern in Deutschland gespeichert. 
                Die Verbindung zwischen der Tag-ID und Ihren Daten ist verschlüsselt. Nur das Bag-Tag System kann diese Verbindung herstellen.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Schritt 3: Anonymer Finder-Kontakt</h3>
              <p className="text-gray-700 mb-4">
                Wenn jemand Ihren Tag scannt, öffnet sich eine neutrale Webseite. Der Finder sieht:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Eine Nachricht: "Dieses Gepäckstück wurde verloren – bitte helfen Sie dem Besitzer"</li>
                <li>Ein Kontaktformular, um eine Nachricht zu senden</li>
                <li><strong>NICHT sichtbar:</strong> Ihr Name, Ihre Adresse, Ihre Telefonnummer, Ihre E-Mail</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Schritt 4: Sie haben die Kontrolle</h3>
              <p className="text-gray-700 mb-4">
                Sie erhalten die Nachricht des Finders per E-Mail/App. Jetzt entscheiden SIE:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Möchten Sie antworten? → Geben Sie Ihre Kontaktdaten frei</li>
                <li>Verdächtige Nachricht? → Ignorieren oder melden</li>
                <li>Koffer bereits gefunden? → Benachrichtigung ignorieren</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">✅ Ihr Vorteil:</p>
                <p className="text-gray-700">
                  Anders als bei Papieranhängern können Sie Ihre Privatsphäre wahren und trotzdem erreichbar sein. 
                  Der Finder kann helfen, ohne Ihre sensiblen Daten zu kennen.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">DSGVO-Konformität im Detail</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Was bedeutet DSGVO-konform?</h3>
              <p className="text-gray-700 mb-4">
                Die Datenschutz-Grundverordnung (DSGVO) ist ein EU-Gesetz, das Ihre digitalen Rechte schützt. 
                Bag-Tag erfüllt alle Anforderungen:
              </p>
              
              <div className="space-y-4 my-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">✓ Datenminimierung</h4>
                  <p className="text-gray-700">Wir speichern nur, was nötig ist: Kontaktdaten für die Gepäckrückgabe. Keine unnötigen Informationen, keine Tracking-Daten, kein Bewegungsprofil.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">✓ Zweckbindung</h4>
                  <p className="text-gray-700">Ihre Daten werden NUR verwendet, um Finder mit Ihnen zu verbinden. Keine Werbung, kein Verkauf an Dritte, keine anderen Zwecke.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">✓ Transparenz</h4>
                  <p className="text-gray-700">Sie wissen genau, welche Daten gespeichert werden und warum. Klare Datenschutzerklärung in verständlicher Sprache.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">✓ Ihre Rechte</h4>
                  <p className="text-gray-700">Auskunft, Berichtigung, Löschung, Datenübertragbarkeit – alle DSGVO-Rechte jederzeit über die App verfügbar.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">✓ Sichere Speicherung</h4>
                  <p className="text-gray-700">Server in Deutschland, verschlüsselte Datenübertragung (SSL/TLS), regelmäßige Sicherheitsaudits.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">NFC vs. andere Tracking-Technologien</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">NFC vs. GPS-Tracker (z.B. AirTag)</h3>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Kriterium</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">NFC-Tag (Bag-Tag)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">GPS-Tracker (AirTag)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Reichweite</td>
                      <td className="border border-gray-300 px-4 py-2">< 5cm (nur bei Kontakt)</td>
                      <td className="border border-gray-300 px-4 py-2">Weltweit (via Bluetooth-Netz)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Tracking möglich?</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Nein</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Ja (permanent)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Datenschutz</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Sehr hoch</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ Mittel (Standort-Historie)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Finder-Kontakt</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Ja, anonym</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Nein (nur Ortung)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Batterie</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Keine nötig</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ Ja (1-2 Jahre)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Fazit:</strong> NFC ist datenschutzfreundlicher. Kein permanentes Tracking, kein Standortverlauf, 
                keine Überwachung. Dafür direkter Kontakt zum Finder – die perfekte Balance zwischen Privatsphäre und Funktionalität.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Praktische Tipps für maximale Privatsphäre</h2>
              
              <ol className="list-decimal pl-6 space-y-4 text-gray-700">
                <li>
                  <strong>Separate E-Mail-Adresse:</strong> Erstellen Sie eine Reise-E-Mail (z.B. max.mueller.travel@gmail.com) 
                  nur für Ihren Bag-Tag. So bleibt Ihre Haupt-E-Mail geschützt.
                </li>
                <li>
                  <strong>Telefonnummer dosiert freigeben:</strong> Geben Sie Ihre Handynummer erst frei, nachdem Sie die 
                  Nachricht des Finders gelesen haben. Bei verdächtigen Anfragen: E-Mail-Kontakt reicht.
                </li>
                <li>
                  <strong>Temporäre Kontaktdaten:</strong> Während der Reise können Sie Hotel-Telefon oder Reisehandy hinterlegen. 
                  Nach Rückkehr wieder auf Standard-Kontakt ändern.
                </li>
                <li>
                  <strong>Regelmäßig überprüfen:</strong> Checken Sie alle 6 Monate Ihre hinterlegten Daten in der App – 
                  alte Telefonnummern oder Adressen aktualisieren.
                </li>
                <li>
                  <strong>Mehrere Tags für verschiedene Zwecke:</strong> Ein Tag für Privatreisen (private E-Mail), 
                  ein Tag für Geschäftsreisen (Business-E-Mail). So bleiben die Bereiche getrennt.
                </li>
              </ol>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">⚠️ Wichtig zu wissen:</p>
                <p className="text-gray-700">
                  Auch wenn NFC-Tags sehr sicher sind: Geben Sie niemals mehr Informationen frei als nötig. 
                  Ein Finder braucht nur EINE Kontaktmöglichkeit (E-Mail oder Telefon) – nicht beide sofort.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Sicherheit des NFC-Chips selbst</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Kann man den Chip hacken?</h3>
              <p className="text-gray-700 mb-4">
                Technisch: Extrem schwierig und unpraktisch. Der Chip enthält nur eine ID – keine sensiblen Daten. 
                Selbst wenn jemand die ID ausliest, führt sie nur zur Bag-Tag Webseite, die keine Daten preisgibt.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Verschlüsselung:</strong> Die Verbindung zwischen Tag-ID und Ihren Daten ist mit AES-256 verschlüsselt – 
                gleicher Standard wie Online-Banking. Ein Hack müsste die Bag-Tag Server angreifen, nicht den Chip selbst.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Kann man den Tag klonen?</h3>
              <p className="text-gray-700 mb-4">
                Theoretisch könnte jemand die ID kopieren. Aber: Das bringt nichts. Die geklonte ID führt zur selben 
                Kontaktseite wie das Original. Der Angreifer kann keine Daten stehlen oder ändern – nur eine Nachricht 
                an Sie senden (was ein ehrlicher Finder auch könnte).
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Zusätzlicher Schutz:</strong> Bag-Tag erkennt, wenn ein Tag ungewöhnlich oft gescannt wird 
                (Missbrauch-Indikator) und kann Scans temporär blockieren.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Vergleich: Datenschutz-Niveau</h2>
              
              <div className="space-y-4 my-6">
                <div className="p-4 bg-red-100 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-2">❌ Niedrig: Papieranhänger</h4>
                  <p className="text-gray-700">Alle Daten öffentlich sichtbar. Keinerlei Privatsphäre. Jeder kann Ihre Adresse fotografieren.</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 mb-2">⚠️ Mittel: QR-Code zu Webseite mit Kontaktdaten</h4>
                  <p className="text-gray-700">Daten nicht sofort sichtbar, aber nach Scan vollständig einsehbar. Keine Kontrolle, wer scannt.</p>
                </div>
                <div className="p-4 bg-green-100 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-2">✅ Hoch: NFC mit anonymem Kontaktformular (Bag-Tag)</h4>
                  <p className="text-gray-700">Finder sieht KEINE Daten. Sie entscheiden, wem Sie antworten. Volle Kontrolle über Ihre Privatsphäre.</p>
                </div>
              </div>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Schützen Sie Ihre Privatsphäre beim Reisen"
              description="Mit Bag-Tag bleiben Sie erreichbar, ohne Ihre persönlichen Daten preiszugeben. DSGVO-konform und sicher."
              buttonText="Bag-Tag mit Datenschutz kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
