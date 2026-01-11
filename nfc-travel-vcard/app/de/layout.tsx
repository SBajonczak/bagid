import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import '../globals.css';
import { LanguageProvider } from '../components/LanguageProvider';

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary('de');
  const seo = dict.seo;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      locale: 'de_DE',
      alternateLocale: ['en_US'],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.productName,
      description: seo.description,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: '/de',
      languages: { de: '/de', en: '/en' },
    },
  };
}

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="alternate" hrefLang="de" href="/de" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body>
        <LanguageProvider initialLanguage="de">{children}</LanguageProvider>
      </body>
    </html>
  );
}
