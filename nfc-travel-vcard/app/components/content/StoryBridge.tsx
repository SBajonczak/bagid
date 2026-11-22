import Link from 'next/link';
import { getStoryContent } from '@/lib/content/story';
import { isNotifyEnabled } from '@/lib/content/landing';
import { chapterAnchors, pageStoryLinks, type ChapterId } from '@/lib/content/story-links';
import type { SiteLocale } from '@/lib/seo/site';

interface StoryBridgeProps {
  /** Pfad der aktuellen Seite, z. B. "/de/finder-flow" */
  path: string;
  notifyEnabled?: boolean;
}

/**
 * Zeitleiste der Startseiten-Geschichte auf jeder Unterseite.
 * Hebt den Moment hervor, um den es auf dieser Seite geht, und verlinkt
 * jeden Zeitpunkt auf das passende Kapitel der Startseite.
 */
export default function StoryBridge({ path, notifyEnabled = isNotifyEnabled() }: StoryBridgeProps) {
  const link = pageStoryLinks[path];
  if (!link) return null;
  const locale: SiteLocale = path.startsWith('/en') ? 'en' : 'de';
  const story = getStoryContent(locale, notifyEnabled);
  const anchors = chapterAnchors[locale];
  const ids = Object.keys(anchors) as ChapterId[];
  const current = story.chapters.find((c) => c.id === anchors[link.chapter]);
  const labelId = `story-bridge-${link.chapter}`;

  return (
    <aside className="bt-bridge" aria-labelledby={labelId} data-testid="story-bridge">
      <p id={labelId} className="bt-bridge__lead">
        {link.note}{' '}
        {current && (
          <>
            {locale === 'de' ? 'In unserer Geschichte ist das' : 'In our story that’s'}{' '}
            <Link href={`/${locale}#story-${current.id}`} className="bt-link">
              {current.time}: {current.title}
            </Link>
            .
          </>
        )}
      </p>
      <ol className="bt-bridge__line">
        {ids.map((id) => {
          const chapter = story.chapters.find((c) => c.id === anchors[id]);
          if (!chapter) return null;
          const active = id === link.chapter;
          return (
            <li key={id} className={active ? 'is-active' : undefined}>
              <Link href={`/${locale}#story-${chapter.id}`} aria-current={active ? 'step' : undefined}>
                <time>{chapter.time}</time>
                <span>{chapter.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
