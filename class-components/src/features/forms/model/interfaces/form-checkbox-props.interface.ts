import type { InputHTMLAttributes } from 'react';

export interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}
