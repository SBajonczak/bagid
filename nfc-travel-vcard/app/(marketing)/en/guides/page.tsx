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

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Guides for Safe Travel – Bag-Tag Info Hub | Bag-Tag';
  const description = 'Discover our travel guides: prevent luggage loss, what to do if your suitcase is lost, NFC vs QR code, and more. Expert tips for stress-free travel.';
  const url = 'https://bag-tag.de/en/guides';

  return {
    title,
    description,
    keywords: 'travel guides, luggage lost, suitcase tips, travel safely, prevent luggage loss',
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
          alt: 'Bag-Tag Guides',
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
        de: '/de/ratgeber',
        en: '/en/guides',
        'x-default': '/de/ratgeber',
      },
    },
  };
}

export default function GuidesPage() {
  const relatedLinks = getRelatedLinks('guides', 'en');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/en' },
    { name: 'Guides', url: 'https://bag-tag.de/en/guides' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  const guides = [
    {
      title: 'Lost Suitcase – What to Do?',
      description: 'Step-by-step guide on what to do immediately if your luggage is lost. From reporting to recovery.',
      icon: '🆘',
      link: '/en/guides/lost-suitcase-what-to-do',
      tags: ['Emergency', 'Airport', 'Rights'],
    },
    {
      title: 'Prevent Luggage Loss',
      description: 'The best tips and strategies to prevent luggage loss from the start. Packing tips, smart tagging, and more.',
      icon: '🛡️',
      link: '/en/guides/prevent-luggage-loss',
      tags: ['Prevention', 'Tips', 'Security'],
    },
    {
      title: 'NFC vs. QR Code',
      description: 'Detailed comparison of the two technologies. Which is better for luggage tags? Pros and cons at a glance.',
      icon: '⚡',
      link: '/en/guides/nfc-vs-qr',
      tags: ['Technology', 'Comparison', 'NFC'],
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Guide to Smarter and Safer Travel
              </h1>
              <p className="text-xl text-gray-600">
                Our collected knowledge for your peace of mind on the go. Here you will find expert tips, detailed guides, and practical solutions to common travel problems.
              </p>
            </header>

            <div className="space-y-8">
              {guides.map((guide, index) => (
                <Link href={guide.link} key={index}>
                  <a className="block p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-50">
                    <div className="flex items-start">
                      <span className="text-3xl mr-4">{guide.icon}</span>
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{guide.title}</h2>
                        <p className="mt-2 text-gray-700">{guide.description}</p>
                        <div className="mt-4 flex space-x-2">
                          {guide.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </article>

          <CtaSection
            title="Ready for your next trip?"
            description="Equip yourself with a Bag-Tag and travel with the certainty that your luggage is protected."
            buttonText="To the Shop"
            buttonLink="/en/nfc-luggage-tag"
          />

          <RelatedLinksSection
            title="More Topics"
            links={relatedLinks}
          />
        </div>
      </main>
    </>
  );
}
