import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { 
  RelatedLinksSection, 
  CtaSection,
  Breadcrumb 
} from '@/app/components/ContentComponents';
import { getRelatedLinks } from '@/lib/linkMap';
import { generateBreadcrumbSchema } from '@/lib/schema-utils';
import { Smartphone, HelpCircle, Settings, RefreshCw, QrCode, CheckCircle } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Help & Activation | Bag-Tag';
  const description = 'Help center for your Bag-Tag NFC luggage tag. Activation guide, NFC setup for iPhone & Android, data modification, and frequently asked questions.';
  const url = 'https://bag-tag.de/en/help';

  return {
    title,
    description,
    keywords: 'Bag-Tag help, activate NFC, activate luggage tag, iPhone NFC, Android NFC, set up tag, guide',
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url,
      siteName: 'Bag-Tag',
      images: [
        {
          url: 'https://bag-tag.de/assets/productimage.webp',
          width: 1200,
          height: 630,
          alt: 'Bag-Tag Help & Activation',
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
        de: '/de/hilfe',
        en: '/en/help',
      },
    },
  };
}

export default function HelpPage() {
  const breadcrumbItems = [
    { name: 'Home', href: '/en' },
    { name: 'Help & Activation' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://bag-tag.de/en' },
    { name: 'Help & Activation', url: 'https://bag-tag.de/en/help' },
  ]);

  const relatedLinks = getRelatedLinks('help', 'en');

  const helpCards = [
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Activate Tag',
      description: 'Step-by-step guide to activating your Bag-Tag',
      href: '/en/help/activate',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Activate NFC on iPhone',
      description: 'How to activate NFC on your iPhone',
      href: '/en/help/iphone-nfc-activate',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Activate NFC on Android',
      description: 'How to activate NFC on your Android device',
      href: '/en/help/android-nfc-activate',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: <QrCode className="h-8 w-8" />,
      title: 'QR Code as Fallback',
      description: 'Use the QR code when NFC is not available',
      href: '/en/help/qr-code-as-fallback',
      color: 'bg-orange-50 text-orange-600',
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: 'Change Data',
      description: 'How to change the data on your Bag-Tag',
      href: '/en/help/change-data',
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: 'Transfer Tag',
      description: 'How to transfer your Bag-Tag to a new owner',
      href: '/en/help/transfer-tag',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      icon: <HelpCircle className="h-8 w-8" />,
      title: 'FAQ',
      description: 'Frequently asked questions about Bag-Tag',
      href: '/en/help/faq',
      color: 'bg-red-50 text-red-600',
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumb items={breadcrumbItems.map(item => ({ name: item.name, url: item.href }))} />

          <header className="text-center my-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Help & Activation</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know to activate and use your Bag-Tag.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCards.map((card, index) => (
              <Link href={card.href} key={index} className="block p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className={`inline-block p-3 rounded-full ${card.color}`}>
                  {card.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-gray-600">{card.description}</p>
              </Link>
            ))}
          </div>

          <CtaSection
            title="Still have questions?"
            description="Our support team is happy to help you. Contact us via our contact form."
            buttonText="To Contact Form"
            buttonLink="/en/contact"
          />

          <RelatedLinksSection
            title="Further Information"
            links={relatedLinks}
          />
        </div>
      </main>
    </>
  );
}
