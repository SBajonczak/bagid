# Post-Deployment Checklist for bag-tag.de

## Immediate Actions After Deployment

### 1. Verify Deployment ✓

Test these URLs in a browser:

```
https://bag-tag.de/                    # Main page loads
https://bag-tag.de/robots.txt          # Robots file accessible
https://bag-tag.de/sitemap.xml         # Sitemap accessible
https://bag-tag.de/impressum           # Impressum page works
```

### 2. Test Redirects ✓

Verify these redirects work (should redirect to https://bag-tag.de):

```
http://bag-tag.de/                     # HTTP → HTTPS
https://www.bag-tag.de/                # www → non-www
http://www.bag-tag.de/                 # Both issues
```

Expected behavior: All should 301 redirect to `https://bag-tag.de/`

### 3. View Source Test ✓

**Critical**: View page source (right-click → View Page Source) and verify:

- [ ] HTML contains text content (not just `<div id="root"></div>`)
- [ ] You can see `<h1>Bag-Tag.de - Smarte NFC Gepäckanhänger</h1>`
- [ ] SEO content is visible in HTML (around line 35-100)
- [ ] JSON-LD scripts are present (search for `application/ld+json`)
- [ ] Meta tags show correct title and description
- [ ] Canonical link is `https://bag-tag.de/` (no www)
- [ ] No `https://cdn.tailwindcss.com` script tag

### 4. Test noscript Fallback

Disable JavaScript in your browser:
- Chrome: DevTools → Settings → Preferences → Debugger → Disable JavaScript
- Firefox: about:config → javascript.enabled → false

Reload https://bag-tag.de/ and verify:
- [ ] Content is visible (not blank page)
- [ ] You see the full noscript version with product info
- [ ] Links work (Impressum, Shop)

## Search Engine Configuration

### Google Search Console

1. **Add Property**
   - Go to: https://search.google.com/search-console
   - Add property: `bag-tag.de` (without www!)
   - Verify ownership (DNS, HTML file, or tag method)

2. **Submit Sitemap**
   ```
   https://bag-tag.de/sitemap.xml
   ```

3. **Request Indexing**
   - URL Inspection tool
   - Enter: `https://bag-tag.de/`
   - Click "Request Indexing"

4. **Monitor**
   - Coverage report (check for errors)
   - Core Web Vitals report
   - Rich results report (for Product/FAQ schemas)

### Bing Webmaster Tools

1. **Add Site**
   - Go to: https://www.bing.com/webmasters
   - Add site: `https://bag-tag.de`
   - Verify ownership

2. **Submit Sitemap**
   ```
   https://bag-tag.de/sitemap.xml
   ```

3. **Submit URL**
   - Submit URL tool
   - Enter: `https://bag-tag.de/`

## Validation Tools

### Schema Markup Validator

Test structured data:
```
https://validator.schema.org/
```
Enter: `https://bag-tag.de/`

Expected schemas found:
- Product
- FAQPage
- WebSite
- Organization

### Google Rich Results Test

Test for rich snippets:
```
https://search.google.com/test/rich-results
```
Enter: `https://bag-tag.de/`

Should show:
- ✅ Product (with price, rating, availability)
- ✅ FAQPage

### PageSpeed Insights

Test performance:
```
https://pagespeed.web.dev/
```
Enter: `https://bag-tag.de/`

Target scores:
- Performance: 90+ (mobile), 95+ (desktop)
- SEO: 90+
- Best Practices: 90+
- Accessibility: 90+

### Mobile-Friendly Test

```
https://search.google.com/test/mobile-friendly
```
Enter: `https://bag-tag.de/`

Should show: "Page is mobile friendly"

## Monitoring Timeline

### Week 1
- [ ] Verify all URLs are accessible
- [ ] Submit sitemaps to Google & Bing
- [ ] Check Search Console for crawl errors
- [ ] Validate all schemas with validator
- [ ] Run PageSpeed Insights test
- [ ] Request indexing for main page

### Week 2
- [ ] Check if main page is indexed (search: `site:bag-tag.de`)
- [ ] Monitor Search Console coverage
- [ ] Check for any 404 errors
- [ ] Verify rich results appear in testing tool

### Week 3-4
- [ ] Check search appearance for brand queries
- [ ] Monitor click-through rates
- [ ] Check Core Web Vitals data (needs 28 days)
- [ ] Verify product/FAQ rich snippets in actual search

### Monthly
- [ ] Review Search Console performance
- [ ] Check keyword rankings
- [ ] Monitor Core Web Vitals trends
- [ ] Review structured data enhancements

## Common Issues & Solutions

### Issue: View source shows empty HTML
**Cause**: Build didn't run prerender script
**Solution**: 
```bash
cd nfc-travel-vcard
npm run build
# Check dist/index.html contains content
```

### Issue: www redirects not working
**Cause**: Server doesn't support .htaccess or web.config
**Solution**: Configure redirects at hosting provider level or DNS

### Issue: Robots.txt not accessible
**Cause**: Server configuration blocking access
**Solution**: Ensure public folder is served correctly

### Issue: JSON-LD validation errors
**Cause**: Schema structure issue
**Solution**: Check SeoMeta.tsx, validate with schema.org validator

### Issue: Poor Core Web Vitals
**Possible causes**:
- Video file too large (compress it)
- Large JavaScript bundle (check bundle analyzer)
- Server response time (check hosting)
- Images not optimized (use WebP, proper sizing)

## Success Metrics

After 4-6 weeks, you should see:

1. **Indexing**
   - Main page indexed in Google
   - Impressum page indexed
   - No coverage errors in Search Console

2. **Rich Results**
   - Product snippet may appear for product queries
   - FAQ accordion may appear for question queries
   - Star ratings visible in search results (from reviews)

3. **Performance**
   - Core Web Vitals all green
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

4. **Rankings**
   - Visible for brand searches: "bag-tag.de"
   - Improving positions for: "NFC Gepäckanhänger", "NFC Koffer Tag"
   - Long-tail variations appearing in Search Console

## Support & Maintenance

### Regular Updates
- Sitemap regenerates automatically on each build
- Keep content fresh (update dates, add new FAQs)
- Monitor and fix any Search Console errors

### Content Updates
When updating product info:
1. Update in i18n.ts
2. Consider updating SEO content in scripts/prerender.js
3. Rebuild and redeploy

### Performance Monitoring
- Use Google Analytics for traffic tracking
- Monitor Search Console for search performance
- Use PageSpeed Insights monthly for performance checks

## Contact

If you notice any SEO issues:
1. Check validation script: `bash scripts/validate-seo.sh`
2. Verify build output: `dist/index.html` should have content
3. Check Search Console for specific error messages
4. Review this checklist for missed steps

---

**Remember**: SEO improvements take time. Allow 4-8 weeks for search engines to fully crawl, index, and rank the optimized site.
