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
  const title = 'NFC auf Android aktivieren – Anleitung für alle Hersteller | Bag-Tag';
  const description = 'So aktivieren Sie NFC auf Android-Smartphones (Samsung, Google Pixel, OnePlus, Xiaomi uvm.). Schritt-für-Schritt-Anleitung mit Screenshots.';
  const url = 'https://bag-tag.de/de/hilfe/android-nfc-aktivieren';

  return {
    title,
    description,
    keywords: 'Android NFC aktivieren, Samsung NFC, Google Pixel NFC, NFC einschalten Android, Bag-Tag Android, NFC Tag scannen Android',
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
          alt: 'NFC auf Android aktivieren',
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
        de: '/de/hilfe/android-nfc-aktivieren',
        en: '/en/help/android-nfc-activate',
      },
    },
  };
}

export default function AndroidNfcAktivierenPage() {
  const breadcrumbItems = [
    { name: 'Home', href: '/de' },
    { name: 'Hilfe', href: '/de/hilfe' },
    { name: 'NFC auf Android aktivieren' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Hilfe', url: 'https://bag-tag.de/de/hilfe' },
    { name: 'NFC auf Android aktivieren', url: 'https://bag-tag.de/de/hilfe/android-nfc-aktivieren' },
  ]);

  const howToSchema = generateHowToSchema({
    name: 'NFC auf Android-Smartphone aktivieren',
    description: 'Anleitung zur Aktivierung von NFC auf Android-Geräten für Bag-Tag NFC Gepäckanhänger',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Einstellungen öffnen',
        text: 'Öffnen Sie die Einstellungen-App auf Ihrem Android-Smartphone. Diese finden Sie meist im App-Drawer oder in der Benachrichtigungsleiste.',
      },
      {
        name: 'Verbindungen / Netzwerk & Internet aufrufen',
        text: 'Suchen Sie nach dem Menüpunkt "Verbindungen", "Netzwerk & Internet" oder "Drahtlos & Netzwerke". Der genaue Name variiert je nach Hersteller.',
      },
      {
        name: 'NFC aktivieren',
        text: 'Finden Sie die Option "NFC" oder "NFC und Zahlung" und aktivieren Sie den Schalter. Oft gibt es auch eine Option "Android Beam" – diese können Sie optional aktivieren.',
      },
      {
        name: 'NFC testen',
        text: 'Halten Sie die Rückseite Ihres Smartphones an den NFC-Bereich des Bag-Tags. Eine Benachrichtigung sollte erscheinen.',
      },
    ],
  });

  const generalSteps = [
    {
      title: 'Einstellungen öffnen',
      description: 'Öffnen Sie die Einstellungen-App auf Ihrem Android-Smartphone. Sie finden diese entweder im App-Drawer (Liste aller Apps) oder indem Sie die Benachrichtigungsleiste nach unten ziehen und auf das Zahnrad-Symbol tippen.',
    },
    {
      title: 'Zu Verbindungseinstellungen navigieren',
      description: 'Suchen Sie nach einem der folgenden Menüpunkte (der Name variiert je nach Hersteller und Android-Version): "Verbindungen", "Netzwerk & Internet", "Drahtlos & Netzwerke" oder "Verbindungseinstellungen". Tippen Sie darauf, um das Menü zu öffnen.',
    },
    {
      title: 'NFC aktivieren',
      description: 'Scrollen Sie nach unten, bis Sie "NFC", "NFC und Zahlung" oder "Near Field Communication" finden. Tippen Sie auf den Schalter, um NFC zu aktivieren. Oft gibt es auch eine Option "Android Beam" – diese können Sie optional aktivieren, ist aber nicht erforderlich.',
    },
    {
      title: 'Aktivierung testen',
      description: 'Halten Sie die Rückseite Ihres Smartphones (meist mittig oder im oberen Bereich) an den NFC-Bereich des Bag-Tags. Eine Benachrichtigung sollte innerhalb von 1–2 Sekunden erscheinen. Wenn ja: Perfekt! NFC ist jetzt aktiviert.',
    },
  ];

  const manufacturerGuides = [
    {
      title: 'Samsung (Galaxy S / A / Note-Serie)',
      description: 'Einstellungen → Verbindungen → NFC und Zahlung → NFC aktivieren. Bei älteren Samsung-Modellen: Einstellungen → Weitere Einstellungen → NFC. Tipp: Bei Samsung können Sie NFC auch über die Schnelleinstellungen (Quick Settings) ein- und ausschalten.',
    },
    {
      title: 'Google Pixel',
      description: 'Einstellungen → Verbundene Geräte → Verbindungseinstellungen → NFC → NFC aktivieren. Alternativ: Schnelleinstellungen herunterziehen und auf das NFC-Symbol tippen.',
    },
    {
      title: 'OnePlus',
      description: 'Einstellungen → WLAN & Internet → NFC → NFC aktivieren. Oder: Schnelleinstellungen öffnen und NFC-Symbol antippen.',
    },
    {
      title: 'Xiaomi / Redmi / POCO (MIUI)',
      description: 'Einstellungen → Verbindung & Teilen → NFC → NFC aktivieren. Bei einigen MIUI-Versionen: Einstellungen → Mehr → NFC.',
    },
    {
      title: 'Huawei',
      description: 'Einstellungen → Gerätekonnektivität → NFC → NFC aktivieren. Bei älteren Modellen: Einstellungen → Mehr → NFC.',
    },
    {
      title: 'Sony',
      description: 'Einstellungen → Verbindungen → NFC/Android Beam → NFC aktivieren.',
    },
    {
      title: 'LG',
      description: 'Einstellungen → Netzwerk → Mehr → NFC → NFC aktivieren.',
    },
    {
      title: 'Motorola',
      description: 'Einstellungen → Verbundene Geräte → Verbindungseinstellungen → NFC → NFC aktivieren.',
    },
  ];

  const problems = [
    {
      problem: 'Ich finde die NFC-Option nicht in den Einstellungen',
      solution: 'Nicht alle Android-Geräte verfügen über NFC. Meist sind es nur Mittelklasse- und High-End-Modelle (ab ca. 200 Euro). Überprüfen Sie in der Gerätebeschreibung oder auf der Hersteller-Website, ob Ihr Modell NFC unterstützt. Hinweis: Sehr günstige Einsteiger-Smartphones haben oft kein NFC. Alternative: Nutzen Sie den QR-Code auf der Rückseite des Bag-Tags – dieser funktioniert auf allen Smartphones!',
    },
    {
      problem: 'NFC ist aktiviert, aber der Tag wird nicht erkannt',
      solution: 'Überprüfen Sie folgendes: (1) Halten Sie die Rückseite (nicht die Vorderseite!) des Smartphones an den Tag. (2) Der NFC-Sensor befindet sich meist mittig oder im oberen Bereich der Rückseite – testen Sie verschiedene Positionen. (3) Entfernen Sie dicke oder metallische Hüllen. (4) Stellen Sie sicher, dass der Bildschirm eingeschaltet ist. (5) Halten Sie das Smartphone 1–2 Sekunden ruhig am Tag. (6) Starten Sie das Smartphone neu.',
    },
    {
      problem: 'NFC funktioniert für Google Pay, aber nicht für Bag-Tag',
      solution: 'Das ist ungewöhnlich, aber kann vorkommen. Versuchen Sie: (1) Flugmodus ein- und wieder ausschalten. (2) NFC in den Einstellungen aus- und wieder einschalten. (3) Smartphone neu starten. (4) Falls das Problem weiterhin besteht, nutzen Sie den QR-Code als Alternative.',
    },
    {
      problem: 'Benachrichtigung erscheint nicht automatisch',
      solution: 'Bei einigen Android-Versionen müssen Sie die Benachrichtigungen für NFC aktivieren: Einstellungen → Apps → NFC-Service → Benachrichtigungen → Alle aktivieren. Stellen Sie außerdem sicher, dass "Nicht stören" deaktiviert ist.',
    },
    {
      problem: 'NFC funktioniert nur manchmal',
      solution: 'Der NFC-Sensor befindet sich je nach Hersteller an unterschiedlichen Stellen (meist Rückseite mittig oder oben). Testen Sie verschiedene Positionen und Winkel. Metallische Oberflächen in der Nähe können das Signal stören. Halten Sie das Smartphone mindestens 1–2 Sekunden still am Tag.',
    },
    {
      problem: 'Muss NFC immer aktiviert bleiben?',
      solution: 'Nein, Sie können NFC nach Bedarf ein- und ausschalten. Für maximalen Komfort empfehlen wir, NFC dauerhaft aktiviert zu lassen – der Stromverbrauch ist minimal. Viele Android-Geräte bieten ein NFC-Symbol in den Schnelleinstellungen für schnelles Ein- und Ausschalten.',
    },
  ];

  const relatedLinks = getRelatedLinks('helpAndroidNfc', 'de');

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
              NFC auf Android aktivieren
            </h1>

            {/* TL;DR */}
            <TldrSection>
              <p className="mb-2">
                <strong>So aktivieren Sie NFC auf Android:</strong> Einstellungen → Verbindungen / 
                Netzwerk & Internet → NFC aktivieren. Fertig! Halten Sie dann die Rückseite Ihres 
                Smartphones an den Bag-Tag.
              </p>
              <p>
                Die genauen Schritte variieren je nach Hersteller (Samsung, Google, Xiaomi usw.) – 
                siehe unten für detaillierte Anleitungen.
              </p>
            </TldrSection>

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Die meisten modernen Android-Smartphones verfügen über einen NFC-Chip. Dieser 
                ermöglicht kontaktloses Bezahlen (Google Pay) und das Lesen von NFC-Tags wie 
                Ihrem Bag-Tag. Im Gegensatz zu iPhones ist NFC auf Android-Geräten jedoch nicht 
                immer standardmäßig aktiviert – Sie müssen es einmalig in den Einstellungen 
                einschalten.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Die Aktivierung ist einfach und dauert nur 1–2 Minuten. Da es viele verschiedene 
                Android-Hersteller gibt, variiert die genaue Vorgehensweise leicht. Wir zeigen 
                Ihnen sowohl die allgemeine Anleitung als auch spezifische Schritte für die 
                beliebtesten Hersteller.
              </p>
            </section>

            {/* General Steps */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Allgemeine Anleitung (alle Android-Geräte)
              </h2>
              <StepSection steps={generalSteps} />
            </section>

            {/* Manufacturer-Specific Guides */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Anleitung nach Hersteller
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Die Menüstruktur unterscheidet sich je nach Hersteller. Hier finden Sie 
                spezifische Anleitungen für die beliebtesten Android-Marken:
              </p>
              <div className="space-y-4">
                {manufacturerGuides.map((guide, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {guide.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Settings Tip */}
            <section className="mb-12 bg-blue-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                💡 Tipp: NFC über Schnelleinstellungen aktivieren
              </h2>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Viele Android-Geräte bieten einen schnelleren Weg:
              </p>
              <ol className="space-y-2 text-slate-700">
                <li>1. Wischen Sie vom oberen Bildschirmrand nach unten (Benachrichtigungsleiste)</li>
                <li>2. Wischen Sie nochmals nach unten, um alle Schnelleinstellungen zu sehen</li>
                <li>3. Suchen Sie das NFC-Symbol (oft ein "N" oder NFC-Icon)</li>
                <li>4. Tippen Sie darauf, um NFC ein- oder auszuschalten</li>
              </ol>
              <p className="text-slate-700 mt-4">
                <strong>Hinweis:</strong> Falls Sie das NFC-Symbol nicht sehen, können Sie die 
                Schnelleinstellungen oft anpassen (Stift-Symbol oder "Bearbeiten"). Fügen Sie 
                NFC hinzu, um es schnell erreichbar zu machen.
              </p>
            </section>

            {/* NFC Sensor Location */}
            <section className="mb-12 bg-slate-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Wo befindet sich der NFC-Sensor bei Android?
              </h3>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Der NFC-Sensor befindet sich in der <strong>Rückseite</strong> des Smartphones, 
                meist mittig oder im oberen Bereich. Die genaue Position variiert je nach Hersteller:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Samsung:</strong> Rückseite, mittig oder leicht oberhalb der Mitte</li>
                <li>• <strong>Google Pixel:</strong> Rückseite, obere Hälfte</li>
                <li>• <strong>OnePlus:</strong> Rückseite, mittig</li>
                <li>• <strong>Xiaomi:</strong> Rückseite, oberer Bereich (nahe Kamera)</li>
              </ul>
              <p className="text-slate-700 mt-4">
                <strong>Tipp:</strong> Wenn Sie unsicher sind, testen Sie verschiedene Positionen. 
                Halten Sie die Rückseite Ihres Smartphones an den Bag-Tag und bewegen Sie es 
                langsam, bis die Benachrichtigung erscheint.
              </p>
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
                    <strong>Bildschirm einschalten:</strong> Der Bildschirm sollte eingeschaltet sein 
                    (muss nicht entsperrt sein).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Richtige Seite:</strong> Halten Sie die Rückseite (nicht die Vorderseite!) 
                    des Smartphones an den Tag.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Verschiedene Positionen testen:</strong> Der NFC-Sensor kann mittig oder 
                    oben auf der Rückseite sein – probieren Sie mehrere Stellen aus.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Ruhig halten:</strong> Halten Sie das Smartphone 1–2 Sekunden still am Tag.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Hülle entfernen:</strong> Sehr dicke oder metallische Hüllen können das 
                    NFC-Signal blockieren.
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
