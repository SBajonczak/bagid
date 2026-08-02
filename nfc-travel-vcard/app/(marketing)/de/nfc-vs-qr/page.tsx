import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import CtaButton from '@/app/components/CtaButton';
import ComparisonTable from '@/app/components/ComparisonTable';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'NFC vs. QR-Code Gepäckanhänger – Was ist besser? | Bag-Tag';
  const description = 'NFC oder QR-Code für deinen Gepäckanhänger? Unser Vergleich zeigt Vor- und Nachteile beider Technologien und warum der Bag-Tag beide kombiniert – für maximale Sicherheit.';
  const url = 'https://bag-tag.de/de/nfc-vs-qr';

  return {
    title,
    description,
    keywords: [
      'NFC vs QR Code Gepäckanhänger',
      'NFC oder QR Code Koffer',
      'Gepäckanhänger Vergleich',
      'QR Code Kofferanhänger',
      'NFC Kofferanhänger Vergleich',
      'smarter Gepäckanhänger Technologie',
    ],
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'de_DE',
      url,
      siteName: 'Bag-Tag',
      images: [
        {
          url: 'https://bag-tag.de/assets/productimage.webp',
          width: 1200,
          height: 630,
          alt: 'NFC vs QR-Code Gepäckanhänger Vergleich – Bag-Tag',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://bag-tag.de/assets/productimage.webp'],
      site: '@bag_tag',
    },
    alternates: {
      canonical: url,
      languages: {
        de: 'https://bag-tag.de/de/nfc-vs-qr',
        en: 'https://bag-tag.de/en/nfc-vs-qr',
        'x-default': 'https://bag-tag.de/de/nfc-vs-qr',
      },
    },
  };
}

export default function NfcVsQrPage() {
  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bag-tag.de/de',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NFC vs. QR-Code',
        item: 'https://bag-tag.de/de/nfc-vs-qr',
      },
    ],
  };

  // FAQ JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist der Hauptunterschied zwischen NFC und QR-Code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der Hauptunterschied liegt in der Bedienung: NFC funktioniert kontaktlos durch einfaches Ranhalten des Smartphones, während QR-Codes die Kamera benötigen und aktiv gescannt werden müssen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welche Technologie ist schneller?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NFC ist deutlich schneller. Die Datenübertragung erfolgt in weniger als 1 Sekunde, während QR-Codes 2-3 Sekunden zum Scannen benötigen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Funktioniert NFC auch bei schlechten Lichtverhältnissen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, NFC funktioniert unabhängig von Lichtverhältnissen, da es keine optische Erkennung benötigt. QR-Codes hingegen benötigen gute Sicht und ausreichend Licht.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8 text-gray-600">
            <Link href="/de" className="hover:text-blue-600">Home</Link>
            {' '}/{' '}
            <span className="text-gray-900">NFC vs. QR-Code</span>
          </nav>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            NFC vs. QR-Code: Welche Technologie ist besser für Gepäckanhänger?
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Beim Kauf eines smarten Gepäckanhängers stehen Sie vor der Wahl: NFC oder QR-Code? 
            Beide Technologien haben ihre Berechtigung, aber für Reisende bietet NFC entscheidende 
            Vorteile. In diesem ausführlichen Vergleich zeigen wir Ihnen, warum.
          </p>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Die Grundlagen: Was ist NFC und was ist ein QR-Code?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  NFC (Near Field Communication)
                </h3>
                <p className="text-gray-700 mb-3">
                  NFC ist eine drahtlose Technologie zur kontaktlosen Datenübertragung über 
                  kurze Distanzen (ca. 4 cm). Sie kennen NFC vom kontaktlosen Bezahlen mit 
                  Ihrer Kreditkarte oder vom Smartphone.
                </p>
                <p className="text-gray-700">
                  <strong>Funktionsweise:</strong> Smartphone einfach an den NFC-Tag halten – 
                  fertig. Keine App, kein Scannen erforderlich.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  QR-Code (Quick Response Code)
                </h3>
                <p className="text-gray-700 mb-3">
                  QR-Codes sind zweidimensionale Barcodes, die Informationen in einem 
                  pixeligen Muster speichern. Sie werden optisch mit der Smartphone-Kamera 
                  gelesen.
                </p>
                <p className="text-gray-700">
                  <strong>Funktionsweise:</strong> Kamera öffnen, QR-Code in den Sucher 
                  nehmen, scannen und auf den Link klicken.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <ComparisonTable language="de" />

          {/* Detailed Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Die Vorteile von NFC im Detail
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  1. Geschwindigkeit und Komfort
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Der größte Vorteil von NFC ist die Geschwindigkeit. Während Sie bei einem 
                  QR-Code erst die Kamera öffnen, fokussieren und warten müssen, bis der Code 
                  erkannt wird, reicht bei NFC ein kurzes Ranhalten des Smartphones. Die 
                  Datenübertragung erfolgt in unter einer Sekunde.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  <strong>Praxis-Beispiel am Flughafen:</strong> Sie stehen mit mehreren Koffern 
                  am Gepäckband. Ein Mitarbeiter findet Ihren verwechselten Koffer und möchte 
                  Sie kontaktieren. Mit NFC hält er sein Smartphone einfach ran – ohne umständlich 
                  die Kamera zu öffnen oder den Koffer drehen zu müssen. Zeit ist am Flughafen Geld.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  2. Funktioniert auch unter schwierigen Bedingungen
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  QR-Codes benötigen gute Sichtverhältnisse und saubere Oberflächen. Bei 
                  schlechtem Licht, verschmutzten Tags oder nassen Oberflächen versagt die 
                  Kamera oft. NFC funktioniert hingegen auch:
                </p>
                <ul className="list-disc pl-6 mb-4 text-lg text-gray-700 space-y-2">
                  <li>Bei Dunkelheit oder schlechtem Licht</li>
                  <li>Wenn der Tag verschmutzt ist</li>
                  <li>Bei Nässe und Regen</li>
                  <li>Selbst wenn der Tag teilweise verdeckt ist</li>
                  <li>Mit Handschuhen (wichtig im Winter)</li>
                </ul>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Gerade auf Reisen sind Gepäckstücke oft nicht in bestem Zustand. Der robuste 
                  NFC-Chip funktioniert zuverlässig, auch wenn der Tag schon einige 
                  Flughafenbänder hinter sich hat.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  3. Keine App erforderlich
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Moderne Smartphones (ab iOS 13 und Android 5) unterstützen NFC standardmäßig 
                  ohne zusätzliche Software. Bei QR-Codes ist das nicht immer der Fall – ältere 
                  Android-Geräte benötigen oft eine separate Scanner-App.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  <strong>Wichtig für Finder:</strong> Wer Ihr Gepäck findet, muss nichts 
                  installieren oder einrichten. Einfach Smartphone ranhalten, und die 
                  Kontaktinformationen erscheinen automatisch.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  4. Bessere Sicherheit und Datenschutz
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  NFC-Tags können verschlüsselt werden und bieten erweiterte Sicherheitsfunktionen. 
                  QR-Codes sind hingegen immer öffentlich lesbar und können leichter gefälscht werden.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Beim Bag-Tag mit NFC-Technologie profitieren Sie von:
                </p>
                <ul className="list-disc pl-6 mb-4 text-lg text-gray-700 space-y-2">
                  <li>Geschützter Datenübertragung</li>
                  <li>Verifizierten Authentifizierungen</li>
                  <li>Kontrolle über freigegebene Informationen</li>
                  <li>Schutz vor unautorisierten Kopien</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  5. Langlebigkeit und Wartungsfreiheit
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  QR-Codes können mit der Zeit verblassen, zerkratzen oder unleserlich werden. 
                  Der NFC-Chip ist hingegen im Tag eingebettet und völlig wartungsfrei. Keine 
                  Batterie, keine beweglichen Teile – einfach lebenslang funktionsfähig.
                </p>
              </div>
            </div>
          </section>

          {/* QR Code Pros */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Hat ein QR-Code auch Vorteile?
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Fairerweise muss man sagen: Ja, QR-Codes haben auch ihre Stärken.
            </p>
            <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-3">
              <li>
                <strong>Kostengünstiger in der Produktion:</strong> QR-Codes können einfach 
                gedruckt werden, während NFC-Chips teurer sind.
              </li>
              <li>
                <strong>Sichtbar aus der Distanz:</strong> Man kann einen QR-Code auch aus 
                einigen Metern Entfernung sehen und weiß sofort, dass es sich um einen 
                scannbaren Tag handelt.
              </li>
              <li>
                <strong>Kompatibilität mit älteren Geräten:</strong> Jedes Smartphone mit 
                Kamera kann QR-Codes lesen, während sehr alte Geräte möglicherweise kein NFC 
                unterstützen.
              </li>
            </ul>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Dennoch überwiegen die Nachteile: QR-Codes sind anfälliger für Umwelteinflüsse, 
              langsamer im Scan und weniger komfortabel in der Nutzung.
            </p>
          </section>

          {/* Bag-Tag Solution */}
          <section className="mb-12 bg-green-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Die Bag-Tag Lösung: Das Beste aus beiden Welten
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Warum sich entscheiden, wenn Sie beides haben können? Der Bag-Tag kombiniert 
              NFC-Technologie mit einem integrierten QR-Code als Backup.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ✓ Primär: NFC für maximalen Komfort
                </h3>
                <p className="text-gray-700">
                  Die Hauptfunktion läuft über NFC – schnell, einfach und zuverlässig. 
                  Perfekt für den täglichen Einsatz und moderne Smartphones.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ✓ Backup: QR-Code als Fallback
                </h3>
                <p className="text-gray-700">
                  Falls ein Finder ein älteres Gerät ohne NFC hat oder die NFC-Funktion 
                  deaktiviert ist, kann er einfach auf den integrierten QR-Code zurückgreifen.
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-6">
              <strong>Das Ergebnis:</strong> Maximale Kompatibilität mit bestmöglicher 
              Nutzererfahrung. Sie profitieren von der Geschwindigkeit und dem Komfort von NFC, 
              haben aber immer eine Rückfalloption.
            </p>
          </section>

          <CtaButton language="de" className="my-8" />

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Häufig gestellte Fragen
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Was ist der Hauptunterschied zwischen NFC und QR-Code?
                </h3>
                <p className="text-gray-700">
                  Der Hauptunterschied liegt in der Bedienung: NFC funktioniert kontaktlos 
                  durch einfaches Ranhalten des Smartphones, während QR-Codes die Kamera 
                  benötigen und aktiv gescannt werden müssen.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Welche Technologie ist schneller?
                </h3>
                <p className="text-gray-700">
                  NFC ist deutlich schneller. Die Datenübertragung erfolgt in weniger als 
                  1 Sekunde, während QR-Codes 2-3 Sekunden zum Scannen benötigen.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Funktioniert NFC auch bei schlechten Lichtverhältnissen?
                </h3>
                <p className="text-gray-700">
                  Ja, NFC funktioniert unabhängig von Lichtverhältnissen, da es keine optische 
                  Erkennung benötigt. QR-Codes hingegen benötigen gute Sicht und ausreichend Licht.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Brauche ich eine App für NFC?
                </h3>
                <p className="text-gray-700">
                  Nein, moderne Smartphones (ab iOS 13 und Android 5) unterstützen NFC 
                  standardmäßig ohne zusätzliche App. Bei QR-Codes ist manchmal eine separate 
                  Scanner-App erforderlich.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Was passiert, wenn mein Smartphone kein NFC hat?
                </h3>
                <p className="text-gray-700">
                  Der Bag-Tag verfügt zusätzlich über einen QR-Code als Backup. Damit ist 
                  maximale Kompatibilität gewährleistet, auch bei älteren Geräten.
                </p>
              </div>
            </div>
          </section>

          {/* Recommendation */}
          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Unsere Empfehlung
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Für Gepäckanhänger ist <strong>NFC eindeutig die bessere Wahl</strong>. Die 
              Kombination aus Geschwindigkeit, Zuverlässigkeit und Komfort macht NFC zur 
              idealen Technologie für Reisende.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Mit einem Dual-System wie dem Bag-Tag (NFC + QR-Code) erhalten Sie das Beste 
              aus beiden Welten: Die überlegene NFC-Technologie für den Normalfall und einen 
              QR-Code als Rückfalloption.
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              Investieren Sie in Qualität und Komfort – Ihr zukünftiges Ich wird es Ihnen danken.
            </p>
          </section>

          {/* Related Articles */}
          <section className="mb-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Weiterlesen
            </h2>
            <ul className="space-y-3 text-lg">
              <li>
                <Link href="/de/nfc-gepaeckanhaenger" className="text-blue-600 hover:text-blue-800 hover:underline">
                  → NFC Gepäckanhänger – Ihr smarter Reisebegleiter
                </Link>
              </li>
              <li>
                <Link href="/de/gepaeck-verlust-vermeiden" className="text-blue-600 hover:text-blue-800 hover:underline">
                  → So vermeiden Sie Gepäckverlust auf Reisen
                </Link>
              </li>
            </ul>
          </section>

          <CtaButton language="de" className="my-12" />
        </article>
      </div>
    </>
  );
}
