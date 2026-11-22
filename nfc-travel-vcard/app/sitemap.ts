import { MetadataRoute } from 'next';
import { allRoutes, LocalizedRoute } from '@/lib/seo/routes';
import { absoluteUrl } from '@/lib/seo/site';

/**
 * Sitemap aus der Routen-Registry (lib/seo/routes.ts).
 *
 * - Enthält nur Seiten, die wirklich existieren (kein 404 in der Sitemap).
 * - "/" ist bewusst NICHT enthalten: es leitet per Middleware auf /de bzw. /en um,
 *   und Weiterleitungs-URLs gehören nicht in eine Sitemap.
 * - hreflang-Alternates nur, wenn es eine echte Sprachvariante gibt.
 */
function alternatesFor(route: LocalizedRoute) {
  if (!route.de || !route.en) return undefined;
  return {
    languages: {
      de: absoluteUrl(route.de),
      en: absoluteUrl(route.en),
      'x-default': absoluteUrl(route.de),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return allRoutes.flatMap((route) =>
    [route.de, route.en]
      .filter((path): path is string => Boolean(path))
      .map((path) => {
        const alternates = alternatesFor(route);
        return {
          url: absoluteUrl(path),
          lastModified,
          changeFrequency: route.changeFrequency,
          priority: route.priority,
          ...(alternates ? { alternates } : {}),
        };
      }),
  );
}
