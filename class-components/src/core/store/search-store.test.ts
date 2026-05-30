import { KEY_SEARCH_TERM } from '@shared/constants/search-constants.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSearchStore } from './search-store';

describe('useSearchStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'setItem');
    useSearchStore.setState({ term: '', isLoading: false });
  });

  it('initialises with an empty term when localStorage is empty', () => {
    useSearchStore.setState({ term: '' });
    expect(useSearchStore.getState().term).toBe('');
  });

  it('initialises isLoading as false', () => {
    expect(useSearchStore.getState().isLoading).toBe(false);
  });

  it('setTerm updates the term in the store', () => {
    useSearchStore.getState().setTerm('Luke');
    expect(useSearchStore.getState().term).toBe('Luke');
  });

  it('setTerm persists the term to localStorage', () => {
    useSearchStore.getState().setTerm('Vader');
    expect(localStorage.setItem).toHaveBeenCalledWith(KEY_SEARCH_TERM, 'Vader');
  });

  it('setTerm with empty string clears the term', () => {
    useSearchStore.getState().setTerm('Luke');
    useSearchStore.getState().setTerm('');
    expect(useSearchStore.getState().term).toBe('');
  });

  it('setIsLoading sets loading to true', () => {
    useSearchStore.getState().setIsLoading(true);
    expect(useSearchStore.getState().isLoading).toBe(true);
  });

  it('setIsLoading sets loading back to false', () => {
    useSearchStore.getState().setIsLoading(true);
    useSearchStore.getState().setIsLoading(false);
    expect(useSearchStore.getState().isLoading).toBe(false);
  });

  it('term and isLoading are independent state fields', () => {
    useSearchStore.getState().setTerm('Leia');
    useSearchStore.getState().setIsLoading(true);
    expect(useSearchStore.getState().term).toBe('Leia');
    expect(useSearchStore.getState().isLoading).toBe(true);
  });
});
