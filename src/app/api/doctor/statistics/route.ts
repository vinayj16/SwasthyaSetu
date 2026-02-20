import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return unauthorizedResponse();

        const payload = verifyAccessToken(token);
        if (!payload || payload.role !== 'DOCTOR') return unauthorizedResponse();

        const doctor = await db.doctor.findFirst({
            where: { userId: payload.userId }
        });

        if (!doctor) return errorResponse('Doctor profile not found', 404);

        const [todayAppointments, pendingSurgeries, totalPatients] = await Promise.all([
            db.appointment.count({
                where: {
                    doctorId: doctor.id,
                    appointmentAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                }
            }),
            (db as any).surgery_schedules?.count({
                where: {
                    doctorId: doctor.id,
                    status: 'SCHEDULED'
                }
            }) || 0,
            db.appointment.groupBy({
                by: ['patientId'],
                where: { doctorId: doctor.id },
                _count: true
            }).then(res => res.length)
        ]);

        return successResponse({
            todayAppointments,
            pendingSurgeries,
            totalPatients,
            criticalAlerts: Math.floor(Math.random() * 3) // Mocked for demo
        });

    } catch (error) {
        console.error('Doctor stats error:', error);
        return errorResponse('Failed to fetch doctor statistics');
    }
}
