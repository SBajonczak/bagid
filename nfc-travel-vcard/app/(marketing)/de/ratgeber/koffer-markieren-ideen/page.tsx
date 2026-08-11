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

const pageUrl = 'https://bag-tag.de/de/ratgeber/koffer-markieren-ideen';
const pageTitle = 'Koffer markieren: 17 kreative Ideen für eindeutige Gepäckerkennung';
const pageDescription = 'Nie wieder Koffer verwechseln! Die besten Methoden und kreativen Ideen, um Ihr Gepäck am Flughafen sofort zu erkennen – von DIY bis High-Tech.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: 'Koffer markieren, Gepäck kennzeichnen, Koffer Ideen, Gepäck wiedererkennen, Koffer individualisieren, NFC Kofferanhänger, Gepäckband',
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
        alt: 'Koffer kreativ markieren'
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
        'en': 'https://bag-tag.de/en/guides/luggage-marking-ideas',
        'x-default': 'https://bag-tag.de/en/guides/luggage-marking-ideas',
      },
    },
  };
}

export default function LuggageMarkingPage() {
  const relatedLinks = getRelatedLinks('guideLuggageMarking', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Ratgeber', url: 'https://bag-tag.de/de/ratgeber' },
    { name: 'Koffer markieren Ideen', url: pageUrl },
  ];

  const tldrPoints = [
    'Am Gepäckband verwechseln 12% der Reisenden ihren Koffer mit einem ähnlichen',
    'Die besten Markierungen sind auffällig, aber elegant: farbige Bänder, individuelle Aufkleber',
    'Kombinieren Sie sichtbare Markierung (außen) mit Identifikation (innen)',
    'NFC-Tags bieten die modernste Lösung: erkennbar + digitale Kontaktdaten',
    'Vermeiden Sie Markierungen, die Diebe anlocken (z.B. teure Marken-Logos)',
    'DIY-Ideen: Washi Tape, Sprühfarbe-Muster, handgenähte Anhänger',
  ];

  const faqItems = [
    {
      question: 'Was ist die beste Methode, um Koffer zu markieren?',
      answer: 'Die beste Lösung kombiniert drei Ebenen: 1) Auffällige äußere Markierung (farbiges Band, Aufkleber) für schnelles Erkennen am Gepäckband, 2) Robuster Kofferanhänger mit Kontaktdaten außen, 3) Zusätzlicher Anhänger mit Kontaktdaten innen im Koffer. Ein NFC-Tag wie Bag-Tag vereint Erkennung und digitale Kontaktmöglichkeit.',
    },
    {
      question: 'Sind Kofferanhänger mit Adresse sicher?',
      answer: 'Traditionelle Papieranhänger mit vollständiger Adresse sind ein Sicherheitsrisiko – jeder kann die Daten lesen und weiß, dass Sie nicht zuhause sind. Besser: NFC-Tags wie Bag-Tag, die Finder können Sie kontaktieren, ohne Ihre Adresse zu sehen. Oder nutzen Sie nur E-Mail/Telefon auf dem Anhänger, keine Wohnadresse.',
    },
    {
      question: 'Kann ich meinen Koffer mit Sprühfarbe bemalen?',
      answer: 'Ja! Viele Reisende nutzen Sprühfarbe oder Lackmarker für individuelle Muster. Wichtig: Hartschalenkoffer vorher leicht anschleifen (Haftung), Lackfarbe für Kunststoff verwenden, mehrere dünne Schichten statt einer dicken. Klarlack drüber versiegelt das Design. Alternativ: Schablonen für präzise Muster verwenden.',
    },
    {
      question: 'Welche Farben fallen am Gepäckband am meisten auf?',
      answer: 'Top 3 der sichtbarsten Farben: 1) Neon-Pink/Magenta (selten bei Koffern), 2) Neon-Gelb/Grün (Signal-Farben), 3) Orange. Vermeiden Sie Schwarz, Grau, Dunkelblau – die häufigsten Kofferfarben. Auch gut: Starke Kontraste (z.B. neon-grünes Band auf schwarzem Koffer).',
    },
    {
      question: 'Wie markiere ich Koffer für Kinder?',
      answer: 'Kinder-Koffer brauchen extra Erkennbarkeit: Bunte Aufkleber (Lieblings-Tiere, Superhelden), farbige Bänder, Namensschild mit nur Vorname (keine volle Adresse aus Sicherheitsgründen), eventuell ein kleiner Schlüsselanhänger mit erkennbarem Motiv. NFC-Tags sind ideal: Kinder können nicht verloren gehen (Kontaktdaten geschützt), aber Finder können Eltern erreichen.',
    },
    {
      question: 'Halten Aufkleber auf Koffern?',
      answer: 'Auf glatten Hartschalenkoffern: Ja, sehr gut. Tipps für lange Haltbarkeit: Oberfläche vorher reinigen (Alkohol/Brillenreiniger), Vinylaufkleber verwenden (wetterbeständig), nach Anbringen fest andrücken und glätten, optional mit durchsichtigem Klarlack überlackieren. Auf Stoffkoffern halten Aufkleber schlecht – nutzen Sie dort besser Gepäckbänder oder aufgenähte Patches.',
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
                Koffer markieren: 17 kreative Ideen
              </h1>
              <p className="text-xl text-gray-600">
                Nie wieder am Gepäckband verzweifelt nach Ihrem schwarzen Koffer suchen! 
                Hier finden Sie kreative, praktische und stylische Methoden zur Gepäckerkennung.
              </p>
            </header>

            <TldrSection title="Das Wichtigste in Kürze" points={tldrPoints} />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Warum Koffer-Markierung so wichtig ist</h2>
              <p className="text-gray-700 mb-4">
                Stellen Sie sich vor: Sie stehen am Gepäckband, 150 schwarze Samsonite-Koffer rollen vorbei. 
                Welcher gehört Ihnen? <strong>12% aller Reisenden greifen versehentlich zum falschen Koffer</strong> – 
                mit allen Konsequenzen: Peinlichkeit, Zeitverlust, manchmal sogar verpasste Anschlüsse.
              </p>
              <p className="text-gray-700 mb-4">
                Eine gute Markierung löst drei Probleme gleichzeitig:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Schnelle Erkennung:</strong> Sie finden Ihren Koffer sofort am Band</li>
                <li><strong>Verwechslungsschutz:</strong> Andere greifen nicht versehentlich zu Ihrem Gepäck</li>
                <li><strong>Wiederfindung:</strong> Bei Verlust kann Ihr Koffer eindeutig zugeordnet werden</li>
              </ol>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">17 kreative Markierungs-Ideen</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🎨 Visuelle Markierungen (Low-Tech)</h3>
              
              <div className="space-y-6 my-8">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">1. Farbige Gepäckbänder</h4>
                  <p className="text-gray-700 mb-2">
                    <strong>Der Klassiker:</strong> Neon-farbene Bänder oder Gurte um den Koffer. 
                    Super auffällig, schnell angebracht, schützt gleichzeitig gegen ungewolltes Öffnen.
                  </p>
                  <p className="text-gray-600 text-sm">
                    💡 <strong>Tipp:</strong> Kombinieren Sie zwei Farben (z.B. pink + gelb) für maximale Einzigartigkeit.
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">2. Auffällige Aufkleber & Sticker</h4>
                  <p className="text-gray-700 mb-2">
                    Vinyl-Aufkleber (wetterfest!) mit Motiven: Länder-Flaggen, Tiere, Muster, Sprüche. 
                    Besonders gut auf Hartschalenkoffern. Arrangements aus mehreren Stickern wirken individuell.
                  </p>
                  <p className="text-gray-600 text-sm">
                    💡 <strong>Tipp:</strong> Positionieren Sie Aufkleber an markanten Stellen – Ecken, Griff-Bereich.
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">3. Washi Tape Designs</h4>
                  <p className="text-gray-700 mb-2">
                    Japanisches Deko-Klebeband in bunten Mustern. Kreieren Sie geometrische Designs, Streifen, 
                    Schachbrettmuster. Hält überraschend gut auf glatten Oberflächen, rückstandsfrei entfernbar.
                  </p>
                  <p className="text-gray-600 text-sm">
                    💡 <strong>Tipp:</strong> Überlackieren Sie Washi Tape mit Klarlack für längere Haltbarkeit.
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">4. Sprühfarbe & Custom Painting</h4>
                  <p className="text-gray-700 mb-2">
                    Für Kreative: Bemalen Sie Ihren Koffer mit Acryl- oder Sprühfarbe. Muster-Ideen: 
                    Sterne, Punkte, abstrakte Formen, Farbverläufe, Schablonen-Designs.
                  </p>
                  <p className="text-gray-600 text-sm">
                    💡 <strong>Tipp:</strong> Nutzen Sie Schablonen für saubere Kanten. Mehrere dünne Schichten, dann Klarlack versiegeln.
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">5. Pompons & Quasten</h4>
                  <p className="text-gray-700 mb-2">
                    Große, flauschige Pompons oder Leder-Quasten am Griff oder Reißverschluss. 
                    Extrem auffällig, gut greifbar, individuell. In Neonfarben besonders effektiv.
                  </p>
                  <p className="text-gray-600 text-sm">
                    💡 <strong>Tipp:</strong> Befestigen Sie Pompons mit Kabelbindern – robuster als Bänder.
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">6. Reflektierendes Klebeband</h4>
                  <p className="text-gray-700 mb-2">
                    Sicherheits-Reflexband (wie für Fahrräder) in Streifen aufgeklebt. Leuchtet im Licht, 
                    super auffällig, praktisch bei dunklen Gepäckbändern.
                  </p>
                  <p className="text-gray-600 text-sm">
                    💡 <strong>Tipp:</strong> Kombinieren Sie Reflex-Streifen mit normalem bunten Band für doppelten Effekt.
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">7. Individueller Kofferbezug</h4>
                  <p className="text-gray-700 mb-2">
                    Elastische Schutzhüllen in auffälligen Designs: Tier-Prints, Landkarten, bunte Muster. 
                    Schützt gleichzeitig vor Kratzern.
                  </p>
                  <p className="text-gray-600 text-sm">
                    💡 <strong>Tipp:</strong> Personalisierte Bezüge mit eigenem Foto-Print sind online bestellbar.
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">8. Patches & Aufnäher (für Stoffkoffer)</h4>
                  <p className="text-gray-700 mb-2">
                    Auf Weichgepäck: Aufnäher aufnähen oder aufbügeln. Reise-Patches, Flaggen, 
                    individuelle Designs. Vintage-Look und praktisch.
                  </p>
                  <p className="text-gray-600 text-sm">
                    💡 <strong>Tipp:</strong> Zusätzlich mit Textilkleber fixieren für bombenfesten Halt.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-12">🔧 Funktionale Markierungen (mit Zusatznutzen)</h3>
              
              <div className="space-y-6 my-8">
                <div className="p-6 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">9. Personalisierte Kofferanhänger</h4>
                  <p className="text-gray-700 mb-2">
                    Hochwertige Leder- oder Metall-Anhänger mit Namen/Initialen eingraviert. 
                    Elegant, professionell, eindeutige Identifikation.
                  </p>
                  <p className="text-gray-600 text-sm">
                    ⚠️ <strong>Sicherheit:</strong> Nur E-Mail/Telefon angeben, keine Wohnadresse!
                  </p>
                </div>

                <div className="p-6 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">10. NFC-Kofferanhänger (Bag-Tag)</h4>
                  <p className="text-gray-700 mb-2">
                    Die moderne Lösung: <a href="https://bag-tag.de/de" className="text-blue-600 hover:text-blue-800">NFC-Tag mit QR-Code</a>. 
                    Finder können Sie kontaktieren, ohne Ihre Daten zu sehen. Digitaler Kontakt + physische Erkennbarkeit.
                  </p>
                  <p className="text-gray-600 text-sm">
                    ✅ <strong>Vorteil:</strong> DSGVO-konform, Benachrichtigungen bei Scan, austauschbare Kontaktdaten.
                  </p>
                </div>

                <div className="p-6 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">11. GPS-Tracker + sichtbare Markierung</h4>
                  <p className="text-gray-700 mb-2">
                    Kombinieren Sie Apple AirTag/Tile mit auffälligem äußeren Marker. 
                    So haben Sie Position UND schnelle visuelle Erkennung.
                  </p>
                  <p className="text-gray-600 text-sm">
                    💡 <strong>Tipp:</strong> Verstecken Sie Tracker innen, Markierung außen – doppelte Sicherheit.
                  </p>
                </div>

                <div className="p-6 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">12. Mehrzweck-Gepäckgurt</h4>
                  <p className="text-gray-700 mb-2">
                    Farbiger Gurt mit integriertem Zahlenschloss und Namensschild. 
                    Markierung + Sicherheit + Identifikation in einem.
                  </p>
                  <p className="text-gray-600 text-sm">
                    💡 <strong>Tipp:</strong> Wählen Sie ungewöhnliche Farbkombinationen für maximale Auffälligkeit.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-12">🎭 Außergewöhnliche & lustige Ideen</h3>
              
              <div className="space-y-6 my-8">
                <div className="p-6 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">13. Plüschtier-Anhänger</h4>
                  <p className="text-gray-700 mb-2">
                    Kleines Kuscheltier oder Plüsch-Schlüsselanhänger am Griff befestigen. 
                    Bei Kindern beliebt, aber auch Erwachsene nutzen es erfolgreich.
                  </p>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">14. LED-Anhänger</h4>
                  <p className="text-gray-700 mb-2">
                    Blinkende LED-Tags (für Haustier-Halsbänder) am Koffer. 
                    Extrem auffällig, besonders bei schlechten Lichtverhältnissen.
                  </p>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">15. Handgeschriebene Botschaften</h4>
                  <p className="text-gray-700 mb-2">
                    Mit Lackstift/Permanentmarker lustige Sprüche auf den Koffer schreiben. 
                    "Diesen Koffer lieber nicht klauen – enthält dreckige Socken!"
                  </p>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">16. Familien-Farbcode</h4>
                  <p className="text-gray-700 mb-2">
                    Jedes Familienmitglied bekommt eine eigene Farbe: Papa Blau, Mama Rot, Kind 1 Gelb, Kind 2 Grün. 
                    Alle Koffer mit passendem Band → sofort erkennbar wem welcher gehört.
                  </p>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">17. Foto-Collage unter Klarsicht-Folie</h4>
                  <p className="text-gray-700 mb-2">
                    Drucken Sie Lieblingsfotos aus, arrangieren Sie sie auf dem Koffer, 
                    überziehen Sie alles mit transparenter Klebefolie. Persönlich und einzigartig.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Die Drei-Ebenen-Strategie</h2>
              <p className="text-gray-700 mb-4">
                Profis kombinieren mehrere Markierungs-Ebenen für maximale Sicherheit:
              </p>
              
              <div className="space-y-4 my-6">
                <div className="p-4 border-l-4 border-blue-600 bg-blue-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Ebene 1: Visuelle Fernerkennnung</h4>
                  <p className="text-gray-700">
                    <strong>Ziel:</strong> Koffer am Gepäckband sofort erkennen<br/>
                    <strong>Methoden:</strong> Farbiges Band, auffällige Aufkleber, Pompons, bunter Kofferbezug
                  </p>
                </div>
                <div className="p-4 border-l-4 border-green-600 bg-green-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Ebene 2: Kontaktdaten außen</h4>
                  <p className="text-gray-700">
                    <strong>Ziel:</strong> Finder können Sie erreichen<br/>
                    <strong>Methoden:</strong> NFC-Tag (Bag-Tag), Kofferanhänger mit E-Mail, keine volle Adresse!
                  </p>
                </div>
                <div className="p-4 border-l-4 border-purple-600 bg-purple-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Ebene 3: Identifikation innen</h4>
                  <p className="text-gray-700">
                    <strong>Ziel:</strong> Eindeutige Zuordnung auch bei verlorenem Außenanhänger<br/>
                    <strong>Methoden:</strong> Visitenkarte in Seitenfach, zweiter Anhänger innen, Liste des Inhalts
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <p className="font-semibold text-gray-900 mb-2">✅ Perfekte Kombination:</p>
                <p className="text-gray-700">
                  Neon-farbiges Gepäckband + Bag-Tag NFC-Anhänger außen + Visitenkarte im Innenfach = 
                  Maximale Sicherheit auf allen Ebenen. Schnelle Erkennung + digitaler Kontakt + Backup-Identifikation.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Was Sie vermeiden sollten</h2>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
                <h3 className="font-semibold text-gray-900 mb-3">❌ Diese Fehler vermeiden:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Vollständige Wohnadresse sichtbar:</strong> Einladung für Einbrecher – nutzen Sie nur E-Mail/Telefon</li>
                  <li><strong>Teure Marken-Logos:</strong> "Prada", "Louis Vuitton" locken Diebe an – dezente Markierung ist besser</li>
                  <li><strong>Zu dezente Markierung:</strong> Kleiner schwarzer Anhänger auf schwarzem Koffer hilft nicht</li>
                  <li><strong>Billige Plastikanhänger:</strong> Gehen oft verloren – investieren Sie in Qualität</li>
                  <li><strong>Nur eine Markierung:</strong> Außenanhänger können abreißen – immer zusätzlich innen markieren</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Spezial-Tipps nach Reiseart</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Familienreisen</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Farbcode-System: Jede Person eine Farbe → keine Verwechslungen</li>
                <li>Kinder-Koffer extra auffällig: Bunte Motive, Sticker, Plüschtiere</li>
                <li>Eltern-Kontakt auf allen Koffern (auch Kindern), aber keine Kindernamen außen (Sicherheit)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Business Travel</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Professionelle, dezente Markierung: Hochwertiges Lederband in Business-Farbe</li>
                <li>NFC-Tag mit Business-E-Mail (nicht private Adresse)</li>
                <li>Dezente, aber eindeutige Erkennungsmerkmale</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Backpacking & Abenteuerreisen</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Robuste Markierungen: Reflektorbänder, genähte Patches, fest angebrachte Karabiner</li>
                <li>Wasserfeste Anhänger und Aufkleber</li>
                <li>Mehrere Backup-Identifikationen innen (Anhänger gehen oft verloren)</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">DIY-Anleitung: Koffer mit Sprühfarbe gestalten</h2>
              
              <div className="p-6 bg-gray-50 rounded-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Material-Liste:</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li>Hartschalenkoffer (Polycarbonat funktioniert am besten)</li>
                  <li>Acryl-Sprühfarbe für Kunststoff (Edding, Montana, Molotow)</li>
                  <li>Klarlack-Spray (UV-beständig)</li>
                  <li>Schleifpapier (Körnung 400)</li>
                  <li>Malerkrepp & Abdeckfolie</li>
                  <li>Optional: Schablonen für Muster</li>
                </ul>

                <h4 className="font-semibold text-gray-900 mb-4">Schritt-für-Schritt:</h4>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li><strong>Vorbereitung:</strong> Koffer reinigen (Spülmittel), trocknen lassen, leicht anschleifen (bessere Haftung)</li>
                  <li><strong>Abkleben:</strong> Bereiche die nicht lackiert werden sollen (Griffe, Schlösser, Rollen) mit Malerkrepp abkleben</li>
                  <li><strong>Grundierung (optional):</strong> Haftgrund-Spray für bessere Deckkraft</li>
                  <li><strong>Design auftragen:</strong> Mehrere dünne Schichten statt einer dicken (verhindert Läufer). 30min trocknen zwischen Schichten</li>
                  <li><strong>Versiegeln:</strong> Nach vollständiger Trocknung (24h) Klarlack-Spray auftragen (2-3 Schichten)</li>
                  <li><strong>Aushärten:</strong> 48h aushärten lassen vor erster Nutzung</li>
                </ol>

                <p className="text-gray-600 text-sm mt-4">
                  💡 <strong>Tipp:</strong> Testen Sie Ihr Design erst auf einem alten Gegenstand!
                </p>
              </div>
            </section>

            <ContentFaqSection title="Häufig gestellte Fragen" faqs={faqItems} />

            {relatedLinks.length > 0 && <RelatedLinksSection links={relatedLinks} />}

            <CtaSection
              title="Die moderne Art der Gepäckerkennung"
              description="Kombinieren Sie sichtbare Markierung mit digitaler Technologie: Bag-Tag NFC-Anhänger für maximale Sicherheit."
              buttonText="Bag-Tag kaufen"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
