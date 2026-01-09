# Deployment Guide for SEO-Optimized bag-tag.de

## Pre-Deployment Checklist

### Critical - Must Do Before Deployment

#### 1. Compress Video File (Required)
The `bagid-loop.mp4` file is currently 25MB - far too large for web use.

**Option A: H.264 (MP4) - Best compatibility**
```bash
cd nfc-travel-vcard/public/assets
ffmpeg -i bagid-loop.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart bagid-loop-compressed.mp4
# Rename the compressed version
mv bagid-loop.mp4 bagid-loop-original.mp4
mv bagid-loop-compressed.mp4 bagid-loop.mp4
```

**Option B: WebM - Better compression**
```bash
ffmpeg -i bagid-loop.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -c:a libopus -b:a 96k bagid-loop.webm
```

**Target**: Final video should be under 3MB

#### 2. Create Video Poster Image
```bash
cd nfc-travel-vcard/public/assets
# Extract first frame
ffmpeg -i bagid-loop.mp4 -ss 00:00:01 -vframes 1 -q:v 2 video-poster.jpg

# Optimize to WebP
cwebp -q 85 video-poster.jpg -o video-poster.webp
```

The poster is already referenced in `App.tsx`, just needs to be created.

### Optional but Recommended

#### 3. Update Organization Information
Edit `src/config/site.ts` and fill in:
- `organization.email` - Contact email
- `organization.address` - Physical address (if desired)
- `organization.sameAs` - Social media URLs

## Build Process

### 1. Install Dependencies
```bash
cd nfc-travel-vcard
npm install
```

### 2. Run Build
```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### 3. Verify Build
```bash
# Check dist folder exists and has files
ls -lh dist/

# Preview locally (optional)
npm run preview
```

## Deployment Steps

### For Apache Server (Recommended)

#### 1. Upload Files
Upload the entire contents of `dist/` folder to your web root:
- All HTML, JS, CSS files
- `assets/` folder
- `.htaccess` file (important!)
- `robots.txt`
- `sitemap.xml`
- `manifest.json`

#### 2. Verify Server Configuration
Ensure your Apache server has:
- `mod_rewrite` enabled
- `AllowOverride All` in your virtual host or `.htaccess` allowed

**Test mod_rewrite:**
```bash
# On server
a2enmod rewrite
systemctl restart apache2
```

#### 3. Set Permissions
```bash
# On server
chmod 644 dist/.htaccess
chmod 644 dist/robots.txt
chmod 644 dist/sitemap.xml
```

### For Nginx Server

If using Nginx, you'll need to convert `.htaccess` rules to Nginx config:

```nginx
server {
    listen 80;
    server_name bag-tag.de www.bag-tag.de;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.bag-tag.de;
    
    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Redirect www to non-www
    return 301 https://bag-tag.de$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bag-tag.de;
    
    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /var/www/bag-tag.de/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    # Browser caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location ~* \.(mp4|webm)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API routes (if needed)
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Verification

### Immediate Tests (After Upload)

1. **Test Root Redirect**
   ```
   https://bag-tag.de/
   Should redirect to: https://bag-tag.de/de
   ```

2. **Test www Redirect**
   ```
   https://www.bag-tag.de/
   Should redirect to: https://bag-tag.de/de
   ```

3. **Test HTTP Redirect**
   ```
   http://bag-tag.de/
   Should redirect to: https://bag-tag.de/de
   ```

4. **Test Language Routes**
   - https://bag-tag.de/de ✅
   - https://bag-tag.de/en ✅
   - https://bag-tag.de/nl ✅

5. **Test Sitemap**
   ```
   https://bag-tag.de/sitemap.xml
   Should load and show all language URLs
   ```

6. **Test Robots.txt**
   ```
   https://bag-tag.de/robots.txt
   Should show proper rules
   ```

### SEO Validation (Same Day)

1. **Google Rich Results Test**
   - Visit: https://search.google.com/test/rich-results
   - Enter: https://bag-tag.de/de
   - Verify all JSON-LD schemas are detected:
     - Product ✅
     - Organization ✅
     - WebSite ✅
     - FAQPage ✅

2. **Hreflang Validator**
   - Use: https://www.sistrix.com/hreflang-validator/
   - Enter: https://bag-tag.de/de
   - Verify no errors

3. **Lighthouse Audit**
   ```bash
   # Install Lighthouse CLI
   npm install -g @lhci/cli
   
   # Run audit
   lhci autorun --collect.url=https://bag-tag.de/de
   ```
   
   **Target Scores:**
   - Performance: 90+ (after video compression)
   - SEO: 95+
   - Accessibility: 90+
   - Best Practices: 90+

4. **Mobile-Friendly Test**
   - Visit: https://search.google.com/test/mobile-friendly
   - Enter: https://bag-tag.de/de
   - Should pass all checks

### Google Search Console (Within 24 Hours)

1. **Add Property**
   - Add: `https://bag-tag.de`
   - Verify ownership (HTML file upload or DNS)

2. **Submit Sitemap**
   - Navigate to: Sitemaps section
   - Add: `https://bag-tag.de/sitemap.xml`
   - Submit

3. **Request Indexing**
   - Request indexing for:
     - https://bag-tag.de/de
     - https://bag-tag.de/en
     - https://bag-tag.de/nl

4. **Check Hreflang Report**
   - After 3-7 days, check "International Targeting" report
   - Verify no hreflang errors

## Monitoring (Ongoing)

### Week 1
- Check Google Search Console daily for:
  - Crawl errors
  - Index coverage
  - Mobile usability issues

### Week 2-4
- Monitor keyword rankings:
  - "NFC Gepäckanhänger"
  - "digitaler Gepäckanhänger"
  - "NFC luggage tag"
  
- Track in Google Analytics:
  - Organic traffic growth
  - Bounce rate
  - Time on page

### Monthly
- Run Lighthouse audits
- Check Core Web Vitals in GSC
- Monitor backlinks (if using tool)
- Review and adjust based on Search Console insights

## Troubleshooting

### "404 Not Found" on Language Routes
**Problem**: `/de`, `/en` routes don't work  
**Solution**: 
- Apache: Verify `mod_rewrite` is enabled and `.htaccess` is uploaded
- Nginx: Verify `try_files` directive is set correctly

### "www" Not Redirecting
**Problem**: `www.bag-tag.de` doesn't redirect  
**Solution**:
- Check `.htaccess` RewriteCond rules
- Verify DNS has both A records (with and without www)

### JSON-LD Not Detected
**Problem**: Google Rich Results Test doesn't see schemas  
**Solution**:
- View page source, confirm JSON-LD is in `<head>`
- Check for JavaScript errors in console
- Wait 24-48 hours for indexing

### Video Not Loading
**Problem**: Hero video doesn't play  
**Solution**:
- Check video file path in `dist/assets/`
- Verify poster image exists
- Check browser console for errors
- Ensure video MIME types are set correctly

## Rollback Plan

If issues occur after deployment:

1. **Quick Rollback**
   ```bash
   # Restore previous version
   mv dist/ dist-new/
   mv dist-backup/ dist/
   ```

2. **Partial Rollback**
   - Keep new `.htaccess` (redirects are safe)
   - Revert to old routing structure if language routes cause issues

## Success Criteria

### Day 1
- ✅ All routes work correctly
- ✅ Redirects function properly
- ✅ No JavaScript errors
- ✅ All images/videos load

### Week 1
- ✅ All pages indexed in Google
- ✅ No crawl errors in GSC
- ✅ Hreflang working correctly

### Month 1
- ✅ Organic traffic +20%
- ✅ Keyword rankings improved
- ✅ Lighthouse scores: 90+

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review commit history for recent changes
3. Check browser console and server logs
4. Refer to `SEO_OPTIMIZATION_SUMMARY.md` for implementation details

## Final Notes

- **Video compression is critical** - don't skip this step
- **Test thoroughly** before announcing the new site
- **Monitor closely** for the first week after deployment
- **Be patient** - SEO results take 2-4 weeks to show

Good luck with your deployment! 🚀
