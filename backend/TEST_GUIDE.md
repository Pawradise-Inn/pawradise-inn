# User Registration Test Guide

## Overview
Simple Jest tests for the user registration function in the authentication system.

## Files Created
- `__tests__/auth.test.js` - Registration test cases
- `__tests__/setup.js` - Test environment setup
- `__tests__/README.md` - Test documentation
- `jest.config.js` - Jest configuration
- `package.json` - Updated with test scripts

## Installation

```bash
cd backend
npm install
```

This installs:
- `jest` - Testing framework
- `supertest` - HTTP testing
- `@types/jest` - Type definitions

## Running Tests

```bash
# Run tests
npm test

# Run with coverage report
npm test:coverage
```

## What's Tested

### User Registration (POST /auth/register)

1. **Successful Customer Registration**
   - Creates user with CUSTOMER role
   - Creates associated customer record
   - Returns success response

2. **Successful Staff Registration**
   - Creates user with STAFF role
   - Creates associated staff record with wage/bank info
   - Returns success response

3. **Missing Fields Validation**
   - Returns 400 error when required fields are missing
   - Validates: firstname, lastname, email, phone, username, password

4. **Duplicate Email Handling**
   - Returns 409 error when email already exists
   - Provides clear error message

5. **Duplicate Username Handling**
   - Returns 409 error when username already exists
   - Provides clear error message

## Test Structure

```javascript
describe('User Registration Tests', () => {
  describe('POST /auth/register', () => {
    it('should register a new customer successfully', async () => {
      // Test implementation
    });
    
    it('should register a new staff member successfully', async () => {
      // Test implementation
    });
    
    // ... more tests
  });
});
```

## Expected Output

```
PASS  __tests__/auth.test.js
  User Registration Tests
    POST /auth/register
      ✓ should register a new customer successfully (45ms)
      ✓ should register a new staff member successfully (12ms)
      ✓ should return 400 when required fields are missing (8ms)
      ✓ should return 409 when email already exists (10ms)
      ✓ should return 409 when username already exists (9ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Time:        2.156 s
```

## Mocking Strategy

The tests mock:
- **Prisma Client** - Database operations
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation

This allows tests to run fast without a real database.

## Troubleshooting

### Tests won't run
```bash
npm install
npx jest --clearCache
```

### Tests timeout
Increase timeout in `jest.config.js`:
```javascript
testTimeout: 15000
```

## Next Steps

1. Run the tests: `npm test`
2. Check coverage: `npm run test:coverage`
3. Add more tests as needed for other auth functions

## File Structure

```
backend/
├── __tests__/
│   ├── auth.test.js       # Test cases
│   ├── setup.js           # Test setup
│   └── README.md          # Documentation
├── controllers/
│   └── auth.js            # Code being tested
├── jest.config.js         # Jest config
├── package.json           # Test scripts
└── TEST_GUIDE.md          # This file
```
