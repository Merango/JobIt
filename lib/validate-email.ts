/**
 * Comprehensive email validation following RFC 5322 standards
 * @param email Email address to validate
 * @returns Validation result with detailed information
 */
export interface EmailValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateEmail = (email: string): EmailValidationResult => {
  const errors: string[] = [];

  // Trim and convert to lowercase for consistent validation
  const trimmedEmail = email.trim().toLowerCase();

  // Check for empty email
  if (!trimmedEmail) {
    errors.push('Email cannot be empty');
    return { isValid: false, errors };
  }

  // RFC 5322 compliant regex with additional checks
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Validation checks
  if (!emailRegex.test(trimmedEmail)) {
    errors.push('Invalid email format');
    return { isValid: false, errors };
  }

  // Length checks
  if (trimmedEmail.length > 254) {
    errors.push('Email is too long (max 254 characters)');
    return { isValid: false, errors };
  }

  // Split local and domain parts
  const [localPart, domainPart] = trimmedEmail.split('@');
  
  // Local part length check (max 64 characters)
  if (localPart.length > 64) {
    errors.push('Local part of email is too long (max 64 characters)');
    return { isValid: false, errors };
  }

  // Domain part length and structure check
  if (domainPart.length > 253) {
    errors.push('Domain part of email is too long (max 253 characters)');
    return { isValid: false, errors };
  }

  // Additional domain validation
  const domainParts = domainPart.split('.');
  if (domainParts.some(part => part.length > 63)) {
    errors.push('Domain segment is too long (max 63 characters)');
    return { isValid: false, errors };
  }

  // If no errors, return valid result
  return { 
    isValid: errors.length === 0, 
    errors 
  };
};