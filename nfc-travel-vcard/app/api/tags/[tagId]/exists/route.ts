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
   if (tagId==="demo")
   
      return NextResponse.json(
        { exists: true, registered: true },
        { status: 200 }
      );
   ;
    const exists = await repo.tagExists(tagId);
    if (!exists) {
      return NextResponse.json(
        { exists: false, registered: false },
        { status: 200 }
      );
    }
    
    const isRegistered = await repo.tagRegistered(tagId);
    
    return NextResponse.json({
      exists: true,
      registered: isRegistered
    });
  } catch (error) {
    return internalApiError(request, 'GET /api/tags/[tagId]/exists', error, {
      tagId: params?.tagId,
    });
  }
}
