import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🧹 Cleaning database...');

    // Delete in order to satisfy relations
    await prisma.auditLog.deleteMany();
    await prisma.notification.deleteMany();
    // await prisma.dataAccessLog.deleteMany(); // not in schema
    // await prisma.healthContent.deleteMany(); // not in schema
    await prisma.appointment.deleteMany();
    // await prisma.prescription.deleteMany(); // not in schema
    // await prisma.medicalRecord.deleteMany(); // not in schema
    await prisma.surgerySchedule.deleteMany();
    await prisma.bloodBank.deleteMany();
    // await prisma.familyMember.deleteMany(); // not in schema
    await prisma.birthRecord.deleteMany();
    await prisma.deathRecord.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.hospital.deleteMany();
    await prisma.user.deleteMany();

    console.log('🌱 Starting professional database seed...');

    const passwordHash = await bcrypt.hash('password123', 12);

    // 1. Create Elite Hospitals
    const hospitals = await Promise.all([
        prisma.hospital.create({
            data: {
                name: 'Apollo Indraprastha',
                type: 'PRIVATE',
                registrationNo: 'ND-API-2026-001',
                address: 'Sarita Vihar, Delhi Mathura Road',
                city: 'New Delhi',
                state: 'Delhi',
                pincode: '110076',
                phone: '011-29871090',
                email: 'contact@apollo-delhi.in',
                totalBeds: 800,
                availableBeds: 142,
                icuBeds: 80,
                // availableIcuBeds: 12, // not in schema
                otRooms: 12,
                // ambulancesActive: 6, // not in schema
                hasBloodBank: true,
                hasOrganFacility: true,
                verified: true,
            },
        }),
        prisma.hospital.create({
            data: {
                name: 'Fortis Memorial Research Institute',
                type: 'PRIVATE',
                registrationNo: 'HR-FMRI-2026-002',
                address: 'Sector 44, Opposite HUDA City Centre',
                city: 'Gurugram',
                state: 'Haryana',
                pincode: '122002',
                phone: '0124-4921021',
                email: 'info@fortis-memorial.com',
                totalBeds: 650,
                availableBeds: 94,
                icuBeds: 65,
                // availableIcuBeds: 5, // not in schema
                otRooms: 10,
                // ambulancesActive: 4, // not in schema
                hasBloodBank: true,
                hasOrganFacility: true,
                verified: true,
            },
        })
    ]);

    // 2. Create Users
    const patientUser = await prisma.user.create({
        data: {
            fullName: 'Vihaan Sharma',
            email: 'patient@example.com',
            phone: '9812345678',
            role: 'PATIENT',
            passwordHash,
        },
    });

    const doctorUser1 = await prisma.user.create({
        data: {
            fullName: 'Dr. Ananya Iyer',
            email: 'doctor@example.com',
            phone: '9823456789',
            role: 'DOCTOR',
            passwordHash,
        },
    });

    const adminUser = await prisma.user.create({
        data: {
            fullName: 'Rajesh Mehta',
            email: 'admin@example.com',
            phone: '9834567890',
            role: 'HOSPITAL_ADMIN',
            passwordHash,
        },
    });

    // 3. Create Profiles
    const patient = await prisma.patient.create({
        data: {
            userId: patientUser.id,
            healthId: 'IND-HID-2026-V8N2-99P1',
            name: 'Vihaan Sharma',
            age: 28,
            gender: 'MALE',
            bloodGroup: 'O+',
            address: 'H-21, Green Park Extension, New Delhi',
            // dataSharingConsent: true, // not in schema
            // profilePhotoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200', // not in schema
        },
    });

    const doctor1 = await prisma.doctor.create({
        data: {
            userId: doctorUser1.id,
            hospitalId: hospitals[0].id,
            name: 'Dr. Ananya Iyer',
            specialization: 'Neurology',
            qualification: 'MBBS, MD, DM (Neurology)',
            registrationNo: 'MCI-DEL-99120',
            experienceYears: 14,
            available: true,
            consultFee: 1800,
            rating: 4.9,
        },
    });

    // 4. Create Blood Bank Stock
    const bGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    for (const h of hospitals) {
        for (const bg of bGroups) {
            await prisma.bloodBank.create({
                data: {
                    hospitalId: h.id,
                    bloodGroup: bg,
                    unitsAvailable: Math.floor(Math.random() * 50) + 10,
                }
            });
        }
    }

    // 5. Create Appointments
    await prisma.appointment.create({
        data: {
            appointmentNumber: 'APT-26-441-NX',
            patientId: patient.id,
            doctorId: doctor1.id,
            hospitalId: hospitals[0].id,
            appointmentAt: new Date(), // renamed from appointmentDate
            // appointmentTime: '10:30', // not in schema
            status: 'BOOKED',
            reason: 'Chronic Migraine consultation',
        }
    });

    // 6. Healthy Content
    // await prisma.healthContent.create({
    //     data: {
    //         category: 'POLICY',
    //         title: 'Ayushman Bharat 2.0: National Insurance Overhaul',
    //         content: 'The Ministry of Health has announced a ₹10 Lakh coverage increase for all verified Health ID holders effectively immediately across all empanelled tertiary care nodes.',
    //         isOfficial: true,
    //         createdAt: new Date()
    //     }
    // });

    console.log('\n🎉 Seed successful! SwasthyaSetu is now populated with professional data.');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
