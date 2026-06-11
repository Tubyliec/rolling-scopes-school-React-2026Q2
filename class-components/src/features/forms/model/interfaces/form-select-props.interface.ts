import type { SelectHTMLAttributes } from 'react';

import type { SelectOption } from '@features/forms/model/types/select-options.type.ts';

export interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}
