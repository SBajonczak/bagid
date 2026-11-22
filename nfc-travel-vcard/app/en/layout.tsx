import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import '../globals.css';
import { LanguageProvider } from '../components/LanguageProvider';
import JsonLd from '../components/JsonLd';
import { buildHomeJsonLd } from '@/lib/seo/structured-data';

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
      languages: { de: 'https://bag-tag.de/de', en: 'https://bag-tag.de/en', 'x-default': 'https://bag-tag.de/' },
    },
    // Nur ausgeben, wenn wirklich ein Code hinterlegt ist (vorher Platzhalter im HTML).
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD wird als echtes <script> im Server-HTML ausgeliefert (vorher via
  // next/script "afterInteractive" erst clientseitig injiziert → für Crawler
  // ohne JS-Rendering unsichtbar). Inhalte spiegeln die sichtbare Seite.
  const jsonLd = buildHomeJsonLd('en');

  return (
    <LanguageProvider initialLanguage="en">
      {jsonLd.map((data, idx) => (
        <JsonLd key={idx} data={data} />
      ))}
      {children}
    </LanguageProvider>
  );
}
