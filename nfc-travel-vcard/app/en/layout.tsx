import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import '../globals.css';
import { LanguageProvider } from '../components/LanguageProvider';

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary('en');
  const seo = dict.seo;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['de_DE'],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.productName,
      description: seo.description,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: '/en',
      languages: { de: '/de', en: '/en' },
    },
  };
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider initialLanguage="en">{children}</LanguageProvider>
  );
}
