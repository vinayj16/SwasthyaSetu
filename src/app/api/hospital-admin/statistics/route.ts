import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';
import { verifyAccessToken, JWTPayload } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return errorResponse('Unauthorized', 401);

        const payload = verifyAccessToken(token) as JWTPayload;
        if (!payload || payload.role !== 'HOSPITAL_ADMIN') {
            return errorResponse('Forbidden', 403);
        }

        const hospitalId = payload.hospitalId;
        if (!hospitalId) return errorResponse('Hospital context missing', 400);

        const [
            hospital,
            doctorCount,
            staffCount,
            bloodStock,
            appointmentsToday,
            surgeriesScheduled
        ] = await Promise.all([
            db.hospital.findUnique({
                where: { id: hospitalId }
            }),
            db.doctor.count({ where: { hospitalId } }),
            (db as any).employees.count({ where: { hospitalId } }),
            (db as any).blood_banks.findMany({ where: { hospitalId } }),
            db.appointment.count({
                where: {
                    hospitalId,
                    appointmentAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                }
            }),
            (db as any).surgery_schedules.count({
                where: {
                    hospitalId,
                    scheduledStartAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                }
            })
        ]);

        if (!hospital) return errorResponse('Hospital not found', 404);

        return successResponse({
            hospitalName: hospital.name,
            stats: {
                totalBeds: hospital.totalBeds,
                availableBeds: hospital.availableBeds,
                icuBeds: hospital.icuBeds,
                otRooms: hospital.otRooms,
                doctors: doctorCount,
                staff: staffCount,
                appointmentsToday,
                surgeriesScheduled
            },
            bloodStock: bloodStock.map((b: any) => ({
                bloodGroup: b.bloodGroup,
                unitsAvailable: b.unitsAvailable
            }))
        });
    } catch (error) {
        console.error('Hospital admin stats error:', error);
        return errorResponse('Internal server error');
    }
}
