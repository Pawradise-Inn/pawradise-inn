// Test setup
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret_key';
process.env.JWT_EXPIRE = '30d';
process.env.JWT_COOKIE_EXPIRE = 30;

// Suppress console output during tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
};
