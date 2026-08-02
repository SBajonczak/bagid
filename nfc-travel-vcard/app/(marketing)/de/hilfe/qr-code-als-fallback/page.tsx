import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import { 
  TldrSection, 
  StepSection,
  RelatedLinksSection, 
  CtaSection,
  Breadcrumb 
} from '@/app/components/ContentComponents';
import { getRelatedLinks } from '@/lib/linkMap';
import { generateBreadcrumbSchema, generateHowToSchema } from '@/lib/schema-utils';
import { QrCode, Smartphone, CheckCircle } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'QR-Code als Fallback nutzen – Alternative zu NFC | Bag-Tag';
  const description = 'So nutzen Sie den QR-Code auf Ihrem Bag-Tag als Fallback, wenn NFC nicht verfügbar ist. Funktioniert auf allen Smartphones ohne App.';
  const url = 'https://bag-tag.de/de/hilfe/qr-code-als-fallback';

  return {
    title,
    description,
    keywords: 'QR-Code Bag-Tag, QR-Code scannen, NFC Alternative, Gepäckanhänger QR-Code, Bag-Tag ohne NFC',
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
          alt: 'QR-Code als Fallback nutzen',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://bag-tag.de/assets/productimage.webp'],
    },
    alternates: {
      canonical: url,
      languages: {
        de: '/de/hilfe/qr-code-als-fallback',
        en: '/en/help/qr-code-fallback',
      },
    },
  };
}

export default function QrCodeAlsFallbackPage() {
  const breadcrumbItems = [
    { name: 'Home', href: '/de' },
    { name: 'Hilfe', href: '/de/hilfe' },
    { name: 'QR-Code als Fallback' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Hilfe', url: 'https://bag-tag.de/de/hilfe' },
    { name: 'QR-Code als Fallback', url: 'https://bag-tag.de/de/hilfe/qr-code-als-fallback' },
  ]);

  const howToSchema = generateHowToSchema({
    name: 'QR-Code auf Bag-Tag scannen',
    description: 'Anleitung zum Scannen des QR-Codes auf dem Bag-Tag NFC Gepäckanhänger als Fallback-Lösung',
    totalTime: 'PT1M',
    steps: [
      {
        name: 'Kamera-App öffnen',
        text: 'Öffnen Sie die Kamera-App auf Ihrem Smartphone. Die meisten modernen Smartphones erkennen QR-Codes automatisch.',
      },
      {
        name: 'QR-Code scannen',
        text: 'Richten Sie die Kamera auf den QR-Code auf der Rückseite des Bag-Tags. Halten Sie das Smartphone ruhig und achten Sie auf gute Lichtverhältnisse.',
      },
      {
        name: 'Benachrichtigung öffnen',
        text: 'Eine Benachrichtigung oder ein Banner mit einem Link erscheint. Tippen Sie darauf, um die Bag-Tag-Website zu öffnen.',
      },
      {
        name: 'Aktivierung abschließen',
        text: 'Folgen Sie den Anweisungen auf der Website, um Ihren Tag zu aktivieren oder die Kontaktdaten des Besitzers einzusehen.',
      },
    ],
  });

  const qrSteps = [
    {
      title: 'Kamera-App öffnen',
      description: 'Öffnen Sie die Standard-Kamera-App auf Ihrem Smartphone. Bei iPhones (ab iOS 11) und den meisten Android-Geräten (ab Android 9) ist ein QR-Code-Scanner bereits integriert. Sie benötigen keine separate App!',
    },
    {
      title: 'QR-Code fokussieren',
      description: 'Richten Sie die Kamera auf den QR-Code auf der Rückseite des Bag-Tags. Der QR-Code befindet sich meist unterhalb oder neben dem NFC-Symbol. Halten Sie das Smartphone ruhig in einem Abstand von 10–20 cm. Achten Sie auf gute Lichtverhältnisse.',
    },
    {
      title: 'Benachrichtigung antippen',
      description: 'Sobald die Kamera den QR-Code erkennt, erscheint oben eine Benachrichtigung oder ein Banner mit einem Link (z. B. "bag-tag.de/..."). Tippen Sie darauf, um die Website im Browser zu öffnen.',
    },
    {
      title: 'Website nutzen',
      description: 'Die Bag-Tag-Website öffnet sich automatisch. Von hier aus können Sie Ihren Tag aktivieren, Daten ändern oder (als Finder) die Kontaktinformationen des Besitzers einsehen. Der Rest funktioniert genauso wie beim NFC-Scan!',
    },
  ];

  const whenToUseQR = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Smartphone ohne NFC',
      description: 'Ihr Smartphone unterstützt kein NFC? Kein Problem! Der QR-Code funktioniert auf jedem Smartphone mit Kamera, unabhängig vom Modell oder Preis.',
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'NFC funktioniert nicht',
      description: 'Manchmal erkennt das Smartphone den NFC-Tag nicht (z. B. durch dicke Hüllen, defekten Sensor oder Störungen). Der QR-Code ist eine zuverlässige Alternative.',
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: 'Schneller für manche Nutzer',
      description: 'Einige Menschen finden das Scannen eines QR-Codes intuitiver als NFC. Besonders ältere Smartphones mit schwachen NFC-Sensoren profitieren vom QR-Code.',
    },
  ];

  const relatedLinks = getRelatedLinks('helpQrFallback', 'de');

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article>
            <Breadcrumb items={breadcrumbItems} />

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              QR-Code als Fallback nutzen
            </h1>

            {/* TL;DR */}
            <TldrSection>
              <p className="mb-2">
                <strong>QR-Code scannen:</strong> Öffnen Sie die Kamera-App, richten Sie sie auf 
                den QR-Code auf der Rückseite des Bag-Tags, und tippen Sie auf die Benachrichtigung. 
                Fertig!
              </p>
              <p>
                Der QR-Code funktioniert auf allen Smartphones – keine NFC erforderlich, keine 
                App notwendig.
              </p>
            </TldrSection>

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Jeder Bag-Tag verfügt über <strong>zwei Möglichkeiten</strong>, ihn zu scannen: 
                NFC (Near Field Communication) und QR-Code. Während NFC die schnellere und 
                komfortablere Methode ist, bietet der QR-Code eine universelle Fallback-Lösung, 
                die auf allen Smartphones funktioniert – unabhängig von Modell, Preis oder 
                Betriebssystem.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Der QR-Code ist besonders nützlich, wenn Ihr Smartphone kein NFC hat, NFC nicht 
                aktiviert ist oder der NFC-Sensor aus irgendeinem Grund nicht funktioniert. Mit 
                dem QR-Code haben Sie immer eine zuverlässige Alternative.
              </p>
            </section>

            {/* When to use QR */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Wann sollte ich den QR-Code nutzen?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {whenToUseQR.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="bg-blue-50 text-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Steps */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                So scannen Sie den QR-Code
              </h2>
              <StepSection steps={qrSteps} />
            </section>

            {/* Device-Specific Instructions */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Anleitungen nach Gerät
              </h2>

              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    📱 iPhone (iOS 11 und neuer)
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-3">
                    QR-Code-Scanner ist in die Kamera-App integriert:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-slate-700">
                    <li>Öffnen Sie die Kamera-App</li>
                    <li>Richten Sie die Kamera auf den QR-Code</li>
                    <li>Eine Benachrichtigung erscheint oben → Antippen</li>
                    <li>Safari öffnet die Bag-Tag-Website</li>
                  </ol>
                  <p className="text-sm text-slate-600 mt-3">
                    <strong>Tipp:</strong> Falls es nicht funktioniert, überprüfen Sie in 
                    Einstellungen → Kamera, ob "QR-Codes scannen" aktiviert ist.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    🤖 Android (ab Android 9)
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-3">
                    Die meisten Android-Geräte haben QR-Code-Scanning integriert:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-slate-700">
                    <li>Öffnen Sie die Kamera-App oder Google Lens</li>
                    <li>Richten Sie die Kamera auf den QR-Code</li>
                    <li>Tippen Sie auf die Benachrichtigung oder den Link</li>
                    <li>Der Browser öffnet die Bag-Tag-Website</li>
                  </ol>
                  <p className="text-sm text-slate-600 mt-3">
                    <strong>Alternative:</strong> Bei Samsung-Geräten können Sie auch Bixby 
                    Vision oder Samsung Internet nutzen (QR-Code-Scanner-Modus).
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    📵 Ältere Smartphones (Android 8 oder älter)
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-3">
                    Falls Ihre Kamera-App QR-Codes nicht automatisch erkennt:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-slate-700">
                    <li>Laden Sie eine kostenlose QR-Code-Scanner-App aus dem Google Play Store oder App Store (z. B. "QR Code Reader" oder "QR Scanner")</li>
                    <li>Öffnen Sie die App und erlauben Sie Kamera-Zugriff</li>
                    <li>Richten Sie die Kamera auf den QR-Code</li>
                    <li>Die App öffnet automatisch den Link im Browser</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Comparison: NFC vs QR */}
            <section className="mb-12 bg-blue-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                NFC vs. QR-Code: Welche Methode ist besser?
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-300">
                      <th className="py-3 px-4 text-slate-900 font-semibold">Eigenschaft</th>
                      <th className="py-3 px-4 text-slate-900 font-semibold">NFC</th>
                      <th className="py-3 px-4 text-slate-900 font-semibold">QR-Code</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-b border-slate-200">
                      <td className="py-3 px-4 font-medium">Geschwindigkeit</td>
                      <td className="py-3 px-4">⚡ Sehr schnell (1 Sek.)</td>
                      <td className="py-3 px-4">🐢 Etwas langsamer (2–3 Sek.)</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 px-4 font-medium">Kompatibilität</td>
                      <td className="py-3 px-4">📱 Nur moderne Smartphones</td>
                      <td className="py-3 px-4">✅ Alle Smartphones</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 px-4 font-medium">Zuverlässigkeit</td>
                      <td className="py-3 px-4">⚠️ Kann durch Hüllen blockiert werden</td>
                      <td className="py-3 px-4">✅ Funktioniert immer</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 px-4 font-medium">Benutzerfreundlichkeit</td>
                      <td className="py-3 px-4">👍 Sehr einfach (nur dranhalten)</td>
                      <td className="py-3 px-4">👍 Einfach (Kamera öffnen)</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 px-4 font-medium">Lichtverhältnisse</td>
                      <td className="py-3 px-4">✅ Keine Rolle</td>
                      <td className="py-3 px-4">💡 Benötigt ausreichend Licht</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-slate-700 mt-6">
                <strong>Fazit:</strong> NFC ist schneller und komfortabler, aber der QR-Code 
                ist universell kompatibel und funktioniert auf allen Geräten. Gut, dass jeder 
                Bag-Tag beide Methoden unterstützt!
              </p>
            </section>

            {/* Tips */}
            <section className="mb-12 bg-green-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Tipps für optimales QR-Code-Scanning
              </h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Gute Beleuchtung:</strong> Achten Sie auf ausreichend Licht. 
                    Vermeiden Sie starke Reflexionen oder Schatten auf dem QR-Code.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Richtiger Abstand:</strong> Halten Sie das Smartphone 10–20 cm 
                    vom QR-Code entfernt. Zu nah oder zu weit funktioniert nicht optimal.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Ruhig halten:</strong> Halten Sie das Smartphone ruhig, damit 
                    die Kamera fokussieren kann. Vermeiden Sie verwackelte Aufnahmen.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Ganzen Code zeigen:</strong> Stellen Sie sicher, dass der gesamte 
                    QR-Code im Kamerabild sichtbar ist. Beschnittene QR-Codes funktionieren nicht.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Sauberer Code:</strong> Wischen Sie Schmutz oder Kratzer vom 
                    QR-Code ab. Ein beschädigter Code kann schwer zu scannen sein.
                  </span>
                </li>
              </ul>
            </section>

            {/* Related Links */}
            <RelatedLinksSection title="Weitere Hilfe-Themen" links={relatedLinks} />

            {/* CTA */}
            <CtaSection
              primaryText="Bag-Tag kaufen"
              primaryHref="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
              secondaryText="Tag aktivieren"
              secondaryHref="/de/hilfe/aktivieren"
              description="Bereit für Ihre nächste Reise?"
            />
          </article>
        </div>
      </div>
    </>
  );
}
