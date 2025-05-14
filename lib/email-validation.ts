/**
 * Validates email format using a comprehensive regex pattern
 * @param email - The email address to validate
 * @returns boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  // Comprehensive email validation regex
  // Supports most common email formats while preventing obvious invalid patterns
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  if (!email) return false;
  
  // Trim whitespace and validate
  const trimmedEmail = email.trim();
  
  // Basic length check
  if (trimmedEmail.length < 5 || trimmedEmail.length > 320) return false;
  
  // Regex validation
  const isFormatValid = emailRegex.test(trimmedEmail);
  
  // Additional checks
  const [localPart, domain] = trimmedEmail.split('@');
  
  // Ensure local part and domain are not empty
  if (!localPart || !domain) return false;
  
  // Optional: Additional domain validation
  const domainParts = domain.split('.');
  if (domainParts.length < 2) return false;
  
  return isFormatValid;
};