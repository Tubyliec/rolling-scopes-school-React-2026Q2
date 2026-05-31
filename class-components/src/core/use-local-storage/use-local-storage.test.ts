import { act, renderHook } from '@testing-library/react';

import { useLocalStorage } from './use-local-storage';

import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('uses value from localStorage when available', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('saved');

    const { result } = renderHook(() =>
      useLocalStorage({ key: 'test_key', initialValue: 'initial' })
    );

    expect(result.current.value).toBe('saved');
  });

  it('falls back to initialValue when localStorage has no value', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const { result } = renderHook(() =>
      useLocalStorage({ key: 'test_key', initialValue: 'initial' })
    );

    expect(result.current.value).toBe('initial');
  });

  it('setValue updates state and localStorage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() =>
      useLocalStorage({ key: 'test_key', initialValue: 'initial' })
    );

    act(() => {
      result.current.setValue('next');
    });

    expect(result.current.value).toBe('next');
    expect(setItemSpy).toHaveBeenCalledWith('test_key', 'next');
  });
});
