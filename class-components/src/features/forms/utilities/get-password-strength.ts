import type { PasswordStrength } from '@features/forms/model/types/password-strength.type.ts';

export function getPasswordStrength(password: string): PasswordStrength {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const score = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(
    Boolean
  ).length;

  let label: 'weak' | 'fair' | 'good' | 'strong';
  if (score <= 1) {
    label = 'weak';
  } else if (score === 2) {
    label = 'fair';
  } else if (score === 3) {
    label = 'good';
  } else {
    label = 'strong';
  }

  return { score, hasUppercase, hasLowercase, hasNumber, hasSpecial, label };
}
