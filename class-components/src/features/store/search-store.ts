import type { SearchState } from './model/types/search-state.type';

import { create } from 'zustand';

const KEY_SEARCH_TERM = 'swapi_search_term' as const;

function getInitialTerm(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return localStorage.getItem(KEY_SEARCH_TERM) ?? '';
}

export const useSearchStore = create<SearchState>((set) => ({
  term: getInitialTerm(),

  setTerm: (term: string): void => {
    localStorage.setItem(KEY_SEARCH_TERM, term);
    set({ term });
  },
}));
