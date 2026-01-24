import { NextRequest, NextResponse } from 'next/server';

const locales = ['de', 'en'] as const;
const defaultLocale = 'de';

/**
 * Parse Accept-Language header with quality values (q-values)
 * @param acceptLanguage - Accept-Language header value
 * @returns Array of language preferences sorted by quality
 */
export function parseAcceptLanguage(acceptLanguage: string): Array<{ lang: string; q: number }> {
  if (!acceptLanguage) return [];

  const languages = acceptLanguage.split(',').map((lang) => {
    const parts = lang.trim().split(';');
    const langCode = parts[0].trim().toLowerCase();
    let quality = 1.0;

    // Parse q-value if present
    const qPart = parts.find((p) => p.trim().startsWith('q='));
    if (qPart) {
      const qValue = parseFloat(qPart.split('=')[1]);
      if (!isNaN(qValue) && qValue >= 0 && qValue <= 1) {
        quality = qValue;
      }
    }

    return { lang: langCode, q: quality };
  });

  // Sort by quality (highest first)
  return languages.sort((a, b) => b.q - a.q);
}

/**
 * Detect the best matching locale based on cookie, Accept-Language header, or default
 * @param req - Next.js request object
 * @returns Detected locale string ('de' or 'en')
 */
export function detectLocale(req: NextRequest): string {
  // 1. Check for locale cookie first
  const localeCookie = req.cookies.get('locale')?.value;
  if (localeCookie && locales.includes(localeCookie as any)) {
    return localeCookie;
  }

  // 2. Parse Accept-Language header with q-values
  const acceptLanguage = req.headers.get('accept-language');
  if (acceptLanguage) {
    const parsedLanguages = parseAcceptLanguage(acceptLanguage);

    for (const { lang } of parsedLanguages) {
      // Check for exact match (e.g., "de" or "en")
      if (locales.includes(lang as any)) {
        return lang;
      }

      // Check for language prefix (e.g., "de-DE" matches "de")
      const prefix = lang.split('-')[0];
      if (locales.includes(prefix as any)) {
        return prefix;
      }
    }
  }

  // 3. Default fallback
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Skip middleware for API routes, static files, Next.js internals, robots, and sitemap
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/img/') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }

  // Known public routes that should NOT be marked as private
  const publicRoutes = ['/impressum'];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Add X-Robots-Tag header for private/sensitive routes
  // This provides an extra layer of protection beyond meta tags
  const isPrivateRoute = 
    /^\/[^\/]+\/edit/.test(pathname) || // /[tagId]/edit
    /^\/register\/[^\/]+/.test(pathname) || // /register/[tagId]
    /^\/[a-zA-Z0-9_-]{8,}$/.test(pathname); // /[tagId] - alphanumeric IDs

  if (isPrivateRoute) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    return response;
  }

  // Only redirect the homepage '/' based on browser language
  // Leave all other paths (like /{tagId}) untouched
  if (pathname === '/') {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    
    // Set locale cookie for 1 year
    const response = NextResponse.redirect(url);
    response.cookies.set('locale', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
    });
    
    return response;
  }

  // Do not interfere with other paths (e.g., '/{tagId}' tag pages)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|assets|img|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\..*).*)'
  ]
};
