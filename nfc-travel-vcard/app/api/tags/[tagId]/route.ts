import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { TagRepo } from '@/lib/TagRepo';
import { getTagById } from '@/core/tag.service';
import { mapErrorToHttpResponse } from '../../../../src/adapters/errorHandler';

export async function GET(
  request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const { tagId } = params;
    const tagData = await getTagById(tagId);
    return NextResponse.json(tagData);
  } catch (error) {
    const errorResponse = mapErrorToHttpResponse(error);
    return NextResponse.json(
      { error: errorResponse.message },
      { status: errorResponse.statusCode }
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
    const success = await repo.updateTravelDataByTagId(tagId, body);
    
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
