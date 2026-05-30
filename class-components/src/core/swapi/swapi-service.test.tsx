import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { searchPeople } from './swapi-service';

describe('searchPeople', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return results when API call is successful', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 2,
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
          },
        ],
        next: null,
        previous: null,
      }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await searchPeople({ term: 'Luke', page: 1 });

    expect('results' in result).toBe(true);
    if ('results' in result) {
      expect(result.results).toHaveLength(1);
      expect(result.totalCount).toBe(2);
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBe(1);
      expect(result.hasNextPage).toBe(false);
      expect(result.hasPreviousPage).toBe(false);
    }
  });

  it('should return error message when response is not ok', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await searchPeople({ term: 'Luke', page: 1 });

    expect('message' in result).toBe(true);
    if ('message' in result) {
      expect(result.message).toContain('Server error 500');
    }
  });

  it('should handle network errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));
    vi.stubGlobal('fetch', mockFetch);

    const result = await searchPeople({ term: 'Luke', page: 1 });

    expect('message' in result).toBe(true);
    if ('message' in result) {
      expect(result.message).toContain('Network error');
    }
  });

  it('should handle generic errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Some other error'));
    vi.stubGlobal('fetch', mockFetch);

    const result = await searchPeople({ term: 'Luke', page: 1 });

    expect('message' in result).toBe(true);
    if ('message' in result) {
      expect(result.message).toBe('Some other error');
    }
  });

  it('should handle unknown errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue('unknown');
    vi.stubGlobal('fetch', mockFetch);

    const result = await searchPeople({ term: 'Luke', page: 1 });

    expect('message' in result).toBe(true);
    if ('message' in result) {
      expect(result.message).toBe('Unknown error occurred');
    }
  });

  it('should calculate pages correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 25,
        results: [],
        next: 'next-url',
        previous: null,
      }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await searchPeople({ term: 'a', page: 1 });

    expect('results' in result).toBe(true);
    if ('results' in result) {
      expect(result.totalPages).toBe(3);
      expect(result.hasNextPage).toBe(true);
      expect(result.hasPreviousPage).toBe(false);
    }
  });

  it('should handle pagination correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 20,
        results: [],
        next: null,
        previous: 'prev-url',
      }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await searchPeople({ term: 'a', page: 2 });

    expect('results' in result).toBe(true);
    if ('results' in result) {
      expect(result.currentPage).toBe(2);
      expect(result.hasNextPage).toBe(false);
      expect(result.hasPreviousPage).toBe(true);
    }
  });
});
