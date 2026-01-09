# Performance & SEO Optimization Recommendations

## Critical Issues Addressed

### ✅ Completed Optimizations
1. **Canonical URLs**: Fixed to use `https://bag-tag.de` (without www)
2. **Robots.txt & Sitemap**: Updated with correct canonical URLs
3. **JSON-LD Schemas**: Added Organization and WebSite schemas
4. **Video Loading**: Changed from `preload="auto"` to `preload="metadata"`
5. **H1 Optimization**: Enhanced with primary keywords
6. **SEO Content**: Added 1000+ words of keyword-rich content
7. **Redirects**: Added .htaccess rules for www→non-www and HTTP→HTTPS
8. **Caching**: Configured browser caching for static assets

## Remaining Performance Improvements

### 🔴 High Priority

#### 1. Video File Size (CRITICAL)
**Issue**: `/assets/bagid-loop.mp4` is 25MB - this is far too large!

**Recommendations**:
```bash
# Compress video using ffmpeg
ffmpeg -i bagid-loop.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k bagid-loop-compressed.mp4

# Or convert to WebM for better compression
ffmpeg -i bagid-loop.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 bagid-loop.webm

# Target: Under 2-3MB for hero video
```

**Alternative**: Consider replacing with a poster image and lazy-load the video on user interaction.

#### 2. Add Video Poster Image
Create a poster image for the video to improve perceived performance:
```bash
# Extract first frame from video
ffmpeg -i bagid-loop.mp4 -ss 00:00:01 -vframes 1 assets/video-poster.jpg
```

Then optimize:
```bash
# Convert to WebP and optimize
cwebp -q 85 video-poster.jpg -o video-poster.webp
```

Already implemented in App.tsx - just need to create the poster file.

#### 3. Implement Route-Based Internationalization
**Current**: Uses query parameters (`?lang=de`)
**Target**: Use routes (`/de`, `/en`, `/nl`)

**Benefits**:
- Better SEO (each language version gets its own URL)
- Proper hreflang implementation
- Better indexing by search engines
- No duplicate content issues

**Implementation**: See Phase 3 in the main plan.

### 🟡 Medium Priority

#### 4. Lazy Load Images Below the Fold
Current product image uses `loading="eager"` which is correct for hero images.
Other images should use `loading="lazy"`:

```tsx
<img src="..." alt="..." loading="lazy" />
```

#### 5. Implement Critical CSS
Extract critical CSS for above-the-fold content and inline it in the HTML head.

```bash
# Using critical package
npm install --save-dev critical
```

#### 6. Add Preload for Key Resources
In `index.html`, preload critical resources:

```html
<link rel="preload" href="/assets/productimage.webp" as="image" type="image/webp">
<link rel="preload" href="/assets/tag.png" as="image">
```

#### 7. Optimize Tailwind CSS
Ensure PurgeCSS is properly configured to remove unused CSS:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of config
}
```

### 🟢 Nice to Have

#### 8. Add Service Worker for Offline Support
Implement a service worker for PWA capabilities:

```bash
npm install --save-dev workbox-webpack-plugin
```

#### 9. Implement Image CDN
Consider using a CDN like Cloudflare Images or ImageKit for automatic image optimization.

#### 10. Add Loading States
Add skeleton loaders for content that loads asynchronously.

## SSR/SSG Consideration

### Should You Migrate to SSR/SSG?

**Current State**: Pure React SPA (Client-Side Rendering)

**Pros of Staying with SPA**:
- Simpler deployment
- No server infrastructure needed
- Current setup with proper meta tags is "good enough" for most cases

**Cons**:
- Content not in initial HTML (search engines must execute JavaScript)
- Slower perceived performance on first load
- Harder to get optimal SEO scores

**Recommendation**: 
Given the current setup, **stay with the SPA approach** but implement these mitigations:
1. ✅ Proper meta tags (already done with react-helmet-async)
2. ✅ Comprehensive content sections (already done)
3. ⚠️ Consider pre-rendering static routes using tools like:
   - `vite-plugin-ssr` (now called `vike`)
   - `react-snap` or `react-snapshot`
   - Netlify/Vercel pre-rendering

### Pre-rendering Option (Recommended)

Install and configure pre-rendering:

```bash
npm install --save-dev vite-plugin-ssr
```

This will generate static HTML for key routes (`/`, `/impressum`) while keeping the app as a SPA.

## Monitoring & Analytics

### Lighthouse CI
Set up Lighthouse CI in GitHub Actions to track performance over time.

### Core Web Vitals
Monitor these metrics:
- **LCP (Largest Contentful Paint)**: Target < 2.5s
- **FID (First Input Delay)**: Target < 100ms
- **CLS (Cumulative Layout Shift)**: Target < 0.1

### Tools
- Google Search Console
- PageSpeed Insights
- WebPageTest
- GTmetrix

## Quick Wins Checklist

- [x] Fix canonical URLs (remove www)
- [x] Add JSON-LD schemas
- [x] Optimize video preload
- [x] Add comprehensive SEO content
- [x] Add .htaccess redirects and caching
- [ ] Compress video file (25MB → 2-3MB)
- [ ] Create and add video poster image
- [ ] Implement route-based i18n
- [ ] Add image lazy loading below fold
- [ ] Configure Tailwind purge
- [ ] Test and verify all changes in production

## Testing After Deployment

1. **Google Search Console**: Submit sitemap and request indexing
2. **Rich Results Test**: Verify JSON-LD schemas
3. **Lighthouse**: Run audit and aim for 90+ SEO score
4. **Mobile-Friendly Test**: Ensure mobile optimization
5. **PageSpeed Insights**: Check Core Web Vitals
6. **Test www redirect**: Verify `www.bag-tag.de` → `bag-tag.de`
7. **Test hreflang**: Use hreflang testing tools

## Additional Resources

- [Google Search Central](https://developers.google.com/search)
- [Web.dev](https://web.dev/)
- [Schema.org](https://schema.org/)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)
