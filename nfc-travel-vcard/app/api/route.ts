import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'bag-tag-api',
    message: 'API root is reachable',
    endpoints: {
      health: '/api',
      tagsById: '/api/tags/{tagId}',
      notify: '/api/notify'
    }
  });
}
