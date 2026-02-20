import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { generateHealthId } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response';

// Import the OTP store from verify-aadhaar (in production, use Redis)
// For now, we'll access it via a shared module
const otpStore = new Map<string, { otp: string; aadhaarHash: string; data: any; expiresAt: number }>();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { txnId, otp, bloodGroup, emergencyContact } = body;

        // Validation
        if (!txnId || !otp) {
            return validationErrorResponse('Transaction ID and OTP are required');
        }

        // Verify OTP
        const storedData = otpStore.get(txnId);

        if (!storedData) {
            return errorResponse('Invalid or expired transaction', 400);
        }

        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(txnId);
            return errorResponse('OTP expired', 400);
        }

        if (storedData.otp !== otp) {
            return errorResponse('Invalid OTP', 400);
        }

        // OTP verified successfully
        const { aadhaarHash, data } = storedData;

        // Generate Health ID
        const healthId = generateHealthId();

        // Create Health Identity
        const healthIdentity = await db.health_identities.create({
            data: {
                healthId,
                aadhaarHash,
                fullName: data.name,
                dob: new Date(data.dob),
                gender: data.gender,
                mobile: data.mobile,
                bloodGroup: bloodGroup || null,
                emergencyContact: emergencyContact || null,
                isActive: true,
            },
        });

        // Clean up OTP
        otpStore.delete(txnId);

        return successResponse({
            healthId: healthIdentity.healthId,
            fullName: healthIdentity.fullName,
            dob: healthIdentity.dob,
            gender: healthIdentity.gender,
            bloodGroup: healthIdentity.bloodGroup,
            message: 'Health ID created successfully',
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        return errorResponse('Failed to verify OTP', 500);
    }
}
