# NFC Travel vCard - Bag-Tag.de

This project is a React application for managing NFC travel luggage tags. Users can register NFC tags, manage their travel data through a user-friendly interface, and ensure their luggage can be identified if lost.

## Recent SEO Optimization (January 2026)

This application has been comprehensively optimized for search engine visibility. See [`SEO_OPTIMIZATION_SUMMARY.md`](./SEO_OPTIMIZATION_SUMMARY.md) for complete details.

### Key SEO Features
- **Route-based Internationalization**: `/de`, `/en`, `/nl` language routes
- **Canonical URLs**: Standardized to `https://bag-tag.de` (no www)
- **Structured Data**: Organization, WebSite, Product, and FAQPage schemas
- **SEO-Optimized Content**: 1000+ words targeting key search terms
- **Performance**: Optimized video loading, browser caching, and compression

## Features

- Multi-language support (German, English, Dutch, Korean, Arabic, Thai)
- User authentication via Azure B2C
- NFC tag registration and management
- Travel information cards with contact details
- QR code and NFC-based tag identification
- GDPR-compliant data handling

## Project Structure

```
nfc-travel-vcard
├── public
│   ├── .htaccess              # Server configuration (redirects, caching)
│   ├── robots.txt             # Search engine crawling rules
│   ├── sitemap.xml            # Multi-language sitemap
│   └── assets                 # Images, videos, icons
├── src
│   ├── components             # React components
│   ├── config
│   │   └── site.ts           # Centralized site configuration
│   ├── styles                 # CSS styles
│   ├── services               # API services
│   ├── i18n.ts               # Internationalization messages
│   ├── LanguageContext.tsx   # Language routing context
│   ├── App.tsx               # Main application component
│   └── index.tsx             # Entry point with routing
├── SEO_OPTIMIZATION_SUMMARY.md      # SEO changes documentation
├── PERFORMANCE_RECOMMENDATIONS.md   # Performance optimization guide
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nfc-travel-vcard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` - it will redirect to `http://localhost:3000/de`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Routing Structure

The application uses route-based internationalization:

- `/` → Redirects to `/de` (default language)
- `/de` → German homepage
- `/en` → English homepage  
- `/nl` → Dutch homepage
- `/:lang/:tagId` → View a specific tag's information
- `/:lang/:tagId/edit` → Edit tag information (requires authentication)
- `/:lang/register/:tagId` → Register a new tag
- `/:lang/impressum` → Imprint (legal information)
- `/:lang/app` → Dashboard (requires authentication)

## Language Switching

Users can switch languages using the flag icons. The URL will update to reflect the selected language (e.g., `/de` → `/en`).

## SEO Configuration

Site-wide SEO settings can be modified in `src/config/site.ts`:

```typescript
export const siteConfig = {
  siteUrl: 'https://bag-tag.de',
  siteName: 'Bag-Tag.de',
  defaultLanguage: 'de',
  // ... more configuration
}
```

## Deployment

1. Build the application: `npm run build`
2. Upload the `dist/` folder to your web server
3. Ensure `.htaccess` is uploaded for proper redirects
4. Verify `mod_rewrite` is enabled on Apache server

### Post-Deployment Checklist
- [ ] Verify `/` redirects to `/de`
- [ ] Test all language routes
- [ ] Check that `www.bag-tag.de` redirects to `bag-tag.de`
- [ ] Submit sitemap to Google Search Console
- [ ] Validate JSON-LD schemas with Google Rich Results Test

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Documentation

- [SEO Optimization Summary](./SEO_OPTIMIZATION_SUMMARY.md) - Complete SEO improvements overview
- [Performance Recommendations](./PERFORMANCE_RECOMMENDATIONS.md) - Additional optimization tips