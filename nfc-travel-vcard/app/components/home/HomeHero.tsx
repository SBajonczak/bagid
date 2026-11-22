import Image from 'next/image';
import Link from 'next/link';
import PhoneFrame from './PhoneFrame';
import { getLandingContent, photos } from '@/lib/content/landing';
import { SHOP_HERO_URL, type SiteLocale } from '@/lib/seo/site';

export default function HomeHero({ locale }: { locale: SiteLocale }) {
  const { hero, benefits } = getLandingContent(locale);
  const contactScreen = benefits.screens[0].media;

  return (
    <section className="bt-hero" aria-labelledby="hero-title" data-testid="home-hero">
      <div className="bt-wrap bt-hero__grid">
        <div>
          <h1 id="hero-title" className="bt-h1">{hero.title}</h1>
          <p className="bt-lead">{hero.lead}</p>

          <div className="bt-buy">
            <p className="bt-price">
              <span className="bt-price__amount">{hero.price}</span>
              <span className="bt-price__note">{hero.priceNote}</span>
            </p>
            <a
              href={SHOP_HERO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bt-btn bt-btn--primary"
              data-testid="hero-shop-cta"
            >
              {hero.cta}
            </a>
          </div>
          <Link href="/demo" className="bt-link bt-hero__demo">
            {hero.demo}
          </Link>

          <ul className="bt-facts">
            {hero.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <figure className="bt-stage">
          <Image
            className="bt-stage__photo"
            src={photos.tagBackpack.src}
            alt={hero.photoAlt}
            width={photos.tagBackpack.width}
            height={photos.tagBackpack.height}
            sizes="(min-width: 900px) 38vw, 82vw"
            priority
          />
          <div className="bt-stage__phone">
            <PhoneFrame media={{ ...contactScreen, alt: hero.screenAlt }} sizes="(min-width: 900px) 20vw, 40vw" priority />
          </div>
        </figure>
      </div>
    </section>
  );
}
