import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get('hospital');
    const records = await db.birthRecord.findMany({
      where: hospitalId ? { hospitalId } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    return successResponse(records);
  } catch (err) {
    console.error('Birth-record GET', err);
    return errorResponse('Failed to fetch');
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return unauthorizedResponse();
    const payload = verifyAccessToken(token);
    if (!payload || !['RECEPTIONIST','HOSPITAL_ADMIN'].includes(payload.role))
      return unauthorizedResponse();

    const body = await request.json();
    const { childHealthId, motherHealthId, hospitalId, dateOfBirth, timeOfBirth, gender, doctorId } = body;
    if (!childHealthId || !hospitalId || !dateOfBirth || !gender) return errorResponse('Missing fields',400);

    const rec = await db.birthRecord.create({
      data: {
        childHealthId,
        motherHealthId,
        hospitalId,
        dateOfBirth: new Date(dateOfBirth),
        timeOfBirth: timeOfBirth || null,
        gender,
        doctorId
      } as any
    });
    return successResponse(rec,'Birth record saved');
  } catch(err){
    console.error(err);
    return errorResponse('Save failed');
  }
}
