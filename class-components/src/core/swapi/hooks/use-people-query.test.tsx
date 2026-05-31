import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createCachingQueryClient,
  createTestQueryClient,
} from '@/test/query-test-utils.tsx';

import { usePeopleQuery } from './use-people-query';

const mockSearchPeople = vi.fn();
vi.mock('@/core/swapi/swapi-service.ts', () => ({
  searchPeople: (...args: unknown[]) => mockSearchPeople(...args),
}));

const successResponse = {
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
  totalCount: 1,
  totalPages: 1,
  currentPage: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

describe('usePeopleQuery', () => {
  beforeEach(() => {
    mockSearchPeople.mockClear();
  });

  const makeWrapper = (client = createTestQueryClient()) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
    Wrapper.displayName = 'QueryClientWrapper';
    return Wrapper;
  };

  it('starts in loading state', () => {
    mockSearchPeople.mockResolvedValue(successResponse);
    const { result } = renderHook(() => usePeopleQuery('', 1), {
      wrapper: makeWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });

  it('resolves to success state with data', async () => {
    mockSearchPeople.mockResolvedValue(successResponse);
    const { result } = renderHook(() => usePeopleQuery('', 1), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.results[0].name).toBe('Luke Skywalker');
  });

  it('calls searchPeople with correct params', async () => {
    mockSearchPeople.mockResolvedValue(successResponse);
    const { result } = renderHook(() => usePeopleQuery('Luke', 2), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockSearchPeople).toHaveBeenCalledWith({ term: 'Luke', page: 2 });
  });

  it('enters error state when API returns a message', async () => {
    mockSearchPeople.mockResolvedValue({ message: 'Not found' });
    const { result } = renderHook(() => usePeopleQuery('unknown', 1), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Not found');
  });

  it('enters error state when fetch rejects', async () => {
    mockSearchPeople.mockRejectedValue(new Error('Network failure'));
    const { result } = renderHook(() => usePeopleQuery('', 1), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Network failure');
  });

  it('serves cached data for the same query key without refetching', async () => {
    mockSearchPeople.mockResolvedValue(successResponse);
    const client = createCachingQueryClient();
    const wrapper = makeWrapper(client);

    const { result: r1 } = renderHook(() => usePeopleQuery('', 1), { wrapper });
    await waitFor(() => expect(r1.current.isSuccess).toBe(true));
    expect(mockSearchPeople).toHaveBeenCalledTimes(1);

    const { result: r2 } = renderHook(() => usePeopleQuery('', 1), { wrapper });
    await waitFor(() => expect(r2.current.isSuccess).toBe(true));
    expect(mockSearchPeople).toHaveBeenCalledTimes(1);
  });

  it('fetches again for a different query key', async () => {
    mockSearchPeople.mockResolvedValue(successResponse);
    const client = createCachingQueryClient();
    const wrapper = makeWrapper(client);

    const { result: r1 } = renderHook(() => usePeopleQuery('Luke', 1), {
      wrapper,
    });
    await waitFor(() => expect(r1.current.isSuccess).toBe(true));

    const { result: r2 } = renderHook(() => usePeopleQuery('Vader', 1), {
      wrapper,
    });
    await waitFor(() => expect(r2.current.isSuccess).toBe(true));

    expect(mockSearchPeople).toHaveBeenCalledTimes(2);
  });
});
