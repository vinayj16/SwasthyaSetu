import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const bloodGroup = searchParams.get('bloodGroup');
        const city = searchParams.get('city');

        let whereClause: any = {};

        if (bloodGroup) {
            whereClause.bloodGroup = bloodGroup;
        }

        if (city) {
            whereClause.hospital = {
                city: {
                    contains: city,
                    mode: 'insensitive'
                }
            };
        }

        const stocks = await db.bloodBank.findMany({
            where: whereClause,
            include: {
                hospital: {
                    select: {
                        name: true,
                        city: true,
                        address: true,
                        phone: true,
                        verified: true
                    }
                }
            },
            take: 20
        });

        const formattedResults = stocks.map((stock: any) => ({
            id: stock.id,
            hospitalName: stock.hospital.name,
            city: stock.hospital.city,
            bloodGroup: stock.bloodGroup,
            unitsAvailable: stock.unitsAvailable,
            phone: stock.hospital.phone || 'N/A',
            address: stock.hospital.address,
            certified: stock.hospital.verified
        }));

        return successResponse(formattedResults);
    } catch (error) {
        console.error('Blood bank search error:', error);
        return errorResponse('Failed to query National Blood Matrix');
    }
}
