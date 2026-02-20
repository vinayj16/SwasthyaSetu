"use client";

import { useFormState } from "react-dom";
import { registerPatientWithHealthId } from "@/actions/receptionActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QRCodeSVG } from "qrcode.react";

const initialState = {
    success: false,
    healthId: "",
    error: "",
};

export function PatientRegistrationForm() {
    // @ts-ignore - Check types later if needed
    const [state, formAction] = useFormState(registerPatientWithHealthId, initialState);

    if (state?.success && state.healthId) {
        return (
            <Card className="w-full max-w-md mx-auto text-center">
                <CardHeader>
                    <CardTitle className="text-green-600">Registration Successful!</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-white border rounded-lg shadow-sm">
                        <QRCodeSVG value={JSON.stringify({ healthId: state.healthId })} size={150} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Generated Health ID</p>
                        <p className="text-2xl font-mono font-bold">{state.healthId}</p>
                    </div>
                    <p className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                        Print this card for the patient.
                    </p>
                </CardContent>
                <CardFooter className="justify-center">
                    <Button onClick={() => window.location.reload()}>Register Another</Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>New Patient Registration (Health ID)</CardTitle>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" name="fullName" required placeholder="As per Aadhaar" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                        <Input id="aadhaarNumber" name="aadhaarNumber" required maxLength={12} placeholder="12-digit UID" />
                        <p className="text-[10px] text-muted-foreground">Will be hashed securely. Not stored raw.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" name="dob" type="date" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select name="gender" defaultValue="MALE">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                                <SelectItem value="OTHER">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input id="mobile" name="mobile" required maxLength={10} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input id="emergencyContact" name="emergencyContact" placeholder="Optional" />
                    </div>

                    <div className="md:col-span-2">
                        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Generate Health ID & Register</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
