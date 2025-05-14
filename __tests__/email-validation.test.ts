import { describe, it, expect } from 'vitest';
import { isValidEmail, normalizeEmail } from '../lib/utils';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'user+tag@example.com',
    'user123@example.co.uk',
    'user-name@example.org',
    'very.common@example.com',
    'disposable.style.email.with+symbol@example.com',
    'other.email-with-hyphen@example.com',
    'fully-qualified-domain@example.com',
    'user.name+tag@example.co.uk'
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
    'user@' + 'a'.repeat(256) + '.com', // Too long domain
    'plainaddress',
    '@no-local-part.com',
    'Outlook User@example.com', // Contains space
    'user@example,com'
  ];

  // Test valid emails
  it.each(validEmails)('should validate valid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  // Test invalid emails
  it.each(invalidEmails)('should invalidate invalid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });

  // Test email normalization
  describe('Email Normalization', () => {
    it('should normalize email by trimming and converting to lowercase', () => {
      expect(normalizeEmail('  User@Example.com  ')).toBe('user@example.com');
      expect(normalizeEmail('USER@EXAMPLE.COM')).toBe('user@example.com');
      expect(normalizeEmail('')).toBe('');
    });
  });
});