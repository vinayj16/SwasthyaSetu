import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { searchHospitals, getHospitalByPincode, getUniqueStates, getDistrictsByState } from '@/lib/hospital-directory';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const state = searchParams.get('state') || undefined;
    const district = searchParams.get('district') || undefined;
    const pincode = searchParams.get('pincode') || '';
    const listStates = searchParams.get('listStates') === 'true';
    const listDistricts = searchParams.get('listDistricts');

    if (listStates) {
      const states = getUniqueStates();
      return successResponse(states);
    }

    if (listDistricts) {
      const districts = getDistrictsByState(listDistricts);
      return successResponse(districts);
    }

    let results;
    if (pincode) {
      results = getHospitalByPincode(pincode);
    } else {
      results = searchHospitals(query, state, district);
    }

    // Transform CSV data to match frontend expectations
    const transformed = results.map(h => ({
      id: h.Sr_No,
      name: h.Hospital_Name,
      type: h.Hospital_Category === 'Public/ Government' ? 'GOVERNMENT' : 'PRIVATE',
      address: h.Address_Original_First_Line,
      city: h.District,
      state: h.State,
      pincode: h.Pincode,
      phone: h.Telephone || h.Mobile_Number,
      emergency: h.Emergency_Num,
      ambulance: h.Ambulance_Phone_No,
      bloodBank: h.Bloodbank_Phone_No ? 'YES' : 'NO',
      email: h.Hospital_Primary_Email_Id,
      website: h.Website,
      specialties: h.Specialties ? h.Specialties.split(',').map(s => s.trim()).filter(Boolean) : [],
      facilities: h.Facilities ? h.Facilities.split(',').map(f => f.trim()).filter(Boolean) : [],
      totalBeds: parseInt(h.Total_Num_Beds) || 0,
      doctors: parseInt(h.Number_Doctor) || 0,
      location: h.Location_Coordinates ? {
        lat: parseFloat(h.Location_Coordinates.split(',')[0]) || undefined,
        lng: parseFloat(h.Location_Coordinates.split(',')[1]) || undefined
      } : undefined
    }));

    return successResponse(transformed);
  } catch (error) {
    console.error('Hospital directory error:', error);
    return errorResponse('Failed to fetch hospital directory');
  }
}
