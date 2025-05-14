import { programmingLanguages } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validate email format using RFC 5322 standard regex
 * @param email - Email address to validate
 * @returns boolean indicating whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  // Comprehensive RFC 5322 email validation regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check if email is empty or not a string
  if (!email || typeof email !== 'string') return false;

  // Trim and convert to lowercase for consistent validation
  const normalizedEmail = email.trim().toLowerCase();

  // Additional constraints
  const MAX_EMAIL_LENGTH = 254;
  const MAX_LOCAL_PART_LENGTH = 64;
  const MAX_DOMAIN_LENGTH = 255;

  // Check overall email length
  if (normalizedEmail.length > MAX_EMAIL_LENGTH) return false;

  // Validate using RFC 5322 regex
  if (!emailRegex.test(normalizedEmail)) return false;

  // Split email into local part and domain
  const [localPart, domain] = normalizedEmail.split('@');

  // Check lengths of local part and domain
  if (localPart.length > MAX_LOCAL_PART_LENGTH) return false;
  if (domain.length > MAX_DOMAIN_LENGTH) return false;

  return true;
}

/**
 * Normalize email for case-insensitive comparison
 * @param email - Email address to normalize
 * @returns normalized email address
 */
export function normalizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

// ... (rest of the existing code from the original file)