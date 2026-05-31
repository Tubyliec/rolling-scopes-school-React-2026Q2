import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createCachingQueryClient,
  createTestQueryClient,
} from '@/test/query-test-utils.tsx';

import { usePersonQuery } from './use-person-query';

const mockGetPerson = vi.fn();
vi.mock('@/core/swapi/swapi-service.ts', () => ({
  getPerson: (...args: unknown[]) => mockGetPerson(...args),
}));

const mockPerson = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};

describe('usePersonQuery', () => {
  beforeEach(() => {
    mockGetPerson.mockClear();
  });

  const makeWrapper = (client = createTestQueryClient()) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
    Wrapper.displayName = 'QueryClientWrapper';
    return Wrapper;
  };

  it('is disabled when id is undefined', () => {
    const { result } = renderHook(() => usePersonQuery(undefined), {
      wrapper: makeWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.fetchStatus).toBe('idle');
    expect(mockGetPerson).not.toHaveBeenCalled();
  });

  it('starts in loading state when id is provided', () => {
    mockGetPerson.mockResolvedValue(mockPerson);
    const { result } = renderHook(() => usePersonQuery('1'), {
      wrapper: makeWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });

  it('resolves to success with person data', async () => {
    mockGetPerson.mockResolvedValue(mockPerson);
    const { result } = renderHook(() => usePersonQuery('1'), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.name).toBe('Luke Skywalker');
  });

  it('enters error state when API returns a message', async () => {
    mockGetPerson.mockResolvedValue({ message: 'Person not found' });
    const { result } = renderHook(() => usePersonQuery('999'), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Person not found');
  });

  it('enters error state when fetch rejects', async () => {
    mockGetPerson.mockRejectedValue(new Error('Network down'));
    const { result } = renderHook(() => usePersonQuery('1'), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Network down');
  });

  it('caches person data — same id does not refetch', async () => {
    mockGetPerson.mockResolvedValue(mockPerson);
    const client = createCachingQueryClient();
    const wrapper = makeWrapper(client);

    const { result: r1 } = renderHook(() => usePersonQuery('1'), { wrapper });
    await waitFor(() => expect(r1.current.isSuccess).toBe(true));
    expect(mockGetPerson).toHaveBeenCalledTimes(1);

    const { result: r2 } = renderHook(() => usePersonQuery('1'), { wrapper });
    await waitFor(() => expect(r2.current.isSuccess).toBe(true));
    expect(mockGetPerson).toHaveBeenCalledTimes(1);
  });

  it('fetches for a different id', async () => {
    mockGetPerson.mockResolvedValue(mockPerson);
    const client = createCachingQueryClient();
    const wrapper = makeWrapper(client);

    const { result: r1 } = renderHook(() => usePersonQuery('1'), { wrapper });
    await waitFor(() => expect(r1.current.isSuccess).toBe(true));

    const { result: r2 } = renderHook(() => usePersonQuery('2'), { wrapper });
    await waitFor(() => expect(r2.current.isSuccess).toBe(true));

    expect(mockGetPerson).toHaveBeenCalledTimes(2);
  });
});
