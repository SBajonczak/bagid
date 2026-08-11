import { Metadata } from 'next';
import { Helmet } from 'react-helmet-async';
import Link from 'next/link';
import { getRelatedLinks } from '@/lib/relatedLinks';

export const metadata: Metadata = {
  title: 'Digital Luggage Tag Manual: Complete NFC & QR Guide 2026',
  description: 'Step-by-step manual for digital luggage tags. Setup NFC & QR codes, manage contact info, privacy settings & troubleshooting. Beginner-friendly guide with videos.',
  keywords: 'digital luggage tag manual, NFC luggage tag setup, QR luggage tag guide, smart luggage tag tutorial, NFC tag instructions',
  openGraph: {
    title: 'Digital Luggage Tag Manual: Complete NFC & QR Guide 2026',
    description: 'Step-by-step manual for setting up and using digital luggage tags. NFC & QR code setup, privacy settings, troubleshooting tips.',
    url: 'https://bag-tag.de/en/guides/digital-luggage-tag-manual',
    siteName: 'Bag-Tag',
    locale: 'en_US',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bag-tag.de/en/guides/digital-luggage-tag-manual',
    languages: {
      'de': 'https://bag-tag.de/de/ratgeber/digitaler-gepaeckanhaenger-anleitung',
      'en': 'https://bag-tag.de/en/guides/digital-luggage-tag-manual',
      'x-default': 'https://bag-tag.de/en/guides/digital-luggage-tag-manual',
    },
  },
};

export default function DigitalLuggageTagManualPage() {
  const relatedLinks = getRelatedLinks('guideDigitalTagManual', 'en');

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <nav className="mb-8 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center space-x-2">
          <li><Link href="/en" className="hover:text-[#0FA4AF]">Home</Link></li>
          <li>/</li>
          <li><Link href="/en/guides" className="hover:text-[#0FA4AF]">Guides</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium">Digital Luggage Tag Manual</li>
        </ol>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Digital Luggage Tag Manual: Complete NFC & QR Guide 2026
        </h1>
        <div className="flex flex-wrap items-center text-gray-600 text-sm mb-6 space-x-4">
          <time dateTime="2024-01-15">January 15, 2024</time>
          <span>•</span>
          <span>By Bag-Tag Editorial Team</span>
        </div>
        <p className="text-xl text-gray-700">
          Complete step-by-step manual for digital luggage tags. Learn how to set up NFC and QR codes, manage contact information, configure privacy settings, and troubleshoot common issues.
        </p>
      </header>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">What is a Digital Luggage Tag?</h2>
          <p className="mb-4">
            A <strong>digital luggage tag</strong> combines NFC (Near Field Communication) and QR code technology to store your contact information electronically. When someone finds your lost luggage, they simply scan the tag with their smartphone to see your contact details - no app installation required.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Key Benefits:</h3>
            <ul className="list-disc pl-6">
              <li><strong>Battery-free:</strong> Works indefinitely without power</li>
              <li><strong>Universal compatibility:</strong> Works with 95% of smartphones</li>
              <li><strong>Instant contact:</strong> Finder sees your info immediately</li>
              <li><strong>Privacy-friendly:</strong> You control what information is shared</li>
              <li><strong>Waterproof & durable:</strong> Withstands luggage handling</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Step-by-Step Setup Guide</h2>
          
          <h3 className="text-2xl font-semibold mb-4">Step 1: Unboxing & Inspection</h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-3">Your digital luggage tag package should include:</p>
            <ul className="list-disc pl-6">
              <li>1x NFC/QR luggage tag</li>
              <li>1x Secure attachment strap or holder</li>
              <li>1x Quick start guide with activation URL</li>
              <li>Optional: Backup activation card</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              💡 <strong>Tip:</strong> Check the tag for any physical damage before activation.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Step 2: Initial Activation</h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Locate the activation URL:</strong> Find the URL printed on your quick start guide (e.g., bag-tag.de/activate)
              </li>
              <li>
                <strong>Open on smartphone:</strong> Visit the URL on your iPhone or Android device
              </li>
              <li>
                <strong>Enter tag ID:</strong> Input the unique ID printed on your tag (format: BT-XXXXXX)
              </li>
              <li>
                <strong>Create account:</strong> Provide your email address to manage your tag (optional but recommended)
              </li>
              <li>
                <strong>Verify activation:</strong> You'll receive a confirmation email
              </li>
            </ol>
            <p className="mt-4 text-sm bg-yellow-50 border-l-4 border-yellow-400 p-3">
              ⚠️ <strong>Important:</strong> Keep your activation code secure. It's needed to reclaim or transfer ownership.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Step 3: Add Your Contact Information</h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-3"><strong>Required Information:</strong></p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Name:</strong> Full name or initials (your choice)</li>
              <li><strong>Phone:</strong> Primary contact number with country code</li>
              <li><strong>Email:</strong> Alternative contact method</li>
            </ul>

            <p className="mb-3"><strong>Optional Information:</strong></p>
            <ul className="list-disc pl-6 mb-4">
              <li>Secondary phone number</li>
              <li>Hotel/accommodation during travel</li>
              <li>Emergency contact</li>
              <li>Return address</li>
              <li>Preferred contact method</li>
              <li>Languages spoken</li>
            </ul>

            <div className="bg-green-50 p-4 rounded mt-4">
              <p className="font-semibold mb-2">🔒 Privacy Best Practices:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Use mobile phone instead of home phone while traveling</li>
                <li>Consider using initials instead of full name</li>
                <li>Add hotel address only when traveling</li>
                <li>Update info before each trip</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Step 4: Test Your Tag</h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-3"><strong>NFC Testing (iPhone/Android):</strong></p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Hold your smartphone's back near the tag (within 2cm/1 inch)</li>
              <li>Wait for vibration or notification (1-2 seconds)</li>
              <li>Tap the notification to view contact page</li>
              <li>Verify all information displays correctly</li>
            </ol>

            <p className="mb-3"><strong>QR Code Testing:</strong></p>
            <ol className="list-decimal pl-6">
              <li>Open your phone's camera app</li>
              <li>Point camera at the QR code</li>
              <li>Tap the popup notification</li>
              <li>Verify contact page loads</li>
            </ol>

            <p className="mt-4 text-sm text-gray-600">
              💡 <strong>Troubleshooting:</strong> If NFC doesn't work, ensure NFC is enabled in phone settings and no metal case blocks the signal.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Step 5: Attach to Luggage</h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-3"><strong>Attachment Best Practices:</strong></p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Location:</strong> Attach to the external handle for maximum visibility</li>
              <li><strong>Positioning:</strong> Ensure QR code and NFC area are unobstructed</li>
              <li><strong>Security:</strong> Double-check strap/holder tightness</li>
              <li><strong>Visibility:</strong> Tag should be immediately noticeable</li>
              <li><strong>Accessibility:</strong> Easy to scan without removing</li>
            </ul>

            <div className="bg-yellow-50 p-4 rounded mt-4">
              <p className="text-sm">
                ⚠️ <strong>Avoid:</strong> Attaching to zippers or areas that experience friction, which can cause premature wear.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Advanced Features & Settings</h2>
          
          <h3 className="text-2xl font-semibold mb-4">Privacy Modes</h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-3">Most digital luggage tags offer different privacy levels:</p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold">🟢 Full Public Mode</p>
                <p className="text-sm">Shows all contact information to anyone who scans. Best for lost luggage recovery.</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-semibold">🟡 Controlled Mode</p>
                <p className="text-sm">Shows limited info initially. Finder must click "Contact Owner" to reveal full details (you get notification).</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">🔵 Message-Only Mode</p>
                <p className="text-sm">Finder can send you a message without seeing your contact details. You decide whether to respond.</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Travel Mode</h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-3">Activate travel mode to:</p>
            <ul className="list-disc pl-6">
              <li>Temporarily display hotel/accommodation address</li>
              <li>Add expected return date</li>
              <li>Include flight information (optional)</li>
              <li>Enable "Currently Traveling" status</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              💡 Remember to deactivate travel mode when you return home!
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Notification Settings</h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-3">Configure notifications for:</p>
            <ul className="list-disc pl-6">
              <li><strong>Scan alerts:</strong> Get notified every time your tag is scanned</li>
              <li><strong>Location tracking:</strong> See approximate location of scans (if enabled)</li>
              <li><strong>Message alerts:</strong> Instant notifications when finder contacts you</li>
              <li><strong>Battery reminders:</strong> N/A for NFC tags (battery-free!)</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Troubleshooting Common Issues</h2>
          
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">❌ Problem: NFC Not Scanning</h3>
              <p className="font-semibold mb-2">Solutions:</p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li><strong>Enable NFC:</strong> iPhone: automatic | Android: Settings → Connected devices → Connection preferences → NFC</li>
                <li><strong>Remove phone case:</strong> Metal or thick cases can block NFC signals</li>
                <li><strong>Positioning:</strong> Hold phone's NFC antenna (usually center-back) directly over tag</li>
                <li><strong>Clean tag surface:</strong> Dirt or moisture can interfere</li>
                <li><strong>Try QR code:</strong> Always works as backup method</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">❌ Problem: Contact Info Not Updating</h3>
              <p className="font-semibold mb-2">Solutions:</p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Wait 5-10 minutes for changes to sync</li>
                <li>Clear browser cache and refresh</li>
                <li>Verify you're logged into correct account</li>
                <li>Check internet connection</li>
                <li>Re-scan tag to see latest version</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">❌ Problem: Tag Won't Activate</h3>
              <p className="font-semibold mb-2">Solutions:</p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Double-check tag ID is entered correctly (case-sensitive)</li>
                <li>Ensure tag hasn't been previously activated</li>
                <li>Try alternative activation method (QR code on packaging)</li>
                <li>Contact customer support with purchase proof</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">❌ Problem: QR Code Damaged/Unreadable</h3>
              <p className="font-semibold mb-2">Solutions:</p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Use NFC as primary method (doesn't degrade)</li>
                <li>Clean QR code with soft cloth</li>
                <li>Improve lighting when scanning</li>
                <li>If physically damaged, request replacement tag</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Maintenance & Care</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Regular Maintenance:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Before each trip:</strong> Test both NFC and QR code functionality</li>
              <li><strong>Update info:</strong> Verify contact details are current</li>
              <li><strong>Check attachment:</strong> Ensure strap/holder is secure</li>
              <li><strong>Clean tag:</strong> Wipe with damp cloth to remove dirt</li>
              <li><strong>Inspect for damage:</strong> Look for cracks, scratches, or fading</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Long-Term Care:</h3>
            <ul className="list-disc pl-6">
              <li>Store luggage in dry place when not traveling</li>
              <li>Avoid prolonged direct sunlight (can fade QR code)</li>
              <li>Don't bend or fold the tag</li>
              <li>Keep away from extreme temperatures</li>
              <li>Replace if NFC chip stops working (rare)</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">How long do digital luggage tags last?</h3>
              <p>
                NFC luggage tags have no battery and no moving parts, so they can last indefinitely with proper care. The QR code may fade after many years of sun exposure, but the NFC chip remains functional. Average lifespan is 10+ years.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">Can I update my information while traveling?</h3>
              <p>
                Yes! Changes sync immediately (within 5-10 minutes). Update your info from any smartphone or computer by logging into your account. Perfect for adding hotel addresses or changing phone numbers during trips.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">What if someone without NFC finds my luggage?</h3>
              <p>
                That's why tags include a visible QR code backup! 99% of modern smartphones can scan QR codes with the built-in camera app - no special app needed. The QR code and NFC chip link to the same contact information.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">Is my personal information secure?</h3>
              <p>
                Yes. Information is stored on secure servers with encryption. Only people who physically scan your tag can see your contact details. You can also use privacy modes to control what's displayed and receive notifications when your tag is scanned.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">Can I transfer the tag to a different suitcase?</h3>
              <p>
                Absolutely! The tag isn't linked to a specific suitcase - only to your account. Simply move it to any luggage piece. You can also register multiple tags to your account and manage them all from one dashboard.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">What happens if the tag is damaged?</h3>
              <p>
                Contact the manufacturer for a replacement. Most companies offer warranties covering manufacturing defects. If the NFC chip is damaged but QR code is readable, it still works as a regular luggage tag. Some services offer discounted replacement tags.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-[#0FA4AF] text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-3">Get Your Digital Luggage Tag</h3>
            <p className="mb-4">
              Ready to protect your luggage with smart NFC technology? Our premium digital luggage tags are GDPR-compliant, maintenance-free, and built to last.
            </p>
            <a
              href="https://bag-tag.de/en#shop"
              className="inline-block bg-white text-[#0FA4AF] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Shop Now →
            </a>
          </div>
        </section>

        {relatedLinks.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="p-4 border rounded-lg hover:border-[#0FA4AF] hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-lg mb-2">{link.title}</h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
