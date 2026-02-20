import { NextResponse } from 'next/server';

export async function GET() {
    const stocks = {
        blood: [
            { group: 'O+', units: 42, status: 'OPTIMAL', trend: 'UP' },
            { group: 'O-', units: 4, status: 'CRITICAL', trend: 'DOWN' },
            { group: 'A+', units: 12, status: 'LOW', trend: 'STABLE' },
            { group: 'B+', units: 84, status: 'OPTIMAL', trend: 'UP' },
        ],
        vitalsToday: {
            births: 14204,
            deaths: 9812,
            transplants: 142
        },
        activeTransports: 12
    };

    return NextResponse.json({ success: true, data: stocks });
}
