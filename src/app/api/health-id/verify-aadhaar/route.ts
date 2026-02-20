import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { hashAadhaar, generateHealthId, generateOTP, isValidAadhaar } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response';

// Mock UIDAI API response (in production, call real UIDAI API)
interface MockAadhaarData {
    name: string;
    dob: string;
    gender: string;
    mobile: string;
}

// Temporary OTP storage (in production, use Redis)
const otpStore = new Map<string, { otp: string; aadhaarHash: string; data: MockAadhaarData; expiresAt: number }>();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { aadhaarNumber } = body;

        // Validation
        if (!aadhaarNumber) {
            return validationErrorResponse('Aadhaar number is required');
        }

        if (!isValidAadhaar(aadhaarNumber)) {
            return validationErrorResponse('Invalid Aadhaar number format (must be 12 digits)');
        }

        // Hash Aadhaar immediately (NEVER store raw Aadhaar)
        const aadhaarHash = hashAadhaar(aadhaarNumber);

        // Check if Health ID already exists for this Aadhaar
        const existingHealthId = await db.health_identities.findUnique({
            where: { aadhaarHash },
        });

        if (existingHealthId) {
            return errorResponse('Health ID already exists for this Aadhaar number', 409);
        }

        // Mock UIDAI API call (in production, call real UIDAI API)
        // For demo purposes, we'll generate mock data
        const mockAadhaarData: MockAadhaarData = {
            name: 'John Doe', // In production, this comes from UIDAI
            dob: '1990-01-01',
            gender: 'MALE',
            mobile: '9876543210',
        };

        // Generate OTP
        const otp = generateOTP();

        // Store OTP temporarily (expires in 5 minutes)
        const txnId = Math.random().toString(36).substring(7);
        otpStore.set(txnId, {
            otp,
            aadhaarHash,
            data: mockAadhaarData,
            expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
        });

        // In production, send OTP via SMS to the Aadhaar-registered mobile
        console.log(`OTP for Aadhaar verification: ${otp} (txnId: ${txnId})`);

        return successResponse({
            txnId,
            message: 'OTP sent to your Aadhaar-registered mobile number',
            // For demo purposes only - remove in production
            _demoOTP: otp,
        });
    } catch (error) {
        console.error('Aadhaar verification error:', error);
        return errorResponse('Failed to verify Aadhaar', 500);
    }
}
