/**
 * Site Configuration
 * Central configuration for SEO, URLs, and site metadata
 */

export const siteConfig = {
  // Canonical domain (without www)
  siteUrl: 'https://bag-tag.de',
  
  // Site metadata
  siteName: 'Bag-Tag.de',
  defaultTitle: 'Bag-Tag.de | Smarte NFC Gepäckanhänger für sicheres Reisen',
  defaultDescription: 'Innovative NFC Gepäckanhänger zum schnellen Auffinden verlorenen Gepäcks. Moderne Reisebegleiter mit kontaktloser NFC-Technologie für alle Koffer und Taschen.',
  
  // Social & Images
  ogImage: '/assets/productimage.webp',
  twitterHandle: '@bagtag', // Update with actual handle if available
  
  // Supported languages
  languages: ['de', 'en', 'nl'] as const,
  defaultLanguage: 'de' as const,
  
  // Organization info for JSON-LD
  organization: {
    name: 'Bag-Tag.de',
    legalName: 'Bag-Tag.de',
    url: 'https://bag-tag.de',
    logo: 'https://bag-tag.de/assets/tag.png',
    description: 'Anbieter von smarten NFC Gepäckanhängern für sicheres Reisen',
    email: 'info@bag-tag.de', // Update with actual email
    foundingDate: '2020', // Update with actual date if known
    address: {
      streetAddress: '', // Add if available
      addressLocality: '', // Add if available
      addressRegion: '', // Add if available
      postalCode: '', // Add if available
      addressCountry: 'DE'
    },
    sameAs: [
      // Add social media profiles if available
      // 'https://www.facebook.com/bagtag',
      // 'https://www.instagram.com/bagtag',
      // 'https://twitter.com/bagtag'
    ]
  },
  
  // Product info
  product: {
    name: 'NFC Bag Tag',
    price: '12.99',
    currency: 'EUR',
    availability: 'https://schema.org/InStock',
    buyUrl: 'https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web'
  }
} as const;

export type SiteConfig = typeof siteConfig;
export type SupportedLanguage = typeof siteConfig.languages[number];
