import { programmingLanguages } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns boolean indicating whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  // Check if email is empty or not a string
  if (!email || typeof email !== 'string') return false;

  // Simple but effective email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Additional constraints
  const MAX_EMAIL_LENGTH = 254;
  const MAX_LOCAL_PART_LENGTH = 64;
  const MAX_DOMAIN_LENGTH = 255;

  // Check overall email length
  if (email.length > MAX_EMAIL_LENGTH) return false;

  // Basic regex validation
  if (!emailRegex.test(email)) return false;

  // Split email into local part and domain
  const [localPart, domain] = email.split('@');

  // Check lengths of local part and domain
  if (localPart.length > MAX_LOCAL_PART_LENGTH) return false;
  if (domain.length > MAX_DOMAIN_LENGTH) return false;

  return true;
}

// ... (rest of the existing code from the original file)