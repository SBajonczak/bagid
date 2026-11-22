import Image from 'next/image';
import type { Media } from '@/lib/content/landing';

interface PhoneFrameProps {
  media: Media;
  sizes: string;
  priority?: boolean;
}

/** Echter App-Screenshot in einem schlichten Handy-Rahmen (nur CSS, kein Bild). */
export default function PhoneFrame({ media, sizes, priority = false }: PhoneFrameProps) {
  return (
    <div className="bt-phone">
      <Image
        className="bt-phone__screen"
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
