import type { FormSubmission } from '@features/forms/model/types/form-submission.type.ts';

export type FormsState = {
  submissions: FormSubmission[];
  countries: string[];
  addSubmission: (
    submission: Omit<FormSubmission, 'id' | 'submittedAt' | 'isNew'>
  ) => void;
  markAllAsOld: () => void;
};
