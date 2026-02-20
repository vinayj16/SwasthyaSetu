import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return unauthorizedResponse();

    const payload = verifyAccessToken(token);
    if (!payload) return unauthorizedResponse();

    const user = await db.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        patientProfile: true,
        doctorProfile: { include: { hospital: true } }
      }
    });

    if (!user) return errorResponse('User not found', 404);

    return successResponse(user);
  } catch (error) {
    return errorResponse('Failed to fetch profile');
  }
}
