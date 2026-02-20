import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';
import { searchHospitals, getHospitalByPincode } from '@/lib/hospital-directory';

const HOSPITALS_MOCK = [
    {
        id: 'h1',
        name: 'AIIMS Delhi',
        type: 'GOVERNMENT',
        address: 'Ansari Nagar',
        city: 'New Delhi',
        state: 'Delhi',
        totalBeds: 2478,
        availableBeds: 142,
        icuBeds: 240,
        otRooms: 45,
        lat: 28.5672,
        lng: 77.2100,
        hasBloodBank: true,
        hasOrganFacility: true,
        phone: '011-26588500',
        email: 'info@aiims.edu'
    },
    {
        id: 'h2',
        name: 'Apollo Indraprastha',
        type: 'PRIVATE',
        address: 'Sarita Vihar',
        city: 'New Delhi',
        state: 'Delhi',
        totalBeds: 710,
        availableBeds: 89,
        icuBeds: 110,
        otRooms: 20,
        lat: 28.5367,
        lng: 77.2878,
        hasBloodBank: true,
        hasOrganFacility: true,
        phone: '011-26925858',
        email: 'apollo_delhi@apollohospitals.com'
    },
    {
        id: 'h3',
        name: 'Max Super Speciality',
        type: 'PRIVATE',
        address: 'Saket',
        city: 'New Delhi',
        state: 'Delhi',
        totalBeds: 530,
        availableBeds: 45,
        icuBeds: 80,
        otRooms: 15,
        lat: 28.5276,
        lng: 77.2140,
        hasBloodBank: true,
        hasOrganFacility: false,
        phone: '011-26515050',
        email: 'saket@maxhealthcare.com'
    },
    {
        id: 'h4',
        name: 'Fortis Memorial Research Institute',
        type: 'PRIVATE',
        address: 'Sector 44',
        city: 'Gurugram',
        state: 'Haryana',
        totalBeds: 1000,
        availableBeds: 120,
        icuBeds: 150,
        otRooms: 25,
        lat: 28.4595,
        lng: 77.0726,
        hasBloodBank: true,
        hasOrganFacility: true,
        phone: '0124-4962200',
        email: 'fmri@fortishealthcare.com'
    },
    {
        id: 'h5',
        name: 'Tata Memorial Hospital',
        type: 'GOVERNMENT',
        address: 'Parel',
        city: 'Mumbai',
        state: 'Maharashtra',
        totalBeds: 700,
        availableBeds: 34,
        icuBeds: 60,
        otRooms: 12,
        lat: 19.0041,
        lng: 72.8422,
        hasBloodBank: true,
        hasOrganFacility: false,
        phone: '022-24177000',
        email: 'info@tmc.gov.in'
    },
    {
        id: 'h6',
        name: 'Lilavati Hospital',
        type: 'PRIVATE',
        address: 'Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        totalBeds: 323,
        availableBeds: 12,
        icuBeds: 45,
        otRooms: 8,
        lat: 19.0514,
        lng: 72.8285,
        hasBloodBank: true,
        hasOrganFacility: true,
        phone: '022-26751000',
        email: 'info@lilavatihospital.com'
    },
    {
        id: 'h7',
        name: 'PGIMER Chandigarh',
        type: 'GOVERNMENT',
        address: 'Sector 12',
        city: 'Chandigarh',
        state: 'Chandigarh',
        totalBeds: 2100,
        availableBeds: 110,
        icuBeds: 180,
        otRooms: 30,
        lat: 30.7626,
        lng: 76.7766,
        hasBloodBank: true,
        hasOrganFacility: true,
        phone: '0172-2747585',
        email: 'pgimer@chd.nic.in'
    },
    {
        id: 'h8',
        name: 'Christian Medical College (CMC)',
        type: 'PRIVATE',
        address: 'Ida Scudder Road',
        city: 'Vellore',
        state: 'Tamil Nadu',
        totalBeds: 2858,
        availableBeds: 200,
        icuBeds: 250,
        otRooms: 40,
        lat: 12.9249,
        lng: 79.1351,
        hasBloodBank: true,
        hasOrganFacility: true,
        phone: '0416-2281000',
        email: 'directorate@cmcvellore.ac.in'
    }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city');
        const search = searchParams.get('search')?.toLowerCase();
        const type = searchParams.get('type');
        const pincode = searchParams.get('pincode');
        const state = searchParams.get('state');

        let results;
        if (pincode) {
            results = getHospitalByPincode(pincode);
        } else {
            const query = search || '';
            results = searchHospitals(query, state || undefined, city || undefined);
        }

        // Transform CSV data to match frontend expectations
        const hospitals = results.map(h => ({
            id: h.Sr_No,
            name: h.Hospital_Name,
            type: h.Hospital_Category === 'Public/ Government' ? 'GOVERNMENT' : 'PRIVATE',
            address: h.Address_Original_First_Line,
            city: h.District,
            state: h.State,
            pincode: h.Pincode,
            totalBeds: parseInt(h.Total_Num_Beds) || 0,
            availableBeds: Math.floor(Math.random() * parseInt(h.Total_Num_Beds || '100')),
            icuBeds: Math.floor(Math.random() * 50),
            otRooms: Math.floor(Math.random() * 20),
            lat: h.Location_Coordinates ? parseFloat(h.Location_Coordinates.split(',')[0]) || undefined : undefined,
            lng: h.Location_Coordinates ? parseFloat(h.Location_Coordinates.split(',')[1]) || undefined : undefined,
            hasBloodBank: !!h.Bloodbank_Phone_No,
            hasOrganFacility: h.Specialties?.toLowerCase().includes('organ') || false,
            phone: h.Telephone || h.Mobile_Number,
            email: h.Hospital_Primary_Email_Id
        }));

        // Apply additional filters
        let filtered = hospitals;
        if (type) {
            filtered = filtered.filter(h => h.type.toLowerCase() === type.toLowerCase());
        }

        return successResponse(filtered);
    } catch (error) {
        console.error('Hospitals fetch error:', error);
        return successResponse(HOSPITALS_MOCK); // Graceful fallback
    }
}

export async function POST(request: NextRequest) {
    return successResponse({}, 'Manual registration disabled in demo');
}
