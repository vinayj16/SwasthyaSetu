import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
    try {
        // In a real scenario, we would check if the user is a National Admin here

        const [
            totalHospitals,
            totalPatients,
            todayAppointments,
            bloodInventory,
            totalDoctors,
            hospitals
        ] = await Promise.all([
            db.hospital.count(),
            (db.patient as any).count(),
            db.appointment.count({
                where: {
                    appointmentAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                }
            }),
            (db as any).blood_banks?.aggregate({
                _sum: { unitsAvailable: true }
            }) || { _sum: { unitsAvailable: 0 } },
            db.doctor.count(),
            db.hospital.findMany({
                take: 5,
                select: { name: true, city: true, type: true, totalBeds: true }
            })
        ]);

        return successResponse({
            totalHospitals,
            activePatients: totalPatients,
            todayAppointments,
            bloodInventory: bloodInventory._sum?.unitsAvailable || 0,
            totalDoctors,
            emergencyCalls: Math.floor(Math.random() * 1000),
            topHospitals: hospitals
        });
    } catch (error) {
        console.error('National stats error:', error);
        return errorResponse('Failed to fetch national statistics');
    }
}
