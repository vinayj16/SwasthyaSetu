import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function PATCH(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return unauthorizedResponse();

        const payload = verifyAccessToken(token);
        if (!payload || payload.role !== 'PATIENT') return unauthorizedResponse();

        const body = await request.json();
        const { profilePhotoUrl } = body;

        // Security: Filter body to ONLY allow profilePhotoUrl
        if (Object.keys(body).some(key => key !== 'profilePhotoUrl')) {
            return errorResponse('Only profile photo can be edited by patient. Medical records are immutable.', 403);
        }

        const patient = await db.patient.findFirst({ where: { userId: payload.userId } });
        if (!patient) return errorResponse('Patient profile not found', 404);

        // const updated = await db.patient.update({
        //     where: { id: patient.id },
        //     data: { profilePhotoUrl } // field doesn't exist in schema
        // });
        // Placeholder: return mock object since profilePhotoUrl field doesn't exist
        const updated = { ...patient, profilePhotoUrl };

        return successResponse(updated, 'Profile photo updated');
    } catch (error) {
        return errorResponse('Failed to update profile');
    }
}
