/**
 * Validates email format using a comprehensive regex pattern
 * @param email Email address to validate
 * @returns Boolean indicating if the email is valid
 */
export const validateEmail = (email: string): boolean => {
  // RFC 5322 compliant email regex with some additional restrictions
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  // Validation checks
  if (!email) return false;
  if (email.length > 254) return false; // Maximum total email length
  
  // Trim and validate
  const trimmedEmail = email.trim();
  if (!emailRegex.test(trimmedEmail)) return false;
  
  // Additional domain validation
  const [local, domain] = trimmedEmail.split('@');
  if (local.length > 64) return false; // Maximum local part length
  if (domain.length > 253) return false; // Maximum domain length
  
  return true;
};