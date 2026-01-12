import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./components/AuthProvider";

export const metadata: Metadata = {
  title: "Bag-Tag.de | Smarte NFC Gepäckanhänger für sicheres Reisen",
  description: "Innovative NFC Gepäckanhänger zum schnellen Auffinden verlorenen Gepäcks. Moderne Reisebegleiter mit kontaktloser NFC-Technologie für alle Koffer und Taschen.",
  keywords: "NFC Gepäckanhänger, Kofferanhänger, Gepäck ID, verlorenes Gepäck, Reisezubehör, Koffer Tag, kontaktlose Technologie, smarter Gepäckanhänger",
  authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
  creator: 'Kreativschicht.de',
  publisher: 'Kreativschicht.de',
  openGraph: {
    title: "Bag-Tag.de | Smarte NFC Gepäckanhänger für sicheres Reisen",
    description: "Innovative NFC Gepäckanhänger zum schnellen Auffinden verlorenen Gepäcks.",
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    url: "https://bag-tag.de/",
    siteName: "Bag-Tag",
    images: [
      {
        url: "https://bag-tag.de/assets/productimage.webp",
        width: 1200,
        height: 630,
        alt: "Bag-Tag NFC Gepäckanhänger für sicheres Reisen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bag-Tag.de | Smarte NFC Gepäckanhänger",
    description: "Innovative NFC Gepäckanhänger zum schnellen Auffinden verlorenen Gepäcks.",
    images: ["https://bag-tag.de/assets/productimage.webp"],
    creator: "@bag_tag",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://bag-tag.de/",
    languages: {
      'de': 'https://bag-tag.de/de',
      'en': 'https://bag-tag.de/en',
      'x-default': 'https://bag-tag.de/',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for Organization
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bag-Tag',
    url: 'https://bag-tag.de',
    logo: 'https://bag-tag.de/assets/icon_32_32.png',
    description: 'Smarte NFC Gepäckanhänger für sicheres Reisen',
    sameAs: [
      'https://www.instagram.com/bag_tag/',
      'https://de-de.facebook.com/bagtag/',
    ],
  };

  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="de" href="https://bag-tag.de/de" />
        <link rel="alternate" hrefLang="en" href="https://bag-tag.de/en" />
        <link rel="alternate" hrefLang="x-default" href="https://bag-tag.de/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
