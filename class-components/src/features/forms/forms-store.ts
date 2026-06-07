import { COUNTRIES } from '@shared/constants/countries-constants.ts';

import type { FormsState } from '@/features/forms/model/types/form-state.type.ts';

import { create } from 'zustand';

export const useFormsStore = create<FormsState>((set) => ({
  submissions: [],
  countries: [...COUNTRIES],

  addSubmission: (submission): void => {
    const newEntry = {
      ...submission,
      id: crypto.randomUUID(),
      submittedAt: Date.now(),
      isNew: true,
    };
    set((state) => ({ submissions: [newEntry, ...state.submissions] }));
  },

  markAllAsOld: (): void => {
    set((state) => ({
      submissions: state.submissions.map((s) => ({ ...s, isNew: false })),
    }));
  },
}));
