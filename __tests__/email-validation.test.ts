import { describe, it, expect } from 'vitest';
import { isValidEmail } from '../lib/utils';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'user+tag@example.com',
    'user123@example.co.uk',
    'user-name@example.org'
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    'invalid-email',
    'user@.com',
    '@example.com',
    'user@example',
    'user@example..com',
    'user@-example.com',
    'a'.repeat(65) + '@example.com', // Too long local part
    'user@' + 'a'.repeat(256) + '.com' // Too long domain
  ];

  // Test valid emails
  it.each(validEmails)('should validate valid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  // Test invalid emails
  it.each(invalidEmails)('should invalidate invalid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });

  // Additional specific test cases
  it('should handle null and undefined inputs', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail(null as any)).toBe(false);
    expect(isValidEmail(undefined as any)).toBe(false);
  });
});