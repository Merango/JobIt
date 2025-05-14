/**
 * Validates an email address using a robust regex pattern
 * @param email The email address to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  // RFC 5322 Official Standard email regex with some practical limitations
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check if email is not empty and matches the regex pattern
  return email.trim().length > 0 && emailRegex.test(email.trim());
};

/**
 * Generate a user-friendly email validation error message
 * @param email The email address that failed validation
 * @returns Descriptive error message
 */
export const getEmailValidationError = (email: string): string => {
  if (email.trim().length === 0) {
    return "Email cannot be empty";
  }
  return "Please enter a valid email address";
};