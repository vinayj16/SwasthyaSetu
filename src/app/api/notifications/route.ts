import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        // FOR DEMO: If no token, return high-density mock alerts
        if (!token) {
            const mockAlerts = [
                {
                    id: 'n1',
                    title: 'CRITICAL: Bed Shortage',
                    message: 'Emergency ward at 98% capacity. Consider node redirection.',
                    type: 'ALERT',
                    read: false,
                    createdAt: new Date()
                },
                {
                    id: 'n2',
                    title: 'Inventory Sync Successful',
                    message: 'Blood stock levels reconciled with National Grid.',
                    type: 'SUCCESS',
                    read: true,
                    createdAt: new Date(Date.now() - 3600000)
                },
                {
                    id: 'n3',
                    title: 'Policy Update',
                    message: 'New NHA protocols for Aadhaar-vault encryption are now active.',
                    type: 'INFO',
                    read: false,
                    createdAt: new Date(Date.now() - 7200000)
                }
            ];
            return successResponse(mockAlerts);
        }

        const payload = verifyAccessToken(token);
        if (!payload) return successResponse([]);

        const notifications = await db.notification.findMany({
            where: { userId: payload.userId },
            orderBy: { createdAt: 'desc' },
            take: 10
        });

        return successResponse(notifications);
    } catch (error) {
        return errorResponse('Failed to fetch notifications');
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) return successResponse({}, 'Demo mark as read');

        const payload = verifyAccessToken(token);
        if (!payload) return successResponse({}, 'Demo mark as read');

        const { id } = await request.json();

        const notification = await db.notification.update({
            where: { id, userId: payload.userId },
            data: { readAt: new Date() } // use readAt instead of read
        });

        return successResponse(notification, 'Notification marked as read');
    } catch (error) {
        return errorResponse('Failed to update notification');
    }
}
