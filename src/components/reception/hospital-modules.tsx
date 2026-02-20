"use client";

import { useFormState } from "react-dom";
import { updateBloodStock, registerBirth, registerDeath } from "@/actions/hospitalActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Blood Bank Form ---
export function BloodBankForm() {
    // @ts-ignore
    const [state, formAction] = useFormState(updateBloodStock, { success: false, error: "" });

    return (
        <Card>
            <CardHeader><CardTitle>Update Blood Stock</CardTitle></CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <Input name="hospitalId" placeholder="Hospital ID (Demo)" required />
                    <Select name="bloodGroup">
                        <SelectTrigger><SelectValue placeholder="Select Group" /></SelectTrigger>
                        <SelectContent>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input name="units" type="number" placeholder="Units Available" required />
                    {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    {state?.success && <p className="text-green-500 text-sm">Stock Updated!</p>}
                </CardContent>
                <CardFooter><Button type="submit">Update Stock</Button></CardFooter>
            </form>
        </Card>
    );
}

// --- Birth Registration Form ---
export function BirthRegistrationForm() {
    // @ts-ignore
    const [state, formAction] = useFormState(registerBirth, { success: false, error: "" });

    return (
        <Card>
            <CardHeader><CardTitle>Register Birth</CardTitle></CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <Input name="hospitalId" placeholder="Hospital ID" required />
                    <Input name="doctorId" placeholder="Doctor ID" required />
                    <Input name="motherHealthId" placeholder="Mother's Health ID" required />
                    <Input name="fullName" placeholder="Child's Full Name" required />
                    <Input name="dob" type="datetime-local" required />
                    <Select name="gender">
                        <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                        </SelectContent>
                    </Select>
                    {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    {/* @ts-ignore */}
                    {state?.success && <p className="text-green-500 text-sm">Registered! Child HID: {state.childHealthId}</p>}
                </CardContent>
                <CardFooter><Button type="submit">Register Birth</Button></CardFooter>
            </form>
        </Card>
    );
}

// --- Death Registration Form ---
export function DeathRegistrationForm() {
    // @ts-ignore
    const [state, formAction] = useFormState(registerDeath, { success: false, error: "" });

    return (
        <Card>
            <CardHeader><CardTitle>Register Death</CardTitle></CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <Input name="hospitalId" placeholder="Hospital ID" required />
                    <Input name="doctorId" placeholder="Doctor ID" required />
                    <Input name="patientHealthId" placeholder="Deceased Health ID" required />
                    <Input name="cause" placeholder="Cause of Death" required />
                    <Input name="dod" type="datetime-local" required />
                    {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    {state?.success && <p className="text-green-500 text-sm">Death Record Created.</p>}
                </CardContent>
                <CardFooter><Button type="submit" variant="destructive">Register Death</Button></CardFooter>
            </form>
        </Card>
    );
}
