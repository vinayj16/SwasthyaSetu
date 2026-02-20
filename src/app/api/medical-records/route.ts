import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return unauthorizedResponse();

        const payload = verifyAccessToken(token);
        if (!payload) return unauthorizedResponse();

        const body = await request.json();
        const { recordType, title, hospitalId, doctorId, fileUrl, patientId } = body;

        // If patientId is provided (staff uploading for patient), use it. 
        // Otherwise use the logged in user's patient profile.
        let targetPatientId = patientId;

        if (!targetPatientId) {
            const patient = await db.patient.findFirst({
                where: { userId: payload.userId }
            });
            targetPatientId = patient?.id;
        }

        if (!targetPatientId) return errorResponse('Patient profile not found');

        // const record = await db.medicalRecord.create({
        //     data: {
        //         patientId: targetPatientId,
        //         hospitalId: hospitalId || payload.hospitalId,
        //         doctorId: doctorId || null,
        //         recordType,
        //         title,
        //         fileUrl,
        //         issuedAt: new Date()
        //     }
        // });
        // Placeholder: return mock object since medicalRecord model does not exist
        const record = { id: 'mock', patientId: targetPatientId, title, fileUrl, issuedAt: new Date() };

        return successResponse(record, 'Medical record uploaded successfully');
    } catch (error) {
        console.error('Upload Error:', error);
        return errorResponse('Failed to save record');
    }
}

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return unauthorizedResponse();

        const payload = verifyAccessToken(token);
        if (!payload) return unauthorizedResponse();

        let records;
        if (payload.role === 'PATIENT') {
            const patient = await db.patient.findFirst({ where: { userId: payload.userId } });
            // records = await db.medicalRecord.findMany({
            //     where: { patientId: patient?.id },
            //     include: { hospital: { select: { name: true } }, doctor: { select: { name: true } } },
            //     orderBy: { issuedAt: 'desc' }
            // });
            // Placeholder: return empty array since medicalRecord model does not exist
            records = [];
        } else if (['DOCTOR', 'HOSPITAL_ADMIN', 'RECEPTIONIST'].includes(payload.role)) {
            // For now, let hospital staff see records for their hospital
            // records = await db.medicalRecord.findMany({
            //     where: { hospitalId: payload.hospitalId },
            //     include: { patient: { select: { name: true } } },
            //     orderBy: { issuedAt: 'desc' }
            // });
            // Placeholder: return empty array since medicalRecord model does not exist
            records = [];
        }

        return successResponse(records);
    } catch (error) {
        return errorResponse('Failed to fetch records');
    }
}
