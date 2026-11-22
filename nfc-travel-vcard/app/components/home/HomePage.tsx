import '@fontsource/barlow/latin-400.css';
import '@fontsource/barlow/latin-500.css';
import '@fontsource/barlow/latin-600.css';
import '@fontsource/barlow-semi-condensed/latin-500.css';
import '@fontsource/barlow-semi-condensed/latin-600.css';
import '@fontsource/barlow-semi-condensed/latin-700.css';
import './home.css';

import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import StorySection from '../StorySection';
import HomeHero from './HomeHero';
import HomeBenefits from './HomeBenefits';
import HomeVideo from './HomeVideo';
import HomeFinalCta from './HomeFinalCta';
import { HomeFaq, HomeReviews, HomeSteps } from './HomeDetails';
import type { SiteLocale } from '@/lib/seo/site';

/**
 * Startseite (/de, /en) als Server-Komponente: Inhalte, Bilder und Links stehen
 * vollständig im HTML. Reihenfolge folgt dem Kaufweg:
 * Versprechen → Nutzen mit Beweis (Screenshots/Fotos) → Preis → Geschichte →
 * Video → Ablauf → Bewertungen → Einwände (FAQ) → Abschluss.
 */
export default function HomePage({ locale }: { locale: SiteLocale }) {
  return (
    <>
      <NavigationBar />
      <div className="bt-home" lang={locale}>
        <main>
          <HomeHero locale={locale} />
          <HomeBenefits locale={locale} />
          <StorySection locale={locale} />
          <HomeVideo locale={locale} />
          <HomeSteps locale={locale} />
          <HomeReviews locale={locale} />
          <HomeFaq locale={locale} />
          <HomeFinalCta locale={locale} />
        </main>
      </div>
      <Footer />
    </>
  );
}
