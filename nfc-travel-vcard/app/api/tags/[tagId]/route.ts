import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { TagRepo } from '@/lib/TagRepo';
import { internalApiError } from '@/lib/apiError';

export async function GET(
  request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const { tagId } = params;
    const repo = new TagRepo();
    const tagData = await repo.getTravelDataByTagId(tagId);
    
    if (!tagData) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tagData);
  } catch (error) {
    return internalApiError(request, 'GET /api/tags/[tagId]', error, {
      tagId: params?.tagId,
    });
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

    if (!success) {
      return NextResponse.json({ error: 'Failed to update tag' }, { status: 400 });
    }

    // Geocode destination address (non-fatal)
    if (body.destinationAddress && typeof body.destinationAddress === 'string') {
      try {
        const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(body.destinationAddress)}`;
        const geoRes = await fetch(geoUrl, {
          headers: { 'User-Agent': 'bag-tag.de/1.0 (contact@bag-tag.de)' },
          signal: AbortSignal.timeout(5000),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData[0]) {
            await repo.updateTravelDataByTagId(tagId, {
              destinationLat: parseFloat(geoData[0].lat),
              destinationLon: parseFloat(geoData[0].lon),
            });
          }
        }
      } catch {
        // geocoding failure must not block the response
      }
    }

    return NextResponse.json({ message: 'Tag updated successfully' });
  } catch (error) {
    return internalApiError(request, 'PUT /api/tags/[tagId]', error, {
      tagId: params?.tagId,
    });
  }
}
