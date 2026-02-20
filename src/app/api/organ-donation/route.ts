import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

/*
  GET  /api/organ-donation        -> query donations
  POST /api/organ-donation        -> create new donor pledge
*/

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const donorHealthId = searchParams.get('donor');
    const hospitalId = searchParams.get('hospital');
    const organType = searchParams.get('organ');

    const donations = await db.organ_donations.findMany({
      where: {
        donorHealthId: donorHealthId || undefined,
        hospitalId: hospitalId || undefined,
        organType: organType || undefined
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    return successResponse(donations);
  } catch (err) {
    console.error('Organ-donation GET error', err);
    return errorResponse('Failed to query donations');
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return unauthorizedResponse();
    const payload = verifyAccessToken(token);
    if (!payload) return unauthorizedResponse();

    const body = await request.json();
    const { donorHealthId, organType, hospitalId, notes } = body;
    if (!donorHealthId || !organType || !hospitalId) {
      return errorResponse('Missing mandatory fields', 400);
    }

    const pledge = await db.organ_donations.create({
      data: {
        donorHealthId,
        hospitalId,
        organType,
        status: 'PLEDGED',
        pledgeDate: new Date(),
        notes
      } as any
    });
    return successResponse(pledge, 'Donation pledge recorded');
  } catch (err) {
    console.error('Organ-donation POST error', err);
    return errorResponse('Failed to record pledge');
  }
}
