import { NextRequest, NextResponse } from 'next/server';
import { TagRepo } from '@/lib/TagRepo';

export async function GET(
  request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const { tagId } = params;
    const repo = new TagRepo();
    
    const exists = await repo.tagExists(tagId);
    if (!exists) {
      return NextResponse.json(
        { exists: false, registered: false },
        { status: 200 }
      );
    }
    
    const isRegistered = await repo.isTagRegistered(tagId);
    
    return NextResponse.json({
      exists: true,
      registered: isRegistered
    });
  } catch (error) {
    console.error('Error checking tag:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
