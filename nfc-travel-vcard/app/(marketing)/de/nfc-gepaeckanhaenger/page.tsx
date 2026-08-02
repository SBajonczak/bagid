import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import CtaButton from '@/app/components/CtaButton';
import ColorSelector from '@/app/components/ColorSelector';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'NFC Gepäckanhänger kaufen – Bag-Tag | Ab €10,99 | Keine App nötig';
  const description = 'Smarter NFC & QR-Code Gepäckanhänger für €10,99. Kein App-Download, keine Batterien. Finder können dich sofort kontaktieren – weltweit. DSGVO-konform. Jetzt bestellen.';
  const url = 'https://bag-tag.de/de/nfc-gepaeckanhaenger';

  return {
    title,
    description,
    keywords: [
      'NFC Gepäckanhänger kaufen',
      'Kofferanhänger NFC',
      'smarter Gepäckanhänger',
      'NFC Kofferanhänger',
      'digitaler Kofferanhänger',
      'QR Code Gepäckanhänger',
      'Gepäckanhänger keine App',
      'Bag-Tag NFC',
      'verlorenes Gepäck kontaktieren',
    ],
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'de_DE',
      url,
      siteName: 'Bag-Tag',
      images: [
        {
          url: 'https://bag-tag.de/assets/productimage.webp',
          width: 1200,
          height: 630,
          alt: 'Bag-Tag NFC Gepäckanhänger – smarter Kofferanhänger mit NFC und QR-Code für €10,99',
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
        de: 'https://bag-tag.de/de/nfc-gepaeckanhaenger',
        en: 'https://bag-tag.de/en/nfc-luggage-tag',
        'x-default': 'https://bag-tag.de/de/nfc-gepaeckanhaenger',
      },
    },
  };
}

export default function NfcGepaeckanhängerPage() {
  // Product JSON-LD
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'NFC Gepäckanhänger',
    brand: {
      '@type': 'Brand',
      name: 'Bag-Tag',
    },
    description: 'Smarter NFC Gepäckanhänger mit QR-Code für sicheres Reisen. Keine App erforderlich, DSGVO-konform, wasserfest.',
    image: 'https://bag-tag.de/assets/productimage.webp',
    offers: {
      '@type': 'Offer',
      url: 'https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc',
      priceCurrency: 'EUR',
      price: '10.99',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Kreativschicht.de',
      },
    },
  };

  // FAQ JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist ein NFC Gepäckanhänger?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein NFC Gepäckanhänger ist ein smarter Kofferanhänger, der NFC-Technologie (Near Field Communication) nutzt, um Ihre Kontaktdaten digital zu speichern. Wenn jemand sein Smartphone an den Tag hält, werden die Informationen sofort angezeigt – ohne App.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie funktioniert die NFC-Technologie?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NFC steht für Near Field Communication und ermöglicht die kontaktlose Datenübertragung über kurze Distanzen (ca. 4 cm). Sie halten einfach Ihr Smartphone an den Tag, und die gespeicherten Informationen werden automatisch angezeigt. Fast alle modernen Smartphones unterstützen NFC ab Werk.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ist der NFC Gepäckanhänger sicher und datenschutzkonform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, absolut. Der Bag-Tag ist DSGVO-konform. Sie entscheiden selbst, welche Informationen Sie speichern möchten. Es gibt kein Tracking, und Ihre Daten bleiben unter Ihrer Kontrolle. Nur die Person, die den Tag scannt, kann die von Ihnen freigegebenen Informationen sehen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Brauche ich eine App für den NFC Gepäckanhänger?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nein, Sie benötigen keine spezielle App. Die NFC-Funktion ist in modernen Smartphones (ab iOS 13 und Android 5) standardmäßig integriert. Zusätzlich verfügt der Bag-Tag über einen QR-Code als Backup-Lösung.',
        },
      },
      {
        '@type': 'Question',
        name: 'Für wen eignet sich ein NFC Gepäckanhänger?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der Bag-Tag eignet sich perfekt für Geschäftsreisende, Familien, Vielflieger und alle, die häufig unterwegs sind. Er ist besonders praktisch für Flughäfen, wo Gepäck schnell verwechselt oder verloren gehen kann. Auch für Gruppenreisen ist er ideal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie robust ist der NFC Gepäckanhänger?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der Bag-Tag ist wasserfest, stoßfest und für den rauen Reisealltag konzipiert. Er hält extremen Temperaturen stand und funktioniert auch bei Nässe oder Schmutz zuverlässig.',
        },
      },
      {
        '@type': 'Question',
        name: 'Muss ich den NFC Gepäckanhänger aufladen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nein, der Bag-Tag benötigt keine Batterie und muss nicht aufgeladen werden. Die NFC-Technologie ist passiv und wird vom Smartphone des Finders mit Energie versorgt. Damit funktioniert er lebenslang ohne Wartung.',
        },
      },
    ],
  };

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
        name: 'NFC Gepäckanhänger',
        item: 'https://bag-tag.de/de/nfc-gepaeckanhaenger',
      },
    ],
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8 text-gray-600">
            <Link href="/de" className="hover:text-blue-600">Home</Link>
            {' '}/{' '}
            <span className="text-gray-900">NFC Gepäckanhänger</span>
          </nav>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            NFC Gepäckanhänger – Ihr smarter Reisebegleiter
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Verlorenes Gepäck gehört der Vergangenheit an. Mit dem Bag-Tag NFC Gepäckanhänger 
            kombinieren Sie modernste Technologie mit maximalem Komfort. Kontaktlos, sicher und 
            einfach – für stressfreies Reisen weltweit.
          </p>

          <CtaButton language="de" className="my-8" />

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Was ist ein NFC Gepäckanhänger?
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Ein NFC Gepäckanhänger ist die moderne Alternative zum klassischen Kofferanhänger. 
              Während herkömmliche Gepäckanhänger nur statische Informationen auf Papier zeigen, 
              speichert der Bag-Tag Ihre Kontaktdaten digital. Dank Near Field Communication (NFC) 
              können Finder Ihr Gepäck mit einem einfachen Smartphone-Tap identifizieren – ohne 
              spezielle App oder komplizierte Einrichtung.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Die Technologie ist dieselbe, die Sie bereits von kontaktlosem Bezahlen kennen. 
              Fast alle modernen Smartphones (ab iOS 13 und Android 5) unterstützen NFC standardmäßig. 
              Als zusätzliche Sicherheit verfügt der Bag-Tag auch über einen QR-Code, der mit jeder 
              Smartphone-Kamera funktioniert.
            </p>
          </section>

          {/* Why NFC is Better */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Warum NFC-Gepäckanhänger besser sind als klassische Tags
            </h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              1. Kontaktlose Technologie
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Kein umständliches Aufklappen von Papiereinlagen oder Entziffern verwischter 
              Handschrift mehr. Der Finder hält einfach sein Smartphone an den Bag-Tag und 
              erhält sofort alle wichtigen Informationen. Das dauert weniger als eine Sekunde 
              und funktioniert auch mit Handschuhen oder bei schlechtem Licht.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              2. Immer aktuell – jederzeit änderbar
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Neue Telefonnummer? Andere E-Mail-Adresse? Bei klassischen Gepäckanhängern müssten 
              Sie alles neu ausfüllen. Mit dem Bag-Tag ändern Sie Ihre Daten einfach online in 
              Ihrem Konto – und sie sind sofort aktuell. Perfekt für Vielreisende und 
              Geschäftsleute, die ihre Kontaktdaten flexibel anpassen müssen.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              3. Maximaler Datenschutz
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Im Gegensatz zu herkömmlichen Kofferanhängern, bei denen Ihre Adresse und 
              Telefonnummer für jeden sichtbar sind, kontrollieren Sie beim Bag-Tag genau, 
              welche Informationen angezeigt werden. Kein Tracking, keine Werbung, keine 
              Datenweitergabe. DSGVO-konform und zu 100% unter Ihrer Kontrolle.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              4. Robust und langlebig
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Der Bag-Tag ist wasserfest, stoßfest und hält extremen Bedingungen stand. 
              Keine Batterie, die gewechselt werden muss. Keine empfindlichen Papiereinlagen, 
              die reißen oder verblassen. Einmal kaufen, lebenslang nutzen.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              5. Internationale Kompatibilität
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              NFC funktioniert weltweit ohne Sprachbarrieren. Egal ob in Tokyo, New York oder 
              Paris – jedes moderne Smartphone kann Ihren Bag-Tag lesen. Die Benutzeroberfläche 
              ist mehrsprachig und intuitiv verständlich.
            </p>
          </section>

          {/* Security and Privacy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Sicherheit & Datenschutz: Ihre Daten bleiben privat
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Datenschutz ist uns wichtig. Der Bag-Tag wurde nach deutschen Datenschutzstandards 
              entwickelt und ist vollständig DSGVO-konform. Im Gegensatz zu GPS-Trackern oder 
              App-basierten Lösungen gibt es kein permanentes Tracking Ihres Gepäcks.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              <strong>So funktioniert der Datenschutz beim Bag-Tag:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
              <li>
                <strong>Sie entscheiden:</strong> Welche Informationen auf dem Tag gespeichert 
                werden, bestimmen allein Sie. Minimale Angaben genügen – mehr ist optional.
              </li>
              <li>
                <strong>Kein Tracking:</strong> Der Tag sendet keine Standortdaten. Nur wenn 
                jemand aktiv den Tag scannt, werden Informationen angezeigt.
              </li>
              <li>
                <strong>Sichere Benachrichtigung:</strong> Wenn Ihr Gepäck gefunden wurde und 
                der Finder Sie kontaktiert, erhalten Sie eine Benachrichtigung – aber Ihre 
                vollständige Adresse bleibt geschützt.
              </li>
              <li>
                <strong>Keine Weitergabe:</strong> Ihre Daten werden niemals an Dritte verkauft 
                oder für Werbezwecke genutzt. Sie liegen sicher auf deutschen Servern.
              </li>
              <li>
                <strong>Jederzeit löschbar:</strong> Sie können Ihr Konto und alle Daten 
                jederzeit vollständig löschen.
              </li>
            </ul>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Diese Kombination aus Funktionalität und Datenschutz macht den Bag-Tag zur idealen 
              Wahl für sicherheitsbewusste Reisende.
            </p>
          </section>

          {/* Use Cases */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Perfekt für jeden Anwendungsfall
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🧳 Geschäftsreisen
                </h3>
                <p className="text-gray-700">
                  Vielreisende schätzen die schnelle Identifikation am Gepäckband und die 
                  Möglichkeit, Kontaktdaten je nach Reiseziel anzupassen. Ideal für 
                  internationale Meetings und Konferenzen.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  👨‍👩‍👧‍👦 Familienurlaub
                </h3>
                <p className="text-gray-700">
                  Mehrere Koffer für die ganze Familie? Kein Problem. Jeder Bag-Tag kann 
                  individuell konfiguriert werden, und Sie behalten den Überblick über alle 
                  Gepäckstücke.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ✈️ Flughäfen & Airlines
                </h3>
                <p className="text-gray-700">
                  Am Flughafen geht besonders viel Gepäck verloren. Mit dem NFC-Tag können 
                  Flughafenmitarbeiter Sie sofort kontaktieren, wenn Ihr Koffer auftaucht – 
                  ohne lange Wartezeiten am Lost & Found.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🏕️ Outdoor & Abenteuer
                </h3>
                <p className="text-gray-700">
                  Camping, Trekking oder Festivals – überall, wo viel Gepäck unterwegs ist, 
                  hilft der wasserfeste und robuste Bag-Tag, Ihre Ausrüstung wiederzufinden.
                </p>
              </div>
            </div>
          </section>

          {/* Why Bag-Tag Section */}
          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Warum Bag-Tag?
            </h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Keine App erforderlich:</strong> Funktioniert mit jedem modernen Smartphone out-of-the-box</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Lebenslang nutzbar:</strong> Keine Batterie, keine Folgekosten, keine Abos</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>DSGVO-konform:</strong> Entwickelt und gehostet in Deutschland nach höchsten Datenschutzstandards</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Wasserfest & robust:</strong> Hält extremen Bedingungen stand</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Dual-Technologie:</strong> NFC + QR-Code für maximale Kompatibilität</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Einfache Verwaltung:</strong> Daten online jederzeit änderbar</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Schnelle Identifikation:</strong> In unter 1 Sekunde lesbar</span>
              </li>
            </ul>
          </section>

          <ColorSelector language="de" />

          <CtaButton language="de" className="my-8" />

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Häufig gestellte Fragen (FAQ)
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Was ist ein NFC Gepäckanhänger?
                </h3>
                <p className="text-gray-700">
                  Ein NFC Gepäckanhänger ist ein smarter Kofferanhänger, der NFC-Technologie 
                  (Near Field Communication) nutzt, um Ihre Kontaktdaten digital zu speichern. 
                  Wenn jemand sein Smartphone an den Tag hält, werden die Informationen sofort 
                  angezeigt – ohne App.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Wie funktioniert die NFC-Technologie?
                </h3>
                <p className="text-gray-700">
                  NFC steht für Near Field Communication und ermöglicht die kontaktlose 
                  Datenübertragung über kurze Distanzen (ca. 4 cm). Sie halten einfach Ihr 
                  Smartphone an den Tag, und die gespeicherten Informationen werden automatisch 
                  angezeigt. Fast alle modernen Smartphones unterstützen NFC ab Werk.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Ist der NFC Gepäckanhänger sicher und datenschutzkonform?
                </h3>
                <p className="text-gray-700">
                  Ja, absolut. Der Bag-Tag ist DSGVO-konform. Sie entscheiden selbst, welche 
                  Informationen Sie speichern möchten. Es gibt kein Tracking, und Ihre Daten 
                  bleiben unter Ihrer Kontrolle. Nur die Person, die den Tag scannt, kann die 
                  von Ihnen freigegebenen Informationen sehen.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Brauche ich eine App für den NFC Gepäckanhänger?
                </h3>
                <p className="text-gray-700">
                  Nein, Sie benötigen keine spezielle App. Die NFC-Funktion ist in modernen 
                  Smartphones (ab iOS 13 und Android 5) standardmäßig integriert. Zusätzlich 
                  verfügt der Bag-Tag über einen QR-Code als Backup-Lösung.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Für wen eignet sich ein NFC Gepäckanhänger?
                </h3>
                <p className="text-gray-700">
                  Der Bag-Tag eignet sich perfekt für Geschäftsreisende, Familien, Vielflieger 
                  und alle, die häufig unterwegs sind. Er ist besonders praktisch für Flughäfen, 
                  wo Gepäck schnell verwechselt oder verloren gehen kann. Auch für Gruppenreisen 
                  ist er ideal.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Wie robust ist der NFC Gepäckanhänger?
                </h3>
                <p className="text-gray-700">
                  Der Bag-Tag ist wasserfest, stoßfest und für den rauen Reisealltag konzipiert. 
                  Er hält extremen Temperaturen stand und funktioniert auch bei Nässe oder 
                  Schmutz zuverlässig.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Muss ich den NFC Gepäckanhänger aufladen?
                </h3>
                <p className="text-gray-700">
                  Nein, der Bag-Tag benötigt keine Batterie und muss nicht aufgeladen werden. 
                  Die NFC-Technologie ist passiv und wird vom Smartphone des Finders mit Energie 
                  versorgt. Damit funktioniert er lebenslang ohne Wartung.
                </p>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Weiterlesen
            </h2>
            <ul className="space-y-3 text-lg">
              <li>
                <Link href="/de/nfc-vs-qr" className="text-blue-600 hover:text-blue-800 hover:underline">
                  → NFC vs. QR-Code: Der ausführliche Vergleich
                </Link>
              </li>
              <li>
                <Link href="/de/gepaeck-verlust-vermeiden" className="text-blue-600 hover:text-blue-800 hover:underline">
                  → So vermeiden Sie Gepäckverlust auf Reisen – Praktische Tipps
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
