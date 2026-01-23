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

const pageUrl = 'https://bag-tag.de/de/ratgeber/nfc-vs-qr';
const pageTitle = 'NFC vs. QR-Code: Was ist besser für Gepäck-Tags?';
const pageDescription = 'Detaillierter Vergleich: NFC-Technologie vs. QR-Codes für Kofferanhänger. Vor- und Nachteile, technische Unterschiede und warum Bag-Tag beides kombiniert.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'NFC vs QR-Code, NFC-Tag, QR-Code Gepäck, Smart Luggage Tag, NFC-Technologie, Kofferanhänger Vergleich, Bag-Tag, NFC oder QR',
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'article',
      locale: 'de_DE',
      url: pageUrl,
      siteName: 'Bag-Tag',
      images: [{
        url: 'https://bag-tag.de/og-image-nfc-vs-qr.jpg',
        width: 1200,
        height: 630,
        alt: 'NFC vs. QR-Code Vergleich'
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: ['https://bag-tag.de/og-image-nfc-vs-qr.jpg'],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'de': pageUrl,
        'en': 'https://bag-tag.de/en/guides/nfc-vs-qr',
        'x-default': 'https://bag-tag.de/en/guides/nfc-vs-qr',
      },
    },
  };
}

export default function NfcVsQrPage() {
  const relatedLinks = getRelatedLinks('nfc-vs-qr', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'NFC vs. QR-Code', url: pageUrl },
  ];

  const tldrPoints = [
    'NFC ist bequemer (nur dranhalten), QR-Codes funktionieren mit jedem Smartphone',
    'NFC-Tags sind robuster und langlebiger, QR-Codes können verblassen oder beschädigen',
    'QR-Codes erreichen mehr Nutzer (100% Kompatibilität), NFC nur ca. 85% der Smartphones',
    'NFC funktioniert auch bei Verschmutzung besser als QR-Codes',
    'Bag-Tag kombiniert beide Technologien für maximale Reichweite und Komfort',
    'Beide funktionieren ohne Akku, App oder Internetverbindung beim Scannen',
  ];

  const faqItems = [
    {
      question: 'Was ist der Hauptunterschied zwischen NFC und QR-Code?',
      answer: 'NFC (Near Field Communication) ist eine drahtlose Technologie – Sie halten das Smartphone nur an den Tag. QR-Codes müssen mit der Kamera gescannt werden. NFC ist bequemer, QR funktioniert mit allen Smartphones (auch ohne NFC-Chip).',
    },
    {
      question: 'Brauche ich eine App zum Scannen?',
      answer: 'Bei modernen Smartphones (iOS 14+, Android 9+) nicht. NFC-Tags und QR-Codes werden vom System erkannt. Bei älteren Geräten braucht man ggf. eine QR-Code-Scanner-App (kostenlos verfügbar).',
    },
    {
      question: 'Sind NFC-Tags sicherer als QR-Codes?',
      answer: 'Beide sind gleich sicher für einfache Anwendungen wie Gepäck-Tags. NFC hat einen kleinen Vorteil: Die Lesereichweite ist auf wenige Zentimeter begrenzt (verhindert ungewolltes Scannen). QR-Codes können aus größerer Entfernung gescannt werden.',
    },
    {
      question: 'Warum hat Bag-Tag beides?',
      answer: 'Maximale Kompatibilität und Nutzerfreundlichkeit. NFC-Nutzer haben den Komfort-Vorteil (einfach dranhalten), alle anderen nutzen den QR-Code. So erreichen Sie 100% der Smartphone-Nutzer weltweit.',
    },
    {
      question: 'Funktionieren beide ohne Internet?',
      answer: 'Beim Scannen selbst braucht man kein Internet. NFC und QR-Code öffnen eine Webseite – dafür ist dann Internet nötig. Aber der Finder braucht keine spezielle App zu installieren.',
    },
    {
      question: 'Wie lange halten NFC-Tags und QR-Codes?',
      answer: 'NFC-Tags halten theoretisch ewig (passive Technologie, kein Akku). QR-Codes können verblassen, besonders bei direkter Sonneneinstrahlung. Hochwertige, laminierte QR-Codes (wie bei Bag-Tag) halten aber viele Jahre.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = generateFAQPageSchema(faqItems);
  const articleSchema = generateArticleSchema({
    headline: pageTitle,
    description: pageDescription,
    image: 'https://bag-tag.de/og-image-nfc-vs-qr.jpg',
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
                NFC vs. QR-Code: Was ist besser?
              </h1>
              <p className="text-xl text-gray-600">
                Ein detaillierter Vergleich der beiden Technologien für smarte Kofferanhänger – und warum die Kombination ideal ist.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Die beiden Technologien im Überblick</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Was ist NFC?</h3>
              <p className="text-gray-700 mb-4">
                NFC steht für "Near Field Communication" – eine drahtlose Technologie für kurze Distanzen (wenige Zentimeter). 
                Sie kennen NFC vermutlich vom kontaktlosen Bezahlen mit Smartphone oder Kreditkarte.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Funktionsweise:</strong> Energieübertragung durch elektromagnetisches Feld</li>
                <li><strong>Reichweite:</strong> 1-4 cm (sehr kurz, gezieltes Scannen)</li>
                <li><strong>Nutzung:</strong> Smartphone einfach an den Tag halten – fertig</li>
                <li><strong>Kompatibilität:</strong> Ca. 85% der modernen Smartphones (fast alle Android, iPhone ab XS/XR)</li>
                <li><strong>Akku:</strong> NFC-Tag selbst braucht keinen Akku (passive Technologie)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Was ist ein QR-Code?</h3>
              <p className="text-gray-700 mb-4">
                QR-Code steht für "Quick Response Code" – ein zweidimensionaler Barcode, der mit der Smartphone-Kamera gescannt wird. 
                QR-Codes sind überall: auf Plakaten, Produkten, Speisekarten.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Funktionsweise:</strong> Optisches Scannen mit Kamera</li>
                <li><strong>Reichweite:</strong> Abhängig von Code-Größe (meist 5-50 cm)</li>
                <li><strong>Nutzung:</strong> Kamera-App öffnen, auf Code halten, Link antippen</li>
                <li><strong>Kompatibilität:</strong> 100% aller Smartphones mit Kamera</li>
                <li><strong>Akku:</strong> Kein Akku nötig (gedruckter Code)</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Kurz gesagt:</p>
                <p className="text-gray-700">
                  NFC ist wie "Berührung" (kurze Reichweite, drahtlos), QR-Code ist wie "Anschauen" (optisch, größere Reichweite). 
                  Beide führen zum gleichen Ergebnis: Eine Webseite wird geöffnet.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Detaillierter Vergleich</h2>
              
              <div className="overflow-x-auto my-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Kriterium</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NFC</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">QR-Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Bedienung</td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        Einfach dranhalten – keine App öffnen nötig
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <strong className="text-yellow-600">★★★★☆</strong><br/>
                        Kamera öffnen, Code scannen, Link antippen
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Kompatibilität</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <strong className="text-yellow-600">★★★★☆</strong><br/>
                        Ca. 85% der Smartphones (alle neueren Geräte)
                      </td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        100% – jedes Smartphone mit Kamera
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Geschwindigkeit</td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        Instant: 1-2 Sekunden
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <strong className="text-yellow-600">★★★★☆</strong><br/>
                        Schnell: 3-5 Sekunden
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Robustheit</td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        Funktioniert auch bei Verschmutzung, Kratzern
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <strong className="text-orange-600">★★★☆☆</strong><br/>
                        Kann verblassen, verkratzen oder verschmutzen
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Lebensdauer</td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        Praktisch ewig (passive Technologie)
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <strong className="text-yellow-600">★★★★☆</strong><br/>
                        Viele Jahre (bei guter Qualität und Laminierung)
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Akku/Stromversorgung</td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        Kein Akku nötig (passiv)
                      </td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        Kein Akku nötig (gedruckt)
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Sicherheit</td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        Sehr kurze Reichweite verhindert ungewolltes Scannen
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <strong className="text-yellow-600">★★★★☆</strong><br/>
                        Kann aus Distanz gescannt werden
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Lichtverhältnisse</td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        Funktioniert bei allen Lichtverhältnissen
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <strong className="text-yellow-600">★★★★☆</strong><br/>
                        Braucht ausreichend Licht für Kamera
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Kosten (Herstellung)</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <strong className="text-yellow-600">★★★★☆</strong><br/>
                        Etwas teurer (NFC-Chip erforderlich)
                      </td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        Sehr günstig (einfach drucken)
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Datenkapazität</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <strong className="text-yellow-600">★★★☆☆</strong><br/>
                        Begrenzt (144 Bytes - 8 KB typisch)
                      </td>
                      <td className="border border-gray-300 px-4 py-3 bg-green-50">
                        <strong className="text-green-700">★★★★★</strong><br/>
                        Viel Speicher möglich (bis 3 KB praktisch nutzbar)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Wann nutzt man was?</h2>
              
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">✅ NFC ist ideal für:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Schnellen, häufigen Zugriff</strong> (z.B. Visitenkarten, Loyalty-Karten)</li>
                    <li>• <strong>Schlechte Sichtverhältnisse</strong> (Dunkelheit, Verschmutzung)</li>
                    <li>• <strong>Maximale Bequemlichkeit</strong> (einfach dranhalten)</li>
                    <li>• <strong>Langlebigkeit</strong> (raue Umgebungen)</li>
                    <li>• <strong>Sicherheitskritische Anwendungen</strong> (kurze Reichweite)</li>
                  </ul>
                </div>

                <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">✅ QR-Codes sind ideal für:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Maximale Reichweite</strong> (alle Smartphones)</li>
                    <li>• <strong>Große Distanzen</strong> (Plakate, Werbung)</li>
                    <li>• <strong>Ältere Smartphones</strong> (ohne NFC)</li>
                    <li>• <strong>Budget-Anwendungen</strong> (günstig zu drucken)</li>
                    <li>• <strong>Viel Information</strong> (mehr Datenkapazität)</li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50 my-8">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">🏆 Kombination (NFC + QR) ist ideal für:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Gepäck-Tags:</strong> NFC für Komfort, QR für Kompatibilität</li>
                  <li>• <strong>Haustier-Tags:</strong> Beide Technologien erhöhen Fundwahrscheinlichkeit</li>
                  <li>• <strong>Schlüsselanhänger:</strong> Flexibilität für alle Finder</li>
                  <li>• <strong>Notfall-Kontakte:</strong> Maximale Erreichbarkeit wichtig</li>
                </ul>
                <p className="text-purple-900 font-medium mt-4">
                  → Das ist genau der Ansatz von Bag-Tag: Beste Technologie kombinieren für 100% Abdeckung!
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Technische Funktionsweise</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">So funktioniert NFC</h3>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li><strong>Tag enthält Chip und Antenne:</strong> Der NFC-Chip speichert Daten (z.B. eine URL), die Antenne ermöglicht drahtlose Kommunikation</li>
                <li><strong>Smartphone erzeugt elektromagnetisches Feld:</strong> Wenn Sie Ihr Smartphone an den Tag halten, aktiviert das Feld den Chip</li>
                <li><strong>Chip sendet Daten:</strong> Der Tag überträgt die gespeicherte Information (URL) ans Smartphone</li>
                <li><strong>Smartphone öffnet Link:</strong> Die URL wird automatisch geöffnet – Sie sehen die Webseite</li>
              </ol>
              <p className="text-gray-700 mt-4">
                <strong>Vorteil:</strong> Alles passiert in 1-2 Sekunden, ohne App-Installation. Der Tag braucht keinen eigenen Akku, 
                da er vom Smartphone mit Energie versorgt wird.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">So funktioniert ein QR-Code</h3>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li><strong>Code enthält Muster:</strong> Der QR-Code ist ein zweidimensionales Muster aus schwarzen und weißen Quadraten</li>
                <li><strong>Kamera erfasst Muster:</strong> Sie halten die Smartphone-Kamera auf den Code</li>
                <li><strong>Software dekodiert:</strong> Die Kamera-App oder QR-Scanner entschlüsselt das Muster zur URL</li>
                <li><strong>Link wird angezeigt:</strong> Sie tippen auf den Link, die Webseite öffnet sich</li>
              </ol>
              <p className="text-gray-700 mt-4">
                <strong>Vorteil:</strong> Funktioniert mit 100% aller Smartphones, keine spezielle Hardware (NFC-Chip) nötig. 
                QR-Codes können auch größere Datenmengen speichern.
              </p>

              <div className="bg-gray-100 border-l-4 border-gray-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">🔬 Technische Details:</p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>NFC-Frequenz:</strong> 13,56 MHz (weltweit lizenzfrei)</li>
                  <li><strong>NFC-Reichweite:</strong> Bis 10 cm theoretisch, praktisch 1-4 cm</li>
                  <li><strong>NFC-Standards:</strong> ISO/IEC 14443, ISO/IEC 18092</li>
                  <li><strong>QR-Code-Standard:</strong> ISO/IEC 18004</li>
                  <li><strong>QR-Versionen:</strong> Version 1 (21×21 Module) bis Version 40 (177×177 Module)</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Warum Bag-Tag beide Technologien nutzt</h2>
              
              <p className="text-gray-700 mb-4">
                Bag-Tag kombiniert NFC-Chip und QR-Code in einem Kofferanhänger. Das bietet mehrere entscheidende Vorteile:
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">1. Maximale Kompatibilität</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>NFC-Nutzer (ca. 85%) profitieren vom Komfort: Einfach dranhalten</li>
                <li>Nicht-NFC-Nutzer (ca. 15%) nutzen den QR-Code: Funktioniert mit jedem Smartphone</li>
                <li>Ergebnis: 100% Abdeckung aller Finder weltweit</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">2. Ausfallsicherheit</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Falls QR-Code beschädigt oder verschmutzt ist: NFC funktioniert trotzdem</li>
                <li>Falls NFC-Lesefehler auftritt: QR-Code als Backup</li>
                <li>Doppelte Sicherheit erhöht die Wahrscheinlichkeit der Rückgabe</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">3. Nutzerfreundlichkeit</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Jeder Finder nutzt die Methode, die ihm vertraut ist</li>
                <li>Keine Barriere: "Ich weiß nicht, wie NFC funktioniert" → QR-Code nutzen</li>
                <li>Höhere Wahrscheinlichkeit, dass Finder den Tag überhaupt scannen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">4. Zukunftssicher</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>NFC-Verbreitung steigt jährlich (immer mehr Smartphones mit NFC)</li>
                <li>QR-Codes bleiben Standard für maximale Kompatibilität</li>
                <li>Bag-Tag funktioniert heute und in 10 Jahren</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">💡 Das Beste aus beiden Welten:</p>
                <p className="text-gray-700">
                  Statt sich für eine Technologie zu entscheiden, kombiniert Bag-Tag die Vorteile beider: 
                  NFC für Komfort und Robustheit, QR für universelle Kompatibilität. So erreichen Sie jeden Finder – 
                  egal welches Smartphone er nutzt.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Mythen und Missverständnisse</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">❌ Mythos: "NFC braucht eine App"</h3>
                  <p className="text-gray-700">
                    <strong>Falsch.</strong> Moderne Smartphones (iOS 14+, Android 9+) erkennen NFC-Tags automatisch. 
                    Die URL öffnet sich direkt im Browser – keine App-Installation nötig.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">❌ Mythos: "QR-Codes sind unsicher"</h3>
                  <p className="text-gray-700">
                    <strong>Teilweise richtig.</strong> QR-Codes können theoretisch auf schädliche Webseiten verweisen. 
                    Aber: Moderne Smartphones zeigen die URL vor dem Öffnen an. Bei Bag-Tag sehen Sie immer "bag-tag.de" – 
                    eindeutig sicher.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">❌ Mythos: "NFC funktioniert nur mit Android"</h3>
                  <p className="text-gray-700">
                    <strong>Falsch.</strong> iPhones ab XS/XR (2018) unterstützen NFC-Tag-Lesen vollständig. 
                    Ältere iPhones (7/8/X) können NFC teilweise nutzen, für volle Kompatibilität gibt's den QR-Code.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">❌ Mythos: "QR-Codes können nicht aktualisiert werden"</h3>
                  <p className="text-gray-700">
                    <strong>Teilweise richtig.</strong> Der QR-Code selbst ist statisch. ABER: Bei Bag-Tag verweist der Code auf eine 
                    dynamische Webseite. Ihre Kontaktdaten können Sie jederzeit online ändern – ohne neuen QR-Code zu drucken.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">❌ Mythos: "NFC-Tags können Viren übertragen"</h3>
                  <p className="text-gray-700">
                    <strong>Falsch.</strong> NFC-Tags können nur Daten übertragen (URL, Text). Sie können keinen Code ausführen 
                    oder Software installieren. Das Smartphone entscheidet, was mit den Daten passiert – genau wie bei einem Link.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Fazit: Was ist besser?</h2>
              
              <p className="text-gray-700 mb-4">
                Es gibt kein klares "besser" – beide Technologien haben ihre Stärken:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">NFC gewinnt bei:</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>✓ Bedienkomfort</li>
                    <li>✓ Geschwindigkeit</li>
                    <li>✓ Robustheit</li>
                    <li>✓ Langlebigkeit</li>
                    <li>✓ Schlechten Lichtverhältnissen</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">QR-Code gewinnt bei:</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>✓ Kompatibilität (100%)</li>
                    <li>✓ Bekanntheit</li>
                    <li>✓ Kosten</li>
                    <li>✓ Datenkapazität</li>
                    <li>✓ Lesereichweite</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-8 my-8 text-center">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">🏆 Die beste Lösung: Beide kombinieren!</h3>
                <p className="text-gray-800 text-lg mb-4">
                  Warum sich entscheiden, wenn man beides haben kann? Bag-Tag nutzt NFC UND QR-Code für:
                </p>
                <ul className="text-left inline-block text-gray-700 space-y-2">
                  <li>✓ <strong>100% Smartphone-Kompatibilität</strong></li>
                  <li>✓ <strong>Maximaler Komfort</strong> (NFC ist schneller)</li>
                  <li>✓ <strong>Backup-System</strong> (falls eine Technologie versagt)</li>
                  <li>✓ <strong>Zukunftssicher</strong> (funktioniert heute und morgen)</li>
                </ul>
              </div>

              <p className="text-gray-700 mt-6 text-lg">
                Für Kofferanhänger, Haustier-Tags oder Schlüsselanhänger ist die Kombination aus NFC und QR-Code 
                die intelligenteste Wahl. Sie erreichen jeden Finder und maximieren die Wahrscheinlichkeit, 
                dass Ihr verlorenes Gepäck schnell zu Ihnen zurückfindet.
              </p>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Bag-Tag: NFC + QR-Code in einem"
              description="Profitieren Sie von beiden Technologien. Maximale Kompatibilität, maximale Sicherheit."
              buttonText="Bag-Tag entdecken"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
