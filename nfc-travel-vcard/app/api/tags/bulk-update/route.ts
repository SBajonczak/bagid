import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { TagRepo } from '@/lib/TagRepo';
import { internalApiError } from '@/lib/apiError';

export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { tagIds, data } = body as { tagIds: string[]; data: Record<string, string> };

    if (!Array.isArray(tagIds) || tagIds.length === 0) {
      return NextResponse.json({ error: 'No tagIds provided' }, { status: 400 });
    }

    // Only apply fields that have a non-empty value
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== '' && v != null)
    );

    const repo = new TagRepo();
    let updated = 0;
    const failed: string[] = [];

    for (const tagId of tagIds) {
      const isOwner = await repo.verifyTagOwner(tagId, user.sub);
      if (!isOwner) {
        failed.push(tagId);
        continue;
      }
      const success = await repo.updateTravelDataByTagId(tagId, filteredData);
      if (success) {
        updated++;
      } else {
        failed.push(tagId);
      }
    }

    return NextResponse.json({ updated, failed });
  } catch (error) {
    return internalApiError(request, 'POST /api/tags/bulk-update', error, {});
  }
}
