import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import CtaButton from '@/app/components/CtaButton';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Prevent Luggage Loss – 10 Expert Tips for Travelers | Bag-Tag';
  const description = 'Learn how to effectively prevent luggage loss while traveling. Expert tips for airports, airlines, and digital luggage identification to keep your bags safe.';
  const url = 'https://bag-tag.de/en/prevent-luggage-loss';

  return {
    title,
    description,
    keywords: 'prevent luggage loss, lost luggage, airport luggage, find lost baggage, travel tips, luggage identification, Bag-Tag',
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
        de: '/de/gepaeck-verlust-vermeiden',
        en: '/en/prevent-luggage-loss',
      },
    },
  };
}

export default function PreventLuggageLossPage() {
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
        name: 'Prevent Luggage Loss',
        item: 'https://bag-tag.de/en/prevent-luggage-loss',
      },
    ],
  };

  // Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Prevent Luggage Loss – 10 Expert Tips for Travelers',
    description: 'Practical tips and strategies to prevent luggage loss while traveling.',
    author: {
      '@type': 'Organization',
      name: 'Bag-Tag',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bag-Tag',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bag-tag.de/assets/icon_32_32.png',
      },
    },
    datePublished: '2024-01-15',
    dateModified: '2024-01-15',
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8 text-gray-600">
            <Link href="/en" className="hover:text-blue-600">Home</Link>
            {' '}/{' '}
            <span className="text-gray-900">Prevent Luggage Loss</span>
          </nav>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Prevent Luggage Loss – 10 Expert Tips for Travelers
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Every year, millions of bags go missing or are misrouted at airports worldwide. 
            The good news: with the right strategies, you can drastically reduce the risk. 
            Here are our proven expert tips for stress-free travel.
          </p>

          {/* Statistics */}
          <section className="mb-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              The Numbers Tell the Story
            </h2>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>→ <strong>26 million</strong> bags are lost worldwide each year</li>
              <li>→ <strong>5.57 per 1,000 passengers</strong> experience luggage loss</li>
              <li>→ Only <strong>81%</strong> are recovered within 48 hours</li>
              <li>→ Average wait time: <strong>1.2 days</strong></li>
            </ul>
            <p className="text-gray-700 mt-4 italic">
              Source: SITA Baggage IT Insights Report
            </p>
          </section>

          {/* Main Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              10 Practical Tips to Prevent Luggage Loss
            </h2>

            <div className="space-y-8">
              {/* Tip 1 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  1. Make Your Luggage Stand Out
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Black and dark blue suitcases all look the same. Make your luggage unmistakable with:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Colorful luggage straps or stickers</li>
                  <li>Eye-catching luggage tags in bright colors</li>
                  <li>Unique markings (but no personal address on the outside!)</li>
                  <li>A <Link href="/en/nfc-luggage-tag" className="text-blue-600 hover:underline">smart NFC luggage tag</Link> for digital identification</li>
                </ul>
                <p className="text-lg text-gray-700 mt-3 leading-relaxed">
                  <strong>Pro tip:</strong> Take a photo of your suitcase before each trip. 
                  This way you can describe it accurately if it gets lost.
                </p>
              </div>

              {/* Tip 2 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  2. Use Modern Digital Luggage Identification
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Paper tags can tear off or become illegible. Digital solutions like NFC tags 
                  are more robust and reliable:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Contact details always stay current (updatable online)</li>
                  <li>Works even when wet or dirty</li>
                  <li>No tearing or fading</li>
                  <li>Quick identification by airport staff</li>
                  <li>GDPR-compliant – only you control your data</li>
                </ul>
                <p className="text-lg text-gray-700 mt-3 leading-relaxed">
                  The Bag-Tag combines NFC technology with a traditional QR code for maximum compatibility.
                </p>
              </div>

              {/* Tip 3 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  3. Remove Old Luggage Tags and Barcode Stickers
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Old barcode stickers from previous flights confuse the automatic sorting systems 
                  at airports. This is one of the main causes of misrouting.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Rule:</strong> Before each flight, remove all old stickers, barcodes, 
                  and luggage tags. Only the current tag should be visible.
                </p>
              </div>

              {/* Tip 4 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  4. Allow Sufficient Connection Time
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Most luggage is lost during tight connection flights. Your suitcase simply 
                  doesn&apos;t make the transfer in time.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Recommendation:</strong> At least 90 minutes connection time for 
                  international flights, 60 minutes for domestic flights. At large airports 
                  like Frankfurt or Munich, plan for 2 hours.
                </p>
              </div>

              {/* Tip 5 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  5. Check In Early
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  The earlier you check in, the more time the airline has to correctly load 
                  your luggage. Last-minute check-ins are a common reason for luggage loss.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Best practice:</strong> Check in online and arrive at the airport 
                  at least 2 hours before departure. For international flights, 3 hours.
                </p>
              </div>

              {/* Tip 6 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  6. Pack Valuables and Essentials in Carry-On
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Even with all precautions, luggage can get lost. Protect yourself by 
                  carrying essentials with you:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Medications and important documents</li>
                  <li>Change of clothes for at least one day</li>
                  <li>Electronics and charging cables</li>
                  <li>Valuables and jewelry</li>
                  <li>Business materials for important meetings</li>
                </ul>
              </div>

              {/* Tip 7 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  7. Photograph Your Luggage Contents
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Before closing your suitcase, take photos of the contents. This helps 
                  tremendously with:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Insurance claims</li>
                  <li>Describing contents if lost</li>
                  <li>Evidence in case of damage</li>
                </ul>
              </div>

              {/* Tip 8 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  8. Choose Direct Flights When Possible
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Statistically speaking: the more connections, the higher the risk. Direct 
                  flights reduce the likelihood of luggage loss by up to 70%.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  When possible, book direct flights – especially for important business trips 
                  or with valuable luggage.
                </p>
              </div>

              {/* Tip 9 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  9. Know Your Rights
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Understand your rights regarding luggage loss:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Airlines must pay for necessities (EU: up to 1,131 Special Drawing Rights ≈ €1,400)</li>
                  <li>You are entitled to compensation for permanent loss</li>
                  <li>Report luggage loss immediately at the counter – not later at the hotel</li>
                  <li>Keep all receipts (boarding pass, PIR number)</li>
                </ul>
              </div>

              {/* Tip 10 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  10. Invest in Luggage Insurance
                </h3>
                <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                  Good travel insurance with luggage protection costs little and protects 
                  against major losses. Check whether:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Your credit card already offers luggage protection</li>
                  <li>Your home insurance also covers travel luggage</li>
                  <li>Separate travel luggage insurance makes sense (especially for valuable contents)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How Airlines Handle Luggage */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              How Airlines Handle Lost Luggage
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Understanding the process helps you identify where risks lie:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Your Luggage&apos;s Journey
              </h3>
              <ol className="list-decimal pl-6 space-y-3 text-lg text-gray-700">
                <li>
                  <strong>Check-in:</strong> Your suitcase receives a barcode with destination 
                  airport and flight number
                </li>
                <li>
                  <strong>Sorting:</strong> Automatic systems read the barcode and route the 
                  suitcase to the correct gate
                </li>
                <li>
                  <strong>Loading:</strong> Ground crew loads the luggage onto the aircraft
                </li>
                <li>
                  <strong>Transfer (when connecting):</strong> Luggage is reloaded – this is 
                  where most errors occur
                </li>
                <li>
                  <strong>Arrival:</strong> Suitcase is placed on baggage carousel
                </li>
              </ol>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              What Happens When Luggage Is Lost?
            </h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              When your suitcase doesn&apos;t arrive, the airline initiates a search in the <strong>WorldTracer</strong> 
              system – a global database for lost luggage. The better your suitcase can be 
              identified (through unique features, photos, and digital tags), the faster it 
              will be found.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              <strong>This is where Bag-Tag helps:</strong> Airport staff can scan your NFC tag 
              and contact you immediately – without a lengthy database search.
            </p>
          </section>

          {/* Digital Identification Advantages */}
          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              The Advantages of Digital Luggage Identification
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Traditional paper tags are outdated. Modern digital solutions offer crucial advantages:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ⚡ Faster Recovery
                </h3>
                <p className="text-gray-700">
                  NFC tags can be scanned in seconds – no camera, no app required. Airport 
                  staff identify your luggage instantly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🔒 Better Privacy
                </h3>
                <p className="text-gray-700">
                  Your full address isn&apos;t publicly visible. You control what information is shared.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  🔄 Always Current
                </h3>
                <p className="text-gray-700">
                  Update your contact details online – no need to fill out a new tag. Perfect 
                  for frequent travelers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  💪 Robust and Durable
                </h3>
                <p className="text-gray-700">
                  Waterproof, shockproof, and battery-free. Works for life – regardless of 
                  weather and transport conditions.
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
              The <Link href="/en/nfc-luggage-tag" className="text-blue-600 hover:underline font-semibold">Bag-Tag NFC luggage tag</Link> combines 
              all these advantages in a compact, elegant design.
            </p>
          </section>

          <CtaButton language="en" className="my-8" />

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Conclusion: Prevention Equals Stress-Free Travel
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Luggage loss is frustrating, but in most cases it&apos;s preventable. With the right 
              precautions – from distinctive markings to digital identification to smart travel 
              planning – you can significantly reduce the risk.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Invest in quality: a good luggage tag is a one-time purchase that provides years 
              of security. The Bag-Tag combines cutting-edge NFC technology with traditional 
              QR code functionality – for maximum compatibility and reliability.
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              Protect your luggage – for relaxed travel without unpleasant surprises.
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
                <Link href="/en/nfc-vs-qr" className="text-blue-600 hover:text-blue-800 hover:underline">
                  → NFC vs. QR Code: The Complete Comparison
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
