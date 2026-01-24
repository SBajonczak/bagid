import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { 
  TldrSection, 
  RelatedLinksSection, 
  CtaSection,
  Breadcrumb 
} from '@/app/components/ContentComponents';
import { getRelatedLinks } from '@/lib/linkMap';
import { generateBreadcrumbSchema, generateHowToSchema } from '@/lib/schema-utils';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'How the Finder Helps You – Bag-Tag Finder Process | Bag-Tag';
  const description = 'Learn how the finder of your lost luggage contacts you. Privacy guaranteed: Your data remains private while you are found quickly.';
  const url = 'https://bag-tag.de/en/finder-flow';

  return {
    title,
    description,
    keywords: 'Bag-Tag finder, luggage found, return lost luggage, scan NFC tag, finder process',
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'en_US',
      url,
      siteName: 'Bag-Tag',
      images: [
        {
          url: 'https://bag-tag.de/assets/productimage.webp',
          width: 1200,
          height: 630,
          alt: 'Bag-Tag Finder Process',
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
        de: '/de/finder-flow',
        en: '/en/finder-flow',
        'x-default': '/de/finder-flow',
      },
    },
  };
}

export default function FinderFlowPage() {
  const relatedLinks = getRelatedLinks('finder-flow', 'en');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/en' },
    { name: 'Finder Process', url: 'https://bag-tag.de/en/finder-flow' },
  ];

  const finderSteps = [
    {
      name: 'Find Luggage',
      text: 'The finder discovers your lost piece of luggage with the Bag-Tag on the handle.',
      url: 'https://bag-tag.de/en/finder-flow#find',
    },
    {
      name: 'Scan Tag',
      text: 'The finder holds their smartphone to the NFC chip or scans the QR code – no app installation required.',
      url: 'https://bag-tag.de/en/finder-flow#scan',
    },
    {
      name: 'Open Contact Page',
      text: 'The Bag-Tag contact page opens automatically in the browser with the shared contact information.',
      url: 'https://bag-tag.de/en/finder-flow#contact',
    },
    {
      name: 'Contact You',
      text: 'The finder sends you a message via the secure contact form. You will receive a notification immediately.',
      url: 'https://bag-tag.de/en/finder-flow#notification',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const howToSchema = generateHowToSchema({
    name: 'How the Bag-Tag Finder Process Works',
    description: 'Step-by-step guide on how a finder can return your lost luggage.',
    image: 'https://bag-tag.de/assets/productimage.webp',
    steps: finderSteps,
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />

      <main className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumb items={breadcrumbItems} />

          <h1 className="text-4xl font-bold mb-6">The Finder Process: How Your Luggage Finds Its Way Back to You</h1>
          <p className="text-lg mb-8">
            Losing luggage is stressful. But with Bag-Tag, the finder can contact you easily and securely without compromising your privacy. Here’s how it works.
          </p>

          <TldrSection
            title="The Finder Process in a Nutshell"
            points={[
              'Finder finds luggage and scans the Bag-Tag.',
              'A contact page opens with the information you have shared.',
              'The finder contacts you via a secure form.',
              'Your personal data remains protected at all times.',
            ]}
          />

          <div className="space-y-12">
            <section id="find">
              <h2 className="text-3xl font-semibold mb-4">Step 1: The Find</h2>
              <p>
                Someone finds your lost luggage. Thanks to the eye-catching Bag-Tag, it is immediately clear that this is a smart tag. The finder knows that they can help directly.
              </p>
            </section>

            <section id="scan">
              <h2 className="text-3xl font-semibold mb-4">Step 2: Scan the Tag</h2>
              <p>
                The finder uses their smartphone to scan the Bag-Tag. This works in two ways: either by holding the phone to the integrated NFC chip or by scanning the QR code. No special app is needed – any modern smartphone can do this.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-3xl font-semibold mb-4">Step 3: The Contact Page</h2>
              <p>
                A secure contact page opens in the finder's browser. Here, they only see the information you have chosen to share. This could be your name, a phone number, or just a message. Your email address remains hidden.
              </p>
            </section>

            <section id="notification">
              <h2 className="text-3xl font-semibold mb-4">Step 4: The Notification</h2>
              <p>
                The finder uses the contact form to send you a message. You will immediately receive an email with the finder's message and can arrange the return. Your data remains protected throughout the entire process.
              </p>
            </section>
          </div>

          <CtaSection 
            title="Ready to Travel Smarter?"
            description="Get your Bag-Tag now and travel with peace of mind. Your luggage is just a scan away."
            buttonText="To the Shop"
            buttonLink="/en/nfc-luggage-tag"
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
