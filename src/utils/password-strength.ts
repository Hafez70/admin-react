/**
 * Password Strength Utility
 * Functions to calculate and display password strength
 */

/**
 * Password strength result interface
 */
export interface PasswordStrength {
  labelKey: string;
  color: string;
}

/**
 * Check if password has numbers
 */
const hasNumber = (value: string): boolean => new RegExp(/[0-9]/).test(value);

/**
 * Check if password has mix of small and capital letters
 */
const hasMixed = (value: string): boolean => 
  new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);

/**
 * Check if password has special characters
 */
const hasSpecial = (value: string): boolean => 
  new RegExp(/[!#@$%^&*)(+=._-]/).test(value);

/**
 * Set color based on password strength score
 */
export const strengthColor = (count: number): PasswordStrength => {
  if (count < 2) return { labelKey: 'passwordStrength.poor', color: 'error.main' };
  if (count < 3) return { labelKey: 'passwordStrength.weak', color: 'warning.main' };
  if (count < 4) return { labelKey: 'passwordStrength.normal', color: 'warning.dark' };
  if (count < 5) return { labelKey: 'passwordStrength.good', color: 'success.main' };
  if (count < 6) return { labelKey: 'passwordStrength.strong', color: 'success.dark' };
  return { labelKey: 'passwordStrength.poor', color: 'error.main' };
};

/**
 * Calculate password strength indicator (0-5)
 */
export const strengthIndicator = (value: string): number => {
  let strengths = 0;
  if (value.length > 5) strengths += 1;
  if (value.length > 7) strengths += 1;
  if (hasNumber(value)) strengths += 1;
  if (hasSpecial(value)) strengths += 1;
  if (hasMixed(value)) strengths += 1;
  return strengths;
};
