# User Registration Tests

Jest tests for the user registration function matching the actual controller implementation.

## Test Coverage

### POST /auth/register
- ✅ Register new customer successfully (with proper response format)
- ✅ Register new staff member successfully (with wage/bank info)
- ✅ Validate required fields (firstname, lastname, email, phone, username, password)
- ✅ Handle duplicate email error (409 with proper error format)
- ✅ Handle duplicate username error (409 with proper error format)
- ✅ Handle server errors (500 with proper error format)
- ✅ Verify password hashing
- ✅ Default role to CUSTOMER when not provided
- ✅ Trim email before processing

## Running Tests

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Test Results

The tests verify:
1. Successful customer registration with correct response structure
2. Successful staff registration with additional fields (wage, bankCompany, bankAccount)
3. Missing field validation returns 400 with proper error format
4. Duplicate email handling returns 409 with specific error message
5. Duplicate username handling returns 409 with specific error message
6. Server errors return 500 with proper error format
7. Password is hashed using hashPassword function
8. Role defaults to CUSTOMER when not provided
9. Email is trimmed before processing

## Response Format

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

### Error Response (400/409/500)
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
