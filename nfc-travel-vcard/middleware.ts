import { NextRequest, NextResponse } from 'next/server';

const locales = ['de', 'en'] as const;
const defaultLocale = 'de';

function detectLocale(req: NextRequest): string {
  const acceptLanguage = req.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  const lower = acceptLanguage.toLowerCase();
  if (lower.startsWith('de') || lower.includes(' de')) return 'de';
  if (lower.startsWith('en') || lower.includes(' en')) return 'en';
  
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
    return NextResponse.redirect(url);
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
