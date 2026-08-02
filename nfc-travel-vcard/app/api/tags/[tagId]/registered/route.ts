import { NextRequest, NextResponse } from 'next/server';
import { TagRepo } from '@/lib/TagRepo';
import { internalApiError } from '@/lib/apiError';

export async function GET(
  request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const { tagId } = params;
    const repo = new TagRepo();
    
    // For demo tag
    if (tagId === "demo") {
      return NextResponse.json({ exists: true });
    }

    const exists = await repo.tagRegistered(tagId);

    return NextResponse.json({ exists });
  } catch (error) {
    return internalApiError(request, 'GET /api/tags/[tagId]/registered', error, {
      tagId: params?.tagId,
    });
  }
}
