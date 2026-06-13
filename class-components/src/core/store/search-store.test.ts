import { KEY_SEARCH_TERM } from '@/shared/constants/search-constants.ts';

import { useSearchStore } from './search-store';

import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('useSearchStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'setItem');
    useSearchStore.setState({ term: '' });
  });

  it('initialises with empty term when localStorage is empty', () => {
    expect(useSearchStore.getState().term).toBe('');
  });

  it('setTerm updates the term', () => {
    useSearchStore.getState().setTerm('Luke');
    expect(useSearchStore.getState().term).toBe('Luke');
  });

  it('setTerm persists to localStorage', () => {
    useSearchStore.getState().setTerm('Vader');
    expect(localStorage.setItem).toHaveBeenCalledWith(KEY_SEARCH_TERM, 'Vader');
  });

  it('setTerm with empty string clears the term', () => {
    useSearchStore.getState().setTerm('Luke');
    useSearchStore.getState().setTerm('');
    expect(useSearchStore.getState().term).toBe('');
  });
});
