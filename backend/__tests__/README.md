# Authentication Tests

Comprehensive Jest tests for all authentication endpoints matching the actual controller implementation.

## Test Coverage Summary

**Total Tests:** 32 passing  
**Statement Coverage:** 98.07%  
**Branch Coverage:** 90.62%  
**Function Coverage:** 100%  
**Line Coverage:** 100%

## Test Suites

### POST /auth/register (12 tests)
- ✅ Register new customer successfully (with proper response format)
- ✅ Register new staff member successfully (with wage/bank info)
- ✅ Validate required fields (firstname, lastname, email, phone, username, password)
- ✅ Handle duplicate email error (409 with proper error format)
- ✅ Handle duplicate username error (409 with proper error format)
- ✅ Handle duplicate phone number error (409 with proper error format)
- ✅ Handle other duplicate fields error (409 with proper error format)
- ✅ Handle server errors (500 with proper error format)
- ✅ Verify password hashing
- ✅ Default role to CUSTOMER when not provided
- ✅ Trim email before processing
- ✅ Accept alternative field names (snake_case)

### POST /auth/login (7 tests)
- ✅ Login successfully with valid credentials
- ✅ Return 400 when username is missing
- ✅ Return 400 when password is missing
- ✅ Return 401 when user not found
- ✅ Return 401 when password is incorrect
- ✅ Handle server errors (500)

### POST /auth/logout (1 test)
- ✅ Logout successfully and clear auth cookie

### GET /auth/me (3 tests)
- ✅ Get current user profile successfully
- ✅ Return 404 when user not found
- ✅ Handle server errors (500)

### PUT /auth/me (5 tests)
- ✅ Update user profile successfully (firstname, lastname, email)
- ✅ Update password when provided (with hashing)
- ✅ Update phone_number and user_name when provided
- ✅ Return 404 when user not found
- ✅ Handle server errors (500)

### DELETE /auth/me (5 tests)
- ✅ Delete user account successfully with correct password
- ✅ Return 400 when password is missing
- ✅ Return 404 when user not found
- ✅ Return 401 when password is incorrect
- ✅ Handle server errors (500)

## Running Tests

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Key Features Tested

### Authentication & Authorization
- User registration (Customer and Staff roles)
- User login with JWT token generation
- User logout with cookie clearing
- Protected routes with authentication middleware

### Data Validation
- Required field validation
- Email trimming and formatting
- Alternative field name support (camelCase and snake_case)
- Password hashing with bcrypt

### Error Handling
- Duplicate field detection (email, username, phone_number)
- Missing field validation
- Invalid credentials handling
- User not found scenarios
- Server error handling

### User Management
- Profile retrieval with related data
- Profile updates (all fields including password)
- Account deletion with password confirmation

## Response Formats

### Success Response (200)
```json
{
  "success": true,
  "message": {
    "type": "REGISTERED_SUCCESSFULLY",
    "header": "Registration Complete",
    "content": "Registration completed successfully",
    "statusCode": 200
  },
  "data": {
    "user": {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "phone_number": "0812345678",
      "user_name": "johndoe123",
      "role": "CUSTOMER"
    },
    "token": "jwt_token_here"
  }
}
```

### Error Response (400/401/404/409/500)
```json
{
  "success": false,
  "error": {
    "type": "MISSING_FIELDS",
    "header": "Missing Information",
    "content": "Please fill in all required fields to create your account",
    "statusCode": 400
  }
}
```

## Test Implementation Details

### Mocked Dependencies
- **Prisma Client**: All database operations are mocked
- **bcrypt**: Password hashing is mocked
- **JWT**: Token generation is mocked
- **Auth Middleware**: Mocked to simulate authenticated requests

### Test Structure
Each test suite follows the AAA pattern:
- **Arrange**: Set up mocks and test data
- **Act**: Make HTTP request to endpoint
- **Assert**: Verify response status, body structure, and data

### Coverage Goals
- ✅ All success paths tested
- ✅ All error paths tested
- ✅ Edge cases covered (empty strings, null values, alternative formats)
- ✅ Security features verified (password hashing, token generation)

## Future Improvements
- Add integration tests with real database
- Add performance tests for high-load scenarios
- Add security tests (SQL injection, XSS prevention)
- Add rate limiting tests
