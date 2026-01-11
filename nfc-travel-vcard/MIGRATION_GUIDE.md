# Next.js Migration Guide - NFC Travel vCard

## Overview

This application has been migrated from **React 18 + Vite** to **Next.js 14 with App Router** to improve SEO through Server-Side Rendering (SSR) and Static Site Generation (SSG).

## What Changed

### Build System
- **Before:** Vite 4
- **After:** Next.js 14 with App Router
- **Impact:** Faster builds, better optimization, native SSR support

### Routing
- **Before:** React Router DOM v7 (client-side only)
- **After:** Next.js App Router (file-based, supports SSR)
- **Migration:** All `<Link>` and `useNavigate` updated to Next.js equivalents

### Project Structure
```
Before (Vite):                 After (Next.js):
src/                          app/
├── components/               ├── components/
├── index.tsx                 ├── page.tsx (/)
├── App.tsx                   ├── layout.tsx
├── LanguageContext.tsx       ├── [tagId]/page.tsx
├── AuthContext.tsx           ├── [tagId]/edit/page.tsx
└── i18n.ts                   ├── register/[tagId]/page.tsx
                              ├── impressum/page.tsx
server/                       └── api/
└── api.js                        ├── user/tags/route.ts
                                  ├── tags/[tagId]/route.ts
                                  └── tag-owners/route.ts
                              lib/
                              ├── i18n.ts
                              ├── types.ts
                              ├── auth.ts
                              └── TagRepo.ts
```

### Authentication
- **Before:** MSAL Browser with custom AuthContext
- **After:** MSAL Browser with Next.js-compatible AuthProvider
- **Location:** `app/components/AuthProvider.tsx`
- **Usage:** Same hooks (`useAuth()`)

### Internationalization
- **Before:** React Context (`LanguageContext`)
- **After:** Client-side LanguageProvider
- **Languages:** de, en, nl, ko, ar, th (all preserved)
- **Usage:** `useLanguage()` returns `{ language, setLanguage }`

### API Routes
- **Before:** Express.js server (port 3001)
- **After:** Next.js API Routes (`app/api/`)
- **Migration:** All endpoints converted to Next.js route handlers

### SEO & Metadata
- **Before:** react-helmet-async (client-side)
- **After:** Next.js Metadata API (server-rendered)
- **Benefit:** Search engines see content immediately

## Installation & Setup

### 1. Install Dependencies

```bash
cd nfc-travel-vcard
npm install
```

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```bash
cp .env.local.example .env.local
```

Required variables:
- `AZURE_B2C_CLIENT_ID` - Azure B2C Application ID
- `AZURE_B2C_TENANT` - Your B2C tenant name
- `AZURE_B2C_POLICY` - Your B2C policy name
- `DB_SERVER` - MSSQL server address
- `DB_DATABASE` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`

### 3. Update Azure B2C Redirect URIs

In Azure Portal, update your B2C application:

**Add these redirect URIs:**
- `http://localhost:3000` (development)
- `https://your-domain.com` (production)

**Remove old URIs:**
- `http://localhost:5173` (Vite dev server)

### 4. Database Setup

The existing MSSQL database works without changes. The TagRepo has been migrated to TypeScript in `lib/TagRepo.ts`.

## Development

### Start Development Server

```bash
npm run dev
```

Application runs on **http://localhost:3000** (not 5173)

### Build for Production

```bash
npm run build
npm start
```

### Type Check

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Routing Changes

### Page Routes

| Old Route (React Router) | New Route (Next.js) | File Location |
|--------------------------|---------------------|---------------|
| `/` | `/` | `app/page.tsx` |
| `/:tagId` | `/[tagId]` | `app/[tagId]/page.tsx` |
| `/:tagId/edit` | `/[tagId]/edit` | `app/[tagId]/edit/page.tsx` |
| `/register/:tagId` | `/register/[tagId]` | `app/register/[tagId]/page.tsx` |
| `/impressum` | `/impressum` | `app/impressum/page.tsx` |

### API Routes

| Old Endpoint (Express) | New Endpoint (Next.js) | File Location |
|------------------------|------------------------|---------------|
| `GET /api/user/tags` | `GET /api/user/tags` | `app/api/user/tags/route.ts` |
| `GET /api/tags/:tagId` | `GET /api/tags/[tagId]` | `app/api/tags/[tagId]/route.ts` |
| `PUT /api/tags/:tagId` | `PUT /api/tags/[tagId]` | `app/api/tags/[tagId]/route.ts` |
| `GET /api/tags/:tagId/exists` | `GET /api/tags/[tagId]/exists` | `app/api/tags/[tagId]/exists/route.ts` |
| `POST /api/tag-owners` | `POST /api/tag-owners` | `app/api/tag-owners/route.ts` |
| `GET /api/tag-owners/:tagId/verify` | `GET /api/tag-owners/[tagId]/verify` | `app/api/tag-owners/[tagId]/verify/route.ts` |

## Component Migration

### Client Components

Components that use hooks, state, or browser APIs require `'use client'` directive:

- `AuthProvider.tsx`
- `LanguageProvider.tsx`
- `NavigationBar.tsx`
- `Dashboard.tsx`
- All Tag components
- All interactive components

### Server Components

Components that can be server-rendered (default in Next.js):

- Page layouts
- Static content
- Initial data fetching (when not using client state)

## Code Changes Required

### 1. Imports

**Before (Vite):**
```typescript
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { messages } from '../i18n';
```

**After (Next.js):**
```typescript
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from './components/LanguageProvider';
import { messages } from '@/lib/i18n';
```

### 2. Navigation

**Before:**
```typescript
const navigate = useNavigate();
navigate(`/${tagId}/edit`);
```

**After:**
```typescript
const router = useRouter();
router.push(`/${tagId}/edit`);
```

### 3. Language Context

**Before:**
```typescript
const { lang } = useLanguage();
```

**After:**
```typescript
const { language: lang } = useLanguage();
```

### 4. Authentication

**Before:**
```typescript
const isAuth = authService.isAuthenticated();
```

**After:**
```typescript
const { isAuthenticated, user, login, logout } = useAuth();
```

## Features Preserved

✅ **All existing functionality maintained:**
- Azure B2C authentication
- Multi-language support (6 languages)
- Tag registration and management
- Owner verification
- Dashboard
- Notification system
- All existing UI/UX

✅ **New capabilities:**
- Server-Side Rendering (SSR)
- Improved SEO
- Faster page loads
- Better performance
- Type-safe routing

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t nfc-travel-vcard .
docker run -p 3000:3000 nfc-travel-vcard
```

### Custom Server

```bash
npm run build
npm start
```

## Troubleshooting

### Issue: "Module not found"
**Solution:** Check import paths use `@/` prefix for absolute imports

### Issue: "Hydration mismatch"
**Solution:** Ensure client components have `'use client'` directive

### Issue: "Authentication not working"
**Solution:** Verify Azure B2C redirect URIs are updated

### Issue: "API routes return 404"
**Solution:** Restart dev server after creating new API routes

### Issue: "Database connection fails"
**Solution:** Check `.env.local` has correct database credentials

## Testing Checklist

- [ ] Home page loads and shows video
- [ ] Authentication login/logout works
- [ ] Dashboard shows user tags
- [ ] Tag view displays data correctly
- [ ] Tag edit saves successfully
- [ ] Tag registration works
- [ ] All languages work (de, en, nl, ko, ar, th)
- [ ] Navigation between pages works
- [ ] API endpoints respond correctly
- [ ] SEO meta tags appear in page source

## Support

For issues with the migration, check:
1. Next.js documentation: https://nextjs.org/docs
2. Azure B2C setup: https://learn.microsoft.com/azure/active-directory-b2c/
3. This repository's issues page

## Migration Completed

✅ **Phase 1:** Next.js initialization  
✅ **Phase 2:** API routes migration  
✅ **Phase 3:** Dynamic pages and routing  
✅ **Phase 4:** Component migration  
✅ **Phase 5:** Authentication & i18n  
✅ **Phase 6:** SEO & metadata  

**Status:** Migration complete and ready for testing
