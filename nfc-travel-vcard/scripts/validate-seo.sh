#!/bin/bash

echo "=========================================="
echo "SEO Validation Checklist for bag-tag.de"
echo "=========================================="
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ dist folder not found. Run 'npm run build' first."
    exit 1
fi

echo "✅ dist folder found"
echo ""

# Check robots.txt
echo "Checking robots.txt..."
if grep -q "Sitemap: https://bag-tag.de/sitemap.xml" public/robots.txt; then
    echo "  ✅ robots.txt has correct sitemap URL (no www)"
else
    echo "  ❌ robots.txt sitemap URL incorrect"
fi

if grep -q "Disallow: /api/" public/robots.txt; then
    echo "  ✅ robots.txt disallows /api/"
else
    echo "  ❌ robots.txt doesn't disallow /api/"
fi
echo ""

# Check sitemap.xml
echo "Checking sitemap.xml..."
if grep -q "https://bag-tag.de/" public/sitemap.xml; then
    echo "  ✅ sitemap.xml uses bag-tag.de (no www)"
else
    echo "  ❌ sitemap.xml has www or incorrect domain"
fi

if grep -q "hreflang=\"x-default\"" public/sitemap.xml; then
    echo "  ✅ sitemap.xml has x-default hreflang"
else
    echo "  ❌ sitemap.xml missing x-default hreflang"
fi
echo ""

# Check built HTML
echo "Checking dist/index.html..."

if grep -q "seo-content" dist/index.html; then
    echo "  ✅ SEO content injected in HTML"
else
    echo "  ❌ SEO content not found in HTML"
fi

if grep -q "<h1>Bag-Tag.de" dist/index.html; then
    echo "  ✅ H1 tag found in HTML"
else
    echo "  ❌ H1 tag not found in HTML"
fi

if grep -q "<noscript>" dist/index.html; then
    echo "  ✅ Noscript fallback present"
else
    echo "  ❌ Noscript fallback missing"
fi

if grep -q "cdn.tailwindcss.com" dist/index.html; then
    echo "  ❌ CDN Tailwind still present (render-blocking)"
else
    echo "  ✅ No CDN Tailwind (using built CSS)"
fi
echo ""

# Check SeoMeta.tsx
echo "Checking src/components/SeoMeta.tsx..."
if grep -q "https://bag-tag.de/" src/components/SeoMeta.tsx; then
    echo "  ✅ SeoMeta uses bag-tag.de (no www)"
else
    echo "  ❌ SeoMeta still has www"
fi

if grep -q "WebSite" src/components/SeoMeta.tsx; then
    echo "  ✅ WebSite JSON-LD schema present"
else
    echo "  ❌ WebSite JSON-LD schema missing"
fi

if grep -q "Organization" src/components/SeoMeta.tsx; then
    echo "  ✅ Organization JSON-LD schema present"
else
    echo "  ❌ Organization JSON-LD schema missing"
fi
echo ""

# Check .htaccess
echo "Checking public/.htaccess..."
if grep -q "Force HTTPS" public/.htaccess; then
    echo "  ✅ HTTPS redirect configured"
else
    echo "  ❌ HTTPS redirect not configured"
fi

if grep -q "Remove www" public/.htaccess; then
    echo "  ✅ www removal configured"
else
    echo "  ❌ www removal not configured"
fi
echo ""

# Count words in SEO content
echo "Checking content length..."
word_count=$(sed -n '/seo-content/,/SEO Content End/p' dist/index.html | wc -w)
if [ "$word_count" -gt 300 ]; then
    echo "  ✅ SEO content has $word_count words (>300)"
else
    echo "  ⚠️  SEO content has only $word_count words (should be >300)"
fi
echo ""

echo "=========================================="
echo "Validation Complete!"
echo "=========================================="
