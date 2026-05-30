import { act,render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach,beforeEach, describe, expect, it, vi } from 'vitest';

import { useSearchStore } from '@/core/store/search-store.ts';
import { useSelectionStore } from '@/core/store/selection-store.ts';
import { ThemeProvider } from '@/core/theme/theme-context.tsx';

import App from './app';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

const mockSearchPeople = vi.fn();

vi.mock('./core/swapi/swapi-service', () => ({
  searchPeople: (...args: unknown[]) => mockSearchPeople(...args),
  getPerson: vi.fn(),
}));

const renderApp = (initialPath = '/main') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('App', () => {
  beforeEach(() => {
    mockSearchPeople.mockClear();
    useSearchStore.setState({ term: '', isLoading: false });
    useSelectionStore.setState({ selectedItems: [] });

    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render without crashing', async () => {
    mockSearchPeople.mockResolvedValue({ message: 'Test error' });
    await act(async () => {
      renderApp();
    });
    expect(screen.getByText('SIMULATE ERROR')).toBeInTheDocument();
  });

  it('should render header', async () => {
    mockSearchPeople.mockResolvedValue({ message: 'Test error' });
    await act(async () => {
      renderApp();
    });
    expect(screen.getByText('Star Wars API search')).toBeInTheDocument();
  });

  it('should render search section', async () => {
    mockSearchPeople.mockResolvedValue({ message: 'Test error' });
    await act(async () => {
      renderApp();
    });
    expect(screen.getByLabelText('Search term')).toBeInTheDocument();
  });

  it('should call searchPeople on mount with saved term', async () => {
    useSearchStore.setState({ term: 'Luke' });
    mockSearchPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    await act(async () => {
      renderApp();
    });

    expect(mockSearchPeople).toHaveBeenCalledWith({ term: 'Luke', page: 1 });
  });

  it('should call searchPeople on mount with empty term when no saved term', async () => {
    mockSearchPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    await act(async () => {
      renderApp();
    });

    expect(mockSearchPeople).toHaveBeenCalledWith({ term: '', page: 1 });
  });

  it('should save search term to localStorage when searching', async () => {
    const user = userEvent.setup();
    mockSearchPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    await act(async () => {
      renderApp();
    });

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Darth Vader');
    await user.click(screen.getByText('SEARCH'));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'swapi_search_term',
      'Darth Vader'
    );
  });

  it('should display results after successful search', async () => {
    const user = userEvent.setup();
    mockSearchPeople.mockResolvedValue({
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
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    await act(async () => {
      renderApp();
    });

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke');
    await user.click(screen.getByText('SEARCH'));

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('should display error message when API call fails', async () => {
    const user = userEvent.setup();
    mockSearchPeople.mockResolvedValue({ message: 'Server error 500' });

    await act(async () => {
      renderApp();
    });

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke');
    await user.click(screen.getByText('SEARCH'));

    await waitFor(() => {
      expect(screen.getByText('REQUEST FAILED')).toBeInTheDocument();
      expect(screen.getByText('Server error 500')).toBeInTheDocument();
    });
  });

  it('should show loading state during search', async () => {
    const user = userEvent.setup();
    mockSearchPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    await act(async () => {
      renderApp();
    });

    mockSearchPeople.mockImplementation(() => new Promise(() => {}));

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke');
    await user.click(screen.getByText('SEARCH'));

    expect(screen.getByText('FETCHING…')).toBeInTheDocument();
  });

  it('should handle pagination page change', async () => {
    const user = userEvent.setup();
    mockSearchPeople.mockResolvedValue({
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
      currentPage: 1,
      totalPages: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    });

    await act(async () => {
      renderApp();
    });

    await waitFor(() => {
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });

    mockSearchPeople.mockResolvedValue({
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
      currentPage: 2,
      totalPages: 2,
      hasNextPage: false,
      hasPreviousPage: true,
    });

    await user.click(screen.getByText('Next →'));

    await waitFor(() => {
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    });

    expect(mockSearchPeople).toHaveBeenCalledWith({ term: '', page: 2 });
  });
});
