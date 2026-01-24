import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { 
  TldrSection, 
  ContentFaqSection,
  RelatedLinksSection, 
  CtaSection,
  Breadcrumb 
} from '@/app/components/ContentComponents';
import { getRelatedLinks } from '@/lib/linkMap';
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/schema-utils';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Security & Privacy – Bag-Tag GDPR Compliant | Bag-Tag';
  const description = 'Learn how Bag-Tag protects your data: GDPR compliant, servers in Germany, full control over your privacy. Maximum security for your luggage.';
  const url = 'https://bag-tag.de/en/security-privacy';

  return {
    title,
    description,
    keywords: 'Bag-Tag privacy, GDPR luggage tag, NFC tag security, data security travel, GDPR compliant',
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
          alt: 'Bag-Tag Security and Privacy',
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
        de: '/de/sicherheit-datenschutz',
        en: '/en/security-privacy',
        'x-default': '/de/sicherheit-datenschutz',
      },
    },
  };
}

export default function SecurityPrivacyPage() {
  const relatedLinks = getRelatedLinks('security-privacy', 'en');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://bag-tag.de/en' },
    { name: 'Security & Privacy', url: 'https://bag-tag.de/en/security-privacy' },
  ];

  const faqItems = [
    {
      question: 'Where is my data stored?',
      answer: 'All data is stored on servers in Germany and is subject to strict German and European data protection laws (GDPR). We work exclusively with certified data centers in the EU.',
    },
    {
      question: 'What data is stored at all?',
      answer: 'We only store the data you voluntarily enter: name, contact details (email, optional phone), travel dates (optional), and luggage description. You decide which information you want to provide.',
    },
    {
      question: 'Who can see my data?',
      answer: 'Only people who scan your physical Bag-Tag can see the contact page – and only the information you have explicitly shared. Bag-Tag employees do not have access to your personal messages.',
    },
    {
      question: 'Can I delete my data at any time?',
      answer: 'Yes, absolutely. You can completely delete your account and all associated data at any time. After deletion, your tag will no longer be functional until you re-register it.',
    },
    {
      question: 'What happens if someone finds my tag and misuses it?',
      answer: 'The finder only sees the shared contact information – no sensitive data such as address or bank details. You can report suspicious activity, and we can temporarily block access to the tag.',
    },
    {
      question: 'Is my data shared with third parties?',
      answer: 'No, never. We do not sell or share your data with third parties. The only exception: if a finder scans your tag, they will see the contact information you have shared.',
    },
    {
      question: 'Is the communication with the finder encrypted?',
      answer: 'Yes, all messages are transmitted via HTTPS. Communication runs through our secure servers, so your email address remains protected.',
    },
    {
      question: 'What about children? Is their data specially protected?',
      answer: 'Yes, special protective measures apply to tags for children under 16. Parents control all settings, and less information is automatically displayed.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = generateFAQPageSchema(faqItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <main className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumb items={breadcrumbItems} />

          <h1 className="text-4xl font-bold mb-6">Security & Privacy: Your Data is Safe With Us</h1>
          <p className="text-lg mb-8">
            Your trust is important to us. That's why we do everything to protect your data and give you full control over your privacy. Here you can find out everything about our security standards.
          </p>

          <TldrSection
            title="Your Security at a Glance"
            points={[
              'GDPR compliant: Strict adherence to European data protection laws.',
              'Server location Germany: Your data is stored securely in the EU.',
              'You have control: You decide what is visible.',
              'No tracking: We do not create movement profiles.',
              'Encrypted communication: Secure exchange with the finder.',
            ]}
          />

          <div className="space-y-12 my-12">
            <section>
              <h2 className="text-3xl font-semibold mb-4">Our Philosophy: Data Economy & Transparency</h2>
              <p>
                We only collect the data that is absolutely necessary for the function of the Bag-Tag. You can use our service with a minimum of information. All settings are transparent and easy to understand.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">Full Control for You</h2>
              <p>
                In your dashboard, you can specify exactly which contact options should be displayed. Do you only want to be reachable by email? No problem. Do you want to add a phone number? You can do that with one click. You are the master of your data.
              </p>
            </section>
          </div>

          <ContentFaqSection title='Frequently asked questions' faqs={faqItems} />

          <CtaSection 
            title="Ready for a Secure Journey?"
            description="Rely on the highest security standards and travel with peace of mind. Get your Bag-Tag now."
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
