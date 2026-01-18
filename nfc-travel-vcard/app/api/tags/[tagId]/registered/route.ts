import { NextRequest, NextResponse } from 'next/server';
import { TagRepo } from '@/lib/TagRepo';

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
    console.error('Error checking if tag is registered:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
