"use server";

import { db } from "@/lib/db";
import { generateHealthId, hashAadhaar, hashPassword } from "@/lib/auth";
import { z } from "zod";

const registerPatientSchema = z.object({
    fullName: z.string().min(2),
    aadhaarNumber: z.string().length(12, "Aadhaar must be 12 digits"),
    dob: z.string().transform((str) => new Date(str)),
    gender: z.string(),
    bloodGroup: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
    emergencyContact: z.string().optional(),
});

export async function registerPatientWithHealthId(prevState: any, formData: FormData) {
    try {
        const data = Object.fromEntries(formData.entries());
        const validated = registerPatientSchema.parse(data);

        // Hash Aadhaar immediately
        const aadhaarHash = hashAadhaar(validated.aadhaarNumber);

        // Check duplication
        const existing = await (db.patient as any).findUnique({
            where: { aadhaarHash },
        });

        if (existing) {
            return { error: "Patient already registered with this Aadhaar." };
        }

        const healthId = generateHealthId();

        // 1. Create User
        const user = await db.user.create({
            data: {
                fullName: validated.fullName,
                email: validated.email,
                passwordHash: await hashPassword(validated.password),
                role: 'PATIENT'
            }
        });

        // 2. Create Patient Profile
        const newPatient = await (db.patient as any).create({
            data: {
                userId: user.id,
                healthId,
                aadhaarHash,
                name: validated.fullName,
                age: new Date().getFullYear() - validated.dob.getFullYear(),
                gender: validated.gender,
                bloodGroup: validated.bloodGroup,
                address: validated.address,
                emergencyContact: validated.emergencyContact,
            },
        });

        return { success: true, healthId: newPatient.healthId };

    } catch (error: any) {
        return { error: error.message || "Failed to register patient" };
    }
}
