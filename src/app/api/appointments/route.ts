import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        // FOR DEMO: If no token, return high-density mock data
        if (!token) {
            const mockData = [
                {
                    id: 'apt1',
                    appointmentNumber: 'NHA-4592',
                    appointmentTime: '09:30',
                    appointmentAt: new Date(),
                    status: 'IN_PROGRESS',
                    patient: { name: 'Vikram Singh', uhid: 'IND-HID-2024-8849' },
                    doctor: { name: 'Dr. Aranya Sharma', specialization: 'CARDIOLOGY' }
                },
                {
                    id: 'apt2',
                    appointmentNumber: 'NHA-4593',
                    appointmentTime: '10:15',
                    appointmentAt: new Date(),
                    status: 'BOOKED',
                    patient: { name: 'Sanjana Reddy', uhid: 'IND-HID-2024-1102' },
                    doctor: { name: 'Dr. Kabir Malik', specialization: 'NEUROLOGY' }
                },
                {
                    id: 'apt3',
                    appointmentNumber: 'NHA-4594',
                    appointmentTime: '11:00',
                    appointmentAt: new Date(),
                    status: 'BOOKED',
                    patient: { name: 'Rahul Verma', uhid: 'IND-HID-2024-5563' },
                    doctor: { name: 'Dr. Aranya Sharma', specialization: 'CARDIOLOGY' }
                }
            ];
            return successResponse(mockData);
        }

        const payload = verifyAccessToken(token);
        if (!payload) {
            // Fallback to mock if token invalid but in demo mode
            return successResponse([]);
        }

        let appointments;

        // HOSPITAL-WISE ISOLATION LOGIC
        if (['DOCTOR', 'RECEPTIONIST', 'HOSPITAL_ADMIN'].includes(payload.role)) {
            if (!payload.hospitalId) return errorResponse('Hospital context missing', 400);

            appointments = await db.appointment.findMany({
                where: { hospitalId: payload.hospitalId },
                include: { patient: true, doctor: true },
                orderBy: { appointmentAt: 'desc' }
            });
        } else if (payload.role === 'PATIENT') {
            const patient = await db.patient.findFirst({ where: { userId: payload.userId } });
            appointments = await db.appointment.findMany({
                where: { patientId: patient?.id },
                include: { doctor: { include: { hospital: true } } },
                orderBy: { appointmentAt: 'desc' }
            });
        }

        return successResponse(appointments);
    } catch (error) {
        return errorResponse('Database Query Error');
    }
}
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return unauthorizedResponse();

        const payload = verifyAccessToken(token);
        if (!payload || payload.role !== 'PATIENT') {
            return errorResponse('Only validated citizen identities can book appointments', 403);
        }

        const body = await request.json();
        const { doctorId, hospitalId, appointmentAt, reason } = body;

        if (!doctorId || !hospitalId || !appointmentAt) {
            return errorResponse('Node coordinates (Doctor/Hospital/Time) missing', 400);
        }

        const patient = await db.patient.findFirst({
            where: { userId: payload.userId }
        });

        if (!patient) return errorResponse('Citizen node profile not found', 404);

        // Generate high-entropy appointment number
        const appointmentNumber = `NHA-${Math.floor(Math.random() * 900000 + 100000)}`;

        const appointment = await db.appointment.create({
            data: {
                appointmentNumber,
                patientId: patient.id,
                doctorId,
                hospitalId,
                appointmentAt: new Date(appointmentAt),
                reason,
                status: 'BOOKED'
            },
            include: { doctor: true, hospital: true }
        });

        return successResponse(appointment, 'Grid Allocation Successful - Identity Queued');

    } catch (error) {
        console.error('Booking error:', error);
        return errorResponse('Node Allocation Failed');
    }
}
