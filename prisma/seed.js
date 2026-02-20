const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    console.log('Starting seed...');

    // Create National Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@swasthyasetu.gov.in' },
        update: {},
        create: {
            fullName: 'National Health Administrator',
            email: 'admin@swasthyasetu.gov.in',
            passwordHash,
            role: 'NATIONAL_ADMIN'
        }
    });

    // Create Hospitals
    const hospitalsData = [
        {
            name: 'AIIMS Delhi',
            type: 'GOVERNMENT',
            registrationNo: 'AIIMS-ND-001',
            address: 'Ansari Nagar',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110029',
            totalBeds: 2478,
            availableBeds: 142,
            icuBeds: 240,
            otRooms: 45
        },
        {
            name: 'Apollo Indraprastha',
            type: 'PRIVATE',
            registrationNo: 'APOLLO-ND-002',
            address: 'Sarita Vihar',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110076',
            totalBeds: 710,
            availableBeds: 89,
            icuBeds: 110,
            otRooms: 20
        },
        {
            name: 'Fortis Memorial',
            type: 'PRIVATE',
            registrationNo: 'FORTIS-HR-001',
            address: 'Sector 44',
            city: 'Gurugram',
            state: 'Haryana',
            pincode: '122002',
            totalBeds: 1000,
            availableBeds: 120,
            icuBeds: 150,
            otRooms: 25
        }
    ];

    for (const h of hospitalsData) {
        const hospital = await prisma.hospital.upsert({
            where: { registrationNo: h.registrationNo },
            update: h,
            create: h
        });

        console.log(`Seeding hospital: ${hospital.name}`);

        // 1. Doctor
        const doctorEmail = `dr.${hospital.name.split(' ')[0].toLowerCase()}@swasthyasetu.in`;
        let doctorUser = await prisma.user.findUnique({ where: { email: doctorEmail } });
        if (!doctorUser) {
            doctorUser = await prisma.user.create({
                data: {
                    fullName: `Dr. Vikram ${hospital.name.split(' ')[0]}`,
                    email: doctorEmail,
                    passwordHash,
                    role: 'DOCTOR'
                }
            });
        }

        const existingDoctor = await prisma.doctor.findFirst({ where: { userId: doctorUser.id } });
        if (!existingDoctor) {
            await prisma.doctor.create({
                data: {
                    userId: doctorUser.id,
                    hospitalId: hospital.id,
                    name: doctorUser.fullName,
                    specialization: 'CARDIOLOGY',
                    qualification: 'MBBS, MD',
                    registrationNo: `REG-${hospital.registrationNo}-${doctorUser.id.substring(0, 4)}`,
                    experienceYears: 15,
                    consultFee: 500
                }
            });
        }

        // 2. Receptionist
        const receptionEmail = `reception.${hospital.name.split(' ')[0].toLowerCase()}@swasthyasetu.in`;
        let receptionUser = await prisma.user.findUnique({ where: { email: receptionEmail } });
        if (!receptionUser) {
            receptionUser = await prisma.user.create({
                data: {
                    fullName: `Receptionist ${hospital.name.split(' ')[0]}`,
                    email: receptionEmail,
                    passwordHash,
                    role: 'RECEPTIONIST'
                }
            });
        }

        if (prisma.receptionists) {
            const existingRec = await prisma.receptionists.findFirst({ where: { userId: receptionUser.id } });
            if (!existingRec) {
                await prisma.receptionists.create({
                    data: {
                        id: crypto.randomUUID(),
                        userId: receptionUser.id,
                        hospitalId: hospital.id,
                        name: receptionUser.fullName,
                        employeeId: `EMP-${hospital.registrationNo}-${receptionUser.id.substring(0, 4)}`
                    }
                });
            }
        }

        // 3. Admin
        const adminEmail = `admin.${hospital.name.split(' ')[0].toLowerCase()}@swasthyasetu.in`;
        let hAdminUser = await prisma.user.findUnique({ where: { email: adminEmail } });
        if (!hAdminUser) {
            hAdminUser = await prisma.user.create({
                data: {
                    fullName: `Admin ${hospital.name.split(' ')[0]}`,
                    email: adminEmail,
                    passwordHash,
                    role: 'HOSPITAL_ADMIN'
                }
            });
        }

        if (prisma.employees) {
            const existingEmp = await prisma.employees.findFirst({ where: { userId: hAdminUser.id } });
            if (!existingEmp) {
                await prisma.employees.create({
                    data: {
                        id: crypto.randomUUID(),
                        userId: hAdminUser.id,
                        hospitalId: hospital.id,
                        name: hAdminUser.fullName,
                        role: 'ADMINISTRATOR',
                        employeeId: `ADM-${hospital.registrationNo}-${hAdminUser.id.substring(0, 4)}`,
                        joinedDate: new Date()
                    }
                });
            }
        }

        // 4. Blood Bank
        if (prisma.blood_banks) {
            const groups = ['O+', 'O-', 'A+', 'B-', 'AB+'];
            for (const bloodGroup of groups) {
                const existingBlood = await prisma.blood_banks.findFirst({
                    where: { hospitalId: hospital.id, bloodGroup }
                });
                if (!existingBlood) {
                    await prisma.blood_banks.create({
                        data: {
                            id: crypto.randomUUID(),
                            hospitalId: hospital.id,
                            bloodGroup,
                            unitsAvailable: Math.floor(Math.random() * 100) + 10,
                            lastUpdated: new Date()
                        }
                    });
                }
            }
        }
    }

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
