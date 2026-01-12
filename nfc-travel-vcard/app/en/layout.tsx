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
    description: 'Smart NFC luggage tag with QR code for safe travel. No app required, GDPR compliant, waterproof.',
    brand: {
      '@type': 'Brand',
      name: 'Bag-Tag',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://bag-tag.de/en',
      priceCurrency: 'EUR',
      price: '12.99',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Kreativschicht.de',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
    image: 'https://bag-tag.de/assets/productimage.webp',
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bag-Tag',
    url: 'https://bag-tag.de',
    logo: 'https://bag-tag.de/assets/icon_32_32.png',
    description: 'Smart NFC luggage tags for safe travel',
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
        name: 'How does the Bag-Tag work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bag-Tag uses NFC and QR code technology to securely store your contact details and allow finders to contact you quickly.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does registration work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You will receive your Bag-Tag by mail. As soon as you scan the NFC chip with your smartphone or the QR code, you will automatically be redirected to the registration page. There you can link the tag directly to your account and enter your contact details. This way your luggage is protected in no time and you can update your data online at any time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I update my data anytime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can update your data online anytime to ensure it is always up-to-date.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Bag-Tag waterproof?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the Bag-Tag is durable and waterproof, making it suitable for any journey.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in the package?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You will receive your personalized tag and a metal ring to attach the tag.',
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
