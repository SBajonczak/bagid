import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { TagRepo } from '@/lib/TagRepo';

export async function GET(
  request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const user = await verifyToken(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { tagId } = params;
    const repo = new TagRepo();
    
    const isOwner = await repo.verifyTagOwner(tagId, user.sub);
    
    if (!isOwner) {
      return NextResponse.json(
        { error: 'You are not the owner' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error('Error verifying tag ownership:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
