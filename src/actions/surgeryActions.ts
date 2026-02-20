"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const scheduleSurgerySchema = z.object({
    hospitalId: z.string(),
    doctorId: z.string(),
    patientName: z.string().min(2),
    operationName: z.string().min(3),
    otRoom: z.string(),
    date: z.string(), // YYYY-MM-DD
    time: z.string(), // HH:MM
});

export async function scheduleSurgery(prevState: any, formData: FormData) {
    try {
        const rawData = Object.fromEntries(formData.entries());
        const validated = scheduleSurgerySchema.parse(rawData);

        // Combine date and time
        const scheduledDate = new Date(`${validated.date}T${validated.time}:00`);

        // Check for Room Conflict (Simplified)
        const conflict = await db.surgerySchedule.findFirst({
            where: {
                hospitalId: validated.hospitalId,
                otRoom: validated.otRoom,
                scheduledStartAt: scheduledDate,
                status: "SCHEDULED",
            },
        });

        if (conflict) {
            return { error: `OT Room ${validated.otRoom} is already booked for this exact time.` };
        }

        // Book it
        await db.surgerySchedule.create({
            data: {
                surgeryNumber: `SRG-${Date.now()}`,
                hospitalId: validated.hospitalId,
                doctorId: validated.doctorId,
                patientHealthId: `IND-HID-${Date.now()}`, // placeholder
                operationName: validated.operationName,
                otRoom: validated.otRoom,
                scheduledStartAt: scheduledDate,
                scheduledEndAt: new Date(scheduledDate.getTime() + 2*60*60*1000), // +2h placeholder
                status: "SCHEDULED",
            } as any
        });

        revalidatePath("/reception/dashboard");
        return { success: true };

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return { error: (error as any).errors[0].message };
        }
        return { error: error.message || "Failed to schedule surgery." };
    }
}
