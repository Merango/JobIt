import { programmingLanguages } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validate email format using a comprehensive regex pattern
 * Follows RFC 5322 standard with some practical constraints
 * @param email - Email address to validate
 * @returns boolean indicating whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  // Regex pattern for email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  // Additional checks
  if (!email) return false;
  if (email.length > 254) return false; // Max length per RFC 5321
  
  // Basic regex match
  if (!emailRegex.test(email)) return false;
  
  // Optional: Additional domain validation
  const [local, domain] = email.split('@');
  if (local.length > 64) return false; // Local part max length
  if (domain.length > 255) return false; // Domain max length
  
  return true;
}

// ... (rest of the existing code from the original file)