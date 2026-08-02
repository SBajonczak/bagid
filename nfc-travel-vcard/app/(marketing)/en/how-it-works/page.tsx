import type { Metadata } from 'next';
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
  const title = 'How Bag-Tag Works – NFC Luggage Tag Explained | Bag-Tag';
  const description = 'Discover how the Bag-Tag NFC luggage tag works: in 4 steps to more security for your luggage. NFC & QR code combined for maximum protection.';
  const url = 'https://bag-tag.de/en/how-it-works';

  return {
    title,
    description,
    keywords: 'Bag-Tag function, how NFC luggage tag works, smart luggage tag, digital suitcase tag guide',
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
          alt: 'Bag-Tag Function',
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
        de: '/de/so-funktionierts',
        en: '/en/how-it-works',
        'x-default': '/de/so-funktionierts',
      },
    },
  };
}

export default function HowItWorksPage() {
  const relatedLinks = getRelatedLinks('how-it-works', 'en');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/en' },
    { name: 'How It Works', url: 'https://bag-tag.de/en/how-it-works' },
  ];

  const howToSteps = [
    {
      name: 'Buy Bag-Tag',
      text: 'Order your NFC luggage tag in the online shop. The tag is delivered activated and ready to use.',
      url: 'https://bag-tag.de/en/how-it-works#buy',
    },
    {
      name: 'Activate Tag and Enter Data',
      text: 'Scan the NFC chip or QR code with your smartphone. Create an account and enter your contact and travel data.',
      url: 'https://bag-tag.de/en/how-it-works#activate',
    },
    {
      name: 'Attach to Luggage',
      text: 'Securely attach the Bag-Tag to your suitcase, backpack, or bag. The robust tag withstands all travel conditions.',
      url: 'https://bag-tag.de/en/how-it-works#attach',
    },
    {
      name: 'Travel Protected',
      text: 'If lost, the finder can scan your luggage and contact you immediately – without your data being visible.',
      url: 'https://bag-tag.de/en/how-it-works#protected',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const howToSchema = generateHowToSchema({
    name: 'How the Bag-Tag NFC Luggage Tag Works',
    description: 'Learn how to set up your Bag-Tag in 4 easy steps and protect your luggage.',
    image: 'https://bag-tag.de/assets/productimage.webp',
    steps: howToSteps,
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />

      <main className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumb items={breadcrumbItems} />

          <h1 className="text-4xl font-bold mb-6">How It Works: Your Luggage, Secured in 4 Steps</h1>
          <p className="text-lg mb-8">
            The Bag-Tag makes your luggage smart and secure. The principle is simple, the effect is huge. Here we explain step by step how easy it is to protect your luggage.
          </p>

          <TldrSection
            title="How It Works in a Nutshell"
            points={[
              'Buy the tag and activate it online.',
              'Attach it to your luggage.',
              'If lost, the finder scans the tag.',
              'You will be contacted immediately and securely.',
            ]}
          />

          <div className="space-y-12 my-12">
            <section id="buy">
              <h2 className="text-3xl font-semibold mb-4">Step 1: Buy & Receive</h2>
              <p>
                Order your Bag-Tag easily in our partner shop. It will be delivered to your home within a few days. Each tag has a unique ID and is ready for activation.
              </p>
            </section>

            <section id="activate">
              <h2 className="text-3xl font-semibold mb-4">Step 2: Activate & Customize</h2>
              <p>
                Scan the tag with your smartphone and follow the instructions. Create your secure account and decide which information should be visible to a finder. You have full control.
              </p>
            </section>

            <section id="attach">
              <h2 className="text-3xl font-semibold mb-4">Step 3: Attach</h2>
              <p>
                Attach the robust Bag-Tag to your suitcase, backpack, or any other piece of luggage. Our tag is designed to withstand the rigors of travel.
              </p>
            </section>

            <section id="protected">
              <h2 className="text-3xl font-semibold mb-4">Step 4: Travel with Peace of Mind</h2>
              <p>
                That&apos;s it! Your luggage is now protected. If it gets lost, the finder can scan the tag and contact you via our secure system. Your personal data remains hidden.
              </p>
            </section>
          </div>

          <CtaSection 
            title="Ready to Get Started?"
            description="It's that simple to make your travels more secure. Get your Bag-Tag now and experience the difference."
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
