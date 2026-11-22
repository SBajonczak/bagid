import { getLandingContent, photos } from '@/lib/content/landing';
import type { SiteLocale } from '@/lib/seo/site';

/** Echtes Produktvideo – lädt erst beim Abspielen (preload="none"), kein Autoplay. */
export default function HomeVideo({ locale }: { locale: SiteLocale }) {
  const { video } = getLandingContent(locale);
  return (
    <section id="video" aria-labelledby="video-title" className="bt-section bt-section--white">
      <div className="bt-wrap bt-video">
        <div>
          <h2 id="video-title" className="bt-h2">{video.title}</h2>
          <p className="bt-text">{video.text}</p>
        </div>
        <video
          controls
          muted
          playsInline
          preload="none"
          poster={photos.videoPoster.src}
          width={photos.videoPoster.width}
          height={photos.videoPoster.height}
          aria-label={video.name}
        >
          <source src={photos.video} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
