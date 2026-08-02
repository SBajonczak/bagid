import { NextRequest, NextResponse } from 'next/server';
import { generateSecurityToken } from '@/lib/notifySecurity';
import { internalApiError } from '@/lib/apiError';

export const runtime = 'nodejs';

export async function GET(
    _request: NextRequest,
    { params }: { params: { tagId: string } }
) {
    const tagId = params.tagId?.trim();
    if (tagId !== "demo") {
        if (!tagId || tagId.length < 5) {
            return NextResponse.json(
                { error: 'Invalid tag ID' },
                { status: 400 }
            );
        }
    }
    try {
        const token = generateSecurityToken(tagId);
        return NextResponse.json({ token });
    } catch (error) {
        return internalApiError(request, 'GET /api/notify/token/[tagId]', error, {
            tagId,
        });
    }
}
