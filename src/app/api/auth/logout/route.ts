import { NextRequest, NextResponse } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;

        if (!token) {
            return errorResponse('No active session', 401);
        }

        // Create response
        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        });

        // Clear cookies
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return errorResponse('Failed to logout', 500);
    }
}
