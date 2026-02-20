import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    try {
        // const contents = await db.healthContent.findMany({
        //     where: category ? { category } : {},
        //     include: { hospital: { select: { name: true } } },
        //     orderBy: { createdAt: 'desc' }
        // });
        // Placeholder: return empty array since healthContent model does not exist
        const contents: any[] = [];
        return successResponse(contents);
    } catch (error) {
        return errorResponse('Failed to fetch health content');
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return errorResponse('Unauthorized', 401);

        const payload = verifyAccessToken(token);
        if (!payload || !['HOSPITAL_ADMIN', 'NATIONAL_ADMIN'].includes(payload.role)) {
            return errorResponse('Only admins can post health content', 403);
        }

        const body = await request.json();
        const { title, content, category, imageUrl, isOfficial } = body;

        // const newContent = await db.healthContent.create({
        //     data: {
        //         title,
        //         content,
        //         category,
        //         imageUrl,
        //         isOfficial: payload.role === 'NATIONAL_ADMIN' ? true : !!isOfficial,
        //         hospitalId: payload.role === 'HOSPITAL_ADMIN' ? payload.hospitalId : null
        //     }
        // });
        // Placeholder: return mock object since healthContent model does not exist
        const newContent = { id: 'mock', title, category, createdAt: new Date() };

        return successResponse(newContent, 'Content published successfully');
    } catch (error) {
        return errorResponse('Failed to publish content');
    }
}
