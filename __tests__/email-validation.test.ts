import { isValidEmail } from '../lib/email-validation';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'john.doe@company.co.uk',
    'user123@domain.org',
    'first+last@domain.com',
    'user.name@domain.net'
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    '   ',
    'invalid-email',
    'user@',
    '@domain.com',
    'user@domain',
    'user@.com',
    'user@domain..com',
    'user name@domain.com',
    'very.very.long.email.that.exceeds.reasonable.length@domain.com'.repeat(10)
  ];

  // Test valid emails
  test.each(validEmails)('should validate valid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  // Test invalid emails
  test.each(invalidEmails)('should invalidate invalid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });

  // Additional edge case tests
  test('should handle null and undefined inputs', () => {
    expect(isValidEmail(null as any)).toBe(false);
    expect(isValidEmail(undefined as any)).toBe(false);
  });

  test('should trim whitespace', () => {
    expect(isValidEmail('  user@example.com  ')).toBe(true);
  });
});