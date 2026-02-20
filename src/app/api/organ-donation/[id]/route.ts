import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return unauthorizedResponse();
    const payload = verifyAccessToken(token);
    if (!payload) return unauthorizedResponse();

    const body = await request.json();
    const { status } = body;
    if (!status) return errorResponse('Status missing', 400);

    const updated = await db.organ_donations.update({
      where: { id: params.id },
      data: { status } as any
    });
    return successResponse(updated, 'Status updated');
  } catch (err) {
    console.error('Organ-donation PATCH error', err);
    return errorResponse('Failed to update');
  }
}
