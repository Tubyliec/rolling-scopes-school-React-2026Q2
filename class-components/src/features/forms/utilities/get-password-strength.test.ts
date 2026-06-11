import { getPasswordStrength } from '@features/forms/utilities/get-password-strength.ts';

import { describe, expect, it } from 'vitest';

describe('getPasswordStrength', () => {
  it('returns score 0 for empty string', () => {
    const result = getPasswordStrength('');
    expect(result.score).toBe(0);
    expect(result.label).toBe('weak');
  });

  it('detects uppercase', () => {
    expect(getPasswordStrength('PASSWORD').hasUppercase).toBe(true);
    expect(getPasswordStrength('password').hasUppercase).toBe(false);
  });

  it('detects lowercase', () => {
    expect(getPasswordStrength('password').hasLowercase).toBe(true);
    expect(getPasswordStrength('PASSWORD').hasLowercase).toBe(false);
  });

  it('detects numbers', () => {
    expect(getPasswordStrength('pass1').hasNumber).toBe(true);
    expect(getPasswordStrength('password').hasNumber).toBe(false);
  });

  it('detects special characters', () => {
    expect(getPasswordStrength('pass!').hasSpecial).toBe(true);
    expect(getPasswordStrength('password').hasSpecial).toBe(false);
  });

  it('labels weak password correctly', () => {
    expect(getPasswordStrength('password').label).toBe('weak');
  });

  it('labels strong password correctly', () => {
    expect(getPasswordStrength('Pass1!xx').label).toBe('strong');
  });

  it('labels fair password correctly', () => {
    expect(getPasswordStrength('Pass').label).toBe('fair');
  });
});
