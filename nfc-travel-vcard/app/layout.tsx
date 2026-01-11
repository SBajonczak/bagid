import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./components/AuthProvider";

export const metadata: Metadata = {
  title: "Bag-Tag.de | Smarte NFC Gepäckanhänger für sicheres Reisen",
  description: "Innovative NFC Gepäckanhänger zum schnellen Auffinden verlorenen Gepäcks. Moderne Reisebegleiter mit kontaktloser NFC-Technologie für alle Koffer und Taschen.",
  keywords: "NFC Gepäckanhänger, Kofferanhänger, Gepäck ID, verlorenes Gepäck, Reisezubehör, Koffer Tag, kontaktlose Technologie, smarter Gepäckanhänger",
  openGraph: {
    title: "Bag-Tag.de | Smarte NFC Gepäckanhänger für sicheres Reisen",
    description: "Innovative NFC Gepäckanhänger zum schnellen Auffinden verlorenen Gepäcks.",
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bag-Tag.de | Smarte NFC Gepäckanhänger",
    description: "Innovative NFC Gepäckanhänger zum schnellen Auffinden verlorenen Gepäcks.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="de" href="/de" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
