import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'swasthya-setu-secure-key-v1-2026';

/**
 * Encrypts a string or object using AES-256
 * @param data - The data to encrypt (string or object)
 * @returns The encrypted ciphertext string
 */
export const encryptData = (data: any): string => {
    try {
        const stringData = typeof data === 'object' ? JSON.stringify(data) : String(data);
        const ciphertext = CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
        return ciphertext;
    } catch (error) {
        console.error('Encryption Failed:', error);
        return '';
    }
};

/**
 * Decrypts an AES-256 encrypted string
 * @param ciphertext - The encrypted string to decrypt
 * @returns The original data (parsed as JSON if possible) or null on failure
 */
export const decryptData = (ciphertext: string): any => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (!originalText) return null;

        try {
            return JSON.parse(originalText);
        } catch {
            return originalText;
        }
    } catch (error) {
        console.error('Decryption Failed:', error);
        return null;
    }
};

/**
 * Hash a value (like a password) securely using SHA-256
 * Note: For passwords, prefer bcrypt on the server-side. This is for client-side checksums.
 */
export const hashData = (data: string): string => {
    return CryptoJS.SHA256(data).toString();
};
