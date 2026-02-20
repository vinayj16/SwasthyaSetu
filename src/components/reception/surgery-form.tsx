"use client";

import { useFormState } from "react-dom";
import { scheduleSurgery } from "@/actions/surgeryActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// @ts-ignore
import { Suspense } from "react";

// This would typically fetch real doctors/hospitals from DB
// For this demo, we'll hardcode or let user input HospitalID/DoctorID for testing
// In a real app, these would be dropdowns populated by server data

export function SurgeryForm() {
    // @ts-ignore
    const [state, formAction] = useFormState(scheduleSurgery, { error: "", success: false });

    if (state?.success) {
        return (
            <Card className="max-w-md mx-auto">
                <CardContent className="pt-6">
                    <p className="text-green-600 font-bold text-center">Surgery Scheduled Successfully!</p>
                    <Button onClick={() => window.location.reload()} className="w-full mt-4">Book Another</Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Schedule Operation (OT)</CardTitle>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 col-span-2">
                        <Label>Hospital ID (Demo)</Label>
                        <Input name="hospitalId" placeholder="UUID of Hospital" required />
                    </div>

                    <div className="space-y-2">
                        <Label>Doctor ID</Label>
                        <Input name="doctorId" placeholder="UUID of Doctor" required />
                    </div>

                    <div className="space-y-2">
                        <Label>Patient Health ID</Label>
                        <Input name="patientHealthId" placeholder="IND-HID-..." required />
                    </div>

                    <div className="space-y-2 col-span-2">
                        <Label>Operation Name</Label>
                        <Input name="operationName" placeholder="e.g. Appendectomy" required />
                    </div>

                    <div className="space-y-2">
                        <Label>OT Room Number</Label>
                        <Select name="room" defaultValue="OT-1">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="OT-1">OT-1 General</SelectItem>
                                <SelectItem value="OT-2">OT-2 Cardiac</SelectItem>
                                <SelectItem value="OT-3">OT-3 Emergency</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Date</Label>
                        <Input name="date" type="date" required />
                    </div>

                    <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Input name="startTime" type="time" required />
                    </div>

                    <div className="space-y-2">
                        <Label>End Time</Label>
                        <Input name="endTime" type="time" required />
                    </div>

                    <div className="col-span-2">
                        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Schedule Surgery</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
