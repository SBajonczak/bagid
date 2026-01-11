import type { Metadata } from "next";
import ImpressumContent from "../components/Impressum/Impressum";

export const metadata: Metadata = {
  title: "Impressum | Bag-Tag.de",
  description: "Impressum und rechtliche Informationen von Bag-Tag.de",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImpressumPage() {
  return <ImpressumContent />;
}
