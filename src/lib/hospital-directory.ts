import fs from 'fs';
import path from 'path';

export interface HospitalRecord {
  Sr_No: string;
  Location_Coordinates: string;
  Location: string;
  Hospital_Name: string;
  Hospital_Category: string;
  Hospital_Care_Type: string;
  Discipline_Systems_of_Medicine: string;
  Address_Original_First_Line: string;
  State: string;
  District: string;
  Subdistrict: string;
  Pincode: string;
  Telephone: string;
  Mobile_Number: string;
  Emergency_Num: string;
  Ambulance_Phone_No: string;
  Bloodbank_Phone_No: string;
  Foreign_pcare: string;
  Tollfree: string;
  Helpline: string;
  Hospital_Fax: string;
  Hospital_Primary_Email_Id: string;
  Hospital_Secondary_Email_Id: string;
  Website: string;
  Specialties: string;
  Facilities: string;
  Accreditation: string;
  Hospital_Regis_Number: string;
  Registeration_Number_Scan: string;
  Nodal_Person_Info: string;
  Nodal_Person_Tele: string;
  Nodal_Person_Email_Id: string;
  Town: string;
  Subtown: string;
  Village: string;
  Establised_Year: string;
  Ayush: string;
  Miscellaneous_Facilities: string;
  Number_Doctor: string;
  Num_Mediconsultant_or_Expert: string;
  Total_Num_Beds: string;
  Number_Private_Wards: string;
  Num_Bed_for_Eco_Weaker_Sec: string;
  Empanelment_or_Collaboration_with: string;
  Emergency_Services: string;
  Tariff_Range: string;
  State_ID: string;
  District_ID: string;
}

let cachedHospitals: HospitalRecord[] | null = null;

export function loadHospitalDirectory(): HospitalRecord[] {
  if (cachedHospitals) return cachedHospitals;

  try {
    const csvPath = path.join(process.cwd(), 'hospital_directory.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());

    if (lines.length < 2) {
      console.warn('Hospital directory CSV is empty or malformed');
      return [];
    }

    const parseCSVLine = (line: string) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result.map(v => v.replace(/^"|"$/g, '').trim());
    };

    const headers = parseCSVLine(lines[0]);
    const hospitals: HospitalRecord[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length !== headers.length) continue;

      const record: any = {};
      headers.forEach((header, index) => {
        record[header] = values[index] || '';
      });

      hospitals.push(record as HospitalRecord);
    }

    cachedHospitals = hospitals;
    console.log(`Loaded ${hospitals.length} hospitals from directory`);
    return hospitals;
  } catch (error) {
    console.error('Failed to load hospital directory:', error);
    return [];
  }
}

export function searchHospitals(query: string, state?: string, district?: string): HospitalRecord[] {
  const hospitals = loadHospitalDirectory();

  return hospitals.filter(hospital => {
    const matchesQuery = !query ||
      hospital.Hospital_Name.toLowerCase().includes(query.toLowerCase()) ||
      hospital.Address_Original_First_Line.toLowerCase().includes(query.toLowerCase()) ||
      hospital.Specialties.toLowerCase().includes(query.toLowerCase());

    const matchesState = !state || hospital.State.toLowerCase() === state.toLowerCase();
    const matchesDistrict = !district || hospital.District.toLowerCase() === district.toLowerCase();

    return matchesQuery && matchesState && matchesDistrict;
  });
}

export function getHospitalByPincode(pincode: string): HospitalRecord[] {
  const hospitals = loadHospitalDirectory();
  return hospitals.filter(h => h.Pincode === pincode);
}

export function getUniqueStates(): string[] {
  const hospitals = loadHospitalDirectory();
  const statesSet = new Set<string>();
  hospitals.forEach(h => {
    if (h.State) statesSet.add(h.State);
  });
  const states = Array.from(statesSet);
  return states.sort();
}

export function getDistrictsByState(state: string): string[] {
  const hospitals = loadHospitalDirectory();
  const districtsSet = new Set<string>();
  hospitals.forEach(h => {
    if (h.State && h.State.toLowerCase() === state.toLowerCase() && h.District) {
      districtsSet.add(h.District);
    }
  });
  const districts = Array.from(districtsSet);
  return districts.sort();
}
