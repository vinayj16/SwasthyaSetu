import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const doctors = await db.doctor.findMany({
            where: { hospitalId: params.id },
            select: {
                id: true,
                name: true,
                specialization: true,
                qualification: true,
                consultFee: true,
                available: true,
                rating: true
            }
        });

        return successResponse(doctors);
    } catch (error) {
        console.error('Fetch doctors error:', error);
        return errorResponse('Failed to fetch faculty registry');
    }
}
