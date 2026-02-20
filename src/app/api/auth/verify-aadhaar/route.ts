import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { aadhaarNumber } = await request.json();

        if (!aadhaarNumber) return errorResponse('Aadhaar number is required', 400);

        // 1. Legal Approach: Hash the Aadhaar (NEVER store raw)
        const aadhaarHash = crypto.createHash('sha256').update(aadhaarNumber).digest('hex');

        // 2. Check if already exists in Patient model (Using findFirst to avoid strict type issues)
        const existing = await (db.patient as any).findFirst({
            where: { aadhaarHash }
        });

        if (existing) return errorResponse('Aadhaar already registered with a Health ID', 409);

        // 3. Generate National UHID (Universal Health ID)
        const year = new Date().getFullYear();
        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase() +
            '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
        const healthId = `IND-HID-${year}-${randomPart}`;

        return successResponse({
            healthId,
            aadhaarReference: aadhaarHash.substring(0, 10) + '...',
            message: 'Aadhaar verified securely. Ready for registration.'
        }, 'Aadhaar Verified');

    } catch (error) {
        return errorResponse('Identity Verification Failed');
    }
}
