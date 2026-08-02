import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { TldrSection, RelatedLinksSection, CtaSection, Breadcrumb } from '@/app/components/ContentComponents';

const linkMap = {
  useCases: '/de/use-cases',
  kids: '/de/use-cases/kofferanhaenger-fuer-kinder',
  families: '/de/use-cases/gepaeckanhaenger-fuer-familien',
  security: '/de/sicherheit-datenschutz',
  howItWorks: '/de/so-funktionierts',
  product: '/de/nfc-gepaeckanhaenger',
  avoidLoss: '/de/gepaeck-verlust-vermeiden',
};

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Gepäckanhänger für Vielflieger – Effizienz für Geschäftsreisen | Bag-Tag';
  const description = 'Der smarte NFC Gepäckanhänger für Geschäftsreisende und Vielflieger. Schnelle Identifikation, professionelles Auftreten, Priority-Handling. DSGVO-konform.';
  const url = 'https://bag-tag.de/de/use-cases/gepaeckanhaenger-fuer-vielflieger';

  return {
    title,
    description,
    keywords: 'Gepäckanhänger Vielflieger, Business Kofferanhänger, Geschäftsreise Gepäck, NFC Tag Business, Frequent Flyer',
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
          alt: 'Bag-Tag Gepäckanhänger für Vielflieger',
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
        de: '/de/use-cases/gepaeckanhaenger-fuer-vielflieger',
        en: '/en/use-cases/luggage-tags-for-frequent-flyers',
        'x-default': '/en/use-cases/luggage-tags-for-frequent-flyers',
      },
    },
  };
}

export default function GepäckanhängerFürVielfliegePage() {
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Bag-Tag NFC Gepäckanhänger für Vielflieger',
    brand: {
      '@type': 'Brand',
      name: 'Bag-Tag',
    },
    description: 'Professioneller NFC Gepäckanhänger für Geschäftsreisende und Vielflieger.',
    image: 'https://bag-tag.de/assets/productimage.webp',
    offers: {
      '@type': 'Offer',
      url: 'https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc',
      priceCurrency: 'EUR',
      price: '10.99',
      availability: 'https://schema.org/InStock',
    },
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gepäckanhänger für Vielflieger – Effizienz für Geschäftsreisende',
    description: 'Warum professionelle Reisende auf smarte NFC Gepäckanhänger setzen.',
    author: {
      '@type': 'Organization',
      name: 'Bag-Tag',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bag-Tag',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bag-tag.de/assets/productimage.webp',
      },
    },
    datePublished: '2024-01-15',
    dateModified: '2024-01-15',
  };

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
        name: 'Use Cases',
        item: 'https://bag-tag.de/de/use-cases',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Gepäckanhänger für Vielflieger',
        item: 'https://bag-tag.de/de/use-cases/gepaeckanhaenger-fuer-vielflieger',
      },
    ],
  };

  const relatedLinks = [
    { href: linkMap.avoidLoss, title: 'Gepäckverlust vermeiden – Praktische Tipps' },
    { href: linkMap.security, title: 'Sicherheit & Datenschutz' },
    { href: linkMap.howItWorks, title: 'So funktioniert der Bag-Tag' },
    { href: linkMap.product, title: 'NFC Gepäckanhänger – Produkt Details' },
  ];

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <Breadcrumb items={[
            { name: 'Home', href: '/de' },
            { name: 'Use Cases', href: linkMap.useCases },
            { name: 'Gepäckanhänger für Vielflieger' },
          ]} />

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Gepäckanhänger für Vielflieger
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Als Geschäftsreisender oder Vielflieger zählt jede Minute. Der Bag-Tag NFC Gepäckanhänger 
            ist Ihr professioneller Begleiter auf Dienstreisen – für schnelle Identifikation, 
            maximale Effizienz und ein souveränes Auftreten.
          </p>

          <TldrSection title="Das Wichtigste für Vielflieger">
            <ul className="space-y-2 mt-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Blitzschnelle Identifikation am Gepäckband – keine Zeit verschwenden</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Professioneller Eindruck bei Geschäftsreisen und Meetings</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Flexible Kontaktdaten für wechselnde Reiseziele</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Priority-Handling bei Gepäckverlust – direkte Rückgabe möglich</span>
              </li>
            </ul>
          </TldrSection>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Effizienz ist alles: Zeit sparen auf Geschäftsreisen
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Als Vielflieger kennen Sie das: Jede Minute am Flughafen ist wertvoll. Zwischen 
                Meetings, Konferenzen und Kundenterminen darf nichts schiefgehen. Verlorenes oder 
                verspätetes Gepäck kann Ihren gesamten Zeitplan durcheinanderbringen.
              </p>

              <div className="bg-slate-100 border-l-4 border-slate-600 p-6 rounded-r-lg">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Zeitersparnis mit dem Bag-Tag:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-slate-700 font-bold mr-3">⏱️</span>
                    <div>
                      <strong>Am Gepäckband:</strong> Ihr Koffer ist durch das markante Design 
                      sofort erkennbar. Kein langes Suchen zwischen hunderten schwarzen Koffern.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-700 font-bold mr-3">📱</span>
                    <div>
                      <strong>Bei Gepäckverlust:</strong> Flughafenpersonal kann Sie direkt 
                      kontaktieren statt dass Sie stundenlang am Lost & Found Schalter warten.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-700 font-bold mr-3">✈️</span>
                    <div>
                      <strong>Beim Check-in:</strong> Professionelles Auftreten mit hochwertigen, 
                      modernen Gepäckanhängern. Erste Klasse beginnt beim ersten Eindruck.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-700 font-bold mr-3">🏨</span>
                    <div>
                      <strong>Im Hotel:</strong> Aktualisieren Sie Ihre Kontaktdaten einfach online 
                      auf die Hotel-Adresse. Falls Ihr Gepäck später ankommt, geht es direkt dorthin.
                    </div>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Realitätscheck:</strong> Laut SITA Baggage IT Insights Report 2023 gehen 
                weltweit jährlich über 26 Millionen Gepäckstücke verloren oder kommen verspätet an. 
                Als Geschäftsreisender mit 50+ Flügen pro Jahr ist es statistisch gesehen fast 
                unvermeidlich, dass Sie früher oder später betroffen sind.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Professionelles Auftreten auf Geschäftsreisen
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Ihr Gepäck ist ein Teil Ihres professionellen Auftretens. Zerknitterte Papier-Tags, 
                verblasste Beschriftungen oder schlampig angebrachte Aufkleber wirken unprofessionell. 
                Der Bag-Tag hingegen signalisiert:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-slate-100 to-slate-50 p-6 rounded-lg border border-slate-300">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    💼 Business-Class-Erscheinung
                  </h3>
                  <p>
                    Modernes Design, hochwertige Materialien, cleane Optik. Ihr Gepäck macht 
                    einen ebenso professionellen Eindruck wie Ihr Business-Anzug.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-lg border border-blue-300">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    🔒 Diskretion und Datenschutz
                  </h3>
                  <p>
                    Keine offen sichtbaren Privatadressen oder Telefonnummern. Geschäftliche 
                    Informationen bleiben geschützt. DSGVO-konform für sensible Geschäftsreisen.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-lg border border-green-300">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    🌍 Internationale Kompatibilität
                  </h3>
                  <p>
                    NFC funktioniert weltweit ohne Sprachbarrieren. Von New York über Shanghai 
                    bis Dubai – überall kann Ihr Koffer identifiziert werden.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-lg border border-purple-300">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    ⚡ Tech-savvy Image
                  </h3>
                  <p>
                    Zeigen Sie, dass Sie auf dem neuesten Stand der Technologie sind. NFC statt 
                    Papier – das passt zu Ihrem innovativen Business-Ansatz.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-blue-50 p-8 rounded-lg border border-blue-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Häufige Gepäckprobleme bei Vielfliegern
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Wer viel fliegt, erlebt früher oder später diese Situationen. Der Bag-Tag ist 
                die Lösung für viele typische Vielflieger-Probleme:
              </p>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <span className="text-red-600 mr-3">❌</span>
                    <span>Problem: Gepäck kommt bei Anschlussflügen nicht mit</span>
                  </h3>
                  <p className="ml-8">
                    <strong className="text-blue-600">✓ Lösung mit Bag-Tag:</strong> Airline-Personal 
                    scannt den Tag, sieht Ihr Endziel und leitet den Koffer direkt dorthin weiter – 
                    ohne dass Sie am Schalter warten müssen.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <span className="text-red-600 mr-3">❌</span>
                    <span>Problem: Verwechslung mit ähnlichen Business-Koffern</span>
                  </h3>
                  <p className="ml-8">
                    <strong className="text-blue-600">✓ Lösung mit Bag-Tag:</strong> Ein NFC-Scan 
                    zeigt sofort, wem der Koffer gehört. Keine peinlichen Situationen mehr, wenn 
                    Sie versehentlich den falschen Koffer mitnehmen.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <span className="text-red-600 mr-3">❌</span>
                    <span>Problem: Kontaktdaten ändern sich je nach Reiseziel</span>
                  </h3>
                  <p className="ml-8">
                    <strong className="text-blue-600">✓ Lösung mit Bag-Tag:</strong> Aktualisieren 
                    Sie Ihre Kontaktdaten online vor jeder Reise. Hotel-Adresse, lokale Telefonnummer 
                    oder Firmenkontakt – in Sekunden geändert.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <span className="text-red-600 mr-3">❌</span>
                    <span>Problem: Papier-Tags reißen bei häufigem Handling ab</span>
                  </h3>
                  <p className="ml-8">
                    <strong className="text-blue-600">✓ Lösung mit Bag-Tag:</strong> Robustes, 
                    wasserfestes Material hält hunderten Flügen stand. Einmal befestigt, 
                    jahrelang nutzbar.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <span className="text-red-600 mr-3">❌</span>
                    <span>Problem: Sicherheitsbedenken bei offener Adressangabe</span>
                  </h3>
                  <p className="ml-8">
                    <strong className="text-blue-600">✓ Lösung mit Bag-Tag:</strong> Nur die 
                    Person, die den Tag scannt, sieht Ihre Kontaktdaten. Keine öffentlich 
                    sichtbaren Privatadressen mehr.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Priority-Handling bei Gepäckverlust
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Der größte Vorteil des Bag-Tag für Vielflieger: <strong>Direkter Kontakt zwischen 
                Finder und Besitzer</strong>. Das bedeutet in der Praxis:
              </p>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                <h3 className="font-semibold text-green-900 mb-3">
                  So läuft's bei Gepäckverlust mit Bag-Tag:
                </h3>
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">1.</span>
                    <div>
                      <strong>Koffer wird gefunden</strong> – am Flughafen, im Hotel oder von 
                      einem anderen Reisenden.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">2.</span>
                    <div>
                      <strong>Tag wird gescannt</strong> – Finder hält Smartphone an den Tag.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">3.</span>
                    <div>
                      <strong>Kontakt wird hergestellt</strong> – Sie erhalten eine Nachricht 
                      (E-Mail oder SMS).
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">4.</span>
                    <div>
                      <strong>Direkte Rückgabe</strong> – Koffer kann zu Ihrem Hotel oder Meeting 
                      geliefert werden, statt zum Lost & Found.
                    </div>
                  </li>
                </ol>
              </div>

              <p className="bg-white p-4 rounded border border-blue-300">
                <strong>⏱️ Zeitersparnis konkret:</strong> Statt 2-4 Stunden am Lost & Found 
                Schalter zu warten und Formulare auszufüllen, bekommen Sie innerhalb von 30 Minuten 
                eine Nachricht und können direkt zum nächsten Meeting.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Best Practices für Geschäftsreisende
            </h2>

            <div className="space-y-6 text-lg text-gray-700">
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-300">
                <h3 className="font-semibold text-gray-900 mb-3">
                  💼 Geschäftliche vs. private Kontaktdaten
                </h3>
                <p className="mb-2">
                  Nutzen Sie für Business-Reisen Ihre geschäftliche E-Mail und Büroadresse. 
                  Für Privatreisen können Sie die Daten einfach umstellen.
                </p>
                <p className="text-sm text-gray-600">
                  Tipp: Richten Sie eine dedizierte E-Mail ein, z.B. „max.mueller.travel@firma.de"
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-300">
                <h3 className="font-semibold text-gray-900 mb-3">
                  🏨 Hotel-Adresse vor jeder Reise aktualisieren
                </h3>
                <p className="mb-2">
                  Hinterlegen Sie Name und Adresse Ihres Hotels. Falls Ihr Gepäck später ankommt, 
                  kann die Airline es direkt dorthin schicken.
                </p>
                <p className="text-sm text-gray-600">
                  Tipp: Nutzen Sie die Notizfunktion für wichtige Infos wie „Ankunft: 23.01.2024, 
                  Konferenz bis 25.01."
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-300">
                <h3 className="font-semibold text-gray-900 mb-3">
                  ✈️ Mehrere Tags für Hand- und Aufgabegepäck
                </h3>
                <p className="mb-2">
                  Verwenden Sie je einen Tag für Ihren Koffer und Ihr Handgepäck. So sind beide 
                  Gepäckstücke geschützt.
                </p>
                <p className="text-sm text-gray-600">
                  Tipp: Nutzen Sie unterschiedliche Farben, um Koffer und Handgepäck sofort 
                  unterscheiden zu können.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-300">
                <h3 className="font-semibold text-gray-900 mb-3">
                  🔔 Benachrichtigungen aktivieren
                </h3>
                <p className="mb-2">
                  Aktivieren Sie Push-Benachrichtigungen, um sofort informiert zu werden, wenn 
                  jemand Ihren Tag scannt.
                </p>
                <p className="text-sm text-gray-600">
                  Tipp: Sie können in den Einstellungen festlegen, ob Sie bei jedem Scan oder 
                  nur bei Fund-Meldungen benachrichtigt werden möchten.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-300">
                <h3 className="font-semibold text-gray-900 mb-3">
                  🌍 Internationale Nummer hinterlegen
                </h3>
                <p className="mb-2">
                  Verwenden Sie eine internationale Mobilnummer (mit +49 statt 0). So können Sie 
                  auch aus dem Ausland problemlos erreicht werden.
                </p>
                <p className="text-sm text-gray-600">
                  Tipp: WhatsApp-Nummer ist oft praktischer als normale SMS, da WhatsApp weltweit 
                  funktioniert.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-slate-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Warum Vielflieger auf Bag-Tag setzen
            </h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Zeitersparnis:</strong> Schnelle Identifikation, direkter Kontakt bei Verlust</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Professionelles Auftreten:</strong> Hochwertiges Design für Business-Reisen</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Flexibilität:</strong> Kontaktdaten jederzeit online änderbar</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Datenschutz:</strong> DSGVO-konform, keine öffentlichen Privatadressen</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Langlebigkeit:</strong> Robust genug für 100+ Flüge pro Jahr</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Internationale Nutzung:</strong> Funktioniert weltweit ohne App</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Keine Folgekosten:</strong> Keine Batterien, keine Abos, keine Gebühren</span>
              </li>
            </ul>
          </section>

          <RelatedLinksSection 
            title="Weitere Informationen für Vielflieger"
            links={relatedLinks}
          />

          <CtaSection 
            title="Effizienz für Ihre Geschäftsreisen"
            description="Bag-Tag – der smarte Begleiter für Vielflieger"
            primaryText="Jetzt kaufen"
            primaryHref="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
            secondaryText="Mehr über Sicherheit"
            secondaryHref={linkMap.security}
          />
        </article>
      </div>
    </>
  );
}
