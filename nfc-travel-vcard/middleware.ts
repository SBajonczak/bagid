import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'de'];
const defaultLocale = 'de';

// Get the preferred locale based on Accept-Language header
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, q = 'q=1'] = lang.trim().split(';');
      const quality = parseFloat(q.replace('q=', ''));
      return { locale: locale.split('-')[0], quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find first matching locale
  for (const { locale } of languages) {
    if (locales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/img/') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }

  // Redirect root path based on browser language
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // Preserve query parameters
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, etc.)
    '/((?!api|_next/static|_next/image|assets|img|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\..*).*)' 
  ]
};
