-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'PATIENT',
    "passwordHash" TEXT NOT NULL,
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "mfaSecret" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastLogin" DATETIME
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "accessTokenHash" TEXT NOT NULL,
    "refreshTokenHash" TEXT NOT NULL,
    "deviceId" TEXT,
    "deviceName" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    "lastActivity" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "revokedAt" DATETIME,
    "revokeReason" TEXT,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "health_identities" (
    "healthId" TEXT NOT NULL PRIMARY KEY,
    "aadhaarHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "bloodGroup" TEXT,
    "emergencyContact" TEXT,
    "addressEncrypted" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "health_identities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "hospitals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "latitude" REAL,
    "longitude" REAL,
    "phone" TEXT,
    "email" TEXT,
    "emergencyPhone" TEXT,
    "website" TEXT,
    "totalBeds" INTEGER NOT NULL DEFAULT 0,
    "availableBeds" INTEGER NOT NULL DEFAULT 0,
    "icuBeds" INTEGER NOT NULL DEFAULT 0,
    "otRooms" INTEGER NOT NULL DEFAULT 0,
    "hasBloodBank" BOOLEAN NOT NULL DEFAULT false,
    "hasOrganFacility" BOOLEAN NOT NULL DEFAULT false,
    "hasMortuary" BOOLEAN NOT NULL DEFAULT false,
    "specializations" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "departments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hospitalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "floorNumber" INTEGER,
    "contactExtension" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "departments_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "departmentId" TEXT,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "experienceYears" INTEGER NOT NULL DEFAULT 0,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "opdTimings" TEXT,
    "consultFee" DECIMAL NOT NULL,
    "canPerformSurgery" BOOLEAN NOT NULL DEFAULT false,
    "surgeryTypes" TEXT,
    "profilePhotoUrl" TEXT,
    "bio" TEXT,
    "languagesSpoken" TEXT,
    "rating" REAL NOT NULL DEFAULT 0.0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "doctors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "doctors_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "doctors_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "departmentId" TEXT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "shiftType" TEXT,
    "shiftStartTime" TEXT,
    "shiftEndTime" TEXT,
    "phone" TEXT,
    "emergencyContact" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "joinedDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "employees_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "employees_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "receptionists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "canBookAppointments" BOOLEAN NOT NULL DEFAULT true,
    "canRegisterPatients" BOOLEAN NOT NULL DEFAULT true,
    "canViewRecords" BOOLEAN NOT NULL DEFAULT false,
    "shiftType" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receptionists_userId_fkey"
        FOREIGN KEY ("userId") REFERENCES "users" ("id")
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT "receptionists_hospitalId_fkey"
        FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);


-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "healthId" TEXT,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT NOT NULL,
    "address" TEXT,
    "bloodGroup" TEXT,
    "emergencyContact" TEXT,
    "allergies" TEXT,
    "chronicConditions" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patients_userId_fkey"
        FOREIGN KEY ("userId") REFERENCES "users" ("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);


-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "appointmentNumber" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "appointmentDate" DATETIME NOT NULL,
    "appointmentTime" TEXT NOT NULL,
    "slotDuration" INTEGER NOT NULL DEFAULT 15,
    "status" TEXT NOT NULL DEFAULT 'BOOKED',
    "reason" TEXT,
    "notes" TEXT,
    "prescriptionUrl" TEXT,
    "reminderSent" BOOLEAN NOT NULL DEFAULT false,
    "bookedBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "appointments_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "surgery_schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "surgeryNumber" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "patientHealthId" TEXT NOT NULL,
    "operationName" TEXT NOT NULL,
    "operationType" TEXT,
    "complexity" TEXT,
    "otRoom" TEXT NOT NULL,
    "scheduledDate" DATETIME NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "estimatedDuration" INTEGER,
    "assistingDoctors" TEXT,
    "nurses" TEXT,
    "anesthetistId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "preOpNotes" TEXT,
    "postOpNotes" TEXT,
    "complications" TEXT,
    "consentFormUrl" TEXT,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "surgery_schedules_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "surgery_schedules_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "surgery_schedules_patientHealthId_fkey" FOREIGN KEY ("patientHealthId") REFERENCES "health_identities" ("healthId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "blood_banks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hospitalId" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "unitsAvailable" INTEGER NOT NULL DEFAULT 0,
    "unitsReserved" INTEGER NOT NULL DEFAULT 0,
    "lastDonationDate" DATETIME,
    "lastUpdated" DATETIME NOT NULL,
    "lowStockAlert" BOOLEAN NOT NULL DEFAULT false,
    "criticalLevel" INTEGER NOT NULL DEFAULT 5,
    CONSTRAINT "blood_banks_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "organ_donations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "donorHealthId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "organType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "pledgeDate" DATETIME NOT NULL,
    "expiryDate" DATETIME,
    "recipientHealthId" TEXT,
    "transplantDate" DATETIME,
    "bloodGroup" TEXT,
    "tissueType" TEXT,
    "medicalClearance" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "organ_donations_donorHealthId_fkey" FOREIGN KEY ("donorHealthId") REFERENCES "health_identities" ("healthId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "organ_donations_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "birth_records" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "birthCertificateNo" TEXT NOT NULL,
    "childHealthId" TEXT NOT NULL,
    "motherHealthId" TEXT NOT NULL,
    "fatherName" TEXT,
    "hospitalId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "weightKg" REAL,
    "heightCm" REAL,
    "deliveryType" TEXT,
    "complications" TEXT,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuedBy" TEXT,
    CONSTRAINT "birth_records_childHealthId_fkey" FOREIGN KEY ("childHealthId") REFERENCES "health_identities" ("healthId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "birth_records_motherHealthId_fkey" FOREIGN KEY ("motherHealthId") REFERENCES "health_identities" ("healthId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "birth_records_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "birth_records_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "death_records" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deathCertificateNo" TEXT NOT NULL,
    "patientHealthId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "dod" DATETIME NOT NULL,
    "causeOfDeath" TEXT NOT NULL,
    "deathType" TEXT,
    "autopsyRequired" BOOLEAN NOT NULL DEFAULT false,
    "autopsyDone" BOOLEAN NOT NULL DEFAULT false,
    "autopsyReportUrl" TEXT,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuedBy" TEXT,
    CONSTRAINT "death_records_patientHealthId_fkey" FOREIGN KEY ("patientHealthId") REFERENCES "health_identities" ("healthId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "death_records_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "death_records_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "mortuaries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hospitalId" TEXT NOT NULL,
    "slotNumber" TEXT NOT NULL,
    "bodyHealthId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "dateIn" DATETIME,
    "dateOut" DATETIME,
    "storageDuration" INTEGER,
    "bodyCondition" TEXT,
    "refrigerationTemp" REAL,
    "releasedTo" TEXT,
    "releaseDocumentUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "mortuaries_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "channels" TEXT,
    "sentAt" DATETIME,
    "readAt" DATETIME,
    "entityType" TEXT,
    "entityId" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "userRole" TEXT,
    "userIp" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospitalId" TEXT,
    "oldValue" TEXT,
    "newValue" TEXT,
    "metadata" TEXT,
    "status" TEXT,
    "errorMessage" TEXT,
    CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "audit_logs_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "health_identities_aadhaarHash_key" ON "health_identities"("aadhaarHash");

-- CreateIndex
CREATE UNIQUE INDEX "health_identities_userId_key" ON "health_identities"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "hospitals_registrationNo_key" ON "hospitals"("registrationNo");

-- CreateIndex
CREATE UNIQUE INDEX "departments_hospitalId_name_key" ON "departments"("hospitalId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_userId_key" ON "doctors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_registrationNo_key" ON "doctors"("registrationNo");

-- CreateIndex
CREATE UNIQUE INDEX "employees_userId_key" ON "employees"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "employees_employeeId_key" ON "employees"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "receptionists_userId_key" ON "receptionists"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "receptionists_employeeId_key" ON "receptionists"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "patients_userId_key" ON "patients"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_appointmentNumber_key" ON "appointments"("appointmentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "surgery_schedules_surgeryNumber_key" ON "surgery_schedules"("surgeryNumber");

-- CreateIndex
CREATE UNIQUE INDEX "blood_banks_hospitalId_bloodGroup_key" ON "blood_banks"("hospitalId", "bloodGroup");

-- CreateIndex
CREATE UNIQUE INDEX "birth_records_birthCertificateNo_key" ON "birth_records"("birthCertificateNo");

-- CreateIndex
CREATE UNIQUE INDEX "birth_records_childHealthId_key" ON "birth_records"("childHealthId");

-- CreateIndex
CREATE UNIQUE INDEX "death_records_deathCertificateNo_key" ON "death_records"("deathCertificateNo");

-- CreateIndex
CREATE UNIQUE INDEX "death_records_patientHealthId_key" ON "death_records"("patientHealthId");

-- CreateIndex
CREATE UNIQUE INDEX "mortuaries_bodyHealthId_key" ON "mortuaries"("bodyHealthId");

-- CreateIndex
CREATE UNIQUE INDEX "mortuaries_hospitalId_slotNumber_key" ON "mortuaries"("hospitalId", "slotNumber");
