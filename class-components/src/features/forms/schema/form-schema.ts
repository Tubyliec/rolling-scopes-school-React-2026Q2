import { COUNTRIES } from '@shared/constants/countries-constants.ts';

import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg'];

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine(
        (val) =>
          val.charAt(0) === val.charAt(0).toUpperCase() &&
          val.charAt(0) !== val.charAt(0).toLowerCase(),
        {
          message: 'First letter must be uppercase',
        }
      ),

    age: z
      .string()
      .min(1, 'Age is required')
      .refine((val) => !isNaN(Number(val)), { message: 'Age must be a number' })
      .refine((val) => Number(val) >= 0, { message: 'Age cannot be negative' })
      .refine((val) => Number.isInteger(Number(val)), {
        message: 'Age must be a whole number',
      }),

    email: z
      .string()
      .min(1, 'Email is required')
      .refine(
        (val) => {
          const parts = val.split('@');
          if (parts.length !== 2) return false;
          const [local, domain] = parts;
          if (!local || local.length === 0) return false;
          if (!domain || !domain.includes('.')) return false;
          return true;
        },
        { message: 'Invalid email address' }
      ),

    gender: z.enum(['male', 'female', 'other'], {
      message: 'Please select a gender',
    }),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((val) => /[a-z]/.test(val), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'Password must contain at least one number',
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: 'Password must contain at least one special character',
      }),

    confirmPassword: z.string().min(1, 'Please confirm your password'),

    country: z
      .string()
      .min(1, 'Country is required')
      .refine((val) => COUNTRIES.includes(val), {
        message: 'Please select a valid country',
      }),

    image: z
      .custom<FileList>()
      .refine((files) => files instanceof FileList && files.length > 0, {
        message: 'Image is required',
      })
      .refine(
        (files) =>
          files instanceof FileList &&
          files[0] !== undefined &&
          ALLOWED_IMAGE_TYPES.includes(files[0].type),
        {
          message: 'Only PNG or JPEG images are allowed',
        }
      )
      .refine(
        (files) =>
          files instanceof FileList &&
          files[0] !== undefined &&
          files[0].size <= MAX_IMAGE_SIZE,
        {
          message: 'Image must be smaller than 5MB',
        }
      ),

    agreedToTerms: z.boolean().refine((val) => val, {
      message: 'You must accept the Terms and Conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormSchema = z.infer<typeof formSchema>;
