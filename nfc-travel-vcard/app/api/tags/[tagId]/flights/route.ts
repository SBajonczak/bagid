import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { TagRepo } from '@/lib/TagRepo';
import { internalApiError } from '@/lib/apiError';
import { FlightLeg } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const { tagId } = params;
    const repo = new TagRepo();
    const legs = await repo.getFlightLegs(tagId);
    return NextResponse.json(legs);
  } catch (error) {
    return internalApiError(request, 'GET /api/tags/[tagId]/flights', error, { tagId: params?.tagId });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tagId } = params;
    const repo = new TagRepo();

    const isOwner = await repo.verifyTagOwner(tagId, user.sub);
    if (!isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const legs: FlightLeg[] = body.legs ?? [];

    await repo.setFlightLegs(tagId, legs);
    return NextResponse.json({ message: 'Flight legs updated' });
  } catch (error) {
    return internalApiError(request, 'PUT /api/tags/[tagId]/flights', error, { tagId: params?.tagId });
  }
}
