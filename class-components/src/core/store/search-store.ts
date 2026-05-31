import type { SearchState } from '@core/store/model/types/search-state.type.ts';
import { create } from 'zustand';

import { KEY_SEARCH_TERM } from '@/shared/constants/search-constants.ts';

export const useSearchStore = create<SearchState>((set) => ({
  term: localStorage.getItem(KEY_SEARCH_TERM) ?? '',

  setTerm: (term: string): void => {
    localStorage.setItem(KEY_SEARCH_TERM, term);
    set({ term });
  },
}));
