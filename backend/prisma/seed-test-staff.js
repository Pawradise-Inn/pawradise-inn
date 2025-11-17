// Load environment variables
require('dotenv').config({ path: './config/config.env.local' });

const { PrismaClient } = require('../generated/prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed test staff users...');

  // Hash password for both users
  const hashedPassword = await bcrypt.hash('teststaff01', 10);
  const hashedPassword2 = await bcrypt.hash('teststaff02', 10);

  try {
    // Create teststaff01
    const staff1 = await prisma.user.upsert({
      where: { user_name: 'teststaff01' },
      update: {},
      create: {
        firstname: 'teststaff01',
        lastname: 'teststaff01',
        email: 'teststaff01@gmail.com',
        phone_number: '0067412457',
        user_name: 'teststaff01',
        password: hashedPassword,
        role: 'STAFF',
        staff: {
          create: {
            wages: 15000,
            bank_company: 'KASIKORN',
            bank_account: '1234567890',
          },
        },
      },
    });
    console.log('✓ Created teststaff01:', staff1.user_name);

    // Create teststaff02
    const staff2 = await prisma.user.upsert({
      where: { user_name: 'teststaff02' },
      update: {},
      create: {
        firstname: 'teststaff02',
        lastname: 'teststaff02',
        email: 'teststaff02@gmail.com',
        phone_number: '0067412458',
        user_name: 'teststaff02',
        password: hashedPassword2,
        role: 'STAFF',
        staff: {
          create: {
            wages: 15000,
            bank_company: 'Test Bank',
            bank_account: '0987654321',
          },
        },
      },
    });
    console.log('✓ Created teststaff02:', staff2.user_name);

    console.log('\n✅ Test staff users seeded successfully!');
    console.log('\nYou can now login with:');
    console.log('  Username: teststaff01, Password: teststaff01');
    console.log('  Username: teststaff02, Password: teststaff02');
  } catch (error) {
    console.error('Error seeding test staff:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
