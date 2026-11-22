import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, pageFileFor } from './helpers/fs-routes';

const nav = fs.readFileSync(path.join(ROOT, 'app/components/NavigationBar.tsx'), 'utf8');
const footer = fs.readFileSync(path.join(ROOT, 'app/components/Footer.tsx'), 'utf8');

describe('Navigation', () => {
  it('alle statischen internen Links in der Navigation existieren', () => {
    const hrefs = [...nav.matchAll(/'(\/(?:de|en)[^'#]*)'/g)].map((m) => m[1]);
    expect(hrefs.length).toBeGreaterThan(5);
    for (const h of hrefs) expect(pageFileFor(h), h).toBeDefined();
  });

  it('FAQ-Link zeigt direkt auf die Sprach-Startseite (keine Weiterleitung über "/")', () => {
    expect(nav).not.toContain("href: '/#faq'");
    expect(nav).toContain('`${homePath}#faq`');
  });

  it('Login, Logout und Dashboard-Link bleiben erhalten', () => {
    expect(nav).toContain('onClick={handleLogin}');
    expect(nav).toContain('onClick={handleLogout}');
    expect(nav).toContain("href: '/dashboard'");
  });

  it('Footer enthält crawlbaren Linkhub und Impressum', () => {
    expect(footer).toContain('localizedPath(key');
    expect(footer).toContain('href="/impressum"');
  });
});
