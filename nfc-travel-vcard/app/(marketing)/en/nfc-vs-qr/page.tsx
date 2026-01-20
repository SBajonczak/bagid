import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import CtaButton from '@/app/components/CtaButton';
import ComparisonTable from '@/app/components/ComparisonTable';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'NFC vs. QR Code: Which Technology is Better for Luggage Tags? | Bag-Tag';
  const description = 'Detailed comparison: NFC or QR code for your luggage tag? Learn the pros and cons of both technologies and why NFC is the superior choice for travelers.';
  const url = 'https://bag-tag.de/en/nfc-vs-qr';

  return {
    title,
    description,
    keywords: 'NFC vs QR code, luggage tag comparison, NFC technology, QR code luggage, smart travel tag, Bag-Tag comparison',
    authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'en_US',
      url,
      siteName: 'Bag-Tag',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        de: '/de/nfc-vs-qr',
        en: '/en/nfc-vs-qr',
      },
    },
  };
}

export default function NfcVsQrPage() {
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
        name: 'NFC vs. QR Code',
        item: 'https://bag-tag.de/en/nfc-vs-qr',
      },
    ],
  };

  // FAQ JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the main difference between NFC and QR codes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The main difference lies in how they are used: NFC works contactlessly by simply holding a smartphone close, while QR codes require a camera and must be actively scanned.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which technology is faster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NFC is significantly faster. Data transfer occurs in less than 1 second, while QR codes take 2-3 seconds to scan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does NFC work in poor lighting conditions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, NFC works independently of lighting conditions because it does not require optical recognition. QR codes, however, need good visibility and adequate light.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need an app for NFC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, modern smartphones (from iOS 13 and Android 5) support NFC by default without an additional app. QR codes sometimes require a separate scanner app.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8 text-gray-600">
            <Link href="/en" className="hover:text-blue-600">Home</Link>
            {' '}/{' '}
            <span className="text-gray-900">NFC vs. QR Code</span>
          </nav>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            NFC vs. QR Code: Which Technology is Better for Luggage Tags?
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            When buying a smart luggage tag, you face a choice: NFC or QR code? Both technologies 
            have their place, but for travelers, NFC offers decisive advantages. In this 
            comprehensive comparison, we&apos;ll show you why.
          </p>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              The Basics: What is NFC and What is a QR Code?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  NFC (Near Field Communication)
                </h3>
                <p className="text-gray-700 mb-3">
                  NFC is a wireless technology for contactless data transfer over short distances 
                  (about 4 cm). You know NFC from contactless payment with your credit card or 
                  smartphone.
                </p>
                <p className="text-gray-700">
                  <strong>How it works:</strong> Simply hold your smartphone near the NFC tag – 
                  done. No app, no scanning required.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  QR Code (Quick Response Code)
                </h3>
                <p className="text-gray-700 mb-3">
                  QR codes are two-dimensional barcodes that store information in a pixelated 
                  pattern. They are read optically with the smartphone camera.
                </p>
                <p className="text-gray-700">
                  <strong>How it works:</strong> Open camera, position QR code in viewfinder, 
                  scan, and click the link.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <ComparisonTable language="en" />

          {/* Detailed Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              The Advantages of NFC in Detail
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  1. Speed and Convenience
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  The biggest advantage of NFC is speed. While you need to open the camera with 
                  a QR code, focus, and wait for the code to be recognized, NFC only requires 
                  a quick tap of your smartphone. Data transfer happens in under one second.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  <strong>Airport scenario:</strong> You&apos;re standing at baggage claim with several 
                  suitcases. An employee finds your misplaced bag and wants to contact you. With 
                  NFC, they simply hold their smartphone close – no need to fumble with the camera 
                  or turn the suitcase around. Time is money at airports.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  2. Works Under Challenging Conditions
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  QR codes need good visibility and clean surfaces. In poor lighting, on dirty 
                  tags, or on wet surfaces, cameras often fail. NFC, however, works even when:
                </p>
                <ul className="list-disc pl-6 mb-4 text-lg text-gray-700 space-y-2">
                  <li>It&apos;s dark or lighting is poor</li>
                  <li>The tag is dirty</li>
                  <li>In rain or wet conditions</li>
                  <li>Even when the tag is partially covered</li>
                  <li>With gloves on (important in winter)</li>
                </ul>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  When traveling, luggage is often not in pristine condition. The robust NFC chip 
                  works reliably even after your tag has been through several airport conveyor belts.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  3. No App Required
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Modern smartphones (from iOS 13 and Android 5 onwards) support NFC by default 
                  without additional software. This isn&apos;t always the case with QR codes – older 
                  Android devices often need a separate scanner app.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  <strong>Important for finders:</strong> Whoever finds your luggage doesn&apos;t need 
                  to install or set up anything. Simply hold their smartphone close, and your 
                  contact information appears automatically.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  4. Better Security and Privacy
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  NFC tags can be encrypted and offer advanced security features. QR codes, 
                  however, are always publicly readable and can be more easily forged.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  With the Bag-Tag using NFC technology, you benefit from:
                </p>
                <ul className="list-disc pl-6 mb-4 text-lg text-gray-700 space-y-2">
                  <li>Protected data transmission</li>
                  <li>Verified authentication</li>
                  <li>Control over shared information</li>
                  <li>Protection against unauthorized copies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  5. Longevity and Maintenance-Free
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  QR codes can fade, scratch, or become unreadable over time. The NFC chip, 
                  however, is embedded in the tag and completely maintenance-free. No battery, 
                  no moving parts – simply functional for life.
                </p>
              </div>
            </div>
          </section>

          {/* QR Code Pros */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Do QR Codes Have Any Advantages?
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              To be fair, yes, QR codes do have their strengths.
            </p>
            <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-3">
              <li>
                <strong>Lower production cost:</strong> QR codes can simply be printed, while 
                NFC chips are more expensive to manufacture.
              </li>
              <li>
                <strong>Visible from a distance:</strong> You can see a QR code from several 
                meters away and know immediately that it&apos;s a scannable tag.
              </li>
              <li>
                <strong>Compatibility with older devices:</strong> Any smartphone with a camera 
                can read QR codes, while very old devices might not support NFC.
              </li>
            </ul>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              However, the disadvantages outweigh these benefits: QR codes are more vulnerable 
              to environmental factors, slower to scan, and less convenient to use.
            </p>
          </section>

          {/* Bag-Tag Solution */}
          <section className="mb-12 bg-green-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              The Bag-Tag Solution: Best of Both Worlds
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Why choose when you can have both? The Bag-Tag combines NFC technology with an 
              integrated QR code as a backup.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ✓ Primary: NFC for Maximum Convenience
                </h3>
                <p className="text-gray-700">
                  The main functionality runs via NFC – fast, simple, and reliable. Perfect 
                  for everyday use and modern smartphones.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ✓ Backup: QR Code as Fallback
                </h3>
                <p className="text-gray-700">
                  If a finder has an older device without NFC or has the NFC function disabled, 
                  they can simply fall back on the integrated QR code.
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-6">
              <strong>The result:</strong> Maximum compatibility with the best possible user 
              experience. You benefit from the speed and convenience of NFC but always have 
              a fallback option.
            </p>
          </section>

          <CtaButton language="en" className="my-8" />

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  What is the main difference between NFC and QR codes?
                </h3>
                <p className="text-gray-700">
                  The main difference lies in how they are used: NFC works contactlessly by 
                  simply holding a smartphone close, while QR codes require a camera and must 
                  be actively scanned.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Which technology is faster?
                </h3>
                <p className="text-gray-700">
                  NFC is significantly faster. Data transfer occurs in less than 1 second, 
                  while QR codes take 2-3 seconds to scan.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Does NFC work in poor lighting conditions?
                </h3>
                <p className="text-gray-700">
                  Yes, NFC works independently of lighting conditions because it does not 
                  require optical recognition. QR codes, however, need good visibility and 
                  adequate light.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Do I need an app for NFC?
                </h3>
                <p className="text-gray-700">
                  No, modern smartphones (from iOS 13 and Android 5) support NFC by default 
                  without an additional app. QR codes sometimes require a separate scanner app.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  What if my smartphone doesn&apos;t have NFC?
                </h3>
                <p className="text-gray-700">
                  The Bag-Tag also has a QR code as a backup. This ensures maximum compatibility, 
                  even with older devices.
                </p>
              </div>
            </div>
          </section>

          {/* Recommendation */}
          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Our Recommendation
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              For luggage tags, <strong>NFC is clearly the better choice</strong>. The combination 
              of speed, reliability, and convenience makes NFC the ideal technology for travelers.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              With a dual system like the Bag-Tag (NFC + QR code), you get the best of both 
              worlds: the superior NFC technology for normal use and a QR code as a fallback option.
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              Invest in quality and convenience – your future self will thank you.
            </p>
          </section>

          {/* Related Articles */}
          <section className="mb-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Continue Reading
            </h2>
            <ul className="space-y-3 text-lg">
              <li>
                <Link href="/en/nfc-luggage-tag" className="text-blue-600 hover:text-blue-800 hover:underline">
                  → NFC Luggage Tag – Your Smart Travel Companion
                </Link>
              </li>
              <li>
                <Link href="/en/prevent-luggage-loss" className="text-blue-600 hover:text-blue-800 hover:underline">
                  → Prevent Luggage Loss – 10 Expert Tips
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
