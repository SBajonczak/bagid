import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import CtaButton from '@/app/components/CtaButton';
import ColorSelector from '@/app/components/ColorSelector';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'NFC Luggage Tag – Bag-Tag | From €10.99 | No App Required';
  const description = 'Smart NFC & QR-code luggage tag for €10.99. No app needed, no batteries. Finders can contact you instantly – worldwide. GDPR-compliant. Order now.';
  const url = 'https://bag-tag.de/en/nfc-luggage-tag';

  return {
    title,
    description,
    keywords: [
      'NFC luggage tag',
      'smart luggage tag',
      'digital luggage tag',
      'contactless luggage tag',
      'QR code luggage tag',
      'lost luggage tracker',
      'NFC bag tag',
      'luggage tag no app',
      'Bag-Tag NFC',
    ],
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
          alt: 'Bag-Tag NFC Luggage Tag – smart bag tag with NFC and QR-code from €10.99',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://bag-tag.de/assets/productimage.webp'],
      site: '@bag_tag',
    },
    alternates: {
      canonical: url,
      languages: {
        de: 'https://bag-tag.de/de/nfc-gepaeckanhaenger',
        en: 'https://bag-tag.de/en/nfc-luggage-tag',
        'x-default': 'https://bag-tag.de/de/nfc-gepaeckanhaenger',
      },
    },
  };
}

export default function NfcLuggageTagPage() {
  // Product JSON-LD
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'NFC Luggage Tag',
    brand: {
      '@type': 'Brand',
      name: 'Bag-Tag',
    },
    description: 'Smart NFC luggage tag with QR code for safe travel. No app required, GDPR-compliant, waterproof.',
    image: 'https://bag-tag.de/assets/productimage.webp',
    offers: {
      '@type': 'Offer',
      url: 'https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc',
      priceCurrency: 'EUR',
      price: '10.99',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Kreativschicht.de',
      },
    },
  };

  // FAQ JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an NFC luggage tag?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An NFC luggage tag is a smart travel tag that uses Near Field Communication (NFC) technology to store your contact information digitally. When someone taps their smartphone against the tag, your information is instantly displayed – no app required.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does NFC technology work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NFC stands for Near Field Communication and enables contactless data transfer over short distances (about 4 cm). Simply hold your smartphone near the tag, and the stored information is automatically displayed. Almost all modern smartphones support NFC out of the box.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the NFC luggage tag safe and privacy-compliant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, absolutely. The Bag-Tag is GDPR-compliant. You decide what information you want to store. There is no tracking, and your data remains under your control. Only the person who scans the tag can see the information you have shared.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need an app for the NFC luggage tag?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, you do not need a special app. The NFC function is integrated by default in modern smartphones (from iOS 13 and Android 5). Additionally, the Bag-Tag has a QR code as a backup solution.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is the NFC luggage tag suitable for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bag-Tag is perfect for business travelers, families, frequent flyers, and anyone who travels regularly. It is especially practical at airports, where luggage can easily be mixed up or lost. It is also ideal for group trips.',
        },
      },
      {
        '@type': 'Question',
        name: 'How durable is the NFC luggage tag?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bag-Tag is waterproof, shockproof, and designed for the rigors of travel. It withstands extreme temperatures and works reliably even when wet or dirty.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to charge the NFC luggage tag?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, the Bag-Tag does not require a battery and does not need to be charged. NFC technology is passive and is powered by the finder\'s smartphone. This means it works for life without maintenance.',
        },
      },
    ],
  };

  // Breadcrumb JSON-LD
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NFC Luggage Tag',
        item: 'https://bag-tag.de/en/nfc-luggage-tag',
      },
    ],
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8 text-gray-600">
            <Link href="/en" className="hover:text-blue-600">Home</Link>
            {' '}/{' '}
            <span className="text-gray-900">NFC Luggage Tag</span>
          </nav>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            NFC Luggage Tag – Your Smart Travel Companion
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Lost luggage is a thing of the past. With the Bag-Tag NFC luggage tag, you combine 
            cutting-edge technology with maximum convenience. Contactless, secure, and simple – 
            for stress-free travel worldwide.
          </p>

          <CtaButton language="en" className="my-8" />

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              What is an NFC Luggage Tag?
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              An NFC luggage tag is the modern alternative to traditional luggage tags. While 
              conventional tags only display static information on paper, the Bag-Tag stores 
              your contact details digitally. Thanks to Near Field Communication (NFC), finders 
              can identify your luggage with a simple smartphone tap – no special app or 
              complicated setup required.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              The technology is the same one you already know from contactless payment. Almost 
              all modern smartphones (from iOS 13 and Android 5 onwards) support NFC by default. 
              As an extra safety measure, the Bag-Tag also features a QR code that works with 
              any smartphone camera.
            </p>
          </section>

          {/* Why NFC is Better */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Why NFC Luggage Tags Are Better Than Traditional Tags
            </h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              1. Contactless Technology
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              No more fumbling with paper inserts or deciphering smudged handwriting. The finder 
              simply holds their smartphone near the Bag-Tag and instantly receives all important 
              information. It takes less than a second and works even with gloves or in poor lighting.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              2. Always Up-to-Date – Change Anytime
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              New phone number? Different email address? With traditional luggage tags, you would 
              need to fill everything out again. With the Bag-Tag, you simply update your 
              information online in your account – and it&apos;s immediately current. Perfect for 
              frequent travelers and business professionals who need to adjust their contact 
              details flexibly.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              3. Maximum Privacy Protection
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Unlike traditional luggage tags where your address and phone number are visible 
              to everyone, with the Bag-Tag you control exactly what information is displayed. 
              No tracking, no advertising, no data sharing. GDPR-compliant and 100% under your control.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              4. Robust and Long-Lasting
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The Bag-Tag is waterproof, shockproof, and withstands extreme conditions. No battery 
              that needs replacing. No fragile paper inserts that tear or fade. Buy once, use for life.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              5. International Compatibility
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              NFC works worldwide without language barriers. Whether in Tokyo, New York, or Paris – 
              every modern smartphone can read your Bag-Tag. The user interface is multilingual 
              and intuitively understandable.
            </p>
          </section>

          {/* Security and Privacy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Security & Privacy: Your Data Stays Private
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Privacy matters to us. The Bag-Tag was developed according to German data protection 
              standards and is fully GDPR-compliant. Unlike GPS trackers or app-based solutions, 
              there is no permanent tracking of your luggage.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              <strong>How privacy works with the Bag-Tag:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
              <li>
                <strong>You decide:</strong> What information is stored on the tag is determined 
                solely by you. Minimal details are sufficient – more is optional.
              </li>
              <li>
                <strong>No tracking:</strong> The tag does not send location data. Only when 
                someone actively scans the tag is information displayed.
              </li>
              <li>
                <strong>Secure notification:</strong> When your luggage is found and the finder 
                contacts you, you receive a notification – but your full address remains protected.
              </li>
              <li>
                <strong>No sharing:</strong> Your data is never sold to third parties or used 
                for advertising purposes. It is securely stored on German servers.
              </li>
              <li>
                <strong>Deletable at any time:</strong> You can completely delete your account 
                and all data at any time.
              </li>
            </ul>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              This combination of functionality and privacy makes the Bag-Tag the ideal choice 
              for security-conscious travelers.
            </p>
          </section>

          {/* Use Cases */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Perfect for Every Use Case
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🧳 Business Travel
                </h3>
                <p className="text-gray-700">
                  Frequent travelers appreciate the quick identification at baggage claim and 
                  the ability to adjust contact details based on destination. Ideal for 
                  international meetings and conferences.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  👨‍👩‍👧‍👦 Family Vacations
                </h3>
                <p className="text-gray-700">
                  Multiple suitcases for the whole family? No problem. Each Bag-Tag can be 
                  individually configured, and you keep track of all your luggage pieces.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ✈️ Airports & Airlines
                </h3>
                <p className="text-gray-700">
                  Airports are where most luggage gets lost. With an NFC tag, airport staff 
                  can contact you immediately when your suitcase turns up – no long waits at 
                  Lost & Found.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🏕️ Outdoor & Adventure
                </h3>
                <p className="text-gray-700">
                  Camping, trekking, or festivals – wherever lots of luggage is on the move, 
                  the waterproof and robust Bag-Tag helps you recover your gear.
                </p>
              </div>
            </div>
          </section>

          {/* Why Bag-Tag Section */}
          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Why Choose Bag-Tag?
            </h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>No app required:</strong> Works with any modern smartphone out-of-the-box</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Lifetime use:</strong> No battery, no ongoing costs, no subscriptions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>GDPR-compliant:</strong> Developed and hosted in Germany according to the highest data protection standards</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Waterproof & robust:</strong> Withstands extreme conditions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Dual technology:</strong> NFC + QR code for maximum compatibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Easy management:</strong> Update your data online at any time</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span><strong>Fast identification:</strong> Readable in under 1 second</span>
              </li>
            </ul>
          </section>

          <ColorSelector language="en" />

          <CtaButton language="en" className="my-8" />

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Frequently Asked Questions (FAQ)
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  What is an NFC luggage tag?
                </h3>
                <p className="text-gray-700">
                  An NFC luggage tag is a smart travel tag that uses Near Field Communication (NFC) 
                  technology to store your contact information digitally. When someone taps their 
                  smartphone against the tag, your information is instantly displayed – no app required.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  How does NFC technology work?
                </h3>
                <p className="text-gray-700">
                  NFC stands for Near Field Communication and enables contactless data transfer 
                  over short distances (about 4 cm). Simply hold your smartphone near the tag, 
                  and the stored information is automatically displayed. Almost all modern 
                  smartphones support NFC out of the box.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Is the NFC luggage tag safe and privacy-compliant?
                </h3>
                <p className="text-gray-700">
                  Yes, absolutely. The Bag-Tag is GDPR-compliant. You decide what information 
                  you want to store. There is no tracking, and your data remains under your 
                  control. Only the person who scans the tag can see the information you have shared.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Do I need an app for the NFC luggage tag?
                </h3>
                <p className="text-gray-700">
                  No, you do not need a special app. The NFC function is integrated by default 
                  in modern smartphones (from iOS 13 and Android 5). Additionally, the Bag-Tag 
                  has a QR code as a backup solution.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Who is the NFC luggage tag suitable for?
                </h3>
                <p className="text-gray-700">
                  The Bag-Tag is perfect for business travelers, families, frequent flyers, and 
                  anyone who travels regularly. It is especially practical at airports, where 
                  luggage can easily be mixed up or lost. It is also ideal for group trips.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  How durable is the NFC luggage tag?
                </h3>
                <p className="text-gray-700">
                  The Bag-Tag is waterproof, shockproof, and designed for the rigors of travel. 
                  It withstands extreme temperatures and works reliably even when wet or dirty.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Do I need to charge the NFC luggage tag?
                </h3>
                <p className="text-gray-700">
                  No, the Bag-Tag does not require a battery and does not need to be charged. 
                  NFC technology is passive and is powered by the finder&apos;s smartphone. This means 
                  it works for life without maintenance.
                </p>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Continue Reading
            </h2>
            <ul className="space-y-3 text-lg">
              <li>
                <Link href="/en/nfc-vs-qr" className="text-blue-600 hover:text-blue-800 hover:underline">
                  → NFC vs. QR Code: The Complete Comparison
                </Link>
              </li>
              <li>
                <Link href="/en/prevent-luggage-loss" className="text-blue-600 hover:text-blue-800 hover:underline">
                  → Prevent Luggage Loss – 10 Expert Tips for Travelers
                </Link>
              </li>
            </ul>
          </section>

          <CtaButton language="en" className="my-12" />
        </article>
      </div>
    </>
  );
}
