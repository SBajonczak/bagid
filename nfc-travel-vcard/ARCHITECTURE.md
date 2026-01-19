# Backend Architecture: Three Execution Modes

This codebase supports three execution modes with a single, unified business logic layer:

1. **Local Development** with Express (port 3001)
2. **Production Deployment** on Vercel using Next.js API Routes (no Express)
3. **Dockerized Execution** running both Express (port 3001) and Next.js (port 3000)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Adapters Layer                        │
│  ┌─────────────────────┐  ┌──────────────────────────┐ │
│  │  Express Adapter    │  │  Next.js API Routes      │ │
│  │  (Express Router)   │  │  (App Router)            │ │
│  └─────────┬───────────┘  └──────────┬───────────────┘ │
│            │                         │                  │
└────────────┼─────────────────────────┼──────────────────┘
             │                         │
             └─────────┬───────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│              Core Business Logic                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  src/core/tag.service.ts                         │   │
│  │  - Framework-agnostic                            │   │
│  │  - No Express/Next.js imports                    │   │
│  │  - Pure business logic                           │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

## Directory Structure

```
nfc-travel-vcard/
├── src/
│   ├── core/
│   │   └── tag.service.ts          # Framework-agnostic business logic
│   └── adapters/
│       └── express/
│           └── tag.routes.ts       # Express adapter
├── app/
│   └── api/
│       └── tags/
│           └── [tagId]/
│               └── route.ts        # Next.js API Route adapter
├── server.ts                       # Express bootstrap (local & Docker only)
├── Dockerfile                      # Docker configuration
└── tsconfig.server.json            # TypeScript config for Express server
```

## Core Business Logic

The `src/core/tag.service.ts` module contains framework-agnostic business logic:

- **No framework imports**: Does not import Express or Next.js
- **No HTTP handling**: Throws errors instead of returning HTTP responses
- **No direct environment access**: Uses existing configuration modules
- **Reusable**: Called by both Express and Next.js adapters

### Example: getTagById

```typescript
export async function getTagById(tagId: string): Promise<unknown> {
  validateTagId(tagId);
  const repo = new TagRepo();
  const tagData = await repo.getTravelDataByTagId(tagId);
  if (!tagData) {
    throw new Error('Tag not found');
  }
  return tagData;
}
```

## Execution Modes

### 1. Local Development (Express)

Run the Express API server for local development:

```bash
npm run dev:express
```

The Express server will:
- Listen on port 3001
- Load environment variables from `.env.local`
- Expose endpoints:
  - `GET http://localhost:3001/health` - Health check
  - `GET http://localhost:3001/api/tags/:tagId` - Get tag by ID

**Test it:**
```bash
curl http://localhost:3001/api/tags/demo
```

### 2. Local Development (Next.js)

Run the Next.js development server:

```bash
npm run dev
```

The Next.js server will:
- Listen on port 3000
- Load environment variables from `.env.local`
- Expose API routes through Next.js App Router
- Expose endpoint:
  - `GET http://localhost:3000/api/tags/:tagId` - Get tag by ID

**Test it:**
```bash
curl http://localhost:3000/api/tags/demo
```

### 3. Local Development (Both)

Run both Express and Next.js servers simultaneously:

```bash
npm run dev:all
```

This uses `concurrently` to run:
- Express API on port 3001
- Next.js on port 3000

### 4. Production (Vercel)

Deploy to Vercel (production):

```bash
npm run build
npm start
```

In production:
- Only Next.js API Routes are available
- Express code is excluded via `vercel.json` configuration
- No Express runtime is included in the deployment
- Endpoints available through Next.js only

### 5. Docker

Build and run the Docker container:

```bash
docker build -t nfc-travel-vcard .
docker run -p 3000:3000 -p 3001:3001 -p 8090:8090 nfc-travel-vcard
```

The Docker container:
- Builds the Next.js application
- Runs both Express (port 3001) and Next.js (port 3000) using supervisor
- Runs nginx as reverse proxy (port 8090)
- Both APIs are available inside the container

**Test it:**
```bash
# Test Express API
curl http://localhost:3001/api/tags/demo

# Test Next.js API
curl http://localhost:3000/api/tags/demo
```

## Configuration

### Environment Variables

Create a `.env.local` file in the `nfc-travel-vcard/` directory:

```bash
# Database Configuration
DB_PROVIDER=turso
TURSO_DATABASE_URL=file:./local.db
TURSO_AUTH_TOKEN=dummy

# Azure B2C
AZURE_B2C_CLIENT_ID=your-client-id
AZURE_B2C_TENANT=your-tenant
AZURE_B2C_POLICY=your-policy
AZURE_B2C_TENANT_ID=your-tenant-id

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Security
NOTIFY_TOKEN_SECRET=your-token-secret

# Email Configuration
MAILGUN_API_KEY=your-key
MAILGUN_DOMAIN=your-domain
MAILGUN_FROM_EMAIL=noreply@example.com
MAILGUN_FROM_NAME=Your App

# SMS Configuration
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_FROM_NUMBER=+1234567890

# Feature Flags
FEATURE_EMAIL_NOTIFICATIONS=false
FEATURE_SMS_NOTIFICATIONS=false
```

### Vercel Configuration

The `vercel.json` file ensures Express code is not deployed:

```json
{
  "buildCommand": "next build",
  "framework": "nextjs",
  "excludeFiles": [
    "server.ts",
    "src/adapters/express/**"
  ]
}
```

## Adding New Endpoints

To add a new endpoint that works in all three modes:

### 1. Add Business Logic

Create or update a service in `src/core/`:

```typescript
// src/core/tag.service.ts
export async function updateTagById(
  tagId: string, 
  data: Record<string, unknown>
): Promise<boolean> {
  validateTagId(tagId);
  validateTagData(data);
  const repo = new TagRepo();
  return await repo.updateTravelDataByTagId(tagId, data);
}
```

### 2. Add Express Adapter

Update `src/adapters/express/tag.routes.ts`:

```typescript
router.put('/:tagId', async (req: Request, res: Response) => {
  try {
    const tagId = req.params.tagId;
    if (Array.isArray(tagId)) {
      return res.status(400).json({ error: 'Invalid tag ID format' });
    }
    
    const success = await updateTagById(tagId, req.body);
    if (success) {
      return res.json({ message: 'Tag updated successfully' });
    }
    return res.status(400).json({ error: 'Failed to update tag' });
  } catch (error) {
    // Error handling...
  }
});
```

### 3. Add Next.js API Route

Update or create a route in `app/api/tags/[tagId]/route.ts`:

```typescript
export async function PUT(
  request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const { tagId } = params;
    const body = await request.json();
    const success = await updateTagById(tagId, body);
    
    if (success) {
      return NextResponse.json({ message: 'Tag updated successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to update tag' },
      { status: 400 }
    );
  } catch (error) {
    // Error handling...
  }
}
```

## Testing

### Type Checking

```bash
npm run type-check
```

### Building

```bash
npm run build
```

### Manual Testing

Test Express API:
```bash
npm run dev:express
curl http://localhost:3001/api/tags/demo
```

Test Next.js API:
```bash
npm run dev
curl http://localhost:3000/api/tags/demo
```

Test Docker:
```bash
docker build -t nfc-travel-vcard .
docker run -p 3000:3000 -p 3001:3001 nfc-travel-vcard
curl http://localhost:3001/api/tags/demo
curl http://localhost:3000/api/tags/demo
```

## Key Principles

1. **Framework-Agnostic Business Logic**: Core logic has no dependencies on Express or Next.js
2. **Adapter Pattern**: Adapters translate between HTTP frameworks and business logic
3. **No Code Duplication**: Single source of truth for business logic
4. **Clean Separation**: Each layer has a clear responsibility
5. **Production Ready**: TypeScript strict mode compatible
6. **Docker Compatible**: Works in containers without code modifications
7. **Vercel Compatible**: Deploys without Express runtime

## Troubleshooting

### "Module not found" errors

Ensure path aliases are configured in `tsconfig.json`:
```json
"paths": {
  "@/core/*": ["./src/core/*"],
  "@/adapters/*": ["./src/adapters/*"]
}
```

### Environment variables not loading

Ensure `.env.local` exists and is in the correct directory. For Express, dotenv is loaded in `server.ts`.

### Port conflicts

- Express: port 3001 (configurable via `EXPRESS_PORT` env var)
- Next.js: port 3000
- nginx (Docker): port 8090

### Docker build fails

Ensure all dependencies are installed and `npm run build` succeeds locally first.

## Contributing

When adding new features:

1. Implement business logic in `src/core/`
2. Create adapters for both Express and Next.js
3. Test all three execution modes
4. Update this documentation
