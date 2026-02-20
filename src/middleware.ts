import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, JWTPayload } from './lib/tokens';

export async function middleware(request: NextRequest) {
    // BYPASS FOR DEMO / LOOK OVER
    return NextResponse.next();

    const { pathname } = request.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = [
        '/',
        '/login',
        '/register',
        '/register-health-id',
        '/hospitals',
        '/blood-bank',
        '/organ-donation',
        '/emergency',
    ];

    // API routes that don't require authentication
    const publicApiRoutes = [
        '/api/auth/login',
        '/api/auth/register',
        '/api/health-id/verify-aadhaar',
        '/api/health-id/verify-otp',
        '/api/hospitals',
        '/api/blood-bank/search',
    ];

    // Check if the route is public
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );

    const isPublicApiRoute = publicApiRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );

    if (isPublicRoute || isPublicApiRoute) {
        return NextResponse.next();
    }

    // Check for authentication token
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
        // Redirect to login for protected routes
        if (pathname.startsWith('/api/')) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify token
    const payload = await verifyToken(token as string);

    if (!payload) {
        // Token is invalid or expired
        if (pathname.startsWith('/api/')) {
            return NextResponse.json(
                { success: false, error: 'Invalid or expired token' },
                { status: 401 }
            );
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-based route protection
    const role = (payload as JWTPayload).role;

    // Patient routes
    if (pathname.startsWith('/patient') && role !== 'PATIENT') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Doctor routes
    if (pathname.startsWith('/doctor') && role !== 'DOCTOR') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Hospital admin routes
    if (pathname.startsWith('/hospital-admin') && role !== 'HOSPITAL_ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Receptionist routes
    if (pathname.startsWith('/reception') && role !== 'RECEPTIONIST') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // National admin routes
    if (pathname.startsWith('/national-admin') && role !== 'NATIONAL_ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Add user info to request headers for API routes
    const requestHeaders = new Headers(request.headers);
    const userPayload = payload as JWTPayload;

    requestHeaders.set('x-user-id', userPayload.userId);
    requestHeaders.set('x-user-role', userPayload.role);
    if (userPayload.email) {
        requestHeaders.set('x-user-email', String(userPayload.email));
    }
    if (userPayload.hospitalId) {
        requestHeaders.set('x-hospital-id', String(userPayload.hospitalId));
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
