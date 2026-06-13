import { formSchema } from '@features/forms/schema/form-schema.ts';

import type { ValidationResult } from '@features/forms/model/types/validation-result.type.ts';

export function validateFormData(
  data: Record<string, unknown>
): ValidationResult {
  const result = formSchema.safeParse(data);

  if (result.success) {
    return { success: true, errors: {} };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join('.');
    if (path && !errors[path]) {
      errors[path] = issue.message;
    }
  }

  return { success: false, errors };
}
