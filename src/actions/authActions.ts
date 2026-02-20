"use server";

import { db } from "@/lib/db";
import { comparePasswords as compare, hashPassword as hash, setSession, destroySession } from "@/lib/auth";
import { loginSchema, signupSchema } from "@/lib/validations";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export async function signup(prevState: any, formData: FormData) {
    try {
        const data = Object.fromEntries(formData.entries());
        const validatedData = signupSchema.parse(data);

        const existingUser = await db.user.findUnique({
            where: { email: validatedData.email },
        });

        if (existingUser) {
            return { error: "User already exists with this email." };
        }

        const hashedPassword = await hash(validatedData.password);

        const user = await db.user.create({
            data: {
                fullName: validatedData.fullName,
                email: validatedData.email,
                passwordHash: hashedPassword,
                role: validatedData.role,
            },
        });

        // Create session immediately after signup
        await setSession({ userId: user.id, role: user.role });

    } catch (error) {
        if (error instanceof ZodError) {
            return { error: (error as any).errors[0].message };
        }
        return { error: "Something went wrong." };
    }

    redirect("/dashboard");
}

export async function login(prevState: any, formData: FormData) {
    try {
        const data = Object.fromEntries(formData.entries());
        const validatedData = loginSchema.parse(data);

        const user = await db.user.findUnique({
            where: { email: validatedData.email },
        });

        if (!user) {
            return { error: "Invalid credentials." };
        }

        const isValid = await compare(validatedData.password, user.passwordHash);

        if (!isValid) {
            return { error: "Invalid credentials." };
        }

        await setSession({ userId: user.id, role: user.role });

    } catch (error) {
        if (error instanceof ZodError) {
            return { error: (error as any).errors[0].message };
        }
        return { error: "Something went wrong." };
    }

    redirect("/dashboard");
}

export async function logout() {
    await destroySession();
    redirect("/login");
}
