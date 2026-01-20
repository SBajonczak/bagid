import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import CtaButton from '@/app/components/CtaButton';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Gepäckverlust vermeiden – 10 Profi-Tipps für Reisende | Bag-Tag';
  const description = 'Erfahren Sie, wie Sie Gepäckverlust auf Reisen effektiv vermeiden. Praktische Tipps vom Experten für Flughäfen, Airlines und digitale Gepäckidentifikation.';
  const url = 'https://bag-tag.de/de/gepaeck-verlust-vermeiden';

  return {
    title,
    description,
    keywords: 'Gepäckverlust vermeiden, Koffer verloren, Flughafen Gepäck, verlorenes Gepäck finden, Reisetipps, Gepäckidentifikation, Bag-Tag',
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'de_DE',
      url,
      siteName: 'Bag-Tag',
    },
    alternates: {
      canonical: url,
      languages: {
        de: '/de/gepaeck-verlust-vermeiden',
        en: '/en/prevent-luggage-loss',
      },
    },
  };
}

export default function GepaeckVerlustVermeidenPage() {
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
        name: 'Gepäckverlust vermeiden',
        item: 'https://bag-tag.de/de/gepaeck-verlust-vermeiden',
      },
    ],
  };

  // Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gepäckverlust vermeiden – 10 Profi-Tipps für Reisende',
    description: 'Praktische Tipps und Strategien, um Gepäckverlust auf Reisen zu vermeiden.',
    author: {
      '@type': 'Organization',
      name: 'Bag-Tag',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bag-Tag',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bag-tag.de/assets/icon_32_32.png',
      },
    },
    datePublished: '2024-01-15',
    dateModified: '2024-01-15',
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8 text-gray-600">
            <Link href="/de" className="hover:text-blue-600">Home</Link>
            {' '}/{' '}
            <span className="text-gray-900">Gepäckverlust vermeiden</span>
          </nav>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Gepäckverlust vermeiden – 10 Profi-Tipps für stressfreies Reisen
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Jedes Jahr gehen Millionen Gepäckstücke auf Flughäfen verloren oder werden fehlgeleitet. 
            Die gute Nachricht: Mit den richtigen Strategien können Sie das Risiko drastisch 
            reduzieren. Hier sind unsere bewährten Profi-Tipps.
          </p>

          {/* Statistics */}
          <section className="mb-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Die Zahlen sprechen für sich
            </h2>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>→ <strong>26 Millionen</strong> Gepäckstücke gehen jährlich weltweit verloren</li>
              <li>→ <strong>5,57 pro 1.000 Passagiere</strong> sind von Gepäckverlust betroffen</li>
              <li>→ Nur <strong>81%</strong> werden innerhalb von 48 Stunden wiedergefunden</li>
              <li>→ Durchschnittliche Wartezeit: <strong>1,2 Tage</strong></li>
            </ul>
            <p className="text-gray-700 mt-4 italic">
              Quelle: SITA Baggage IT Insights Report
            </p>
          </section>

          {/* Main Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              10 Praktische Tipps gegen Gepäckverlust
            </h2>

            <div className="space-y-8">
              {/* Tip 1 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  1. Verwenden Sie auffällige Gepäckanhänger
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Schwarze und dunkelblaue Koffer sehen alle gleich aus. Machen Sie Ihr Gepäck 
                  unverwechselbar mit:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Bunten Kofferbändern oder Aufklebern</li>
                  <li>Auffälligen Gepäckanhängern in leuchtenden Farben</li>
                  <li>Individuellen Markierungen (aber keine persönliche Adresse außen!)</li>
                  <li>Einem <Link href="/de/nfc-gepaeckanhaenger" className="text-blue-600 hover:underline">smarten NFC-Gepäckanhänger</Link> für digitale Identifikation</li>
                </ul>
                <p className="text-lg text-gray-700 mt-3 leading-relaxed">
                  <strong>Profi-Tipp:</strong> Machen Sie ein Foto von Ihrem Koffer vor jeder 
                  Reise. So können Sie ihn im Verlustfall genau beschreiben.
                </p>
              </div>

              {/* Tip 2 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  2. Nutzen Sie moderne digitale Gepäckidentifikation
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Papieranhänger können abreißen oder unleserlich werden. Digitale Lösungen wie 
                  NFC-Tags sind robuster und zuverlässiger:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Kontaktdaten bleiben immer aktuell (online änderbar)</li>
                  <li>Funktioniert auch bei Nässe und Schmutz</li>
                  <li>Kein Abreißen oder Verblassen</li>
                  <li>Schnelle Identifikation durch Flughafenpersonal</li>
                  <li>DSGVO-konform – nur Sie kontrollieren Ihre Daten</li>
                </ul>
                <p className="text-lg text-gray-700 mt-3 leading-relaxed">
                  Der Bag-Tag kombiniert NFC-Technologie mit einem klassischen QR-Code für 
                  maximale Kompatibilität.
                </p>
              </div>

              {/* Tip 3 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  3. Entfernen Sie alte Gepäckanhänger und Barcode-Aufkleber
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Alte Barcode-Aufkleber von früheren Flügen verwirren die automatischen 
                  Sortiersysteme am Flughafen. Das ist eine der Hauptursachen für Fehlleitung.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Regel:</strong> Entfernen Sie vor jedem Flug alle alten Aufkleber, 
                  Barcodes und Gepäckanhänger. Nur der aktuelle Anhänger sollte sichtbar sein.
                </p>
              </div>

              {/* Tip 4 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  4. Planen Sie ausreichend Umsteigezeit ein
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Die meisten Gepäckstücke gehen bei knappen Anschlussflügen verloren. Ihr Koffer 
                  schafft den Transfer einfach nicht rechtzeitig.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Empfehlung:</strong> Mindestens 90 Minuten Umsteigezeit bei 
                  internationalen Flügen, 60 Minuten bei Inlandsflügen. Bei großen Flughäfen 
                  wie Frankfurt oder München lieber 2 Stunden einplanen.
                </p>
              </div>

              {/* Tip 5 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  5. Checken Sie früh ein
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Je früher Sie einchecken, desto mehr Zeit hat die Airline, Ihr Gepäck korrekt 
                  zu verladen. Last-Minute-Check-ins sind ein häufiger Grund für Gepäckverlust.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Best Practice:</strong> Online einchecken und mindestens 2 Stunden 
                  vor Abflug am Flughafen sein. Bei internationalen Flügen 3 Stunden.
                </p>
              </div>

              {/* Tip 6 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  6. Packen Sie Wertsachen und das Wichtigste ins Handgepäck
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Selbst mit allen Vorsichtsmaßnahmen kann Gepäck verloren gehen. Schützen Sie 
                  sich, indem Sie das Notwendigste bei sich tragen:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Medikamente und wichtige Dokumente</li>
                  <li>Wechselkleidung für mindestens einen Tag</li>
                  <li>Elektronikgeräte und Ladekabel</li>
                  <li>Wertsachen und Schmuck</li>
                  <li>Geschäftsunterlagen für wichtige Meetings</li>
                </ul>
              </div>

              {/* Tip 7 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  7. Fotografieren Sie Ihren Kofferinhalt
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Machen Sie vor dem Verschließen Fotos vom Kofferinhalt. Das hilft enorm bei:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Versicherungsansprüchen</li>
                  <li>Beschreibung des Inhalts bei Verlust</li>
                  <li>Beweisführung bei Beschädigung</li>
                </ul>
              </div>

              {/* Tip 8 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  8. Wählen Sie Direktflüge, wenn möglich
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Statistisch gesehen: Je mehr Umstiege, desto höher das Risiko. Direktflüge 
                  reduzieren die Wahrscheinlichkeit von Gepäckverlust um bis zu 70%.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Wenn möglich, buchen Sie Direktflüge – besonders bei wichtigen Geschäftsreisen 
                  oder mit wertvollem Gepäck.
                </p>
              </div>

              {/* Tip 9 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  9. Informieren Sie sich über Ihre Rechte
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Kennen Sie Ihre Rechte bei Gepäckverlust:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Airlines müssen Ersatz für Notwendiges zahlen (EU: bis 1.131 Sonderziehungsrechte ≈ 1.400 Euro)</li>
                  <li>Sie haben Anspruch auf Entschädigung bei dauerhaftem Verlust</li>
                  <li>Melden Sie Gepäckverlust sofort am Schalter – nicht erst im Hotel</li>
                  <li>Bewahren Sie alle Belege auf (Boarding Pass, PIR-Nummer)</li>
                </ul>
              </div>

              {/* Tip 10 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  10. Investieren Sie in eine Gepäckversicherung
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Eine gute Reiseversicherung mit Gepäckschutz kostet wenig und schützt vor 
                  großen Verlusten. Prüfen Sie, ob:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Ihre Kreditkarte bereits einen Gepäckschutz bietet</li>
                  <li>Ihre Hausratversicherung auch Reisegepäck abdeckt</li>
                  <li>Eine separate Reisegepäckversicherung sinnvoll ist (besonders bei wertvollen Inhalten)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How Airlines Handle Luggage */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Wie Airlines mit verlorenen Gepäckstücken umgehen
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Verstehen Sie den Prozess, und Sie wissen, wo die Risiken liegen:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Der Weg Ihres Gepäcks
              </h3>
              <ol className="list-decimal pl-6 space-y-3 text-lg text-gray-700">
                <li>
                  <strong>Check-in:</strong> Ihr Koffer erhält einen Barcode mit Zielflughafen 
                  und Flugnummer
                </li>
                <li>
                  <strong>Sortierung:</strong> Automatische Systeme lesen den Barcode und 
                  leiten den Koffer zum richtigen Gate
                </li>
                <li>
                  <strong>Verladung:</strong> Das Bodenpersonal lädt das Gepäck ins Flugzeug
                </li>
                <li>
                  <strong>Transfer (bei Umsteigen):</strong> Das Gepäck wird umgeladen – hier 
                  passieren die meisten Fehler
                </li>
                <li>
                  <strong>Ankunft:</strong> Koffer wird aufs Gepäckband gelegt
                </li>
              </ol>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Was passiert bei Verlust?
            </h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Wenn Ihr Koffer nicht ankommt, startet die Airline eine Suche im <strong>WorldTracer</strong> 
              System – einer globalen Datenbank für verlorenes Gepäck. Je besser Ihr Koffer 
              identifiziert werden kann (durch eindeutige Merkmale, Fotos und digitale Tags), 
              desto schneller wird er gefunden.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              <strong>Hier hilft der Bag-Tag:</strong> Flughafenpersonal kann Ihren NFC-Tag 
              scannen und Sie sofort kontaktieren – ohne langwierige Datenbanksuche.
            </p>
          </section>

          {/* Digital Identification Advantages */}
          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Die Vorteile digitaler Gepäckidentifikation
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Traditionelle Papieranhänger haben ausgedient. Moderne digitale Lösungen bieten 
              entscheidende Vorteile:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ⚡ Schnellere Wiederfindung
                </h3>
                <p className="text-gray-700">
                  NFC-Tags können in Sekunden gescannt werden – ohne Kamera, ohne App. 
                  Flughafenpersonal identifiziert Ihr Gepäck sofort.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🔒 Besserer Datenschutz
                </h3>
                <p className="text-gray-700">
                  Ihre vollständige Adresse ist nicht öffentlich sichtbar. Sie kontrollieren, 
                  welche Informationen geteilt werden.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🔄 Immer aktuell
                </h3>
                <p className="text-gray-700">
                  Ändern Sie Ihre Kontaktdaten online – ohne neuen Anhänger ausfüllen zu müssen. 
                  Perfekt für Vielreisende.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  💪 Robust und langlebig
                </h3>
                <p className="text-gray-700">
                  Wasserfest, stoßfest und ohne Batterie. Funktioniert ein Leben lang – 
                  unabhängig von Wetter und Transportbedingungen.
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
              Der <Link href="/de/nfc-gepaeckanhaenger" className="text-blue-600 hover:underline font-semibold">Bag-Tag NFC Gepäckanhänger</Link> vereint 
              all diese Vorteile in einem kompakten, eleganten Design.
            </p>
          </section>

          <CtaButton language="de" className="my-8" />

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Fazit: Mit Prävention reisen Sie stressfrei
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Gepäckverlust ist ärgerlich, aber in den meisten Fällen vermeidbar. Mit den 
              richtigen Vorsichtsmaßnahmen – von eindeutigen Markierungen über digitale 
              Identifikation bis zu kluger Reiseplanung – reduzieren Sie das Risiko erheblich.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Investieren Sie in Qualität: Ein guter Gepäckanhänger ist eine einmalige 
              Anschaffung, die Ihnen jahrelang Sicherheit gibt. Der Bag-Tag kombiniert 
              modernste NFC-Technologie mit klassischer QR-Code-Funktion – für maximale 
              Kompatibilität und Zuverlässigkeit.
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              Schützen Sie Ihr Gepäck – für entspanntes Reisen ohne böse Überraschungen.
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
                <Link href="/de/nfc-vs-qr" className="text-blue-600 hover:text-blue-800 hover:underline">
                  → NFC vs. QR-Code: Der ausführliche Vergleich
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
