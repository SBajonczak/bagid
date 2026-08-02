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
  const title = 'Bag-Tag aktivieren – Schritt-für-Schritt-Anleitung | Bag-Tag';
  const description = 'So aktivieren Sie Ihren Bag-Tag NFC Gepäckanhänger in 4 einfachen Schritten: Tag scannen, registrieren, Daten eingeben – fertig. Mit Problemlösungen.';
  const url = 'https://bag-tag.de/de/hilfe/aktivieren';

  return {
    title,
    description,
    keywords: 'Bag-Tag aktivieren, NFC Tag einrichten, Gepäckanhänger aktivieren, Tag registrieren, Aktivierungsanleitung',
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
          alt: 'Bag-Tag aktivieren',
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
        de: '/de/hilfe/aktivieren',
        en: '/en/help/activate',
      },
    },
  };
}

export default function AktivierenPage() {
  const breadcrumbItems = [
    { name: 'Home', href: '/de' },
    { name: 'Hilfe', href: '/de/hilfe' },
    { name: 'Tag aktivieren' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Hilfe', url: 'https://bag-tag.de/de/hilfe' },
    { name: 'Tag aktivieren', url: 'https://bag-tag.de/de/hilfe/aktivieren' },
  ]);

  const howToSchema = generateHowToSchema({
    name: 'Bag-Tag NFC Gepäckanhänger aktivieren',
    description: 'Einfache Anleitung zur Aktivierung Ihres Bag-Tag NFC Gepäckanhängers in 4 Schritten',
    totalTime: 'PT5M',
    steps: [
      {
        name: 'Tag scannen',
        text: 'Halten Sie Ihr Smartphone an den NFC-Bereich des Tags oder scannen Sie den QR-Code mit Ihrer Kamera. Die Bag-Tag-Website öffnet sich automatisch.',
      },
      {
        name: 'Registrieren oder anmelden',
        text: 'Erstellen Sie ein kostenloses Konto mit Ihrer E-Mail-Adresse oder melden Sie sich mit einem bestehenden Konto an.',
      },
      {
        name: 'Kontakt- und Reisedaten eingeben',
        text: 'Geben Sie Ihre Kontaktinformationen (Name, Telefon, E-Mail) und optional Reisedaten (Flug, Ziel) ein. Sie entscheiden, welche Informationen für Finder sichtbar sind.',
      },
      {
        name: 'Aktivierung abschließen',
        text: 'Speichern Sie Ihre Daten. Ihr Tag ist jetzt aktiviert und einsatzbereit! Der Finder kann Sie nun kontaktieren, wenn Ihr Gepäck verloren geht.',
      },
    ],
  });

  const activationSteps = [
    {
      title: 'Tag scannen',
      description: 'Halten Sie Ihr Smartphone an den NFC-Bereich des Tags (das markierte Symbol) oder scannen Sie den QR-Code mit Ihrer Kamera-App. Die Bag-Tag-Website öffnet sich automatisch – keine App erforderlich!',
    },
    {
      title: 'Registrieren oder anmelden',
      description: 'Erstellen Sie ein kostenloses Konto mit Ihrer E-Mail-Adresse und einem sicheren Passwort. Wenn Sie bereits ein Konto haben, melden Sie sich einfach an.',
    },
    {
      title: 'Kontakt- und Reisedaten eingeben',
      description: 'Geben Sie Ihre Kontaktinformationen ein: Name, Telefonnummer und E-Mail-Adresse sind Pflichtfelder. Optional können Sie auch Ihre Reisedaten (Flugnummer, Zielort) hinterlegen. Sie entscheiden selbst, welche Informationen für Finder sichtbar sein sollen.',
    },
    {
      title: 'Aktivierung abschließen',
      description: 'Speichern Sie Ihre Daten durch Klick auf "Speichern". Ihr Tag ist jetzt aktiviert und einsatzbereit! Wenn jemand Ihr Gepäck findet und den Tag scannt, kann er Sie sofort kontaktieren.',
    },
  ];

  const problems = [
    {
      problem: 'NFC wird nicht erkannt',
      solution: 'Stellen Sie sicher, dass NFC auf Ihrem Smartphone aktiviert ist. Bei iPhones (ab iOS 13) ist NFC standardmäßig aktiv, bei Android müssen Sie es möglicherweise in den Einstellungen aktivieren. Detaillierte Anleitungen finden Sie in unseren iPhone- und Android-NFC-Guides. Alternativ nutzen Sie einfach den QR-Code auf der Rückseite des Tags.',
    },
    {
      problem: 'QR-Code funktioniert nicht',
      solution: 'Öffnen Sie die Kamera-App Ihres Smartphones und halten Sie diese über den QR-Code. Achten Sie auf gute Lichtverhältnisse und eine ruhige Hand. Die meisten modernen Smartphones erkennen QR-Codes automatisch. Falls nicht, laden Sie eine kostenlose QR-Code-Scanner-App aus dem App Store oder Google Play Store.',
    },
    {
      problem: 'Ich kann mich nicht registrieren',
      solution: 'Überprüfen Sie Ihre Internetverbindung. Stellen Sie sicher, dass Sie eine gültige E-Mail-Adresse verwenden und das Passwort den Anforderungen entspricht (mindestens 8 Zeichen). Wenn Sie bereits ein Konto haben, nutzen Sie die "Anmelden"-Funktion statt der Registrierung.',
    },
    {
      problem: 'Meine Daten werden nicht gespeichert',
      solution: 'Stellen Sie sicher, dass alle Pflichtfelder (Name, Telefon, E-Mail) ausgefüllt sind. Überprüfen Sie Ihre Internetverbindung. Nach dem Klick auf "Speichern" sollten Sie eine Bestätigung sehen. Falls das Problem weiterhin besteht, löschen Sie den Browser-Cache und versuchen Sie es erneut.',
    },
    {
      problem: 'Ich habe keinen Aktivierungscode erhalten',
      solution: 'Für die Grundaktivierung benötigen Sie keinen separaten Aktivierungscode. Scannen Sie einfach den Tag und folgen Sie den Schritten. Falls Sie eine Bestätigungs-E-Mail erwarten, überprüfen Sie auch Ihren Spam-Ordner.',
    },
    {
      problem: 'Der Tag ist bereits registriert',
      solution: 'Wenn der Tag bereits einem anderen Konto zugeordnet ist, kontaktieren Sie bitte den Vorbesitzer oder unseren Support. In einigen Fällen können Tags auf ein neues Konto übertragen werden – siehe unsere Anleitung "Tag übertragen".',
    },
  ];

  const relatedLinks = getRelatedLinks('helpActivate', 'de');

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
              Bag-Tag aktivieren
            </h1>

            {/* TL;DR */}
            <TldrSection>
              <p className="mb-2">
                <strong>Aktivierung in 4 Schritten:</strong> Tag scannen → Registrieren oder 
                anmelden → Kontaktdaten eingeben → Fertig! Die gesamte Aktivierung dauert 
                nur 3–5 Minuten.
              </p>
              <p>
                Keine App erforderlich – alles funktioniert direkt im Browser Ihres Smartphones.
              </p>
            </TldrSection>

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Die Aktivierung Ihres Bag-Tag NFC Gepäckanhängers ist kinderleicht und in 
                wenigen Minuten erledigt. Sie benötigen lediglich Ihr Smartphone und eine 
                Internetverbindung. Keine zusätzliche App, kein kompliziertes Setup.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Folgen Sie einfach dieser Schritt-für-Schritt-Anleitung, und Ihr Tag ist 
                sofort einsatzbereit. Bei Problemen finden Sie weiter unten Lösungen für 
                die häufigsten Herausforderungen.
              </p>
            </section>

            {/* Steps */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Schritt-für-Schritt-Anleitung
              </h2>
              <StepSection steps={activationSteps} />
            </section>

            {/* Important Notes */}
            <section className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Wichtige Hinweise
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Datenschutz:</strong> Sie entscheiden selbst, welche Daten für 
                    Finder sichtbar sind. Minimale Angaben (Name, Telefon) genügen.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Jederzeit änderbar:</strong> Ihre Daten können Sie jederzeit in 
                    Ihrem Konto anpassen – auch während der Reise.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Keine Folgekosten:</strong> Die Nutzung ist dauerhaft kostenlos, 
                    es gibt keine Abos oder versteckten Gebühren.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Mehrere Tags:</strong> Sie können mehrere Tags mit einem Konto 
                    verwalten – ideal für Familien oder mehrere Gepäckstücke.
                  </span>
                </li>
              </ul>
            </section>

            {/* Problems & Solutions */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Probleme bei der Aktivierung?
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Die meisten Aktivierungen verlaufen reibungslos. Falls Sie dennoch auf 
                Probleme stoßen, finden Sie hier Lösungen für die häufigsten Fragen:
              </p>
              <ProblemsSection items={problems} />
            </section>

            {/* After Activation */}
            <section className="mb-12 bg-green-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Was passiert nach der Aktivierung?
              </h2>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Ihr Tag ist jetzt vollständig aktiviert und einsatzbereit. Hier ist, 
                was Sie wissen sollten:
              </p>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    Wenn jemand Ihr Gepäck findet und den Tag scannt, sieht er Ihre 
                    hinterlegten Kontaktinformationen.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    Sie können Ihre Daten jederzeit in Ihrem Dashboard ändern – auch 
                    während Sie bereits unterwegs sind.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    Der Finder kann Sie direkt kontaktieren, ohne dass Ihre vollständige 
                    Adresse preisgegeben wird.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    Sie erhalten eine Benachrichtigung, wenn Ihr Tag gescannt wurde 
                    (optional in den Einstellungen).
                  </span>
                </li>
              </ul>
            </section>

            {/* Related Links */}
            <RelatedLinksSection title="Nächste Schritte" links={relatedLinks} />

            {/* CTA */}
            <CtaSection
              primaryText="Bag-Tag kaufen"
              primaryHref="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
              secondaryText="Alle Hilfe-Themen"
              secondaryHref="/de/hilfe"
              description="Noch keinen Bag-Tag?"
            />
          </article>
        </div>
      </div>
    </>
  );
}
