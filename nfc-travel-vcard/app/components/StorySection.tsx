import React from 'react';
import Link from 'next/link';
import { storyContent } from '@/lib/content/story';
import { localizedPath } from '@/lib/seo/routes';
import { shopUrlFor, type SiteLocale } from '@/lib/seo/site';

export interface StorySectionProps {
  locale: SiteLocale;
}

/**
 * Storyline-Sektion der Startseite.
 * Semantisch aufgebaut (section > h2, ol > li > h3, table), damit Crawler
 * die Erzählstruktur und die Keywords im HTML finden – keine Inhalte erst
 * per Klick/JS sichtbar.
 */
const StorySection: React.FC<StorySectionProps> = ({ locale }) => {
  const c = storyContent[locale];
  const secondaryHref = localizedPath(c.ctaSecondaryRouteKey, locale) ?? `/${locale}`;

  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="w-full max-w-7xl mt-16 scroll-mt-32"
      data-testid="story-section"
    >
      <div className="rounded-2xl bg-slate-950 text-white p-8 md:p-12 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">{c.eyebrow}</p>
        <h2 id="story-title" className="mt-3 text-3xl md:text-4xl font-bold">
          {c.title}
        </h2>
        <p className="mt-4 max-w-3xl text-slate-200">{c.intro}</p>

        <figure className="mt-8 inline-flex flex-col rounded-xl border border-white/15 bg-white/5 px-6 py-4">
          <p className="text-4xl font-extrabold text-lime-300">{c.stat.value}</p>
          <p className="text-sm text-slate-200">{c.stat.label}</p>
          <figcaption className="mt-1 text-xs text-slate-400">
            <cite>
              <a href={c.stat.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                {c.stat.source}
              </a>
            </cite>
          </figcaption>
        </figure>
      </div>

      <ol className="relative mt-10 space-y-8 border-l-2 border-blue-200 pl-8 md:ml-6">
        {c.chapters.map((chapter) => (
          <li key={chapter.id} id={`story-${chapter.id}`} className="relative">
            <span
              className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-white bg-blue-600 shadow"
              aria-hidden="true"
            />
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{chapter.label}</p>
            <h3 className="mt-1 text-xl font-bold text-gray-900">{chapter.title}</h3>
            <p className="mt-2 max-w-3xl text-gray-700">{chapter.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md">
        <table className="w-full text-left text-sm">
          <caption className="px-6 pt-6 text-left text-xl font-bold text-gray-900">{c.comparisonTitle}</caption>
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th scope="col" className="px-6 py-3 font-semibold">{c.comparisonHead.aspect}</th>
              <th scope="col" className="px-6 py-3 font-semibold">{c.comparisonHead.paper}</th>
              <th scope="col" className="px-6 py-3 font-semibold text-blue-700">{c.comparisonHead.bagTag}</th>
            </tr>
          </thead>
          <tbody>
            {c.comparison.map((row) => (
              <tr key={row.aspect} className="border-b border-gray-100 last:border-0">
                <th scope="row" className="px-6 py-3 font-medium text-gray-800">{row.aspect}</th>
                <td className="px-6 py-3 text-gray-500">{row.paper}</td>
                <td className="px-6 py-3 font-medium text-gray-900">{row.bagTag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <h3 className="text-2xl font-bold text-green-900">{c.ctaTitle}</h3>
        <p className="text-green-800">{c.ctaText}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={shopUrlFor('storyline')}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="story-shop-cta"
            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-8 py-4 font-bold text-white shadow hover:bg-green-700"
          >
            {c.ctaPrimary}
          </a>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-lg border border-green-700 px-6 py-4 font-semibold text-green-900 hover:bg-green-100"
          >
            {c.ctaSecondary}
          </Link>
        </div>
      </div>

      <nav aria-labelledby="story-readmore" className="mt-10">
        <h3 id="story-readmore" className="text-lg font-bold text-gray-900">{c.readMoreTitle}</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.readMore.map((item) => {
            const href = localizedPath(item.routeKey, locale);
            if (!href) return null;
            return (
              <li key={item.routeKey}>
                <Link
                  href={href}
                  className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-blue-700 hover:border-blue-300 hover:bg-blue-50"
                >
                  {item.label} →
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default StorySection;
