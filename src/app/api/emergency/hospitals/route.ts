import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
    try {
        // In a real app, we would calculate distance based on lat/long
        // For now, we simulate "nearest" by fetching random hospitals
        const hospitals = await db.hospital.findMany({
            where: {
                totalBeds: { gt: 0 }
            },
            select: {
                id: true,
                name: true,
                city: true,
                availableBeds: true,
                icuBeds: true,
                phone: true
            },
            take: 5
        });

        // Simulate random active emergency data
        const results = hospitals.map(h => ({
            id: h.id,
            name: h.name,
            city: h.city,
            availableBeds: h.availableBeds,
            icuBeds: h.icuBeds,
            phone: h.phone,
            status: h.icuBeds > 0 ? 'Available' : 'Critical',
            range: `${(Math.random() * 10 + 0.5).toFixed(1)} KM`
        }));

        return successResponse(results);
    } catch (error) {
        console.error('Emergency grid fetch error:', error);
        return errorResponse('Failed to sync Trauma Matrix');
    }
}
