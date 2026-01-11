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
      {children}
    </LanguageProvider>
  );
}
