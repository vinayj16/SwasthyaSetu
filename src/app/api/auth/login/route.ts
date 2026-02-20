import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comparePasswords, generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        const user = await db.user.findUnique({
            where: { email },
            include: {
                doctorProfile: true,
                patientProfile: true
            }
        });

        if (!user || !(await comparePasswords(password, user.passwordHash))) {
            return errorResponse('Invalid credentials', 401);
        }

        // Role-Based Context Retrieval
        let hospitalId: string | undefined = undefined;
        if (user.role === 'DOCTOR') {
            hospitalId = (user as any).doctorProfile?.hospitalId;
        } else if (user.role === 'RECEPTIONIST') {
            const rec = await (db as any).receptionists.findFirst({ where: { userId: user.id } });
            hospitalId = rec?.hospitalId;
        } else if (user.role === 'HOSPITAL_ADMIN') {
            // Assume single hospital for admin in this demo or fetch from staff
            const staff = await (db as any).employees.findFirst({ where: { userId: user.id } });
            hospitalId = staff?.hospitalId;
        }

        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            hospitalId: hospitalId || undefined
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Determine Redirect URL
        const redirects: Record<string, string> = {
            'NATIONAL_ADMIN': '/national-admin/dashboard',
            'HOSPITAL_ADMIN': '/hospital-admin/dashboard',
            'DOCTOR': '/doctor/dashboard',
            'RECEPTIONIST': '/reception/dashboard',
            'PATIENT': '/patient/dashboard'
        };

        const response = successResponse({
            user: { id: user.id, fullName: user.fullName, role: user.role },
            redirect: redirects[user.role] || '/dashboard'
        }, 'Login successful');

        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 // 1 hour
        });

        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return errorResponse('Internal server error');
    }
}
