import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      message: 'Use /api/tags/{tagId} to fetch a specific tag.',
      example: '/api/tags/your-tag-id'
    },
    { status: 200 }
  );
}
