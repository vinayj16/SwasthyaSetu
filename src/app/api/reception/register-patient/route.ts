import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { hashAadhaar, hashPassword, generateHealthId } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            fullName,
            email,
            password,
            aadhaarNumber,
            dob,
            gender,
            bloodGroup,
            address,
            emergencyContact
        } = body;

        // Basic validation
        if (!fullName || !email || !password || !aadhaarNumber || !dob || !gender) {
            return validationErrorResponse('Missing required fields');
        }

        const aadhaarHash = hashAadhaar(aadhaarNumber);

        // Check for existing patient
        const existingPatient = await (db.patient as any).findUnique({
            where: { aadhaarHash }
        });

        if (existingPatient) {
            return errorResponse('Aadhaar already registered with another Health ID', 409);
        }

        // Check for existing user
        const existingUser = await db.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return errorResponse('Email already in use', 409);
        }

        const healthId = generateHealthId();
        const hashedPassword = await hashPassword(password);

        // Transactional creation
        const result = await db.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    fullName,
                    email,
                    passwordHash: hashedPassword,
                    role: 'PATIENT'
                }
            });

            const patient = await (tx.patient as any).create({
                data: {
                    userId: user.id,
                    healthId,
                    aadhaarHash,
                    name: fullName,
                    age: new Date().getFullYear() - new Date(dob).getFullYear(),
                    gender,
                    bloodGroup,
                    address,
                    emergencyContact
                }
            });

            return { user, patient };
        });

        return successResponse({
            healthId: result.patient.healthId,
            fullName: result.user.fullName
        }, 'Patient successfully registered with National Health Grid');

    } catch (error) {
        console.error('Patient registration error:', error);
        return errorResponse('Failed to register patient. Please try again.');
    }
}
