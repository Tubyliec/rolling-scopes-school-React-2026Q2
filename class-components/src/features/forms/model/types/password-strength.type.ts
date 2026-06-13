export type PasswordStrength = Readonly<{
  score: number;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  label: 'weak' | 'fair' | 'good' | 'strong';
}>;
