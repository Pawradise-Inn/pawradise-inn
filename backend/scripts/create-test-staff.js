// Script to create test staff users via API
const axios = require('axios');

const API_URL = 'http://localhost:5000/api/v1/auth/register';

const testStaff = [
  {
    firstname: 'teststaff01',
    lastname: 'teststaff01',
    email: 'teststaff01@gmail.com',
    phoneNumber: '0067412457',
    userName: 'teststaff01',
    password: 'teststaff01',
    role: 'STAFF',
    wage: 15000,
    bankCompany: 'KASIKORN',
    bankAccount: '1234567890',
  },
  {
    firstname: 'teststaff02',
    lastname: 'teststaff02',
    email: 'teststaff02@gmail.com',
    phoneNumber: '0067412458',
    userName: 'teststaff02',
    password: 'teststaff02',
    role: 'STAFF',
    wage: 15000,
    bankCompany: 'KASIKORN',
    bankAccount: '0987654321',
  },
];

async function createStaff() {
  console.log('Creating test staff users...\n');

  for (const staff of testStaff) {
    try {
      const response = await axios.post(API_URL, staff);
      console.log(`✓ Created ${staff.userName}`);
      console.log(`  Email: ${staff.email}`);
      console.log(`  Password: ${staff.password}\n`);
    } catch (error) {
      if (error.response?.data) {
        console.log(`✗ Failed to create ${staff.userName}:`);
        console.log(`  ${error.response.data.message || error.response.data.error}\n`);
      } else {
        console.log(`✗ Error creating ${staff.userName}:`, error.message, '\n');
      }
    }
  }

  console.log('Done! You can now login with:');
  console.log('  Username: teststaff01, Password: teststaff01');
  console.log('  Username: teststaff02, Password: teststaff02');
}

createStaff();
