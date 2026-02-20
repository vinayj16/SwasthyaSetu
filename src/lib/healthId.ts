import { SHA256 } from "crypto-js";

export function generateHealthId(): string {
    // Format: IND-HID-YYYY-XXXX-XXXX
    // Example: IND-HID-2024-A1B2-9X8Z
    const year = new Date().getFullYear();
    const randomSegment = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    return `IND-HID-${year}-${randomSegment()}-${randomSegment()}`;
}

export function hashAadhaar(aadhaarNumber: string): string {
    // We strictly do NOT store the raw Aadhaar number.
    // We only store the SHA-256 hash for verification.
    return SHA256(aadhaarNumber).toString();
}
