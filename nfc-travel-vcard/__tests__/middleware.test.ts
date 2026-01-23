/**
 * Middleware Tests
 * Tests for locale detection and Accept-Language parsing
 * 
 * Note: These are reference tests for manual validation.
 * To run with a test framework, install Jest or Vitest:
 *   npm install --save-dev vitest @testing-library/react
 */

import { parseAcceptLanguage, detectLocale } from '../middleware';
import { NextRequest } from 'next/server';

describe('parseAcceptLanguage', () => {
  it('should parse simple language without q-value', () => {
    const result = parseAcceptLanguage('de');
    expect(result).toEqual([{ lang: 'de', q: 1.0 }]);
  });

  it('should parse multiple languages without q-values', () => {
    const result = parseAcceptLanguage('de,en,fr');
    expect(result).toEqual([
      { lang: 'de', q: 1.0 },
      { lang: 'en', q: 1.0 },
      { lang: 'fr', q: 1.0 },
    ]);
  });

  it('should parse language with q-value', () => {
    const result = parseAcceptLanguage('de;q=0.9');
    expect(result).toEqual([{ lang: 'de', q: 0.9 }]);
  });

  it('should parse and sort by q-value (descending)', () => {
    const result = parseAcceptLanguage('en;q=0.5,de;q=0.9,fr;q=0.3');
    expect(result).toEqual([
      { lang: 'de', q: 0.9 },
      { lang: 'en', q: 0.5 },
      { lang: 'fr', q: 0.3 },
    ]);
  });

  it('should handle complex Accept-Language header', () => {
    const result = parseAcceptLanguage('en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7');
    expect(result).toEqual([
      { lang: 'en-us', q: 1.0 },
      { lang: 'en', q: 0.9 },
      { lang: 'de-de', q: 0.8 },
      { lang: 'de', q: 0.7 },
    ]);
  });

  it('should handle whitespace', () => {
    const result = parseAcceptLanguage(' de , en;q=0.9 , fr;q=0.8 ');
    expect(result).toEqual([
      { lang: 'de', q: 1.0 },
      { lang: 'en', q: 0.9 },
      { lang: 'fr', q: 0.8 },
    ]);
  });

  it('should handle empty string', () => {
    const result = parseAcceptLanguage('');
    expect(result).toEqual([]);
  });

  it('should ignore invalid q-values', () => {
    const result = parseAcceptLanguage('de;q=invalid,en;q=1.5');
    expect(result).toEqual([
      { lang: 'de', q: 1.0 },
      { lang: 'en', q: 1.0 },
    ]);
  });
});

describe('detectLocale', () => {
  function createMockRequest(options: {
    cookie?: string;
    acceptLanguage?: string;
  }): NextRequest {
    const url = 'http://localhost:3000';
    const headers = new Headers();
    
    if (options.acceptLanguage) {
      headers.set('accept-language', options.acceptLanguage);
    }

    const req = new NextRequest(url, { headers });
    
    if (options.cookie) {
      // Mock cookies
      Object.defineProperty(req, 'cookies', {
        value: {
          get: (name: string) => {
            if (name === 'locale' && options.cookie) {
              return { name: 'locale', value: options.cookie };
            }
            return undefined;
          },
        },
        writable: true,
      });
    }

    return req;
  }

  it('should prioritize locale cookie over Accept-Language', () => {
    const req = createMockRequest({
      cookie: 'en',
      acceptLanguage: 'de,en;q=0.9',
    });
    expect(detectLocale(req)).toBe('en');
  });

  it('should use Accept-Language when no cookie is set', () => {
    const req = createMockRequest({
      acceptLanguage: 'de,en;q=0.9',
    });
    expect(detectLocale(req)).toBe('de');
  });

  it('should detect German from de-DE', () => {
    const req = createMockRequest({
      acceptLanguage: 'de-DE,de;q=0.9',
    });
    expect(detectLocale(req)).toBe('de');
  });

  it('should detect English from en-US', () => {
    const req = createMockRequest({
      acceptLanguage: 'en-US,en;q=0.9',
    });
    expect(detectLocale(req)).toBe('en');
  });

  it('should prefer German when q-value is higher', () => {
    const req = createMockRequest({
      acceptLanguage: 'de;q=0.9,en;q=0.5',
    });
    expect(detectLocale(req)).toBe('de');
  });

  it('should prefer English when q-value is higher', () => {
    const req = createMockRequest({
      acceptLanguage: 'en;q=0.9,de;q=0.5',
    });
    expect(detectLocale(req)).toBe('en');
  });

  it('should default to "de" when no Accept-Language is provided', () => {
    const req = createMockRequest({});
    expect(detectLocale(req)).toBe('de');
  });

  it('should default to "de" when Accept-Language contains unsupported languages', () => {
    const req = createMockRequest({
      acceptLanguage: 'fr,es,it',
    });
    expect(detectLocale(req)).toBe('de');
  });

  it('should ignore invalid locale cookie and fall back to Accept-Language', () => {
    const req = createMockRequest({
      cookie: 'fr', // unsupported
      acceptLanguage: 'en',
    });
    expect(detectLocale(req)).toBe('en');
  });

  it('should handle complex real-world Accept-Language headers', () => {
    // Chrome on Windows German
    const req1 = createMockRequest({
      acceptLanguage: 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
    });
    expect(detectLocale(req1)).toBe('de');

    // Chrome on macOS English
    const req2 = createMockRequest({
      acceptLanguage: 'en-US,en;q=0.9,de;q=0.8',
    });
    expect(detectLocale(req2)).toBe('en');
  });
});
