import { validateEmail } from '../lib/validate-email';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'email+tag@example.com',
    'user123@example.co.uk',
    'user-name@example.org'
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    'invalid-email',
    'invalid@email',
    '@missing-local.com',
    'missing-domain@',
    'spaces in@email.com',
    'multiple@@at.com',
    'missing-dot@domaincom',
    'a'.repeat(65) + '@example.com', // Too long local part
    'user@' + 'a'.repeat(254) + '.com' // Excessive domain length
  ];

  // Test valid email scenarios
  test.each(validEmails)('validates valid email: %s', (email) => {
    expect(validateEmail(email)).toBe(true);
  });

  // Test invalid email scenarios
  test.each(invalidEmails)('invalidates invalid email: %s', (email) => {
    expect(validateEmail(email)).toBe(false);
  });

  // Additional specific test cases
  test('handles null and undefined', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail(null as any)).toBe(false);
    expect(validateEmail(undefined as any)).toBe(false);
  });

  // Whitespace handling
  test('trims whitespace before validation', () => {
    expect(validateEmail('  user@example.com  ')).toBe(true);
  });
});