import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';

// Lightweight demo endpoint to simulate a blood unit request.
// In production this would create an SOS task & notify the hospital.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stockId, units, requesterName, phone } = body;
    if (!stockId || !units) return errorResponse('Missing parameters', 400);
    // TODO: persist to DB + push notification
    console.log('Blood request', body);
    return successResponse({}, 'Request logged – hospital will contact shortly');
  } catch (err) {
    console.error('Blood request error', err);
    return errorResponse('Failed to log request');
  }
}
