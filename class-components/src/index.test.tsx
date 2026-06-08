import { MemoryRouter } from 'react-router-dom';

import { useSearchStore } from '@/core/store/search-store.ts';
import { useSelectionStore } from '@/core/store/selection-store.ts';
import { createTestQueryClient } from '@/test/query-test-utils.tsx';
import AppRouter from '@core/router/app-router.tsx';
import { ThemeProvider } from '@core/theme/theme-context.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockGetPeople = vi.fn();

vi.mock('@/core/swapi/swapi-service', () => ({
  getPeople: (...args: unknown[]) => mockGetPeople(...args),
  getPerson: vi.fn(),
}));

const renderApp = (initialPath = '/main/1') =>
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <MemoryRouter initialEntries={[initialPath]}>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );

describe('Index', () => {
  beforeEach(() => {
    mockGetPeople.mockClear();
    useSearchStore.setState({ term: '' });
    useSelectionStore.setState({ selectedItems: [] });
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render without crashing', async () => {
    mockGetPeople.mockResolvedValue({ message: 'Test error' });
    await act(async () => {
      renderApp();
    });
    expect(screen.getByText('SIMULATE ERROR')).toBeInTheDocument();
  });

  it('should render header', async () => {
    mockGetPeople.mockResolvedValue({ message: 'Test error' });
    await act(async () => {
      renderApp();
    });
    expect(screen.getByText('Star Wars API search')).toBeInTheDocument();
  });

  it('should render search section', async () => {
    mockGetPeople.mockResolvedValue({ message: 'Test error' });
    await act(async () => {
      renderApp();
    });
    expect(screen.getByLabelText('Search term')).toBeInTheDocument();
  });

  it('should call getPeople on mount with saved term', async () => {
    useSearchStore.setState({ term: 'Luke' });
    mockGetPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    await act(async () => {
      renderApp();
    });
    expect(mockGetPeople).toHaveBeenCalledWith({ term: 'Luke', page: 1 });
  });

  it('should call getPeople on mount with empty term', async () => {
    mockGetPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    await act(async () => {
      renderApp();
    });
    expect(mockGetPeople).toHaveBeenCalledWith({ term: '', page: 1 });
  });

  it('should save search term to localStorage when searching', async () => {
    const user = userEvent.setup();
    mockGetPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    await act(async () => {
      renderApp();
    });
    await user.type(screen.getByLabelText('Search term'), 'Darth Vader');
    await user.click(screen.getByText('SEARCH'));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'swapi_search_term',
      'Darth Vader'
    );
  });

  it('should display results after successful search', async () => {
    const user = userEvent.setup();
    mockGetPeople.mockResolvedValue({
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
      hasNextPage: false,
      hasPreviousPage: false,
    });
    await act(async () => {
      renderApp();
    });
    await user.type(screen.getByLabelText('Search term'), 'Luke');
    await user.click(screen.getByText('SEARCH'));
    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    );
  });

  it('should display error message when API call fails', async () => {
    const user = userEvent.setup();
    mockGetPeople.mockResolvedValue({ message: 'Server error 500' });
    await act(async () => {
      renderApp();
    });
    await user.type(screen.getByLabelText('Search term'), 'Luke');
    await user.click(screen.getByText('SEARCH'));
    await waitFor(() => {
      expect(screen.getByText('REQUEST FAILED')).toBeInTheDocument();
      expect(screen.getByText('Server error 500')).toBeInTheDocument();
    });
  });

  it('should show loading state during search', async () => {
    const user = userEvent.setup();
    mockGetPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    await act(async () => {
      renderApp();
    });
    mockGetPeople.mockImplementation(() => new Promise(() => {}));
    await user.type(screen.getByLabelText('Search term'), 'Luke');
    await user.click(screen.getByText('SEARCH'));
    expect(screen.getByText('LOADING DATA')).toBeInTheDocument();
  });

  it('should handle pagination page change', async () => {
    const user = userEvent.setup();
    mockGetPeople.mockResolvedValue({
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
      totalCount: 20,
      totalPages: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    });
    await act(async () => {
      renderApp();
    });
    await waitFor(() =>
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    );

    mockGetPeople.mockResolvedValue({
      results: [
        {
          name: 'Darth Vader',
          height: '202',
          mass: '136',
          hair_color: 'none',
          skin_color: 'white',
          eye_color: 'yellow',
          birth_year: '41.9BBY',
          gender: 'male',
          url: 'https://swapi.dev/api/people/4/',
        },
      ],
      totalCount: 20,
      totalPages: 2,
      hasNextPage: false,
      hasPreviousPage: true,
    });
    await user.click(screen.getByText('→'));
    await waitFor(() =>
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument()
    );
    expect(mockGetPeople).toHaveBeenCalledWith({ term: '', page: 2 });
  });
});
