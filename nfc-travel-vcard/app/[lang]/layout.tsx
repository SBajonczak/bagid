import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "../components/AuthProvider";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n-config";
import { i18n } from "@/lib/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const seo = dict.seo;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: params.lang === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: params.lang === 'de' ? ['en_US'] : ['de_DE'],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.productName,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        'de': '/de',
        'en': '/en',
      },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
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
