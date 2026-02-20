import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return unauthorizedResponse();

        const payload = verifyAccessToken(token);
        if (!payload) return unauthorizedResponse();

        const body = await request.json();
        const { status } = body;

        if (!status) return errorResponse('Status is required', 400);

        // Update the appointment status
        const appointment = await db.appointment.update({
            where: { id },
            data: { status },
            include: { patient: true, doctor: true }
        });

        // Synchronise bed count when admission starts/completes
        try {
            if (status === 'IN_PROGRESS') {
                // Occupy one bed if available > 0
                await db.hospital.update({
                    where: { id: appointment.hospitalId },
                    data: {
                        availableBeds: {
                            decrement: 1,
                        },
                    },
                });
            } else if (status === 'COMPLETED') {
                // Release a bed back to pool
                await db.hospital.update({
                    where: { id: appointment.hospitalId },
                    data: {
                        availableBeds: {
                            increment: 1,
                        },
                    },
                });
            }
        } catch (bedErr) {
            console.error('Bed count sync error', bedErr);
        }

        return successResponse(appointment, 'Grid Status Updated Successfully');

    } catch (error) {
        console.error('Update appointment error:', error);
        return errorResponse('Failed to update tactical record');
    }
}
