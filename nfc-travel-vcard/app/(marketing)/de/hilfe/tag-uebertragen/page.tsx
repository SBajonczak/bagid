import type { Metadata } from 'next';
import Link from 'next/link';
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

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Tag auf neues Konto übertragen – Besitzer wechseln | Bag-Tag';
  const description = 'So übertragen Sie Ihren Bag-Tag auf ein anderes Konto. Anleitung für Besitzerwechsel, Weitergabe an Familienmitglieder oder Verkauf.';
  const url = 'https://bag-tag.de/de/hilfe/tag-uebertragen';

  return {
    title,
    description,
    keywords: 'Bag-Tag übertragen, Tag weitergeben, Besitzer wechseln, Gepäckanhänger übertragen, Tag neu zuordnen',
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
          alt: 'Tag übertragen',
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
        de: '/de/hilfe/tag-uebertragen',
        en: '/en/help/transfer-tag',
      },
    },
  };
}

export default function TagUebertragenPage() {
  const breadcrumbItems = [
    { name: 'Home', href: '/de' },
    { name: 'Hilfe', href: '/de/hilfe' },
    { name: 'Tag übertragen' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Hilfe', url: 'https://bag-tag.de/de/hilfe' },
    { name: 'Tag übertragen', url: 'https://bag-tag.de/de/hilfe/tag-uebertragen' },
  ]);

  const howToSchema = generateHowToSchema({
    name: 'Bag-Tag auf neues Konto übertragen',
    description: 'Anleitung zur Übertragung eines Bag-Tag NFC Gepäckanhängers auf einen neuen Besitzer',
    totalTime: 'PT5M',
    steps: [
      {
        name: 'Tag vom alten Konto entfernen',
        text: 'Der aktuelle Besitzer meldet sich bei bag-tag.de an, öffnet das Dashboard, wählt den Tag aus und klickt auf "Tag entfernen" oder "Tag freigeben".',
      },
      {
        name: 'Neuer Besitzer registriert sich',
        text: 'Der neue Besitzer erstellt ein Konto bei bag-tag.de oder meldet sich mit einem bestehenden Konto an.',
      },
      {
        name: 'Tag scannen und neu zuordnen',
        text: 'Der neue Besitzer scannt den Tag (NFC oder QR-Code). Da der Tag jetzt frei ist, kann er ihn seinem Konto hinzufügen.',
      },
      {
        name: 'Daten eingeben',
        text: 'Der neue Besitzer gibt seine eigenen Kontakt- und Reisedaten ein. Der Tag ist jetzt vollständig übertragen.',
      },
    ],
  });

  const transferSteps = [
    {
      title: 'Aktueller Besitzer: Tag freigeben',
      description: 'Der aktuelle Besitzer muss sich zunächst bei bag-tag.de anmelden und zu seinem Dashboard navigieren. Dort wählt er den Tag aus, den er übertragen möchte, und klickt auf "Tag entfernen", "Tag freigeben" oder "Tag vom Konto trennen". Eine Bestätigung wird angefordert, um versehentliche Löschungen zu verhindern. Nach der Bestätigung ist der Tag frei und kann einem neuen Konto zugeordnet werden.',
    },
    {
      title: 'Neuer Besitzer: Konto erstellen',
      description: 'Der neue Besitzer benötigt ein Konto bei bag-tag.de. Falls noch nicht vorhanden, kann ein kostenloses Konto in wenigen Minuten erstellt werden. Erforderlich sind: E-Mail-Adresse, sicheres Passwort, und Bestätigung der Nutzungsbedingungen. Falls bereits ein Konto existiert, einfach anmelden.',
    },
    {
      title: 'Tag scannen',
      description: 'Der neue Besitzer scannt den Tag mit seinem Smartphone – entweder per NFC (Smartphone an den Tag halten) oder per QR-Code (Kamera-App öffnen und QR-Code scannen). Da der Tag jetzt keinem Konto mehr zugeordnet ist, erscheint die Option "Tag zu meinem Konto hinzufügen".',
    },
    {
      title: 'Tag zuordnen und Daten eingeben',
      description: 'Der neue Besitzer bestätigt die Zuordnung des Tags zu seinem Konto. Anschließend gibt er seine eigenen Kontaktdaten (Name, Telefon, E-Mail) und optional Reisedaten ein. Nach dem Speichern ist die Übertragung abgeschlossen – der Tag gehört jetzt dem neuen Besitzer!',
    },
  ];

  const whenToTransfer = [
    {
      scenario: '👨‍👩‍👧‍👦 Weitergabe an Familienmitglied',
      description: 'Sie möchten, dass Ihr Partner, Kind oder ein anderes Familienmitglied den Tag nutzt? Übertragen Sie den Tag, damit die neue Person ihre eigenen Daten hinterlegen kann.',
    },
    {
      scenario: '🎁 Geschenk',
      description: 'Sie haben einen Bag-Tag als Geschenk erhalten oder möchten einen verschenken? Nach der Übertragung kann der Beschenkte seine eigenen Informationen eintragen.',
    },
    {
      scenario: '💼 Verkauf / Weitergabe',
      description: 'Sie verkaufen oder verschenken den Tag? Durch die Übertragung stellen Sie sicher, dass der neue Besitzer volle Kontrolle hat und Sie keinen Zugriff mehr auf den Tag haben.',
    },
    {
      scenario: '🔄 Koffer-Wechsel',
      description: 'Sie möchten den Tag von einem Koffer auf einen anderen übertragen? Wenn der neue Koffer einer anderen Person gehört, ist eine Übertragung sinnvoll.',
    },
    {
      scenario: '👥 Mehrere Konten',
      description: 'Sie haben versehentlich mehrere Konten erstellt und möchten alle Tags unter einem Konto vereinen? Übertragen Sie die Tags vom alten auf das neue Konto.',
    },
  ];

  const relatedLinks = getRelatedLinks('helpTransferTag', 'de');

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
              Tag auf neues Konto übertragen
            </h1>

            {/* TL;DR */}
            <TldrSection>
              <p className="mb-2">
                <strong>Tag übertragen:</strong> Aktueller Besitzer gibt den Tag in seinem 
                Dashboard frei → Neuer Besitzer scannt den Tag und ordnet ihn seinem Konto zu → 
                Neue Daten eingeben → Fertig!
              </p>
              <p>
                Die Übertragung dauert nur wenige Minuten und ist vollständig reversibel.
              </p>
            </TldrSection>

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Bag-Tags sind <strong>wiederverwendbar</strong> und können beliebig oft auf neue 
                Konten übertragen werden. Das ist besonders praktisch, wenn Sie den Tag an ein 
                Familienmitglied weitergeben, verschenken oder verkaufen möchten. Im Gegensatz 
                zu Einweg-Kofferanhängern mit aufgedruckten Daten können Sie den Bag-Tag immer 
                wieder neu zuordnen.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Die Übertragung erfolgt in zwei einfachen Schritten: Der aktuelle Besitzer gibt 
                den Tag frei, und der neue Besitzer ordnet ihn seinem Konto zu. Alle alten Daten 
                werden dabei gelöscht – der neue Besitzer startet mit einem "sauberen" Tag.
              </p>
            </section>

            {/* When to transfer */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Wann sollte ich einen Tag übertragen?
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Eine Übertragung ist in folgenden Situationen sinnvoll:
              </p>
              <div className="space-y-4">
                {whenToTransfer.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {item.scenario}
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
                So übertragen Sie einen Tag
              </h2>
              <StepSection steps={transferSteps} />
            </section>

            {/* Alternative: Just change data */}
            <section className="mb-12 bg-blue-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                💡 Alternative: Nur Daten ändern?
              </h2>
              <p className="text-slate-700 mb-4 leading-relaxed">
                In einigen Fällen ist eine vollständige Übertragung nicht notwendig:
              </p>
              <div className="space-y-3 text-slate-700">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl">•</span>
                  <div>
                    <strong>Innerhalb der Familie:</strong> Wenn Sie den Tag nur temporär an 
                    ein Familienmitglied weitergeben (z. B. für eine einzelne Reise), können Sie 
                    einfach die Kontaktdaten ändern, statt den gesamten Tag zu übertragen.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl">•</span>
                  <div>
                    <strong>Mehrere Personen, ein Konto:</strong> Sie können auch mehrere Personen 
                    (z. B. Familienmitglieder) auf einem Konto verwalten. Erstellen Sie einfach 
                    verschiedene Tags mit unterschiedlichen Daten.
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/de/hilfe/daten-aendern"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  → Anleitung: Daten ändern
                </Link>
              </div>
            </section>

            {/* Important Notes */}
            <section className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Wichtige Hinweise zur Übertragung
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Daten werden gelöscht:</strong> Sobald der aktuelle Besitzer den Tag 
                    freigibt, werden alle gespeicherten Daten (Kontakt, Reise) gelöscht. Der neue 
                    Besitzer beginnt mit einem leeren Tag.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Kein Zugriff mehr:</strong> Nach der Freigabe hat der ursprüngliche 
                    Besitzer keinen Zugriff mehr auf den Tag. Er kann die Daten des neuen Besitzers 
                    nicht einsehen.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Reversibel:</strong> Der neue Besitzer kann den Tag später wieder 
                    freigeben und an eine andere Person übertragen. Es gibt keine Begrenzung der 
                    Übertragungen.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Beide Parteien benötigen Konto:</strong> Sowohl der alte als auch der 
                    neue Besitzer müssen ein Konto bei bag-tag.de haben.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Keine Gebühren:</strong> Die Übertragung ist kostenlos und kann beliebig 
                    oft durchgeführt werden.
                  </span>
                </li>
              </ul>
            </section>

            {/* FAQ specific to transfer */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Häufige Fragen zur Tag-Übertragung
              </h2>
              <div className="space-y-4">
                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-900">
                      Was passiert mit meinen Daten nach der Übertragung?
                    </span>
                    <span className="text-slate-400 group-open:rotate-90 transition-transform">›</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
                    Alle Ihre Daten (Kontakt, Reise, Einstellungen) werden vollständig gelöscht, 
                    sobald Sie den Tag freigeben. Der neue Besitzer kann Ihre alten Daten nicht 
                    einsehen. Die Übertragung ist DSGVO-konform und sicher.
                  </div>
                </details>

                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-900">
                      Kann ich den Tag zurückholen?
                    </span>
                    <span className="text-slate-400 group-open:rotate-90 transition-transform">›</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
                    Ja, aber nur mit Zustimmung des neuen Besitzers. Der neue Besitzer müsste den 
                    Tag freigeben, und Sie könnten ihn dann erneut Ihrem Konto zuordnen. Eine 
                    automatische Rücknahme ist aus Sicherheitsgründen nicht möglich.
                  </div>
                </details>

                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-900">
                      Wie viele Tags kann ich übertragen?
                    </span>
                    <span className="text-slate-400 group-open:rotate-90 transition-transform">›</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
                    Es gibt keine Begrenzung. Sie können beliebig viele Tags von Ihrem Konto 
                    entfernen und übertragen. Ebenso können Sie beliebig viele Tags zu Ihrem 
                    Konto hinzufügen.
                  </div>
                </details>

                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-900">
                      Funktioniert der Tag nach der Übertragung noch?
                    </span>
                    <span className="text-slate-400 group-open:rotate-90 transition-transform">›</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
                    Ja, der Tag funktioniert einwandfrei weiter. Die NFC-Technologie und der QR-Code 
                    bleiben unverändert. Nur die zugeordneten Daten und der Besitzer ändern sich.
                  </div>
                </details>

                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-900">
                      Muss der neue Besitzer für den Tag bezahlen?
                    </span>
                    <span className="text-slate-400 group-open:rotate-90 transition-transform">›</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
                    Nein, die Übertragung ist kostenlos. Der neue Besitzer muss lediglich ein 
                    kostenloses Konto bei bag-tag.de erstellen. Die Nutzung des Tags ist dauerhaft 
                    kostenlos – es gibt keine Abos oder Folgekosten.
                  </div>
                </details>
              </div>
            </section>

            {/* Tips */}
            <section className="mb-12 bg-green-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Tipps für eine reibungslose Übertragung
              </h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Klären Sie den Zeitpunkt:</strong> Koordinieren Sie mit dem neuen 
                    Besitzer, wann Sie den Tag freigeben, damit er ihn direkt zuordnen kann.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Daten sichern:</strong> Falls Sie Ihre alten Daten behalten möchten 
                    (z. B. alte Reiseinformationen), notieren Sie diese vor der Freigabe.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Anleitung weitergeben:</strong> Geben Sie dem neuen Besitzer diese 
                    Hilfeseite als Referenz, damit er weiß, wie die Einrichtung funktioniert.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Tag vor Übergabe testen:</strong> Stellen Sie sicher, dass der Tag 
                    noch funktioniert, bevor Sie ihn weitergeben.
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
              secondaryText="Zum Dashboard"
              secondaryHref="/dashboard"
              description="Noch keinen Bag-Tag?"
            />
          </article>
        </div>
      </div>
    </>
  );
}
