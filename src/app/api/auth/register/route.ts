import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, isValidEmail, isValidPhone } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullName, email, phone, password, role } = body;

        // Validation
        if (!fullName || !email || !password) {
            return validationErrorResponse('Full name, email, and password are required');
        }

        if (!isValidEmail(email)) {
            return validationErrorResponse('Invalid email format');
        }

        if (phone && !isValidPhone(phone)) {
            return validationErrorResponse('Invalid phone number format (must be 10 digits)');
        }

        if (password.length < 8) {
            return validationErrorResponse('Password must be at least 8 characters long');
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return errorResponse('User with this email already exists', 409);
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const user = await db.user.create({
            data: {
                fullName,
                email,
                phone: phone || null,
                passwordHash,
                role: role || 'PATIENT',
                isActive: true,
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
            },
        });

        // If role is PATIENT, create patient profile
        if (user.role === 'PATIENT') {
            await db.patient.create({
                data: {
                    userId: user.id,
                    name: fullName,
                    gender: 'OTHER', // Will be updated later
                },
            });
        }

        return successResponse(user, 'User registered successfully');
    } catch (error) {
        console.error('Registration error:', error);
        return errorResponse('Failed to register user', 500);
    }
}
