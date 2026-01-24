import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { 
  TldrSection, 
  ContentFaqSection,
  RelatedLinksSection, 
  CtaSection,
  Breadcrumb 
} from '@/app/components/ContentComponents';
import { getRelatedLinks } from '@/lib/linkMap';
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/schema-utils';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Sicherheit & Datenschutz – Bag-Tag GDPR-konform | Bag-Tag';
  const description = 'Erfahren Sie, wie Bag-Tag Ihre Daten schützt: GDPR-konform, Server in Deutschland, volle Kontrolle über Ihre Privatsphäre. Maximale Sicherheit für Ihr Gepäck.';
  const url = 'https://bag-tag.de/de/sicherheit-datenschutz';

  return {
    title,
    description,
    keywords: 'Bag-Tag Datenschutz, GDPR Gepäckanhänger, NFC Tag Sicherheit, Datensicherheit Reise, DSGVO konform',
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
          alt: 'Bag-Tag Sicherheit und Datenschutz',
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
        de: '/de/sicherheit-datenschutz',
        en: '/en/security-privacy',
        'x-default': '/de/sicherheit-datenschutz',
      },
    },
  };
}

export default function SicherheitDatenschutzPage() {
  const relatedLinks = getRelatedLinks('sicherheit-datenschutz', 'de');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/de' },
    { name: 'Sicherheit & Datenschutz', url: 'https://bag-tag.de/de/sicherheit-datenschutz' },
  ];

  const faqItems = [
    {
      question: 'Wo werden meine Daten gespeichert?',
      answer: 'Alle Daten werden auf Servern in Deutschland gespeichert und unterliegen den strengen deutschen und europäischen Datenschutzgesetzen (GDPR/DSGVO). Wir arbeiten ausschließlich mit zertifizierten Rechenzentren in der EU.',
    },
    {
      question: 'Welche Daten werden überhaupt gespeichert?',
      answer: 'Wir speichern nur die Daten, die Sie freiwillig eingeben: Name, Kontaktdaten (E-Mail, optional Telefon), Reisedaten (optional) und Gepäckbeschreibung. Sie entscheiden selbst, welche Informationen Sie hinterlegen möchten.',
    },
    {
      question: 'Wer kann meine Daten sehen?',
      answer: 'Nur Personen, die Ihren physischen Bag-Tag scannen, können die Kontaktseite sehen – und auch nur die Informationen, die Sie explizit freigegeben haben. Bag-Tag Mitarbeiter haben keinen Zugriff auf Ihre persönlichen Nachrichten.',
    },
    {
      question: 'Kann ich meine Daten jederzeit löschen?',
      answer: 'Ja, absolut. Sie können Ihr Konto und alle damit verbundenen Daten jederzeit vollständig löschen. Nach der Löschung ist Ihr Tag nicht mehr funktional, bis Sie ihn neu registrieren.',
    },
    {
      question: 'Was passiert, wenn jemand meinen Tag findet und missbraucht?',
      answer: 'Der Finder sieht nur die freigegebenen Kontaktinformationen – keine sensiblen Daten wie Adresse oder Bankdaten. Sie können verdächtige Aktivitäten melden, und wir können den Zugang zum Tag temporär sperren.',
    },
    {
      question: 'Werden meine Daten an Dritte weitergegeben?',
      answer: 'Nein, niemals. Wir verkaufen oder teilen Ihre Daten nicht mit Dritten. Die einzige Ausnahme: Wenn ein Finder Ihren Tag scannt, sieht er die von Ihnen freigegebenen Kontaktinformationen.',
    },
    {
      question: 'Ist die Kommunikation mit dem Finder verschlüsselt?',
      answer: 'Ja, alle Nachrichten werden über HTTPS verschlüsselt übertragen. Die Kommunikation läuft über unsere sicheren Server, sodass Ihre E-Mail-Adresse geschützt bleibt.',
    },
    {
      question: 'Was ist mit Kindern? Sind ihre Daten besonders geschützt?',
      answer: 'Ja, für Tags von Kindern unter 16 Jahren gelten besondere Schutzmaßnahmen. Eltern kontrollieren alle Einstellungen, und es werden automatisch weniger Informationen angezeigt.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = generateFAQPageSchema(faqItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Sicherheit & Datenschutz
              </h1>
              <p className="text-xl text-gray-600">
                Ihre Daten sind bei Bag-Tag sicher – GDPR-konform und transparent
              </p>
            </header>

            <TldrSection
              title="Das Wichtigste in Kürze"
              points={[
                'GDPR/DSGVO-konform – alle Server in Deutschland, höchste EU-Standards',
                'Sie kontrollieren Ihre Daten: Was sichtbar ist, entscheiden nur Sie',
                'Keine sensiblen Daten auf dem Tag – alles sicher online gespeichert',
                'Verschlüsselte Kommunikation – Ihre Privatsphäre ist geschützt',
              ]}
            />

            <section className="prose prose-lg max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Unsere Datenschutz-Prinzipien
              </h2>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div className="text-3xl mb-3">🔒</div>
                  <h3 className="font-semibold text-green-900 mb-2">Datensparsamkeit</h3>
                  <p className="text-gray-700">
                    Wir sammeln nur die Daten, die absolut notwendig sind, damit der Service funktioniert. 
                    Keine unnötigen Tracking-Tools, keine Datensammelwut.
                  </p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <div className="text-3xl mb-3">👤</div>
                  <h3 className="font-semibold text-blue-900 mb-2">Volle Kontrolle</h3>
                  <p className="text-gray-700">
                    Sie entscheiden, welche Daten gespeichert werden und wer sie sehen kann. 
                    Ändern oder löschen Sie Ihre Daten jederzeit.
                  </p>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                  <div className="text-3xl mb-3">🇪🇺</div>
                  <h3 className="font-semibold text-purple-900 mb-2">EU-Standard</h3>
                  <p className="text-gray-700">
                    Server in Deutschland, GDPR/DSGVO-konform. Die strengsten Datenschutzgesetze der Welt 
                    schützen Ihre Informationen.
                  </p>
                </div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                  <div className="text-3xl mb-3">🔐</div>
                  <h3 className="font-semibold text-orange-900 mb-2">Verschlüsselung</h3>
                  <p className="text-gray-700">
                    Alle Datenübertragungen sind verschlüsselt (HTTPS/TLS). Ihre Kommunikation mit Findern 
                    läuft über sichere Server.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Was ist auf dem Tag gespeichert?
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Kurze Antwort: Nichts Persönliches!
                </h3>
                <p className="text-gray-800">
                  Der physische Bag-Tag enthält nur eine eindeutige ID (ähnlich wie ein Barcode). 
                  Alle persönlichen Daten werden sicher online in unserem System gespeichert.
                </p>
              </div>
              <p>
                Das bedeutet: Selbst wenn jemand den Tag findet und analysiert, kann er keine persönlichen 
                Informationen auslesen. Die ID führt nur zu einer Kontaktseite, auf der Sie kontrollieren, 
                was sichtbar ist.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Welche Daten speichern wir?
              </h2>
              <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden my-8">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Kategorien gespeicherter Daten</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="text-green-600 mr-2">✓</span>
                        Account-Daten (erforderlich)
                      </h4>
                      <ul className="ml-6 text-gray-700 space-y-1">
                        <li>• E-Mail-Adresse (für Login und Benachrichtigungen)</li>
                        <li>• Verschlüsseltes Passwort</li>
                        <li>• Erstellungsdatum des Accounts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="text-blue-600 mr-2">○</span>
                        Kontaktdaten (optional)
                      </h4>
                      <ul className="ml-6 text-gray-700 space-y-1">
                        <li>• Name (wie er auf der Kontaktseite angezeigt wird)</li>
                        <li>• Telefonnummer (nur wenn Sie sie freigeben möchten)</li>
                        <li>• Alternative Kontaktmöglichkeiten</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="text-purple-600 mr-2">○</span>
                        Reisedaten (optional)
                      </h4>
                      <ul className="ml-6 text-gray-700 space-y-1">
                        <li>• Abflugort und Zielort (hilft dem Finder)</li>
                        <li>• Flugnummer und -datum (optional)</li>
                        <li>• Hotelname oder Zieladresse (nur bei Freigabe sichtbar)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="text-orange-600 mr-2">○</span>
                        Gepäckdetails (optional)
                      </h4>
                      <ul className="ml-6 text-gray-700 space-y-1">
                        <li>• Kofferfarbe und Marke</li>
                        <li>• Besondere Merkmale zur Identifikation</li>
                        <li>• Notizen (nur für Sie sichtbar)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="text-gray-600 mr-2">○</span>
                        System-Daten (automatisch)
                      </h4>
                      <ul className="ml-6 text-gray-700 space-y-1">
                        <li>• Scan-Historie (wann wurde Ihr Tag gescannt)</li>
                        <li>• Gerätetyp des Scanners (für Statistiken, anonymisiert)</li>
                        <li>• Ungefährer Scan-Standort (nur wenn Finder zustimmt)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Ihre Kontroll-Optionen
              </h2>
              <p>
                Sie haben jederzeit volle Kontrolle über Ihre Daten. Im Dashboard können Sie:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">✏️ Bearbeiten</h4>
                  <p className="text-sm text-gray-700">
                    Ändern Sie jederzeit Ihre Kontaktdaten, Reiseinformationen oder Privatsphäre-Einstellungen.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">👁️ Sichtbarkeit steuern</h4>
                  <p className="text-sm text-gray-700">
                    Entscheiden Sie, welche Infos ein Finder sehen kann: Name, Telefon, E-Mail, Reiseziel, etc.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🗑️ Löschen</h4>
                  <p className="text-sm text-gray-700">
                    Löschen Sie einzelne Daten oder Ihren gesamten Account inklusive aller Informationen.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📥 Exportieren</h4>
                  <p className="text-sm text-gray-700">
                    Laden Sie alle Ihre Daten in einem maschinenlesbaren Format herunter (GDPR-Recht).
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Sicherheits-Features
              </h2>
              <div className="space-y-4 my-8">
                <div className="flex items-start bg-blue-50 rounded-lg p-4">
                  <span className="text-2xl mr-4">🔐</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ende-zu-Ende Verschlüsselung</h4>
                    <p className="text-gray-700">
                      Alle Datenübertragungen zwischen Ihrem Gerät und unseren Servern sind mit TLS/SSL verschlüsselt. 
                      Passwörter werden mit bcrypt gehasht und niemals im Klartext gespeichert.
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-green-50 rounded-lg p-4">
                  <span className="text-2xl mr-4">🛡️</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">DDoS- & Angriffs-Schutz</h4>
                    <p className="text-gray-700">
                      Unsere Infrastruktur ist gegen Distributed Denial of Service (DDoS) Attacken geschützt. 
                      Firewall und Intrusion Detection Systeme schützen vor unbefugtem Zugriff.
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-purple-50 rounded-lg p-4">
                  <span className="text-2xl mr-4">🔍</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Regelmäßige Security-Audits</h4>
                    <p className="text-gray-700">
                      Wir führen regelmäßige Sicherheitsüberprüfungen durch und arbeiten mit externen 
                      Security-Experten zusammen, um Schwachstellen zu identifizieren und zu beheben.
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-yellow-50 rounded-lg p-4">
                  <span className="text-2xl mr-4">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Missbrauchs-Erkennung</h4>
                    <p className="text-gray-700">
                      Automatische Systeme erkennen verdächtiges Verhalten (z.B. zu viele Scans in kurzer Zeit) 
                      und benachrichtigen Sie sofort.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                GDPR/DSGVO Compliance
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Ihre Rechte nach DSGVO
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">✓ Recht auf Auskunft (Art. 15)</p>
                    <p className="text-gray-700">Sie können jederzeit einsehen, welche Daten wir über Sie speichern.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">✓ Recht auf Berichtigung (Art. 16)</p>
                    <p className="text-gray-700">Korrigieren Sie falsche oder unvollständige Daten jederzeit.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">✓ Recht auf Löschung (Art. 17)</p>
                    <p className="text-gray-700">Löschen Sie Ihr Konto und alle Daten mit einem Klick.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">✓ Recht auf Datenübertragbarkeit (Art. 20)</p>
                    <p className="text-gray-700">Exportieren Sie Ihre Daten in einem strukturierten Format.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">✓ Recht auf Widerspruch (Art. 21)</p>
                    <p className="text-gray-700">Widersprechen Sie der Verarbeitung Ihrer Daten zu Werbezwecken.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">✓ Recht auf Einschränkung (Art. 18)</p>
                    <p className="text-gray-700">Beschränken Sie die Verarbeitung Ihrer Daten unter bestimmten Umständen.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Datenschutz für Kinder
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">
                  👶 Besonderer Schutz für unter 16-Jährige
                </h3>
                <p className="text-gray-800 mb-3">
                  Für Tags, die für Kinder registriert werden, gelten zusätzliche Schutzmaßnahmen:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Eltern/Erziehungsberechtigte müssen die Registrierung vornehmen</li>
                  <li>✓ Standardmäßig werden weniger Informationen angezeigt</li>
                  <li>✓ Keine direkte Kommunikation mit dem Kind möglich</li>
                  <li>✓ Alle Nachrichten gehen an die Eltern-E-Mail</li>
                  <li>✓ Zusätzliche Benachrichtigungen bei jedem Scan</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Was wir NICHT tun
              </h2>
              <div className="bg-red-50 rounded-lg p-6 my-8">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-xl">✗</span>
                    <div>
                      <strong className="text-gray-900">Keine Datenverkäufe:</strong>
                      <span className="text-gray-700"> Wir verkaufen Ihre Daten niemals an Dritte.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-xl">✗</span>
                    <div>
                      <strong className="text-gray-900">Keine Werbe-Tracker:</strong>
                      <span className="text-gray-700"> Wir nutzen keine invasiven Tracking-Tools oder Cookies von Dritten.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-xl">✗</span>
                    <div>
                      <strong className="text-gray-900">Keine versteckte Datennutzung:</strong>
                      <span className="text-gray-700"> Wir nutzen Ihre Daten nur für den Bag-Tag Service, nicht für andere Zwecke.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-xl">✗</span>
                    <div>
                      <strong className="text-gray-900">Keine Weitergabe ohne Zustimmung:</strong>
                      <span className="text-gray-700"> Außer an Finder (nur freigegebene Infos) geben wir Daten nicht weiter.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Im Falle eines Datenverlusts
              </h2>
              <p>
                Sollte es – trotz aller Sicherheitsmaßnahmen – zu einem Datenleck kommen:
              </p>
              <ol className="space-y-2 my-4">
                <li><strong>1. Sofortige Benachrichtigung:</strong> Sie werden innerhalb von 72 Stunden informiert</li>
                <li><strong>2. Transparente Kommunikation:</strong> Wir erklären genau, was passiert ist</li>
                <li><strong>3. Behörden-Meldung:</strong> Wir informieren die zuständigen Datenschutzbehörden</li>
                <li><strong>4. Maßnahmen:</strong> Wir ergreifen sofort Schritte, um den Schaden zu begrenzen</li>
              </ol>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Kontakt & Datenschutzbeauftragter
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-800 mb-4">
                  Haben Sie Fragen zum Datenschutz oder möchten Sie Ihre Rechte ausüben?
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>E-Mail:</strong> datenschutz@bag-tag.de</p>
                  <p><strong>Post:</strong> Bag-Tag GmbH, Datenschutzbeauftragter, [Adresse]</p>
                  <p><strong>Datenschutzerklärung:</strong> <Link href="/de/datenschutz" className="text-blue-600 hover:underline">bag-tag.de/de/datenschutz</Link></p>
                </div>
              </div>
            </section>

            <ContentFaqSection
              title="Häufig gestellte Fragen zu Datenschutz"
              faqs={faqItems}
            />

            <RelatedLinksSection links={relatedLinks} />
            
            <CtaSection
              title="Sicher und geschützt reisen"
              description="Vertrauen Sie auf Bag-Tag – Ihr Gepäck und Ihre Daten sind bei uns sicher."
              buttonText="Jetzt starten"
              buttonLink="https://bag-tag.de/de#shop"
            />
          </article>
        </div>
      </main>
    </>
  );
}
