import { isValidEmail, getEmailValidationError } from '../lib/validation';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@123.123.123.123',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    ' ',
    'plainaddress',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@example..com',
  ];

  // Test valid email validation
  validEmails.forEach(email => {
    test(`Valid email: ${email}`, () => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  // Test invalid email validation
  invalidEmails.forEach(email => {
    test(`Invalid email: ${email}`, () => {
      expect(isValidEmail(email)).toBe(false);
    });
  });

  // Test error message generation
  describe('Email Validation Error Messages', () => {
    test('Empty email error message', () => {
      expect(getEmailValidationError('')).toBe('Email cannot be empty');
    });

    test('Invalid email error message', () => {
      expect(getEmailValidationError('invalid-email')).toBe('Please enter a valid email address');
    });
  });
});