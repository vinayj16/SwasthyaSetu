import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function PATCH(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return unauthorizedResponse();

        const payload = verifyAccessToken(token);
        if (!payload || !['HOSPITAL_ADMIN', 'RECEPTIONIST'].includes(payload.role)) {
            return errorResponse('Permission denied', 403);
        }

        const body = await request.json();
        const { bloodGroupId, unitsAvailable, unitsReserved } = body;

        const updated = await db.bloodBank.update({
            where: { id: bloodGroupId },
            data: {
                unitsAvailable,
                unitsReserved,
                lastUpdated: new Date()
            }
        });

        // Log the change for audit
        await db.auditLog.create({
            data: {
                userId: payload.userId,
                action: 'BLOOD_STOCK_UPDATE',
                entityType: 'BLOOD_BANK',
                entityId: bloodGroupId,
                metadata: JSON.stringify({ unitsAvailable, unitsReserved }),
                userIp: request.headers.get('x-forwarded-for') || 'unknown'
            }
        });

        return successResponse(updated, 'Blood stock updated');
    } catch (error) {
        return errorResponse('Failed to update blood stock');
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get('hospitalId');

    try {
        const stock = await db.bloodBank.findMany({
            where: hospitalId ? { hospitalId } : {},
            include: { hospital: { select: { name: true, city: true } } }
        });
        return successResponse(stock);
    } catch (error) {
        return errorResponse('Failed to fetch blood stock');
    }
}
