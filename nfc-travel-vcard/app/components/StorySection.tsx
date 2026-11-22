import React from 'react';
import Link from 'next/link';
import { getStoryContent } from '@/lib/content/story';
import { isNotifyEnabled } from '@/lib/content/landing';
import { localizedPath } from '@/lib/seo/routes';
import { chapterAnchors, chapterMore, type ChapterId } from '@/lib/content/story-links';
import { shopUrlFor, type SiteLocale } from '@/lib/seo/site';

export interface StorySectionProps {
  locale: SiteLocale;
  notifyEnabled?: boolean;
}

/**
 * Storyline: ein konkreter Ablauf mit Uhrzeiten (echte Reihenfolge),
 * danach der Vergleich Papieranhänger vs. Bag-Tag und Ratgeber-Links.
 * Alles als semantisches HTML im Server-Render – crawlbar ohne JS.
 */
const StorySection: React.FC<StorySectionProps> = ({ locale, notifyEnabled = isNotifyEnabled() }) => {
  const c = getStoryContent(locale, notifyEnabled);
  const secondaryHref = localizedPath(c.ctaSecondaryRouteKey, locale) ?? `/${locale}`;
  // Kapitel → passende Unterseite ("Mehr dazu")
  const moreByAnchor = Object.fromEntries(
    (Object.keys(chapterAnchors[locale]) as ChapterId[]).map((id) => [chapterAnchors[locale][id], chapterMore[locale][id]]),
  );
  const sourceLine =
    locale === 'de'
      ? `Laut ${c.stat.source} wurden 2025 weltweit rund ${c.stat.value} Gepäckstücke fehlgeleitet.`
      : `According to ${c.stat.source}, around ${c.stat.value} bags were mishandled worldwide in 2025.`;

  return (
    <section id="story" aria-labelledby="story-title" className="bt-section" data-testid="story-section">
      <div className="bt-wrap">
        <h2 id="story-title" className="bt-h2">{c.title}</h2>
        <p className="bt-lead">{c.intro}</p>
        <p className="bt-source">
          <cite>
            <a href={c.stat.sourceUrl} target="_blank" rel="noopener noreferrer">
              {sourceLine}
            </a>
          </cite>
        </p>

        <ol className="bt-timeline" aria-label={c.eyebrow}>
          {c.chapters.map((chapter) => (
            <li key={chapter.id} id={`story-${chapter.id}`}>
              <p className="bt-time">
                <time className="bt-time__clock">{chapter.time}</time>
                <span className="bt-time__label">{chapter.label}</span>
              </p>
              <div>
                <h3 className="bt-h3">{chapter.title}</h3>
                <p className="bt-text">{chapter.text}</p>
                {moreByAnchor[chapter.id] && localizedPath(moreByAnchor[chapter.id].routeKey, locale) && (
                  <p className="bt-more">
                    <Link href={localizedPath(moreByAnchor[chapter.id].routeKey, locale)!} className="bt-link">
                      {moreByAnchor[chapter.id].label}
                    </Link>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="bt-table-wrap">
          <table className="bt-table">
            <caption>{c.comparisonTitle}</caption>
            <thead>
              <tr>
                <th scope="col">{c.comparisonHead.aspect}</th>
                <th scope="col">{c.comparisonHead.paper}</th>
                <th scope="col">{c.comparisonHead.bagTag}</th>
              </tr>
            </thead>
            <tbody>
              {c.comparison.map((row) => (
                <tr key={row.aspect}>
                  <th scope="row">{row.aspect}</th>
                  <td className="bt-col-paper" data-label={c.comparisonHead.paper}>{row.paper}</td>
                  <td className="bt-col-tag" data-label={c.comparisonHead.bagTag}>{row.bagTag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bt-story-cta">
          <a
            href={shopUrlFor('storyline')}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="story-shop-cta"
            className="bt-btn bt-btn--primary"
          >
            {c.ctaPrimary}
          </a>
          <Link href={secondaryHref} className="bt-link">
            {c.ctaSecondary}
          </Link>
        </div>

        <nav aria-labelledby="story-readmore" className="bt-readmore">
          <h3 id="story-readmore" className="bt-h3">{c.readMoreTitle}</h3>
          <ul>
            {c.readMore.map((item) => {
              const href = localizedPath(item.routeKey, locale);
              if (!href) return null;
              return (
                <li key={item.routeKey}>
                  <Link href={href} className="bt-link">
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default StorySection;
