import { validateFormData } from '@/features/forms/utilities/validate-form-data.ts';

import { describe, expect, it } from 'vitest';

describe('validateFormData', () => {
  const validPayload = {
    name: 'Alice',
    age: '25',
    email: 'alice@example.com',
    gender: 'female',
    password: 'Pass1!xx',
    confirmPassword: 'Pass1!xx',
    country: 'France',
    image: Object.assign(
      [new File(['content'], 'photo.png', { type: 'image/png' })],
      {
        length: 1,
        item: (i: number) =>
          i === 0
            ? new File(['content'], 'photo.png', { type: 'image/png' })
            : null,
      }
    ),
    agreedToTerms: true,
  };

  it('returns error for image field when no image provided', () => {
    const result = validateFormData({ ...validPayload, image: null } as Record<
      string,
      unknown
    >);
    expect(result.success).toBe(false);
    expect(result.errors['image']).toBeDefined();
  });

  it('returns error for name without uppercase first letter', () => {
    const result = validateFormData({
      ...validPayload,
      name: 'alice',
    } as Record<string, unknown>);
    expect(result.success).toBe(false);
    expect(result.errors['name']).toBeDefined();
  });

  it('returns error for negative age', () => {
    const result = validateFormData({ ...validPayload, age: '-5' } as Record<
      string,
      unknown
    >);
    expect(result.success).toBe(false);
    expect(result.errors['age']).toBeDefined();
  });

  it('returns error for invalid email', () => {
    const result = validateFormData({
      ...validPayload,
      email: 'not-an-email',
    } as Record<string, unknown>);
    expect(result.success).toBe(false);
    expect(result.errors['email']).toBeDefined();
  });

  it('returns error when passwords do not match', () => {
    const result = validateFormData({
      ...validPayload,
      confirmPassword: 'Different1!',
    } as Record<string, unknown>);
    expect(result.success).toBe(false);
    expect(result.errors['confirmPassword']).toBeDefined();
  });

  it('returns error for empty name', () => {
    const result = validateFormData({ ...validPayload, name: '' } as Record<
      string,
      unknown
    >);
    expect(result.success).toBe(false);
    expect(result.errors['name']).toBeDefined();
  });

  it('returns error when terms not accepted', () => {
    const result = validateFormData({
      ...validPayload,
      agreedToTerms: false,
    } as Record<string, unknown>);
    expect(result.success).toBe(false);
    expect(result.errors['agreedToTerms']).toBeDefined();
  });

  it('returns error for invalid country', () => {
    const result = validateFormData({
      ...validPayload,
      country: 'Narnia',
    } as Record<string, unknown>);
    expect(result.success).toBe(false);
    expect(result.errors['country']).toBeDefined();
  });
});
