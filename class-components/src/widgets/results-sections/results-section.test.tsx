import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { useSearchStore } from '@/core/store/search-store.ts';
import { useSelectionStore } from '@/core/store/selection-store.ts';
import {
  createCachingQueryClient,
  createTestQueryClient,
} from '@/test/query-test-utils.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { Person } from '@entities/person/model/types/person.type.ts';

import ResultsSection from './results-section';

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockGetPeople = vi.fn();
vi.mock('@/core/swapi/swapi-service.ts', () => ({
  getPeople: (...args: unknown[]) => mockGetPeople(...args),
}));

const mockPerson: Person = {
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

const renderSection = (
  path = '/main/1',
  queryClient = createTestQueryClient()
) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/main/:page/:detailsId?" element={<ResultsSection />} />
          <Route path="/main" element={<ResultsSection />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

describe('ResultsSection', () => {
  beforeEach(() => {
    mockGetPeople.mockClear();
    useSearchStore.setState({ term: '' });
    useSelectionStore.setState({ selectedItems: [] });
  });

  it('renders spinner while loading', async () => {
    mockGetPeople.mockImplementation(() => new Promise(() => {}));
    renderSection();
    expect(await screen.findByText('LOADING DATA')).toBeInTheDocument();
  });

  it('renders results when fetch resolves', async () => {
    mockGetPeople.mockResolvedValue({
      results: [mockPerson],
      totalCount: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    renderSection();
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('renders error state when API returns message', async () => {
    mockGetPeople.mockResolvedValue({ message: 'Network error' });
    renderSection();
    expect(await screen.findByText('REQUEST FAILED')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('renders error icon on failure', async () => {
    mockGetPeople.mockResolvedValue({ message: 'err' });
    renderSection();
    expect(await screen.findByText('✖')).toBeInTheDocument();
  });

  it('renders empty state when no results', async () => {
    mockGetPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    renderSection();
    expect(await screen.findByText('NO RECORDS FOUND')).toBeInTheDocument();
  });

  it('renders pagination when totalCount > 0', async () => {
    mockGetPeople.mockResolvedValue({
      results: [mockPerson],
      totalCount: 20,
      totalPages: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    });
    renderSection();
    expect(await screen.findByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('does not render pagination when totalCount is 0', async () => {
    mockGetPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    renderSection();
    await screen.findByText('NO RECORDS FOUND');
    expect(screen.queryByText(/Page/)).not.toBeInTheDocument();
  });

  it('calls getPeople with term from store', async () => {
    useSearchStore.setState({ term: 'Luke' });
    mockGetPeople.mockResolvedValue({
      results: [mockPerson],
      totalCount: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    renderSection();
    expect(mockGetPeople).toHaveBeenCalledWith({ term: 'Luke', page: 1 });
  });

  it('renders Refresh button', async () => {
    mockGetPeople.mockResolvedValue({ message: 'err' });
    renderSection();
    await screen.findByText('REQUEST FAILED');
    expect(screen.getByText('↻ Refresh')).toBeInTheDocument();
  });

  it('Refresh button triggers a new fetch', async () => {
    mockGetPeople.mockResolvedValue({
      results: [mockPerson],
      totalCount: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    renderSection();
    await screen.findByText('Luke Skywalker');
    const callsAfterLoad = mockGetPeople.mock.calls.length;

    fireEvent.click(screen.getByText('↻ Refresh'));

    await waitFor(() =>
      expect(mockGetPeople.mock.calls.length).toBeGreaterThan(callsAfterLoad)
    );
  });

  it('reuses cached data for the same query key', async () => {
    mockGetPeople.mockResolvedValue({
      results: [mockPerson],
      totalCount: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    const client = createCachingQueryClient();
    const { unmount } = renderSection('/main/1', client);
    await screen.findByText('Luke Skywalker');
    const firstCallCount = mockGetPeople.mock.calls.length;
    unmount();

    renderSection('/main/1', client);
    await screen.findByText('Luke Skywalker');
    expect(mockGetPeople.mock.calls.length).toBe(firstCallCount);
  });
});
