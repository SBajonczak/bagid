import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { TagRepo } from '@/lib/TagRepo';
import { internalApiError } from '@/lib/apiError';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const repo = new TagRepo();
    const tags = await repo.getUserTags(user.sub);
    
    return NextResponse.json(tags);
  } catch (error) {
    return internalApiError(request, 'GET /api/user/tags', error);
  }
}
