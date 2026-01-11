import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { TagRepo } from '@/lib/TagRepo';

export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { tagId, userId, userEmail } = await request.json();

    // Validate that the user in the token matches the request
    if (user.sub !== userId) {
      return NextResponse.json(
        { error: 'User ID mismatch' },
        { status: 403 }
      );
    }

    const repo = new TagRepo();
    const success = await repo.registerTagOwner(tagId, userId, userEmail);
    
    if (success) {
      return NextResponse.json({ message: 'Tag successfully registered' });
    } else {
      return NextResponse.json(
        { error: 'Failed to register tag' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error registering tag:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
