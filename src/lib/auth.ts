import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'swasthyasetu-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'swasthyasetu-refresh-secret-change-in-production';
const ACCESS_TOKEN_EXPIRY = '1h'; // 1 hour for standard access
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

// Types
export interface JWTPayload {
    userId: string;
    email?: string;
    role: string;
    hospitalId?: string;
    iat?: number;
    exp?: number;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

// Password Hashing
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return comparePasswords(password, hash);
}

// JWT Token Generation
export function generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
}

export function generateRefreshToken(payload: any): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
}

// Session Management for Server Actions
export async function setSession(payload: JWTPayload) {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken({ userId: payload.userId });

    cookies().set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
    });

    cookies().set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });
}

export async function destroySession() {
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
}

// JWT Token Verification
export function verifyAccessToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
        return null;
    }
}

export function verifyRefreshToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
    } catch (error) {
        return null;
    }
}

// Aadhaar Hashing (SHA-256)
export function hashAadhaar(aadhaarNumber: string): string {
    return crypto
        .createHash('sha256')
        .update(aadhaarNumber)
        .digest('hex');
}

// Health ID Generation
export function generateHealthId(): string {
    const year = new Date().getFullYear();
    const randomPart = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `IND-HID-${year}-${randomPart}`;
}

// Role-Based Access Control
export const ROLES = {
    PATIENT: 'PATIENT',
    DOCTOR: 'DOCTOR',
    RECEPTIONIST: 'RECEPTIONIST',
    HOSPITAL_ADMIN: 'HOSPITAL_ADMIN',
    NATIONAL_ADMIN: 'NATIONAL_ADMIN',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export function hasRole(userRole: string, allowedRoles: UserRole[]): boolean {
    return allowedRoles.includes(userRole as UserRole);
}

// Validations
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidAadhaar(aadhaar: string): boolean {
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(aadhaar);
}

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}
