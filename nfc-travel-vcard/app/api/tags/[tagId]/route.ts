import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { TagRepo } from '@/lib/TagRepo';

export async function GET(
  request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const { tagId } = params;
    const repo = new TagRepo();
    const tagData = await repo.getTagData(tagId);
    
    if (!tagData) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tagData);
  } catch (error) {
    console.error('Error fetching tag data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
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
    const body = await request.json();
    
    const repo = new TagRepo();
    
    // Verify ownership
    const isOwner = await repo.verifyTagOwner(tagId, user.sub);
    if (!isOwner) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    // Update tag data
    const success = await repo.updateTagData(tagId, body);
    
    if (success) {
      return NextResponse.json({ message: 'Tag updated successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to update tag' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
