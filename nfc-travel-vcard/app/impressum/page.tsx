import type { Metadata } from "next";
import ImpressumContent from "../components/Impressum/Impressum";

export const metadata: Metadata = {
  title: "Impressum | Bag-Tag.de",
  description: "Impressum und rechtliche Informationen von Bag-Tag.de - Angaben gemäß § 5 TMG",
  openGraph: {
    title: "Impressum | Bag-Tag.de",
    description: "Rechtliche Informationen und Kontaktdaten",
    type: "website",
    url: "https://bag-tag.de/impressum",
    siteName: "Bag-Tag",
  },
  twitter: {
    card: "summary",
    title: "Impressum | Bag-Tag.de",
    description: "Rechtliche Informationen und Kontaktdaten",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bag-tag.de/impressum",
    languages: {
      'de': 'https://bag-tag.de/impressum',
      'x-default': 'https://bag-tag.de/impressum',
    },
  },
};

export default function ImpressumPage() {
  return <ImpressumContent />;
}
