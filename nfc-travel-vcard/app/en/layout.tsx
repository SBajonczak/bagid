import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import '../globals.css';
import { LanguageProvider } from '../components/LanguageProvider';
import Script from 'next/script';

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary('en');
  const seo = dict.seo;
  const url = 'https://bag-tag.de/en';
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
      locale: 'en_US',
      alternateLocale: ['de_DE'],
      url: url,
      siteName: 'Bag-Tag',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Bag-Tag NFC luggage tags for safe travel',
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

export default function EnLayout({ children }: { children: React.ReactNode }) {
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Bag-Tag NFC Luggage Tag',
    description: 'Smart NFC luggage tag with QR code for safe travel. No app required, GDPR compliant, waterproof and battery-free for life.',
    sku: 'BAG-TAG-NFC-001',
    brand: {
      '@type': 'Brand',
      name: 'Bag-Tag',
    },
    image: 'https://bag-tag.de/assets/productimage.webp',
    offers: {
      '@type': 'Offer',
      url: 'https://bag-tag.de/en/nfc-luggage-tag',
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
        reviewBody: 'Super practical! Scanning with NFC takes seconds. No more paper slips in the luggage tag.',
        datePublished: '2025-11-10',
      },
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
        author: { '@type': 'Person', name: 'Thomas B.' },
        reviewBody: 'My luggage was mixed up at the airport – the finder contacted me immediately thanks to Bag-Tag. Absolutely recommend it!',
        datePublished: '2025-09-22',
      },
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
        author: { '@type': 'Person', name: 'Sandra M.' },
        reviewBody: 'Great quality, very sturdy. Used it through 12 flights – works perfectly. No app download needed is a huge plus.',
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
    description: 'Smart NFC luggage tags for safe travel – no app required, GDPR compliant',
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
        item: 'https://bag-tag.de/en',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the Bag-Tag NFC luggage tag work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bag-Tag uses NFC and QR code technology to securely store your contact details. Finders simply hold their smartphone to the tag – your information appears instantly, without any app download.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does registration work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You receive your Bag-Tag by mail. Once you scan the NFC chip or QR code with your smartphone, you are redirected to the registration page to link the tag to your account and enter your contact details.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I update my contact data anytime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can update your data online in your dashboard at any time. Changes are immediately active on the tag – no need to buy a new tag.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Bag-Tag waterproof?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the Bag-Tag is durable and waterproof, designed for tough travel conditions. It withstands extreme temperatures, moisture and impacts.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in the package?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You receive your personalized NFC luggage tag and a sturdy metal ring for attaching it to your luggage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Bag-Tag work without internet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The NFC chip itself requires no internet. When a finder scans your luggage, the tag redirects to an online page – so the finder needs internet access, which is standard on any modern smartphone.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if the finder does not have an NFC-enabled phone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No problem! Every Bag-Tag also has a QR code that can be scanned with any smartphone camera without an app.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Bag-Tag GDPR compliant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, absolutely. The Bag-Tag is fully GDPR compliant, developed and hosted in Germany. You control what data is stored. No tracking, no data sharing with third parties.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the Bag-Tag need charging or batteries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. NFC is a passive technology – the tag is powered by the finder\'s smartphone. No battery, no charging cycles, maintenance-free for life.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is the Bag-Tag suitable for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bag-Tag is ideal for all travelers: business travelers, families, frequent flyers, children on school trips, and anyone who regularly travels with luggage or a backpack.',
        },
      },
    ],
  };

  return (
    <LanguageProvider initialLanguage="en">
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
