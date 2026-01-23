import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { 
  TldrSection, 
  StepSection,
  ProblemsSection,
  RelatedLinksSection, 
  CtaSection,
  Breadcrumb 
} from '@/app/components/ContentComponents';
import { getRelatedLinks } from '@/lib/linkMap';
import { generateBreadcrumbSchema, generateHowToSchema } from '@/lib/schema-utils';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'NFC auf iPhone aktivieren – Anleitung für alle iOS-Versionen | Bag-Tag';
  const description = 'So aktivieren Sie NFC auf Ihrem iPhone für Bag-Tag. Funktioniert mit iPhone 7 und neuer. Schritt-für-Schritt-Anleitung für iOS 13 bis iOS 17+.';
  const url = 'https://bag-tag.de/de/hilfe/iphone-nfc-aktivieren';

  return {
    title,
    description,
    keywords: 'iPhone NFC aktivieren, iOS NFC, iPhone NFC Tag scannen, iPhone 12 NFC, iPhone 13 NFC, Bag-Tag iPhone',
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
          alt: 'NFC auf iPhone aktivieren',
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
        de: '/de/hilfe/iphone-nfc-aktivieren',
        en: '/en/help/iphone-nfc-activate',
      },
    },
  };
}

export default function IPhoneNfcAktivierenPage() {
  const breadcrumbItems = [
    { name: 'Home', href: '/de' },
    { name: 'Hilfe', href: '/de/hilfe' },
    { name: 'NFC auf iPhone aktivieren' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Hilfe', url: 'https://bag-tag.de/de/hilfe' },
    { name: 'NFC auf iPhone aktivieren', url: 'https://bag-tag.de/de/hilfe/iphone-nfc-aktivieren' },
  ]);

  const howToSchema = generateHowToSchema({
    name: 'NFC auf iPhone aktivieren und nutzen',
    description: 'Anleitung zur Aktivierung und Nutzung von NFC auf iPhone-Geräten für Bag-Tag NFC Gepäckanhänger',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'iPhone-Kompatibilität prüfen',
        text: 'Stellen Sie sicher, dass Sie ein iPhone 7 oder neuer mit iOS 13 oder höher verwenden. Alle diese Geräte unterstützen NFC.',
      },
      {
        name: 'NFC-Funktion verstehen',
        text: 'Ab iOS 13 ist NFC standardmäßig aktiviert. Sie müssen keine Einstellungen ändern. Bei älteren iOS-Versionen (iOS 11-12) benötigen Sie möglicherweise die "NFC Tag Reader"-Funktion im Kontrollzentrum.',
      },
      {
        name: 'Tag scannen',
        text: 'Halten Sie die Oberseite Ihres iPhones (wo die Kamera ist) an den NFC-Bereich des Bag-Tags. Eine Benachrichtigung erscheint automatisch innerhalb von 1-2 Sekunden.',
      },
      {
        name: 'Link öffnen',
        text: 'Tippen Sie auf die Benachrichtigung, um die Bag-Tag-Website zu öffnen. Keine App erforderlich!',
      },
    ],
  });

  const nfcSteps = [
    {
      title: 'Prüfen Sie die Kompatibilität',
      description: 'NFC ist verfügbar auf: iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XR, iPhone XS, iPhone XS Max, iPhone 11, iPhone 11 Pro, iPhone 11 Pro Max, iPhone 12 (alle Modelle), iPhone 13 (alle Modelle), iPhone 14 (alle Modelle), iPhone 15 (alle Modelle) und neuer. Ihr iPhone benötigt mindestens iOS 13.',
    },
    {
      title: 'NFC ist bereits aktiviert (iOS 13+)',
      description: 'Die gute Nachricht: Ab iOS 13 ist NFC automatisch aktiv! Sie müssen nichts in den Einstellungen ändern. NFC funktioniert im Hintergrund und ist immer bereit, Tags zu lesen.',
    },
    {
      title: 'Tag scannen',
      description: 'Halten Sie die Oberseite Ihres iPhones (der Bereich um die Kamera) in einem Abstand von 1–3 cm an den NFC-Bereich des Bag-Tags. Der NFC-Sensor befindet sich in der oberen Hälfte des iPhones. Halten Sie das iPhone für 1–2 Sekunden ruhig.',
    },
    {
      title: 'Benachrichtigung öffnen',
      description: 'Sobald das iPhone den Tag erkennt, erscheint oben eine Benachrichtigung mit einem Link. Tippen Sie auf die Benachrichtigung, um die Bag-Tag-Website zu öffnen. Falls die Benachrichtigung zu schnell verschwindet, scannen Sie einfach erneut.',
    },
  ];

  const problems = [
    {
      problem: 'Mein iPhone erkennt den NFC-Tag nicht',
      solution: 'Überprüfen Sie folgendes: (1) Stellen Sie sicher, dass Ihr iPhone ein Modell ab iPhone 7 ist. (2) Aktualisieren Sie auf iOS 13 oder neuer (Einstellungen → Allgemein → Softwareupdate). (3) Halten Sie die Oberseite des iPhones (nicht die Unterseite!) an den Tag. (4) Entfernen Sie dicke Hüllen, die das NFC-Signal blockieren könnten. (5) Stellen Sie sicher, dass der Bildschirm eingeschaltet ist. (6) Aktivieren Sie den Flugmodus kurz und deaktivieren Sie ihn wieder.',
    },
    {
      problem: 'Die Benachrichtigung erscheint, aber ich kann nicht darauf tippen',
      solution: 'Die NFC-Benachrichtigung erscheint nur für wenige Sekunden am oberen Bildschirmrand. Wenn Sie sie verpassen, scannen Sie den Tag einfach erneut. Halten Sie Ihr iPhone bereit, um sofort auf die Benachrichtigung zu tippen. Alternativ: Nutzen Sie den QR-Code auf der Rückseite des Tags – dieser funktioniert immer.',
    },
    {
      problem: 'iOS 11 oder iOS 12: NFC funktioniert nicht automatisch',
      solution: 'Bei iOS 11 und iOS 12 müssen Sie die NFC-Funktion manuell aktivieren: Öffnen Sie das Kontrollzentrum (vom unteren Bildschirmrand nach oben wischen), tippen Sie auf das NFC-Symbol, und halten Sie dann Ihr iPhone an den Tag. Empfehlung: Aktualisieren Sie auf iOS 13 oder neuer für automatisches NFC-Scanning.',
    },
    {
      problem: 'Der Tag funktioniert manchmal, manchmal nicht',
      solution: 'Das kann an der Position liegen: Der NFC-Sensor befindet sich in der oberen Hälfte des iPhones (nahe der Kamera). Versuchen Sie, verschiedene Positionen und Winkel zu testen. Metallische Oberflächen oder elektromagnetische Störungen können das Signal beeinträchtigen. Halten Sie das iPhone für mindestens 1–2 Sekunden still am Tag.',
    },
    {
      problem: 'Funktioniert NFC auch im Flugmodus?',
      solution: 'Ja, NFC funktioniert auch im Flugmodus! NFC ist eine sehr kurzreichweitige Technologie, die nicht mit Funknetzen interferiert. Sie können Ihren Bag-Tag also auch während des Fluges scannen (wenn elektronische Geräte erlaubt sind).',
    },
    {
      problem: 'Gibt es alternative Möglichkeiten zum Scannen?',
      solution: 'Ja! Jeder Bag-Tag verfügt zusätzlich über einen QR-Code auf der Rückseite. Öffnen Sie einfach die Kamera-App, richten Sie sie auf den QR-Code, und tippen Sie auf die Benachrichtigung. QR-Codes funktionieren auf allen iPhones ab iOS 11 ohne zusätzliche App.',
    },
  ];

  const relatedLinks = getRelatedLinks('helpIphoneNfc', 'de');

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
              NFC auf iPhone aktivieren
            </h1>

            {/* TL;DR */}
            <TldrSection>
              <p className="mb-2">
                <strong>Gute Nachricht:</strong> Ab iOS 13 ist NFC auf dem iPhone automatisch 
                aktiviert! Sie müssen keine Einstellungen ändern. Halten Sie einfach die 
                Oberseite Ihres iPhones an den Bag-Tag, und der Rest passiert von selbst.
              </p>
              <p>
                Funktioniert auf iPhone 7 und neuer (mit iOS 13+). Keine App erforderlich.
              </p>
            </TldrSection>

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Alle iPhone-Modelle ab dem iPhone 7 verfügen über einen eingebauten NFC-Chip. 
                Dieser Chip ist derselbe, den Sie für Apple Pay verwenden. Ab iOS 13 hat Apple 
                NFC für alle Apps und Websites freigegeben – das bedeutet: automatisches 
                Tag-Scanning ohne zusätzliche Schritte.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Im Gegensatz zu früheren iOS-Versionen (11 und 12), bei denen Sie NFC manuell 
                aktivieren mussten, funktioniert es heute völlig automatisch. Ihr iPhone ist 
                immer bereit, NFC-Tags zu lesen – inklusive Ihres Bag-Tags.
              </p>
            </section>

            {/* Compatibility Section */}
            <section className="mb-12 bg-blue-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Kompatible iPhone-Modelle
              </h2>
              <p className="text-slate-700 mb-4">
                NFC wird unterstützt von allen iPhones ab dem iPhone 7 (2016) mit iOS 13 oder neuer:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-slate-700">
                <div>
                  <h3 className="font-semibold mb-2">✅ Automatisches NFC (iOS 13+):</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max</li>
                    <li>• iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max</li>
                    <li>• iPhone 13 / 13 mini / 13 Pro / 13 Pro Max</li>
                    <li>• iPhone 12 / 12 mini / 12 Pro / 12 Pro Max</li>
                    <li>• iPhone 11 / 11 Pro / 11 Pro Max</li>
                    <li>• iPhone XR / XS / XS Max</li>
                    <li>• iPhone X / 8 / 8 Plus</li>
                    <li>• iPhone 7 / 7 Plus</li>
                    <li>• iPhone SE (2. Generation 2020, 3. Generation 2022)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">❌ Kein NFC:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• iPhone 6s und älter</li>
                    <li>• iPhone SE (1. Generation 2016)</li>
                  </ul>
                  <p className="mt-4 text-sm">
                    <strong>Tipp:</strong> Wenn Ihr iPhone kein NFC unterstützt, nutzen Sie 
                    einfach den QR-Code auf der Rückseite des Bag-Tags. Dieser funktioniert 
                    auf allen iPhones!
                  </p>
                </div>
              </div>
            </section>

            {/* Steps */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                So nutzen Sie NFC auf Ihrem iPhone
              </h2>
              <StepSection steps={nfcSteps} />
            </section>

            {/* Visual Guide */}
            <section className="mb-12 bg-slate-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Wo befindet sich der NFC-Sensor?
              </h3>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Der NFC-Sensor im iPhone befindet sich in der <strong>oberen Hälfte</strong> des 
                Geräts, nahe der Kamera. Halten Sie diese Seite an den NFC-Bereich des Bag-Tags 
                (das markierte Symbol auf dem Tag).
              </p>
              <div className="bg-white rounded-lg p-6 border-2 border-slate-300">
                <p className="text-center text-slate-600 font-mono text-sm mb-2">
                  ┌─────────────────┐<br />
                  │  📷 ← NFC hier  │  ← Oberseite (Kamera-Seite)<br />
                  │                 │<br />
                  │   iPhone        │<br />
                  │                 │<br />
                  │                 │<br />
                  │                 │<br />
                  │     [Home]      │  ← Unterseite<br />
                  └─────────────────┘
                </p>
                <p className="text-sm text-slate-600 text-center mt-4">
                  Halten Sie die Oberseite des iPhones (Kamera-Bereich) an den Bag-Tag
                </p>
              </div>
            </section>

            {/* Problems & Solutions */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Häufige Probleme und Lösungen
              </h2>
              <ProblemsSection items={problems} />
            </section>

            {/* Tips */}
            <section className="mb-12 bg-green-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Tipps für optimales NFC-Scanning
              </h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Bildschirm einschalten:</strong> Stellen Sie sicher, dass Ihr 
                    iPhone-Bildschirm eingeschaltet ist (muss nicht entsperrt sein).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Richtige Position:</strong> Halten Sie die Oberseite (Kamera-Seite) 
                    des iPhones an den Tag, nicht die Unterseite.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Kurzer Abstand:</strong> Halten Sie das iPhone 1–3 cm vom Tag entfernt, 
                    nicht direkt aufgedrückt.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Ruhig halten:</strong> Halten Sie das iPhone 1–2 Sekunden still am Tag, 
                    damit die Verbindung hergestellt werden kann.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Hülle entfernen:</strong> Sehr dicke oder metallische Hüllen können 
                    das NFC-Signal blockieren. Probieren Sie es ohne Hülle.
                  </span>
                </li>
              </ul>
            </section>

            {/* Related Links */}
            <RelatedLinksSection title="Weitere Hilfe-Themen" links={relatedLinks} />

            {/* CTA */}
            <CtaSection
              primaryText="Bag-Tag kaufen"
              primaryHref="https://kreativschicht.de/products/nfc-gepaeckanhaenger"
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
