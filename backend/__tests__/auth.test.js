const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/auth');
const prisma = require('../prisma/prisma');
const { hashPassword } = require('../controllers/logics/auth');
const { getSignedJwtToken } = require('../controllers/logics/auth');
const bcrypt = require('bcryptjs');

// Mock dependencies
jest.mock('../prisma/prisma', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  customer: {
    create: jest.fn(),
  },
  staff: {
    create: jest.fn(),
  },
  $transaction: jest.fn(),
}));

// Mock auth middleware
jest.mock('../middleware/auth', () => ({
  protect: (req, res, next) => {
    req.user = { id: 1, role: 'CUSTOMER', roleId: 1 };
    next();
  },
  authorize: (...roles) => (req, res, next) => next(),
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
        'This username is already taken. Please choose a different one'
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

    it('should accept alternative field names (snake_case)', async () => {
      const dataWithSnakeCase = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '0812345678',
        user_name: 'johndoe123',
        password: 'SecurePass123',
        role: 'CUSTOMER',
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

      const response = await request(app)
        .post('/auth/register')
        .send(dataWithSnakeCase);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
    it('should return 409 when phone number already exists', async () => {
      hashPassword.mockResolvedValue('hashed_password');

      const duplicateError = new Error('Unique constraint failed');
      duplicateError.code = 'P2002';
      duplicateError.meta = { target: ['phone_number'] };

      prisma.$transaction.mockRejectedValue(duplicateError);

      const response = await request(app)
        .post('/auth/register')
        .send(validCustomerData);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('ALREADY_EXISTS');
      expect(response.body.error.header).toBe('Already Exists');
      expect(response.body.error.content).toBe(
        'This phone number is already taken. Please choose a different one'
      );
    });

    it('should return 409 for other duplicate fields', async () => {
      hashPassword.mockResolvedValue('hashed_password');

      const duplicateError = new Error('Unique constraint failed');
      duplicateError.code = 'P2002';
      duplicateError.meta = { target: ['other_field'] };

      prisma.$transaction.mockRejectedValue(duplicateError);

      const response = await request(app)
        .post('/auth/register')
        .send(validCustomerData);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('ALREADY_EXISTS');
      expect(response.body.error.content).toBe(
        'This other_field is already taken. Please choose a different one'
      );
    });
  });
});

describe('User Login Tests', () => {
  const { matchPassword, findUserByUsername } = require('../controllers/logics/auth');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    const validLoginData = {
      userName: 'johndoe123',
      password: 'SecurePass123',
    };

    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '0812345678',
        user_name: 'johndoe123',
        password: 'hashed_password',
        role: 'CUSTOMER',
      };

      findUserByUsername.mockResolvedValue(mockUser);
      matchPassword.mockResolvedValue(true);
      getSignedJwtToken.mockReturnValue('mock_jwt_token');

      const response = await request(app)
        .post('/auth/login')
        .send(validLoginData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message.type).toBe('LOGIN_SUCCESSFUL');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
    });

    it('should return 400 when username is missing', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ password: 'SecurePass123' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('MISSING_FIELDS');
      expect(response.body.error.content).toBe(
        'Please enter both username and password'
      );
    });

    it('should return 400 when password is missing', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ userName: 'johndoe123' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('MISSING_FIELDS');
    });

    it('should return 401 when user not found', async () => {
      findUserByUsername.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send(validLoginData);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('UNAUTHORIZED');
      expect(response.body.error.content).toBe('Invalid username or password');
    });

    it('should return 401 when password is incorrect', async () => {
      const mockUser = {
        id: 1,
        user_name: 'johndoe123',
        password: 'hashed_password',
      };

      findUserByUsername.mockResolvedValue(mockUser);
      matchPassword.mockResolvedValue(false);

      const response = await request(app)
        .post('/auth/login')
        .send(validLoginData);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('UNAUTHORIZED');
      expect(response.body.error.content).toBe('Invalid username or password');
    });

    it('should return 500 for server errors', async () => {
      findUserByUsername.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/auth/login')
        .send(validLoginData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('SERVER_ERROR');
    });
  });
});

describe('User Logout Tests', () => {
  describe('POST /auth/logout', () => {
    it('should logout successfully', async () => {
      const response = await request(app).post('/auth/logout');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message.type).toBe('LOGOUT_SUCCESSFUL');
      expect(response.body.message.content).toBe(
        'You have been logged out successfully'
      );
    });
  });
});

describe('Get Current User Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /auth/me', () => {
    it('should get current user profile successfully', async () => {
      const mockUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '0812345678',
        user_name: 'johndoe123',
        role: 'CUSTOMER',
        customer: {
          id: 1,
          pets: [],
        },
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app).get('/auth/me');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message.type).toBe('LOADED_SUCCESSFULLY');
      expect(response.body.data.firstname).toBe('John');
      expect(response.body.data.email).toBe('john.doe@example.com');
    });

    it('should return 404 when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app).get('/auth/me');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('NOT_FOUND');
      expect(response.body.error.content).toBe('Your profile could not be found');
    });

    it('should return 500 for server errors', async () => {
      prisma.user.findUnique.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/auth/me');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('UNABLE_TO_LOAD');
    });
  });
});

describe('Update Current User Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PUT /auth/me', () => {
    it('should update user profile successfully', async () => {
      const updateData = {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
      };

      const mockUpdatedUser = {
        id: 1,
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        phone_number: '0812345678',
        user_name: 'johndoe123',
        role: 'CUSTOMER',
      };

      prisma.user.update.mockResolvedValue(mockUpdatedUser);

      const response = await request(app)
        .put('/auth/me')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message.type).toBe('PROFILE_UPDATED');
      expect(response.body.data.firstname).toBe('Jane');
    });

    it('should update password when provided', async () => {
      const updateData = {
        password: 'NewSecurePass456',
      };

      const mockUpdatedUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '0812345678',
        user_name: 'johndoe123',
        role: 'CUSTOMER',
      };

      prisma.user.update.mockResolvedValue(mockUpdatedUser);

      const response = await request(app)
        .put('/auth/me')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should update phone_number and user_name when provided', async () => {
      const updateData = {
        phone_number: '0898765432',
        user_name: 'newusername',
      };

      const mockUpdatedUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '0898765432',
        user_name: 'newusername',
        role: 'CUSTOMER',
      };

      prisma.user.update.mockResolvedValue(mockUpdatedUser);

      const response = await request(app)
        .put('/auth/me')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.phone_number).toBe('0898765432');
      expect(response.body.data.user_name).toBe('newusername');
    });

    it('should return 404 when user not found', async () => {
      prisma.user.update.mockResolvedValue(null);

      const response = await request(app)
        .put('/auth/me')
        .send({ firstname: 'Jane' });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('NOT_FOUND');
    });

    it('should return 500 for server errors', async () => {
      prisma.user.update.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .put('/auth/me')
        .send({ firstname: 'Jane' });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('SERVER_ERROR');
    });

    it('should return 409 when phone number already exists', async () => {
      const duplicateError = new Error('Unique constraint failed');
      duplicateError.code = 'P2002';
      duplicateError.meta = { target: ['phone_number'] };

      prisma.user.update.mockRejectedValue(duplicateError);

      const response = await request(app)
        .put('/auth/me')
        .send({ phone_number: '0898765432' });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('ALREADY_EXISTS');
      expect(response.body.error.content).toBe(
        'This phone number is already taken. Please choose a different one'
      );
    });

    it('should return 409 when email already exists', async () => {
      const duplicateError = new Error('Unique constraint failed');
      duplicateError.code = 'P2002';
      duplicateError.meta = { target: ['email'] };

      prisma.user.update.mockRejectedValue(duplicateError);

      const response = await request(app)
        .put('/auth/me')
        .send({ email: 'existing@example.com' });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('ALREADY_EXISTS');
      expect(response.body.error.content).toBe(
        'This email is already taken. Please choose a different one'
      );
    });

    it('should return 409 when username already exists', async () => {
      const duplicateError = new Error('Unique constraint failed');
      duplicateError.code = 'P2002';
      duplicateError.meta = { target: ['user_name'] };

      prisma.user.update.mockRejectedValue(duplicateError);

      const response = await request(app)
        .put('/auth/me')
        .send({ user_name: 'existinguser' });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('ALREADY_EXISTS');
      expect(response.body.error.content).toBe(
        'This username is already taken. Please choose a different one'
      );
    });

    it('should return 409 for other duplicate fields', async () => {
      const duplicateError = new Error('Unique constraint failed');
      duplicateError.code = 'P2002';
      duplicateError.meta = { target: ['other_field'] };

      prisma.user.update.mockRejectedValue(duplicateError);

      const response = await request(app)
        .put('/auth/me')
        .send({ firstname: 'Jane' });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('ALREADY_EXISTS');
      expect(response.body.error.content).toBe(
        'This other_field is already taken. Please choose a different one'
      );
    });
  });
});

describe('Delete Current User Tests', () => {
  const { matchPassword } = require('../controllers/logics/auth');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('DELETE /auth/me', () => {
    it('should delete user account successfully with correct password', async () => {
      const mockUser = {
        id: 1,
        password: 'hashed_password',
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      matchPassword.mockResolvedValue(true);
      prisma.user.delete.mockResolvedValue(mockUser);

      const response = await request(app)
        .delete('/auth/me')
        .send({ password: 'SecurePass123' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message.type).toBe('DELETED_SUCCESSFULLY');
      expect(response.body.message.content).toBe(
        'Account deleted and logged out successfully'
      );
    });

    it('should return 400 when password is missing', async () => {
      const response = await request(app)
        .delete('/auth/me')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('MISSING_FIELDS');
      expect(response.body.error.content).toBe(
        'Please enter your password to confirm deletion'
      );
    });

    it('should return 404 when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .delete('/auth/me')
        .send({ password: 'SecurePass123' });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('NOT_FOUND');
    });

    it('should return 401 when password is incorrect', async () => {
      const mockUser = {
        id: 1,
        password: 'hashed_password',
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      matchPassword.mockResolvedValue(false);

      const response = await request(app)
        .delete('/auth/me')
        .send({ password: 'WrongPassword' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('UNAUTHORIZED');
      expect(response.body.error.content).toBe('Incorrect password');
    });

    it('should return 500 for server errors', async () => {
      prisma.user.findUnique.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .delete('/auth/me')
        .send({ password: 'SecurePass123' });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error.type).toBe('SERVER_ERROR');
    });
  });
});
