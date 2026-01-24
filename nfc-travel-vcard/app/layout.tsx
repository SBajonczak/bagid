import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "./components/AuthProvider";
import { LanguageProvider } from "./components/LanguageProvider";

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

      <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uw9nmnfwr4");
          `}
        </Script>
         {/* Google Tag Manager - Head Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WTN6567G');
            `,
          }}/>

        <body>
           <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-WTN6567G`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
