import Image from 'next/image';
import PhoneFrame from './PhoneFrame';
import { getLandingContent } from '@/lib/content/landing';
import { shopUrlFor, type SiteLocale } from '@/lib/seo/site';

export default function HomeBenefits({ locale }: { locale: SiteLocale }) {
  const { benefits, price } = getLandingContent(locale);

  return (
    <>
      <section id="nutzen" aria-labelledby="benefits-title" className="bt-section bt-section--white" data-testid="home-benefits">
        <div className="bt-wrap">
          <h2 id="benefits-title" className="bt-h2">{benefits.title}</h2>
          <p className="bt-lead">{benefits.lead}</p>

          <ul className="bt-screens">
            {benefits.screens.map((b) => (
              <li key={b.id} id={`nutzen-${b.id}`}>
                <PhoneFrame media={b.media} sizes="(min-width: 860px) 17rem, 70vw" />
                <h3 className="bt-h3">{b.title}</h3>
                <p className="bt-text">{b.text}</p>
              </li>
            ))}
          </ul>

          <div className="bt-rows">
            {benefits.photos.map((b) => (
              <div key={b.id} id={`nutzen-${b.id}`} className="bt-row">
                <div className="bt-row__media">
                  <Image
                    src={b.media.src}
                    alt={b.media.alt}
                    width={b.media.width}
                    height={b.media.height}
                    sizes="(min-width: 860px) 34rem, 92vw"
                  />
                </div>
                <div>
                  <h3 className="bt-h3">{b.title}</h3>
                  <p className="bt-text">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="price-title" className="bt-band">
        <div className="bt-wrap bt-band__inner">
          <div>
            <h2 id="price-title" className="bt-h2">{price.title}</h2>
            <p className="bt-text">{price.text}</p>
          </div>
          <a
            href={shopUrlFor('price')}
            target="_blank"
            rel="noopener noreferrer"
            className="bt-btn bt-btn--primary"
            data-testid="price-shop-cta"
          >
            {price.cta}
          </a>
        </div>
      </section>
    </>
  );
}
