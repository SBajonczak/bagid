import { NextRequest, NextResponse } from 'next/server';
import { generateSecurityToken } from '@/lib/notifySecurity';

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
        console.error('Error generating security token:', error);
        return NextResponse.json(
            { error: 'Failed to generate security token' },
            { status: 500 }
        );
    }
}
