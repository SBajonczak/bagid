import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import '../globals.css';
import { LanguageProvider } from '../components/LanguageProvider';
import Script from 'next/script';

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary('de');
  const seo = dict.seo;
  const url = 'https://bag-tag.de/de';
  const imageUrl = 'https://bag-tag.de/assets/productimage.webp';
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    creator: 'Kreativschicht.de',
    publisher: 'Kreativschicht.de',
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      locale: 'de_DE',
      alternateLocale: ['en_US'],
      url: url,
      siteName: 'Bag-Tag',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Bag-Tag NFC Gepäckanhänger für sicheres Reisen',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [imageUrl],
      creator: '@bag_tag',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
      languages: { de: '/de', en: '/en', 'x-default': '/' },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default function DeLayout({ children }: { children: React.ReactNode }) {
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Bag-Tag NFC Gepäckanhänger',
    description: 'Smarter NFC Gepäckanhänger mit QR-Code für sicheres Reisen. Keine App erforderlich, DSGVO-konform, wasserfest und lebenslang ohne Batterien nutzbar.',
    sku: 'BAG-TAG-NFC-001',
    brand: {
      '@type': 'Brand',
      name: 'Bag-Tag',
    },
    image: 'https://bag-tag.de/assets/productimage.webp',
    offers: {
      '@type': 'Offer',
      url: 'https://bag-tag.de/de/nfc-gepaeckanhaenger',
      priceCurrency: 'EUR',
      price: '10.99',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Kreativschicht.de',
        url: 'https://kreativschicht.de',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '3.99',
          currency: 'EUR',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'DE',
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'DE',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
        author: { '@type': 'Person', name: 'Maria K.' },
        reviewBody: 'Super praktisch! Habe den Tag an meinem Koffer – das Auslesen per NFC geht in Sekunden. Endlich kein Papierfetzen mehr im Anhänger.',
        datePublished: '2025-11-10',
      },
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
        author: { '@type': 'Person', name: 'Thomas B.' },
        reviewBody: 'Mein Koffer wurde am Flughafen verwechselt – der Finder hat mich dank Bag-Tag sofort kontaktiert. Absolut empfehlenswert!',
        datePublished: '2025-09-22',
      },
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
        author: { '@type': 'Person', name: 'Sandra M.' },
        reviewBody: 'Tolle Qualität, sehr robust. Hab den Tag schon durch 12 Flüge gebracht – funktioniert einwandfrei. Kein App-Download nötig ist ein riesiger Pluspunkt.',
        datePublished: '2025-12-05',
      },
    ],
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bag-Tag',
    url: 'https://bag-tag.de',
    logo: {
      '@type': 'ImageObject',
      url: 'https://bag-tag.de/assets/icon_32_32.png',
    },
    description: 'Smarte NFC Gepäckanhänger für sicheres Reisen – DSGVO-konform, keine App nötig',
    sameAs: [
      'https://www.instagram.com/bag_tag/',
      'https://de-de.facebook.com/bagtag/',
    ],
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
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wie funktioniert der Bag-Tag NFC Gepäckanhänger?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der Bag-Tag nutzt NFC und QR-Code-Technologie, um deine Kontaktdaten sicher zu speichern. Finder halten einfach ihr Smartphone an den Tag – deine Daten erscheinen sofort, ohne App-Download.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie funktioniert die Registrierung des Bag-Tag?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Du erhältst deinen Bag-Tag per Post. Sobald du den NFC-Chip mit deinem Smartphone ausliest oder den QR-Code scannst, wirst du automatisch zur Registrierungsseite weitergeleitet. Dort kannst du den Tag direkt mit deinem Konto verknüpfen und deine Kontaktdaten hinterlegen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kann ich meine Kontaktdaten jederzeit ändern?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, du kannst deine Daten jederzeit online in deinem Dashboard aktualisieren. Die Änderungen sind sofort auf dem Tag aktiv – ohne neuen Tag kaufen zu müssen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ist der Bag-Tag wasserdicht?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, der Bag-Tag ist robust und wasserdicht. Er ist für den rauen Reisealltag konzipiert und hält extremen Temperaturen, Nässe und Stößen stand.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was ist in dem Paket enthalten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Du erhältst deinen personalisierten NFC Gepäckanhänger und einen stabilen Metallring zum Befestigen am Koffer.',
        },
      },
      {
        '@type': 'Question',
        name: 'Funktioniert der Bag-Tag auch ohne Internet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der NFC-Chip selbst braucht kein Internet. Wenn ein Finder dein Gepäck scannt, leitet der Tag zu einer Online-Seite weiter – dafür braucht der Finder eine Internetverbindung. Das ist bei jedem modernen Smartphone standardmäßig vorhanden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was passiert, wenn der Finder kein NFC-fähiges Smartphone hat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kein Problem! Jeder Bag-Tag hat zusätzlich einen QR-Code, der mit jeder Smartphone-Kamera ohne App gescannt werden kann. So ist die Kontaktaufnahme immer möglich.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ist der Bag-Tag DSGVO-konform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, absolut. Der Bag-Tag ist vollständig DSGVO-konform, entwickelt und gehostet in Deutschland. Du bestimmst selbst, welche Daten gespeichert werden. Es gibt kein Tracking und keine Weitergabe an Dritte.',
        },
      },
      {
        '@type': 'Question',
        name: 'Muss ich den Bag-Tag aufladen oder Batterien wechseln?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nein. NFC ist eine passive Technologie – der Tag wird vom Smartphone des Finders mit Energie versorgt. Keine Batterie, keine Ladezyklen, lebenslang wartungsfrei.',
        },
      },
      {
        '@type': 'Question',
        name: 'Für wen ist der Bag-Tag geeignet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der Bag-Tag ist ideal für alle Reisenden: Geschäftsreisende, Familien, Vielflieger, Kinder auf Schulreisen und alle, die häufig mit Koffer oder Rucksack unterwegs sind.',
        },
      },
    ],
  };

  return (
    <LanguageProvider initialLanguage="de">
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </LanguageProvider>
  );
}
