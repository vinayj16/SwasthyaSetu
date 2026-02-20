"use server";

import { db } from "@/lib/db";
import { generateHealthId, hashPassword } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// --- Schemas ---
const updateBloodBankSchema = z.object({
    hospitalId: z.string(),
    bloodGroup: z.string(),
    units: z.coerce.number().min(0),
});

const registerBirthSchema = z.object({
    hospitalId: z.string(),
    doctorId: z.string(),
    childName: z.string(),
    dob: z.string().transform(s => new Date(s)),
});

const registerDeathSchema = z.object({
    hospitalId: z.string(),
    doctorId: z.string(),
    patientName: z.string(),
    dod: z.string().transform(s => new Date(s)),
});

// --- Actions ---

export async function updateBloodStock(prevState: any, formData: FormData) {
    try {
        const rawData = Object.fromEntries(formData.entries());
        const validated = updateBloodBankSchema.parse(rawData);

        // Use findOrCreate pattern since there is no unique composite key
        const existing = await db.bloodBank.findFirst({
            where: {
                hospitalId: validated.hospitalId,
                bloodGroup: validated.bloodGroup,
            },
        });

        if (existing) {
            await db.bloodBank.update({
                where: { id: existing.id },
                data: { unitsAvailable: validated.units },
            });
        } else {
            await db.bloodBank.create({
                data: {
                    hospitalId: validated.hospitalId,
                    bloodGroup: validated.bloodGroup,
                    unitsAvailable: validated.units,
                },
            });
        }

        revalidatePath("/reception");
        return { success: true, message: "Blood stock updated." };
    } catch (error: any) {
        return { error: error.message || "Failed to update stock." };
    }
}

export async function registerBirth(prevState: any, formData: FormData) {
    try {
        const rawData = Object.fromEntries(formData.entries());
        const validated = registerBirthSchema.parse(rawData);

        // In a real system, births might not immediately create a user login, 
        // but for this app's logic of "Health ID" we at least record it.
        const record = await db.birthRecord.create({
            data: {
                hospitalId: validated.hospitalId,
                doctorId: validated.doctorId,
                // childName: validated.childName, // not in schema
                birthCertificateNo: `BRC-${Date.now()}`,
                childHealthId: `IND-HID-${Date.now()}`,
                motherHealthId: `IND-HID-${Date.now()}`,
                gender: 'MALE', // placeholder
                dateOfBirth: validated.dob,
            } as any
        });

        return { success: true, recordId: record.id };
    } catch (error: any) {
        return { error: error.message || "Failed to register birth." };
    }
}

export async function registerDeath(prevState: any, formData: FormData) {
    try {
        const rawData = Object.fromEntries(formData.entries());
        const validated = registerDeathSchema.parse(rawData);

        const record = await db.deathRecord.create({
            data: {
                hospitalId: validated.hospitalId,
                doctorId: validated.doctorId,
                // patientName: validated.patientName, // not in schema
                deathCertificateNo: `DRC-${Date.now()}`,
                patientHealthId: `IND-HID-${Date.now()}`,
                causeOfDeath: 'Natural', // placeholder
                dateOfDeath: validated.dod,
            } as any
        });

        return { success: true, message: "Death record created." };
    } catch (error: any) {
        return { error: error.message || "Failed to register death." };
    }
}
