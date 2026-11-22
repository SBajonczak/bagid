import { messages } from '@/lib/i18n';
import { getLandingContent } from '@/lib/content/landing';
import type { SiteLocale } from '@/lib/seo/site';

/** So funktioniert's, Bewertungen und FAQ – Inhalte aus lib/i18n.ts (dieselben wie im JSON-LD). */
export function HomeSteps({ locale }: { locale: SiteLocale }) {
  const t = messages[locale].noDataSection;
  return (
    <section id="so-gehts" aria-labelledby="steps-title" className="bt-section">
      <div className="bt-wrap">
        <h2 id="steps-title" className="bt-h2">{t.howItWorksTitle}</h2>
        <ol className="bt-steps">
          {t.howItWorksSteps.map((step) => (
            <li key={step.title}>
              <h3 className="bt-h3">{step.title}</h3>
              <p className="bt-text">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomeReviews({ locale }: { locale: SiteLocale }) {
  const reviews = messages[locale].noDataSection.testimonials;
  const { reviewsTitle } = getLandingContent(locale);
  const ratingLabel = (n: number) => (locale === 'de' ? `${n} von 5 Sternen` : `${n} out of 5 stars`);
  return (
    <section id="bewertungen" aria-labelledby="reviews-title" className="bt-section bt-section--white">
      <div className="bt-wrap">
        <h2 id="reviews-title" className="bt-h2">{reviewsTitle}</h2>
        <ul className="bt-reviews">
          {reviews.map((r) => (
            <li key={r.name}>
              <figure className="bt-review">
                <p className="bt-stars" role="img" aria-label={ratingLabel(r.rating)}>
                  {'★'.repeat(r.rating)}
                  {'☆'.repeat(5 - r.rating)}
                </p>
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  {r.name}, via {r.source}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeFaq({ locale }: { locale: SiteLocale }) {
  const faq = messages[locale].faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className="bt-section">
      <div className="bt-wrap">
        <h2 id="faq-title" className="bt-h2">{faq.title}</h2>
        <div className="bt-faq">
          {faq.questions.map((item, idx) => (
            <details key={item.question} open={idx === 0}>
              <summary>
                <h3 className="bt-faq__q">{item.question}</h3>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
