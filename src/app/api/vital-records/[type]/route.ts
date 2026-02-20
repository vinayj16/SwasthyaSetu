import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest, { params }: { params: { type: string } }) {
    const type = (await params).type;
    const body = await request.json();

    try {
        if (type === 'birth') {
            const record = await db.birthRecord.create({
                data: {
                    birthCertificateNo: `BRT-${Date.now()}`,
                    hospitalId: body.hospitalId,
                    childHealthId: body.childHealthId,
                    motherHealthId: body.motherHealthId,
                    fatherName: body.fatherName,
                    doctorId: body.doctorId,
                    dob: new Date(body.dob),
                    gender: body.gender,
                    weightKg: parseFloat(body.weight)
                }
            });
            return successResponse(record, 'Birth registered');
        } else {
            const record = await db.deathRecord.create({
                data: {
                    deathCertificateNo: `DTH-${Date.now()}`,
                    hospitalId: body.hospitalId,
                    patientHealthId: body.patientHealthId,
                    doctorId: body.doctorId,
                    dod: new Date(body.dod),
                    causeOfDeath: body.cause
                }
            });
            return successResponse(record, 'Death registered');
        }
    } catch (error) {
        console.error('Vital Record Error:', error);
        return errorResponse(`Failed to register ${type}`);
    }
}
