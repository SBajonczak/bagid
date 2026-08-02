import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "./components/AuthProvider";
import { LanguageProvider } from "./components/LanguageProvider";

export const metadata: Metadata = {
  title: "Bag-Tag.de | Smarte NFC Gepäckanhänger für sicheres Reisen",
  description: "Smarter NFC & QR-Code Gepäckanhänger für €10,99. Koffer verloren? Finder kontaktieren dich sofort – ohne App, ohne Batterien. DSGVO-konform. Jetzt kaufen.",
  keywords: [
    "NFC Gepäckanhänger",
    "Kofferanhänger NFC",
    "Travel Tag NFC",
    "NFC Kofferanhänger kaufen",
    "smarter Gepäckanhänger",
    "Koffer verloren was tun",
    "Gepäck verloren",
    "Kofferanhänger mit Kontaktdaten",
    "QR Code Gepäckanhänger",
    "NFC luggage tag",
    "smart luggage tag",
    "digital bag tag",
    "kontaktloser Gepäckanhänger",
    "verlorenes Gepäck finden",
  ],
  authors: [{ name: 'Bag-Tag', url: 'https://bag-tag.de' }],
  creator: 'Kreativschicht.de',
  publisher: 'Kreativschicht.de',
  openGraph: {
    title: "Bag-Tag | Smarter NFC Gepäckanhänger – Koffer nie wieder verlieren",
    description: "NFC & QR-Code Gepäckanhänger für €10,99. Kein App-Download, keine Batterien. Finder kontaktieren dich sofort. DSGVO-konform.",
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
        alt: "Bag-Tag NFC Gepäckanhänger – smarter Kofferanhänger mit NFC und QR-Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bag-Tag | Smarter NFC Gepäckanhänger",
    description: "NFC & QR-Code Gepäckanhänger für €10,99. Kein App-Download, keine Batterien. Koffer verloren? Finder kontaktieren dich sofort.",
    images: ["https://bag-tag.de/assets/productimage.webp"],
    creator: "@bag_tag",
    site: "@bag_tag",
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
  category: 'travel accessories',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bag-Tag',
    url: 'https://bag-tag.de',
    logo: {
      '@type': 'ImageObject',
      url: 'https://bag-tag.de/assets/icon_32_32.png',
    },
    description: 'Smarte NFC Gepäckanhänger für sicheres Reisen – keine App, keine Batterien, DSGVO-konform',
    sameAs: [
      'https://www.instagram.com/bag_tag/',
      'https://de-de.facebook.com/bagtag/',
    ],
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bag-Tag',
    url: 'https://bag-tag.de',
    description: 'Smarte NFC-Gepäckanhänger für sicheres Reisen – keine App, keine Batterien, DSGVO-konform',
    inLanguage: ['de', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bag-tag.de/de/hilfe/faq?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
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
