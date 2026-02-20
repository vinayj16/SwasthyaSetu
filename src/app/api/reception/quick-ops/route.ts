import { NextRequest } from 'next/server';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

/*
 POST /api/reception/quick-ops
 Body: { action: 'VITAL_FLOW' | 'CRITICAL_ADMISSION' | 'CONSULT_SYNC' | 'INSURANCE_LINK' }
 The endpoint is intentionally lightweight: it records an audit entry and returns success so that
 the Reception UI buttons are no longer inert. Real data-flow can be added later.
*/
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return unauthorizedResponse();

    const payload = verifyAccessToken(token);
    if (!payload || !['RECEPTIONIST', 'HOSPITAL_ADMIN'].includes(payload.role)) {
      return errorResponse('Unauthorized node', 403);
    }

    const { action } = await request.json();
    if (!action) return errorResponse('Action missing', 400);

    // TODO: Persist a log / trigger downstream workflows. For now, just succeed.
    console.log('Quick-Ops action:', action, 'by', payload.userId);

    return successResponse({}, 'Command relayed to tactical grid');
  } catch (err) {
    console.error('Quick ops error', err);
    return errorResponse('Command relay failed');
  }
}
