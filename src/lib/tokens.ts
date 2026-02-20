import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'swasthyasetu-secret-key-change-in-production';
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
    userId: string;
    email?: string;
    role: string;
    hospitalId?: string;
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, encodedSecret);
        return payload as unknown as JWTPayload;
    } catch (error) {
        return null;
    }
}
