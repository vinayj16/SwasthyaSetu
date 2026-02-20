"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // We need Select component or just native select

const initialState = {
    error: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account..." : "Sign Up"}
        </Button>
    );
}

export function SignupForm() {
    const [state, formAction] = useFormState(signup, initialState);

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Join SwasthyaSetu today.</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" name="fullName" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">I am a...</Label>
                        <Select name="role" defaultValue="PATIENT">
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PATIENT">Patient</SelectItem>
                                <SelectItem value="DOCTOR">Doctor</SelectItem>
                                <SelectItem value="STAFF">Hospital Staff</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {state?.error && (
                        <p className="text-sm text-red-500">{state.error}</p>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <SubmitButton />
                    <p className="text-xs text-center text-muted-foreground w-full">
                        Already have an account?{" "}
                        <Link href="/login" className="underline hover:text-primary">
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}
