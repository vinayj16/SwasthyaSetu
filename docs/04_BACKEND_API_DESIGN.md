# 🔌 SwasthyaSetu - Complete Backend API Design

## Overview
This document provides the **complete RESTful API specification** for SwasthyaSetu, including endpoints, request/response formats, authentication, and security measures.

---

## 🏗️ API Architecture

### Technology Stack
- **Framework:** Node.js + Express / Next.js API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JWT + Refresh Tokens
- **Validation:** Zod / Joi
- **Rate Limiting:** Redis
- **File Storage:** AWS S3 / Cloudinary (encrypted)
- **Real-time:** WebSockets (Socket.io)

### Base URL
```
Production: https://api.swasthyasetu.gov.in/v1
Staging: https://staging-api.swasthyasetu.gov.in/v1
Development: http://localhost:3000/api/v1
```

---

## 🔐 Authentication & Authorization

### 1. JWT Token Structure

**Access Token (15 minutes expiry):**
```json
{
  "userId": "uuid",
  "role": "PATIENT | DOCTOR | RECEPTIONIST | HOSPITAL_ADMIN | NATIONAL_ADMIN",
  "hospitalId": "uuid (if applicable)",
  "healthId": "IND-HID-2026-XXXXXXXX (if applicable)",
  "iat": 1706515200,
  "exp": 1706516100
}
```

**Refresh Token (7 days expiry):**
```json
{
  "userId": "uuid",
  "sessionId": "uuid",
  "iat": 1706515200,
  "exp": 1707120000
}
```

### 2. Authentication Endpoints

#### POST `/auth/register`
**Description:** Register new user account

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "password": "SecurePass@123",
  "role": "PATIENT",
  "healthId": "IND-HID-2026-12345678" // Optional, if already has Health ID
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "uuid",
    "email": "john@example.com",
    "role": "PATIENT",
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

#### POST `/auth/login`
**Description:** User login with email/phone and password

**Request Body:**
```json
{
  "email": "john@example.com", // or "phone": "+91-9876543210"
  "password": "SecurePass@123",
  "deviceId": "device-uuid" // For session tracking
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "fullName": "John Doe",
    "role": "PATIENT",
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "mfaRequired": false
  }
}
```

**If MFA enabled (200 OK):**
```json
{
  "success": true,
  "mfaRequired": true,
  "tempToken": "temp-token-for-mfa",
  "message": "OTP sent to registered mobile"
}
```

---

#### POST `/auth/mfa/verify`
**Description:** Verify MFA OTP

**Headers:**
```
Authorization: Bearer <temp-token>
```

**Request Body:**
```json
{
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

#### POST `/auth/refresh`
**Description:** Refresh access token

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..." // New refresh token (rotation)
  }
}
```

---

#### POST `/auth/logout`
**Description:** Logout and invalidate tokens

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🏥 Health Identity (Aadhaar-Linked) APIs

### 1. Health ID Registration

#### POST `/health-id/verify-aadhaar`
**Description:** Verify Aadhaar and send OTP

**Request Body:**
```json
{
  "aadhaarNumber": "1234-5678-9012" // Will be hashed immediately
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP sent to registered mobile",
  "txnId": "transaction-uuid", // For OTP verification
  "maskedMobile": "XXXXXX1234"
}
```

---

#### POST `/health-id/verify-otp`
**Description:** Verify Aadhaar OTP

**Request Body:**
```json
{
  "txnId": "transaction-uuid",
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Aadhaar verified",
  "data": {
    "fullName": "John Doe", // From Aadhaar
    "dob": "1990-01-01",
    "gender": "MALE",
    "aadhaarHash": "sha256-hash" // Never return raw Aadhaar
  }
}
```

---

#### POST `/health-id/create`
**Description:** Create Health ID after Aadhaar verification

**Request Body:**
```json
{
  "aadhaarHash": "sha256-hash",
  "fullName": "John Doe",
  "dob": "1990-01-01",
  "gender": "MALE",
  "mobile": "+91-9876543210",
  "email": "john@example.com",
  "bloodGroup": "A+",
  "emergencyContact": "+91-9876543211",
  "address": "123 Street, City, State - 110001"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Health ID created successfully",
  "data": {
    "healthId": "IND-HID-2026-12345678",
    "fullName": "John Doe",
    "dob": "1990-01-01",
    "gender": "MALE",
    "bloodGroup": "A+",
    "qrCode": "base64-encoded-qr-code",
    "cardUrl": "https://cdn.swasthyasetu.gov.in/cards/IND-HID-2026-12345678.pdf"
  }
}
```

---

#### GET `/health-id/:healthId`
**Description:** Get Health ID details

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "healthId": "IND-HID-2026-12345678",
    "fullName": "John Doe",
    "dob": "1990-01-01",
    "gender": "MALE",
    "mobile": "+91-9876543210",
    "bloodGroup": "A+",
    "emergencyContact": "+91-9876543211",
    "createdAt": "2026-01-01T00:00:00Z",
    "isActive": true
  }
}
```

---

## 🏥 Hospital APIs

### 1. Public Hospital APIs (No Auth Required)

#### GET `/hospitals`
**Description:** Search and list hospitals

**Query Parameters:**
```
?city=Delhi
&state=Delhi
&type=GOVERNMENT
&specialization=Cardiology
&hasBloodBank=true
&hasOrganFacility=true
&latitude=28.7041
&longitude=77.1025
&radius=10 (km)
&page=1
&limit=20
&sortBy=distance|rating|name
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "hospitals": [
      {
        "id": "uuid",
        "name": "ABC Hospital",
        "type": "GOVERNMENT",
        "address": "123 Street, Delhi",
        "city": "Delhi",
        "state": "Delhi",
        "latitude": 28.7041,
        "longitude": 77.1025,
        "distance": 2.5, // km (if lat/long provided)
        "phone": "+91-11-12345678",
        "email": "info@abchospital.com",
        "totalBeds": 500,
        "availableBeds": 120,
        "icuBeds": 50,
        "otRooms": 10,
        "hasBloodBank": true,
        "hasOrganFacility": true,
        "specializations": ["Cardiology", "Neurology"],
        "rating": 4.5,
        "verified": true
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 20,
      "totalPages": 5
    }
  }
}
```

---

#### GET `/hospitals/:id`
**Description:** Get hospital details

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "ABC Hospital",
    "type": "GOVERNMENT",
    "registrationNo": "REG-2020-12345",
    "address": "123 Street, Delhi - 110001",
    "city": "Delhi",
    "state": "Delhi",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "phone": "+91-11-12345678",
    "emergencyPhone": "+91-11-12345679",
    "email": "info@abchospital.com",
    "website": "https://abchospital.com",
    "totalBeds": 500,
    "availableBeds": 120,
    "icuBeds": 50,
    "otRooms": 10,
    "hasBloodBank": true,
    "hasOrganFacility": true,
    "hasMortuary": true,
    "specializations": ["Cardiology", "Neurology", "Orthopedics"],
    "departments": [
      {
        "id": "uuid",
        "name": "Cardiology",
        "headDoctor": "Dr. John Doe",
        "floor": 3
      }
    ],
    "verified": true,
    "createdAt": "2020-01-01T00:00:00Z"
  }
}
```

---

#### GET `/hospitals/:id/doctors`
**Description:** Get hospital doctors

**Query Parameters:**
```
?specialization=Cardiology
&available=true
&page=1
&limit=20
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "doctors": [
      {
        "id": "uuid",
        "name": "Dr. John Doe",
        "specialization": "Cardiology",
        "qualification": "MBBS, MD, DM (Cardiology)",
        "experienceYears": 15,
        "consultFee": 500,
        "opdTimings": {
          "Monday": "09:00-17:00",
          "Wednesday": "09:00-17:00",
          "Friday": "09:00-17:00"
        },
        "available": true,
        "rating": 4.8,
        "totalReviews": 200,
        "profilePhoto": "https://cdn.swasthyasetu.gov.in/doctors/uuid.jpg"
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 20,
      "totalPages": 3
    }
  }
}
```

---

### 2. Hospital Admin APIs (Auth Required)

#### PUT `/hospitals/:id`
**Description:** Update hospital details

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** HOSPITAL_ADMIN (own hospital only)

**Request Body:**
```json
{
  "phone": "+91-11-12345678",
  "email": "newemail@abchospital.com",
  "totalBeds": 550,
  "availableBeds": 150,
  "icuBeds": 55,
  "specializations": ["Cardiology", "Neurology", "Orthopedics", "Oncology"]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Hospital updated successfully",
  "data": {
    // Updated hospital object
  }
}
```

---

## 👨‍⚕️ Doctor APIs

### 1. Doctor Management

#### GET `/doctors/:id`
**Description:** Get doctor details

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Dr. John Doe",
    "specialization": "Cardiology",
    "qualification": "MBBS, MD, DM (Cardiology)",
    "registrationNo": "MCI-12345",
    "experienceYears": 15,
    "hospitalId": "uuid",
    "hospitalName": "ABC Hospital",
    "departmentId": "uuid",
    "departmentName": "Cardiology",
    "consultFee": 500,
    "opdTimings": {
      "Monday": "09:00-17:00",
      "Wednesday": "09:00-17:00",
      "Friday": "09:00-17:00"
    },
    "available": true,
    "canPerformSurgery": true,
    "surgeryTypes": ["Bypass", "Angioplasty"],
    "rating": 4.8,
    "totalReviews": 200,
    "profilePhoto": "https://cdn.swasthyasetu.gov.in/doctors/uuid.jpg",
    "bio": "Experienced cardiologist with 15 years of practice...",
    "languagesSpoken": ["English", "Hindi"]
  }
}
```

---

#### PUT `/doctors/:id/availability`
**Description:** Update doctor availability

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** DOCTOR (own profile only)

**Request Body:**
```json
{
  "available": true,
  "opdTimings": {
    "Monday": "09:00-17:00",
    "Tuesday": "09:00-13:00",
    "Wednesday": "09:00-17:00",
    "Thursday": "09:00-13:00",
    "Friday": "09:00-17:00"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Availability updated successfully"
}
```

---

#### GET `/doctors/:id/appointments`
**Description:** Get doctor's appointments

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** DOCTOR (own appointments only)

**Query Parameters:**
```
?date=2026-01-30
&status=BOOKED|CONFIRMED|COMPLETED|CANCELLED
&page=1
&limit=20
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": "uuid",
        "appointmentNumber": "APT-2026-001",
        "patientId": "uuid",
        "patientName": "John Doe",
        "patientHealthId": "IND-HID-2026-12345678",
        "appointmentDate": "2026-01-30",
        "appointmentTime": "10:00",
        "status": "BOOKED",
        "reason": "Chest pain",
        "notes": null
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 20,
      "totalPages": 3
    }
  }
}
```

---

## 📅 Appointment APIs

### 1. Patient Appointment APIs

#### POST `/appointments`
**Description:** Book new appointment

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** PATIENT, RECEPTIONIST

**Request Body:**
```json
{
  "patientId": "uuid", // Required if booked by receptionist
  "doctorId": "uuid",
  "hospitalId": "uuid",
  "appointmentDate": "2026-01-30",
  "appointmentTime": "10:00",
  "reason": "Chest pain",
  "priority": "NORMAL" // NORMAL, URGENT, EMERGENCY
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": {
    "id": "uuid",
    "appointmentNumber": "APT-2026-001",
    "patientName": "John Doe",
    "doctorName": "Dr. Jane Smith",
    "hospitalName": "ABC Hospital",
    "appointmentDate": "2026-01-30",
    "appointmentTime": "10:00",
    "status": "BOOKED",
    "consultFee": 500,
    "confirmationUrl": "https://swasthyasetu.gov.in/appointments/uuid"
  }
}
```

---

#### GET `/appointments/:id`
**Description:** Get appointment details

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** PATIENT (own), DOCTOR (own), RECEPTIONIST (hospital)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "appointmentNumber": "APT-2026-001",
    "patient": {
      "id": "uuid",
      "name": "John Doe",
      "healthId": "IND-HID-2026-12345678",
      "age": 35,
      "gender": "MALE",
      "bloodGroup": "A+"
    },
    "doctor": {
      "id": "uuid",
      "name": "Dr. Jane Smith",
      "specialization": "Cardiology"
    },
    "hospital": {
      "id": "uuid",
      "name": "ABC Hospital",
      "address": "123 Street, Delhi"
    },
    "appointmentDate": "2026-01-30",
    "appointmentTime": "10:00",
    "slotDuration": 15,
    "status": "BOOKED",
    "reason": "Chest pain",
    "notes": null,
    "prescriptionUrl": null,
    "bookedBy": "uuid",
    "createdAt": "2026-01-25T10:00:00Z"
  }
}
```

---

#### PUT `/appointments/:id/cancel`
**Description:** Cancel appointment

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** PATIENT (own), RECEPTIONIST (hospital)

**Request Body:**
```json
{
  "reason": "Personal emergency"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Appointment cancelled successfully"
}
```

---

#### PUT `/appointments/:id/complete`
**Description:** Mark appointment as completed

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** DOCTOR (own)

**Request Body:**
```json
{
  "diagnosis": "Hypertension",
  "prescription": [
    {
      "medicine": "Amlodipine 5mg",
      "dosage": "1-0-1",
      "duration": "30 days"
    }
  ],
  "notes": "Follow up after 1 month",
  "labTests": ["ECG", "Blood Pressure Monitoring"]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Appointment completed successfully",
  "data": {
    "prescriptionUrl": "https://cdn.swasthyasetu.gov.in/prescriptions/uuid.pdf"
  }
}
```

---

## 🏥 Surgery Schedule APIs

### 1. Surgery Management

#### POST `/surgeries`
**Description:** Schedule new surgery

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** DOCTOR, HOSPITAL_ADMIN

**Request Body:**
```json
{
  "hospitalId": "uuid",
  "doctorId": "uuid",
  "patientHealthId": "IND-HID-2026-12345678",
  "operationName": "Coronary Artery Bypass",
  "operationType": "ELECTIVE", // EMERGENCY, ELECTIVE
  "complexity": "MAJOR", // MINOR, MAJOR, CRITICAL
  "otRoom": "OT-3",
  "scheduledDate": "2026-02-01",
  "startTime": "14:00",
  "endTime": "18:00",
  "estimatedDuration": 240, // minutes
  "assistingDoctors": ["uuid1", "uuid2"],
  "nurses": ["uuid3", "uuid4"],
  "anesthetistId": "uuid5",
  "preOpNotes": "Patient fasting since last night"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Surgery scheduled successfully",
  "data": {
    "id": "uuid",
    "surgeryNumber": "SUR-2026-001",
    "operationName": "Coronary Artery Bypass",
    "scheduledDate": "2026-02-01",
    "startTime": "14:00",
    "status": "SCHEDULED"
  }
}
```

---

#### GET `/surgeries/:id`
**Description:** Get surgery details

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** DOCTOR (involved), HOSPITAL_ADMIN (hospital)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "surgeryNumber": "SUR-2026-001",
    "hospital": {
      "id": "uuid",
      "name": "ABC Hospital"
    },
    "doctor": {
      "id": "uuid",
      "name": "Dr. John Doe",
      "specialization": "Cardiology"
    },
    "patient": {
      "healthId": "IND-HID-2026-12345678",
      "name": "Jane Doe",
      "age": 55,
      "gender": "FEMALE",
      "bloodGroup": "B+"
    },
    "operationName": "Coronary Artery Bypass",
    "operationType": "ELECTIVE",
    "complexity": "MAJOR",
    "otRoom": "OT-3",
    "scheduledDate": "2026-02-01",
    "startTime": "14:00",
    "endTime": "18:00",
    "estimatedDuration": 240,
    "assistingDoctors": [
      {"id": "uuid1", "name": "Dr. A"},
      {"id": "uuid2", "name": "Dr. B"}
    ],
    "nurses": [
      {"id": "uuid3", "name": "Nurse X"},
      {"id": "uuid4", "name": "Nurse Y"}
    ],
    "anesthetist": {
      "id": "uuid5",
      "name": "Dr. C"
    },
    "status": "SCHEDULED",
    "preOpNotes": "Patient fasting since last night",
    "postOpNotes": null,
    "complications": null,
    "consentFormUrl": "https://cdn.swasthyasetu.gov.in/consents/uuid.pdf",
    "consentGiven": true,
    "createdAt": "2026-01-25T10:00:00Z"
  }
}
```

---

#### PUT `/surgeries/:id/status`
**Description:** Update surgery status

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** DOCTOR (involved)

**Request Body:**
```json
{
  "status": "IN_PROGRESS", // SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, POSTPONED
  "postOpNotes": "Surgery completed successfully",
  "complications": "None"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Surgery status updated successfully"
}
```

---

## 🩸 Blood Bank APIs

### 1. Blood Bank Management

#### GET `/hospitals/:hospitalId/blood-bank`
**Description:** Get blood bank inventory

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "hospitalId": "uuid",
    "hospitalName": "ABC Hospital",
    "inventory": [
      {
        "bloodGroup": "A+",
        "unitsAvailable": 20,
        "unitsReserved": 5,
        "lastDonationDate": "2026-01-28",
        "lowStockAlert": false
      },
      {
        "bloodGroup": "O-",
        "unitsAvailable": 2,
        "unitsReserved": 1,
        "lastDonationDate": "2026-01-20",
        "lowStockAlert": true
      }
    ],
    "lastUpdated": "2026-01-29T10:00:00Z"
  }
}
```

---

#### PUT `/hospitals/:hospitalId/blood-bank/:bloodGroup`
**Description:** Update blood inventory

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** HOSPITAL_ADMIN (own hospital)

**Request Body:**
```json
{
  "unitsAvailable": 25,
  "unitsReserved": 3,
  "lastDonationDate": "2026-01-29"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Blood inventory updated successfully"
}
```

---

#### GET `/blood-bank/search`
**Description:** Search blood availability nearby

**Query Parameters:**
```
?bloodGroup=A+
&latitude=28.7041
&longitude=77.1025
&radius=10 (km)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "hospital": {
          "id": "uuid",
          "name": "ABC Hospital",
          "address": "123 Street, Delhi",
          "phone": "+91-11-12345678",
          "distance": 2.5
        },
        "bloodGroup": "A+",
        "unitsAvailable": 20,
        "status": "AVAILABLE"
      }
    ]
  }
}
```

---

## 🫀 Organ Donation APIs

#### POST `/organ-donations`
**Description:** Register organ donation pledge

**Headers:**
```
Authorization: Bearer <access-token>
```

**Request Body:**
```json
{
  "donorHealthId": "IND-HID-2026-12345678",
  "hospitalId": "uuid",
  "organType": "KIDNEY", // KIDNEY, LIVER, HEART, LUNGS, PANCREAS, CORNEA
  "status": "PLEDGED",
  "bloodGroup": "A+",
  "medicalClearance": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Organ donation registered successfully",
  "data": {
    "id": "uuid",
    "donorHealthId": "IND-HID-2026-12345678",
    "organType": "KIDNEY",
    "status": "PLEDGED",
    "pledgeDate": "2026-01-29"
  }
}
```

---

## 👶 Birth & Death Records APIs

### 1. Birth Records

#### POST `/birth-records`
**Description:** Register birth

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** DOCTOR, HOSPITAL_ADMIN

**Request Body:**
```json
{
  "childHealthId": "IND-HID-2026-NEW001", // Pre-generated
  "motherHealthId": "IND-HID-2026-12345678",
  "fatherName": "John Doe",
  "hospitalId": "uuid",
  "doctorId": "uuid",
  "dob": "2026-01-29T08:30:00Z",
  "gender": "MALE",
  "weightKg": 3.2,
  "heightCm": 50,
  "deliveryType": "NORMAL", // NORMAL, C_SECTION, ASSISTED
  "complications": "None"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Birth registered successfully",
  "data": {
    "id": "uuid",
    "birthCertificateNo": "BIRTH-2026-001",
    "childHealthId": "IND-HID-2026-NEW001",
    "certificateUrl": "https://cdn.swasthyasetu.gov.in/certificates/birth/uuid.pdf"
  }
}
```

---

### 2. Death Records

#### POST `/death-records`
**Description:** Register death

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** DOCTOR, HOSPITAL_ADMIN

**Request Body:**
```json
{
  "patientHealthId": "IND-HID-2026-12345678",
  "hospitalId": "uuid",
  "doctorId": "uuid",
  "dod": "2026-01-29T15:00:00Z",
  "causeOfDeath": "Cardiac arrest",
  "deathType": "NATURAL", // NATURAL, ACCIDENTAL, SUICIDE, HOMICIDE, UNKNOWN
  "autopsyRequired": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Death registered successfully",
  "data": {
    "id": "uuid",
    "deathCertificateNo": "DEATH-2026-001",
    "certificateUrl": "https://cdn.swasthyasetu.gov.in/certificates/death/uuid.pdf"
  }
}
```

---

## 🏛️ National Admin APIs

### 1. Analytics & Statistics

#### GET `/national-admin/statistics`
**Description:** Get national health statistics

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** NATIONAL_ADMIN

**Query Parameters:**
```
?startDate=2026-01-01
&endDate=2026-01-31
&state=Delhi (optional)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "hospitals": {
      "total": 5000,
      "government": 3000,
      "private": 2000,
      "verified": 4800
    },
    "doctors": {
      "total": 50000,
      "active": 48000
    },
    "healthIds": {
      "total": 10000000,
      "issuedThisMonth": 50000
    },
    "appointments": {
      "total": 500000,
      "completed": 450000,
      "cancelled": 25000
    },
    "surgeries": {
      "total": 10000,
      "completed": 9500,
      "scheduled": 500
    },
    "births": {
      "total": 35000,
      "thisMonth": 35000
    },
    "deaths": {
      "total": 22000,
      "thisMonth": 22000
    },
    "bloodBank": {
      "totalUnits": 50000,
      "criticalShortage": 15
    },
    "organDonations": {
      "pledged": 5000,
      "transplanted": 200
    }
  }
}
```

---

#### GET `/national-admin/hospitals/state-wise`
**Description:** Get state-wise hospital distribution

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** NATIONAL_ADMIN

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "state": "Maharashtra",
      "totalHospitals": 800,
      "government": 500,
      "private": 300,
      "totalBeds": 80000,
      "totalDoctors": 8000
    },
    {
      "state": "Uttar Pradesh",
      "totalHospitals": 750,
      "government": 600,
      "private": 150,
      "totalBeds": 75000,
      "totalDoctors": 7500
    }
  ]
}
```

---

## 🔔 Notification APIs

#### GET `/notifications`
**Description:** Get user notifications

**Headers:**
```
Authorization: Bearer <access-token>
```

**Query Parameters:**
```
?read=false
&page=1
&limit=20
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "APPOINTMENT_REMINDER",
        "title": "Appointment Reminder",
        "message": "Your appointment with Dr. John Doe is tomorrow at 10:00 AM",
        "priority": "HIGH",
        "readAt": null,
        "createdAt": "2026-01-28T10:00:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 20,
      "totalPages": 3
    }
  }
}
```

---

#### PUT `/notifications/:id/read`
**Description:** Mark notification as read

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

## 🔍 Audit Logs APIs

#### GET `/audit-logs`
**Description:** Get audit logs

**Headers:**
```
Authorization: Bearer <access-token>
```

**Permissions:** HOSPITAL_ADMIN (hospital), NATIONAL_ADMIN (all)

**Query Parameters:**
```
?userId=uuid
&action=CREATE|READ|UPDATE|DELETE
&entityType=APPOINTMENT|SURGERY|PATIENT
&startDate=2026-01-01
&endDate=2026-01-31
&page=1
&limit=20
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "uuid",
        "userId": "uuid",
        "userName": "Dr. John Doe",
        "userRole": "DOCTOR",
        "action": "UPDATE",
        "entityType": "APPOINTMENT",
        "entityId": "uuid",
        "timestamp": "2026-01-29T10:00:00Z",
        "status": "SUCCESS",
        "ipAddress": "192.168.1.1"
      }
    ],
    "pagination": {
      "total": 1000,
      "page": 1,
      "limit": 20,
      "totalPages": 50
    }
  }
}
```

---

## 🔒 Security Features

### 1. Rate Limiting

**Limits:**
- Authentication endpoints: 5 requests/minute
- Public APIs: 100 requests/minute
- Authenticated APIs: 1000 requests/minute

**Response (429 Too Many Requests):**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "retryAfter": 60
  }
}
```

---

### 2. Input Validation

**All requests validated using Zod/Joi schemas**

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "phone",
        "message": "Phone number must be 10 digits"
      }
    ]
  }
}
```

---

### 3. Error Responses

**Standard Error Format:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional details
  }
}
```

**Common Error Codes:**
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `VALIDATION_ERROR` (400)
- `CONFLICT` (409)
- `INTERNAL_SERVER_ERROR` (500)

---

## 📊 Pagination

**Standard Pagination Format:**
```json
{
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 🎯 API Versioning

**URL Versioning:**
```
/api/v1/hospitals
/api/v2/hospitals (future)
```

**Header Versioning (Alternative):**
```
Accept: application/vnd.swasthyasetu.v1+json
```

---

## 🚀 Performance Optimization

1. **Caching:** Redis for frequently accessed data
2. **Database Indexing:** All foreign keys and search fields
3. **Query Optimization:** Use Prisma's `select` and `include`
4. **Compression:** Gzip/Brotli for responses
5. **CDN:** Static assets and media files

---

## 📝 API Documentation

**Interactive Documentation:**
- **Swagger/OpenAPI:** https://api.swasthyasetu.gov.in/docs
- **Postman Collection:** Available for download

---

**This API design provides:**
✅ RESTful architecture
✅ JWT-based authentication
✅ Role-based access control
✅ Hospital data isolation
✅ Comprehensive error handling
✅ Rate limiting & security
✅ Pagination & filtering
✅ Audit logging
✅ Scalability & performance
