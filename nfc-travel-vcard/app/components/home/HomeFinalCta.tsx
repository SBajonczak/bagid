import Image from 'next/image';
import { getLandingContent, photos } from '@/lib/content/landing';
import { shopUrlFor, type SiteLocale } from '@/lib/seo/site';

export default function HomeFinalCta({ locale }: { locale: SiteLocale }) {
  const { final, hero } = getLandingContent(locale);
  return (
    <section aria-labelledby="final-title" className="bt-section bt-section--white">
      <div className="bt-wrap bt-final">
        <Image
          src={photos.finderReads.src}
          alt={final.photoAlt}
          width={photos.finderReads.width}
          height={photos.finderReads.height}
          sizes="(min-width: 860px) 34rem, 92vw"
        />
        <div>
          <h2 id="final-title" className="bt-h2">{final.title}</h2>
          <p className="bt-text">{final.text}</p>
          <div className="bt-buy">
            <p className="bt-price">
              <span className="bt-price__amount">{hero.price}</span>
              <span className="bt-price__note">{hero.priceNote}</span>
            </p>
            <a
              href={shopUrlFor('final')}
              target="_blank"
              rel="noopener noreferrer"
              className="bt-btn bt-btn--primary"
              data-testid="final-shop-cta"
            >
              {final.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
