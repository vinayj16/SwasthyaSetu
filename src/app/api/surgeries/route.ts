import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return unauthorizedResponse();

        const payload = verifyAccessToken(token);
        if (!payload || !['DOCTOR', 'HOSPITAL_ADMIN', 'RECEPTIONIST'].includes(payload.role)) {
            return errorResponse('Permission denied', 403);
        }

        const body = await request.json();
        const { patientHealthId, doctorId, operationName, otRoom, startTime, endTime, scheduledDate } = body;

        // 1. Conflict check
        const conflict = await db.surgerySchedule.findFirst({
            where: {
                otRoom,
                scheduledStartAt: new Date(scheduledDate),
                // Note: startTime/endTime fields don't exist in schema, using scheduledStartAt for conflict check
            }
        });

        if (conflict) {
            return errorResponse(`OT Room ${otRoom} is already booked for this time slot`, 409);
        }

        // 2. Create
        const surgery = await db.surgerySchedule.create({
            data: {
                surgeryNumber: `SRG-${Date.now()}`,
                hospitalId: payload.hospitalId || body.hospitalId,
                patientHealthId,
                doctorId,
                operationName,
                otRoom,
                scheduledStartAt: new Date(scheduledDate),
                scheduledEndAt: new Date(new Date(scheduledDate).getTime() + 2*60*60*1000), // +2h placeholder
                status: 'SCHEDULED'
            } as any
        });

        // 3. Audit
        await db.auditLog.create({
            data: {
                userId: payload.userId,
                action: 'SURGERY_SCHEDULED',
                entityType: 'SURGERY',
                entityId: surgery.id,
                metadata: JSON.stringify({ details: `Surgery ${operationName} scheduled` }),
                userIp: request.headers.get('x-forwarded-for') || 'internal'
            }
        });

        return successResponse(surgery, 'Surgery scheduled successfully');
    } catch (error) {
        console.error('Surgery API Error:', error);
        return errorResponse('Failed to schedule surgery');
    }
}
