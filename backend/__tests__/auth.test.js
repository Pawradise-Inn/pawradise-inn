const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/auth');
const prisma = require('../prisma/prisma');
const { hashPassword } = require('../controllers/logics/auth');
const { getSignedJwtToken } = require('../controllers/logics/auth');

// Mock dependencies
jest.mock('../prisma/prisma', () => ({
  user: {
    create: jest.fn(),
  },
  customer: {
    create: jest.fn(),
  },
  staff: {
    create: jest.fn(),
  },
  $transaction: jest.fn(),
}));

jest.mock('../controllers/logics/auth', () => ({
  hashPassword: jest.fn(),
  getSignedJwtToken: jest.fn(),
  matchPassword: jest.fn(),
  findUserByUsername: jest.fn(),
}));

// Setup Express app for testing
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);

describe('User Registration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    const validCustomerData = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '0812345678',
      userName: 'johndoe123',
      password: 'SecurePass123',
      role: 'CUSTOMER',
    };

    it('should register a new customer successfully', async () => {
      const hashedPassword = 'hashed_password_123';
      const mockUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '0812345678',
        user_name: 'johndoe123',
        password: hashedPassword,
        role: 'CUSTOMER',
      };

      hashPassword.mockResolvedValue(hashedPassword);
      getSignedJwtToken.mockReturnValue('mock_jwt_token');

      prisma.$transaction.mockImplementation(async (callback) => {
        return await callback({
          user: {
            create: jest.fn().mockResolvedValue(mockUser),
          },
          customer: {
            create: jest.fn().mockResolvedValue({ id: 1, userId: 1 }),
          },
        });
      });

      const response = await request(app)
        .post('/auth/register')
        .send(validCustomerData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message.type).toBe('REGISTERED_SUCCESSFULLY');
      expect(response.body.message.header).toBe('Registration Complete');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user.firstname).toBe('John');
      expect(response.body.data.user.role).toBe('CUSTOMER');
    });

    it('should register a new staff member successfully', async () => {
      const staffData = {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '0823456789',
        userName: 'janestaff',
        password: 'StaffPass456',
        role: 'STAFF',
        wage: 15000,
        bankCompany: 'Test Bank',
        bankAccount: '1234567890',
      };

      const hashedPassword = 'hashed_staff_password';
      const mockUser = {
        id: 2,
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        phone_number: '0823456789',
        user_name: 'janestaff',
        password: hashedPassword,
        role: 'STAFF',
      };

      hashPassword.mockResolvedValue(hashedPassword);
      getSignedJwtToken.mockReturnValue('mock_jwt_token_staff');

      prisma.$transaction.mockImplementation(async (callback) => {
        return await callback({
          user: {
            create: jest.fn().mockResolvedValue(mockUser),
          },
          staff: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              userId: 2,
              wages: 15000,
              bank_company: 'Test Bank',
              bank_account: '1234567890',
            }),
          },
        });
      });

      const response = await request(app)
        .post('/auth/register')
        .send(staffData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message.type).toBe('REGISTERED_SUCCESSFULLY');
      expect(response.body.data.user.role).toBe('STAFF');
    });

    it('should return 400 when required fields are missing', async () => {
      const incompleteData = {
        firstname: 'John',
        email: 'john@example.com',
        // Missing lastname, phoneNumber, userName, password
      };

      const response = await request(app)
        .post('/auth/register')
        .send(incompleteData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('MISSING_FIELDS');
      expect(response.body.error.header).toBe('Missing Information');
      expect(response.body.error.content).toBe(
        'Please fill in all required fields to create your account'
      );
    });

    it('should return 409 when email already exists', async () => {
      hashPassword.mockResolvedValue('hashed_password');

      const duplicateError = new Error('Unique constraint failed');
      duplicateError.code = 'P2002';
      duplicateError.meta = { target: ['email'] };

      prisma.$transaction.mockRejectedValue(duplicateError);

      const response = await request(app)
        .post('/auth/register')
        .send(validCustomerData);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('ALREADY_EXISTS');
      expect(response.body.error.header).toBe('Already Exists');
      expect(response.body.error.content).toBe(
        'This email is already taken. Please choose a different one'
      );
    });

    it('should return 409 when username already exists', async () => {
      hashPassword.mockResolvedValue('hashed_password');

      const duplicateError = new Error('Unique constraint failed');
      duplicateError.code = 'P2002';
      duplicateError.meta = { target: ['user_name'] };

      prisma.$transaction.mockRejectedValue(duplicateError);

      const response = await request(app)
        .post('/auth/register')
        .send(validCustomerData);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('ALREADY_EXISTS');
      expect(response.body.error.header).toBe('Already Exists');
      expect(response.body.error.content).toBe(
        'This user_name is already taken. Please choose a different one'
      );
    });

    it('should return 500 for server errors', async () => {
      hashPassword.mockResolvedValue('hashed_password');

      const serverError = new Error('Database connection failed');
      prisma.$transaction.mockRejectedValue(serverError);

      const response = await request(app)
        .post('/auth/register')
        .send(validCustomerData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('SERVER_ERROR');
      expect(response.body.error.header).toBe('Server Error');
      expect(response.body.error.content).toBe(
        'Unable to create your account. Please try again'
      );
    });

    it('should hash password before storing', async () => {
      const hashedPassword = 'super_secure_hashed_password';
      const mockUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '0812345678',
        user_name: 'johndoe123',
        password: hashedPassword,
        role: 'CUSTOMER',
      };

      hashPassword.mockResolvedValue(hashedPassword);
      getSignedJwtToken.mockReturnValue('mock_token');

      prisma.$transaction.mockImplementation(async (callback) => {
        return await callback({
          user: {
            create: jest.fn().mockResolvedValue(mockUser),
          },
          customer: {
            create: jest.fn().mockResolvedValue({ id: 1, userId: 1 }),
          },
        });
      });

      await request(app).post('/auth/register').send(validCustomerData);

      expect(hashPassword).toHaveBeenCalledWith('SecurePass123');
    });

    it('should default role to CUSTOMER when not provided', async () => {
      const dataWithoutRole = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '0812345678',
        userName: 'johndoe123',
        password: 'SecurePass123',
        // role not provided
      };

      const hashedPassword = 'hashed_password';
      const mockUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '0812345678',
        user_name: 'johndoe123',
        password: hashedPassword,
        role: 'CUSTOMER', // Should default to CUSTOMER
      };

      hashPassword.mockResolvedValue(hashedPassword);
      getSignedJwtToken.mockReturnValue('mock_token');

      prisma.$transaction.mockImplementation(async (callback) => {
        return await callback({
          user: {
            create: jest.fn().mockResolvedValue(mockUser),
          },
          customer: {
            create: jest.fn().mockResolvedValue({ id: 1, userId: 1 }),
          },
        });
      });

      const response = await request(app)
        .post('/auth/register')
        .send(dataWithoutRole);

      expect(response.status).toBe(200);
      expect(response.body.data.user.role).toBe('CUSTOMER');
    });

    it('should trim email before processing', async () => {
      const dataWithSpaces = {
        ...validCustomerData,
        email: '  john.doe@example.com  ',
      };

      const hashedPassword = 'hashed_password';
      const mockUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com', // Trimmed
        phone_number: '0812345678',
        user_name: 'johndoe123',
        password: hashedPassword,
        role: 'CUSTOMER',
      };

      hashPassword.mockResolvedValue(hashedPassword);
      getSignedJwtToken.mockReturnValue('mock_token');

      let capturedEmail;
      prisma.$transaction.mockImplementation(async (callback) => {
        return await callback({
          user: {
            create: jest.fn().mockImplementation((data) => {
              capturedEmail = data.data.email;
              return Promise.resolve(mockUser);
            }),
          },
          customer: {
            create: jest.fn().mockResolvedValue({ id: 1, userId: 1 }),
          },
        });
      });

      await request(app).post('/auth/register').send(dataWithSpaces);

      expect(capturedEmail).toBe('john.doe@example.com');
    });
  });
});
