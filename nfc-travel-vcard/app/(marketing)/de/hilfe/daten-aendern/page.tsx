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
  const title = 'Daten ändern und aktualisieren – Bag-Tag Dashboard | Bag-Tag';
  const description = 'So ändern Sie Ihre Kontakt- und Reisedaten auf Ihrem Bag-Tag. Jederzeit und überall aktualisierbar – auch während der Reise.';
  const url = 'https://bag-tag.de/de/hilfe/daten-aendern';

  return {
    title,
    description,
    keywords: 'Bag-Tag Daten ändern, Kontaktdaten aktualisieren, Reisedaten ändern, Gepäckanhänger bearbeiten, Tag Dashboard',
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
          alt: 'Daten ändern und aktualisieren',
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
        de: '/de/hilfe/daten-aendern',
        en: '/en/help/change-data',
      },
    },
  };
}

export default function DatenAendernPage() {
  const breadcrumbItems = [
    { name: 'Home', href: '/de' },
    { name: 'Hilfe', href: '/de/hilfe' },
    { name: 'Daten ändern' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Hilfe', url: 'https://bag-tag.de/de/hilfe' },
    { name: 'Daten ändern', url: 'https://bag-tag.de/de/hilfe/daten-aendern' },
  ]);

  const howToSchema = generateHowToSchema({
    name: 'Kontakt- und Reisedaten auf Bag-Tag ändern',
    description: 'Anleitung zum Ändern und Aktualisieren von Kontakt- und Reisedaten auf dem Bag-Tag NFC Gepäckanhänger',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Auf bag-tag.de einloggen',
        text: 'Öffnen Sie bag-tag.de in Ihrem Browser und melden Sie sich mit Ihrer E-Mail-Adresse und Ihrem Passwort an.',
      },
      {
        name: 'Dashboard aufrufen',
        text: 'Nach dem Login gelangen Sie automatisch zu Ihrem Dashboard, wo alle Ihre registrierten Tags angezeigt werden.',
      },
      {
        name: 'Tag auswählen und bearbeiten',
        text: 'Wählen Sie den Tag aus, dessen Daten Sie ändern möchten. Klicken Sie auf "Bearbeiten" oder das Stift-Symbol.',
      },
      {
        name: 'Daten aktualisieren und speichern',
        text: 'Ändern Sie Ihre Kontaktdaten (Name, Telefon, E-Mail) oder Reisedaten (Flugnummer, Ziel). Klicken Sie auf "Speichern". Die Änderungen sind sofort aktiv.',
      },
    ],
  });

  const changeDataSteps = [
    {
      title: 'Bei bag-tag.de anmelden',
      description: 'Öffnen Sie Ihren Browser (z. B. Safari, Chrome, Firefox) und navigieren Sie zu bag-tag.de. Klicken Sie oben rechts auf "Anmelden" oder "Login". Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein. Falls Sie Ihr Passwort vergessen haben, nutzen Sie die "Passwort vergessen"-Funktion.',
    },
    {
      title: 'Dashboard öffnen',
      description: 'Nach erfolgreichem Login werden Sie automatisch zu Ihrem persönlichen Dashboard weitergeleitet. Hier sehen Sie eine Übersicht aller Tags, die mit Ihrem Konto verbunden sind. Jeder Tag zeigt eine Vorschau der aktuellen Daten.',
    },
    {
      title: 'Tag auswählen',
      description: 'Wählen Sie den Tag aus, dessen Daten Sie ändern möchten. Wenn Sie mehrere Tags haben, achten Sie auf die Tag-ID oder einen selbst vergebenen Namen. Klicken Sie auf den Tag oder auf das "Bearbeiten"-Symbol (meist ein Stift).',
    },
    {
      title: 'Daten bearbeiten',
      description: 'Im Bearbeitungsmodus können Sie alle gespeicherten Informationen ändern: Kontaktdaten (Name, Telefonnummer, E-Mail-Adresse), Reisedaten (Flugnummer, Abflug-/Ankunftszeit, Zielort), Notfallkontakt (optional), Sichtbarkeitseinstellungen (welche Daten für Finder sichtbar sind).',
    },
    {
      title: 'Änderungen speichern',
      description: 'Nachdem Sie Ihre Änderungen vorgenommen haben, klicken Sie auf "Speichern" oder "Aktualisieren". Die neuen Daten werden sofort auf dem Server gespeichert und sind innerhalb von Sekunden aktiv. Wenn jemand Ihren Tag jetzt scannt, sieht er die aktualisierten Informationen.',
    },
  ];

  const whatCanChange = [
    {
      category: 'Kontaktdaten',
      items: [
        'Vor- und Nachname',
        'Telefonnummer (mobil und/oder Festnetz)',
        'E-Mail-Adresse',
        'Alternative Kontaktperson',
        'Notfallkontakt',
      ],
    },
    {
      category: 'Reisedaten',
      items: [
        'Flugnummer und Airline',
        'Abflugdatum und -zeit',
        'Zielflughafen / Zielort',
        'Rückflugdatum',
        'Hotel oder Unterkunft (optional)',
      ],
    },
    {
      category: 'Datenschutz & Sichtbarkeit',
      items: [
        'Welche Felder für Finder sichtbar sind',
        'Ob Standortbenachrichtigungen aktiviert sind',
        'Sprache der Anzeige',
      ],
    },
    {
      category: 'Account-Einstellungen',
      items: [
        'E-Mail-Adresse für Login',
        'Passwort',
        'Benachrichtigungseinstellungen',
      ],
    },
  ];

  const relatedLinks = getRelatedLinks('helpChangeData', 'de');

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
              Daten ändern und aktualisieren
            </h1>

            {/* TL;DR */}
            <TldrSection>
              <p className="mb-2">
                <strong>Daten ändern:</strong> Bei bag-tag.de anmelden → Dashboard öffnen → 
                Tag auswählen → Bearbeiten → Daten ändern → Speichern. Fertig! Die Änderungen 
                sind sofort aktiv.
              </p>
              <p>
                Sie können Ihre Daten jederzeit ändern – auch während Sie bereits unterwegs sind.
              </p>
            </TldrSection>

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Einer der größten Vorteile des Bag-Tag gegenüber herkömmlichen Gepäckanhängern 
                ist die <strong>Flexibilität</strong>: Sie können Ihre Kontakt- und Reisedaten 
                jederzeit und von überall aus ändern – selbst während Sie bereits auf Reisen sind. 
                Neue Telefonnummer? Anderes Hotel? Geänderter Rückflug? Kein Problem!
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Alle Änderungen werden in Echtzeit synchronisiert. Sobald Sie Ihre Daten 
                aktualisieren und speichern, sind sie innerhalb von Sekunden für Finder 
                sichtbar. Sie müssen keine neuen Kofferanhänger ausfüllen oder Papiereinlagen 
                austauschen – alles passiert digital und sicher.
              </p>
            </section>

            {/* Steps */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                So ändern Sie Ihre Daten
              </h2>
              <StepSection steps={changeDataSteps} />
            </section>

            {/* What can be changed */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Was kann ich ändern?
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Sie haben vollständige Kontrolle über alle gespeicherten Informationen. Hier 
                ist eine Übersicht, was Sie jederzeit anpassen können:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {whatCanChange.map((section, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-slate-200 p-6 hover:border-blue-300 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-slate-700">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Common scenarios */}
            <section className="mb-12 bg-blue-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Häufige Szenarien: Wann sollte ich Daten ändern?
              </h2>
              <div className="space-y-4 text-slate-700">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-2xl">1.</span>
                  <div>
                    <strong className="text-slate-900">Vor jeder Reise:</strong> Aktualisieren 
                    Sie Ihre Reisedaten (Flugnummer, Ziel, Datum) und überprüfen Sie, ob Ihre 
                    Kontaktdaten noch stimmen.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-2xl">2.</span>
                  <div>
                    <strong className="text-slate-900">Während der Reise:</strong> Flug umgebucht? 
                    Hotel gewechselt? Ändern Sie die Daten einfach über Ihr Smartphone – auch vom 
                    Flughafen oder Hotel aus.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-2xl">3.</span>
                  <div>
                    <strong className="text-slate-900">Neue Telefonnummer:</strong> Nach einem 
                    Anbieterwechsel oder Umzug können Sie Ihre neue Nummer sofort hinterlegen.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-2xl">4.</span>
                  <div>
                    <strong className="text-slate-900">Privatsphäre anpassen:</strong> Möchten 
                    Sie bestimmte Informationen vorübergehend verstecken? Ändern Sie die 
                    Sichtbarkeitseinstellungen nach Bedarf.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-2xl">5.</span>
                  <div>
                    <strong className="text-slate-900">Tag weitergeben:</strong> Wenn Sie den 
                    Tag an jemand anderen weitergeben (z. B. an ein Familienmitglied), können 
                    Sie entweder die Daten ändern oder den Tag komplett übertragen (siehe 
                    "Tag übertragen").
                  </div>
                </div>
              </div>
            </section>

            {/* Mobile vs Desktop */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Von überall aus: Desktop, Tablet oder Smartphone
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Die Bag-Tag-Website funktioniert auf allen Geräten:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <div className="text-4xl mb-3">💻</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Desktop / Laptop</h3>
                  <p className="text-slate-700 text-sm">
                    Ideal für die Erst-Einrichtung oder umfangreiche Änderungen. Große 
                    Übersicht, einfaches Tippen.
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <div className="text-4xl mb-3">📱</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Smartphone</h3>
                  <p className="text-slate-700 text-sm">
                    Perfekt für schnelle Änderungen unterwegs. Responsive Design für alle 
                    Bildschirmgrößen.
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <div className="text-4xl mb-3">📲</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Tablet</h3>
                  <p className="text-slate-700 text-sm">
                    Beste Kombination aus Übersicht und Mobilität. Ideal für Reisen.
                  </p>
                </div>
              </div>
            </section>

            {/* Important notes */}
            <section className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Wichtige Hinweise
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Änderungen sind sofort aktiv:</strong> Sobald Sie auf "Speichern" 
                    klicken, sind die neuen Daten innerhalb von Sekunden für Finder sichtbar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Keine Gebühren:</strong> Sie können Ihre Daten beliebig oft ändern – 
                    kostenlos und ohne Einschränkungen.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Tag muss nicht erneut gescannt werden:</strong> Die Änderungen 
                    werden automatisch synchronisiert. Sie müssen den Tag nicht neu aktivieren.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Pflichtfelder beachten:</strong> Name, Telefonnummer und E-Mail 
                    sind Pflichtfelder und können nicht leer gelassen werden.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>Datenschutz:</strong> Alle Daten sind verschlüsselt und sicher. 
                    Sie werden niemals an Dritte weitergegeben.
                  </span>
                </li>
              </ul>
            </section>

            {/* Tips */}
            <section className="mb-12 bg-green-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Tipps für die Datenverwaltung
              </h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Vor jeder Reise überprüfen:</strong> Nehmen Sie sich 5 Minuten, 
                    um alle Daten zu überprüfen und zu aktualisieren.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Alternative Kontakte hinterlegen:</strong> Geben Sie auch einen 
                    Notfallkontakt an – z. B. Familienmitglied oder Reisepartner.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Mehrsprachig denken:</strong> Wenn Sie in nicht-deutschsprachige 
                    Länder reisen, können Sie Ihre Daten auch auf Englisch hinterlegen.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>Login-Daten sicher aufbewahren:</strong> Speichern Sie Ihre 
                    Login-Daten sicher, damit Sie jederzeit Zugriff haben.
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
              description="Bereit für Ihre nächste Reise?"
            />
          </article>
        </div>
      </div>
    </>
  );
}
