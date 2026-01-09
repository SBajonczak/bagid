import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, '..', 'public');
const sitemapPath = path.join(publicPath, 'sitemap.xml');

// Get current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split('T')[0];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://bag-tag.de/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="de" href="https://bag-tag.de/?lang=de" />
    <xhtml:link rel="alternate" hreflang="en" href="https://bag-tag.de/?lang=en" />
    <xhtml:link rel="alternate" hreflang="nl" href="https://bag-tag.de/?lang=nl" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://bag-tag.de/" />
  </url>
  <url>
    <loc>https://bag-tag.de/impressum</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

// Write the sitemap
fs.writeFileSync(sitemapPath, sitemap, 'utf-8');

console.log(`✅ Sitemap generated: ${sitemapPath} (date: ${currentDate})`);
