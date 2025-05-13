import { validateEmail } from '../lib/validate-email';

describe('Email Validation', () => {
  // Valid email test cases covering various formats
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'email+tag@example.com',
    'user123@example.co.uk',
    'user-name@example.org',
    'firstname+lastname@example.com',
    'very.common@example.com',
    'disposable.style.email@example.com',
    'other.email-with-hyphen@example.com',
    'fully-qualified-domain@example.com',
    'user.name+tag@subdomain.example.com'
  ];

  // Invalid email test cases covering multiple scenarios
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
    'user@' + 'a'.repeat(254) + '.com', // Excessive total length
    'user@domain..com', // Double dot in domain
    'user@-domain.com', // Invalid domain start
    'user@domain-.com', // Invalid domain end
    'user@domain.a', // TLD too short
    'user@domain.toolongdomaintld', // Unrealistic TLD
    '"(),:;<>[\]@example.com', // Invalid characters
    'just"not"right@example.com', // Misplaced quotes
    'still"not\\allowed@example.com' // Escape characters
  ];

  // Test valid email scenarios
  test.each(validEmails)('validates valid email: %s', (email) => {
    const result = validateEmail(email);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  // Test invalid email scenarios
  test.each(invalidEmails)('invalidates invalid email: %s', (email) => {
    const result = validateEmail(email);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  // Additional specific test cases
  test('handles whitespace and case sensitivity', () => {
    const email = '  UsEr@ExAmPlE.cOm  ';
    const result = validateEmail(email);
    expect(result.isValid).toBe(true);
  });

  // Test error messages
  test('provides descriptive error messages', () => {
    const invalidEmail = 'invalid-email';
    const result = validateEmail(invalidEmail);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Invalid email format');
  });
});