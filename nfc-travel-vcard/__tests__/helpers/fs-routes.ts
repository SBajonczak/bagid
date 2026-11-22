import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(__dirname, '../..');
export const APP_DIR = path.join(ROOT, 'app');

/** Mappt einen URL-Pfad auf eine existierende page.tsx (App Router inkl. Route Group "(marketing)"). */
export function pageFileFor(urlPath: string): string | undefined {
  const clean = urlPath.split('#')[0].split('?')[0].replace(/\/$/, '');
  const candidates = [
    path.join(APP_DIR, clean, 'page.tsx'),
    path.join(APP_DIR, '(marketing)', clean, 'page.tsx'),
  ];
  return candidates.find((c) => fs.existsSync(c));
}

/** Alle statischen Marketing-Seiten im Dateisystem als URL-Pfade. */
export function marketingPagePaths(): string[] {
  const base = path.join(APP_DIR, '(marketing)');
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === 'page.tsx') {
        out.push('/' + path.relative(base, path.dirname(full)).split(path.sep).join('/'));
      }
    }
  };
  walk(base);
  return out.sort();
}

/** Alle Quelltextdateien (ts/tsx) unter den angegebenen Ordnern. */
export function sourceFiles(dirs: string[]): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
        walk(full);
      } else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
    }
  };
  dirs.forEach((d) => walk(path.join(ROOT, d)));
  return out;
}
