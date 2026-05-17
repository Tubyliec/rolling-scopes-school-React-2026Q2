import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './app';

const mockSearchPeople = vi.fn();

vi.mock('./core/services/swapi/swapi-service', () => ({
  searchPeople: (...args: unknown[]) => mockSearchPeople(...args),
}));

describe('App', () => {
  let localStorageMock: Storage;

  beforeEach(() => {
    mockSearchPeople.mockClear();
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render without crashing', async () => {
    mockSearchPeople.mockResolvedValue({ message: 'Test error' });
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText('SIMULATE ERROR')).toBeInTheDocument();
  });

  it('should render header', async () => {
    mockSearchPeople.mockResolvedValue({ message: 'Test error' });
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText('Star Wars API search')).toBeInTheDocument();
  });

  it('should render search section', async () => {
    mockSearchPeople.mockResolvedValue({ message: 'Test error' });
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByLabelText('Search term')).toBeInTheDocument();
  });

  it('should call searchPeople on mount with saved term', async () => {
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      'Luke'
    );
    mockSearchPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    await act(async () => {
      render(<App />);
    });

    expect(mockSearchPeople).toHaveBeenCalledWith({ term: 'Luke', page: 1 });
  });

  it('should call searchPeople on mount with empty term when no saved term', async () => {
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      null
    );
    mockSearchPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    await act(async () => {
      render(<App />);
    });

    expect(mockSearchPeople).toHaveBeenCalledWith({ term: '', page: 1 });
  });

  it('should save search term to localStorage when searching', async () => {
    const user = userEvent.setup();
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
    mockSearchPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    await act(async () => {
      render(<App />);
    });

    mockSearchPeople.mockClear();

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Darth Vader');

    const searchButton = screen.getByText('SEARCH');
    await user.click(searchButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'swapi_search_term',
      'Darth Vader'
    );
  });

  it('should display results after successful search', async () => {
    const user = userEvent.setup();
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
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
        },
      ],
      totalCount: 1,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    await act(async () => {
      render(<App />);
    });

    mockSearchPeople.mockClear();

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke');

    const searchButton = screen.getByText('SEARCH');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('should display error message when API call fails', async () => {
    const user = userEvent.setup();
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
    mockSearchPeople.mockResolvedValue({ message: 'Server error 500' });

    await act(async () => {
      render(<App />);
    });

    mockSearchPeople.mockClear();

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke');

    const searchButton = screen.getByText('SEARCH');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('REQUEST FAILED')).toBeInTheDocument();
      expect(screen.getByText('Server error 500')).toBeInTheDocument();
    });
  });

  it('should show loading state during search', async () => {
    const user = userEvent.setup();
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
    mockSearchPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    await act(async () => {
      render(<App />);
    });

    mockSearchPeople.mockClear();
    mockSearchPeople.mockImplementation(() => new Promise(() => {}));

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke');

    const searchButton = screen.getByText('SEARCH');
    await user.click(searchButton);

    expect(screen.getByText('FETCHING…')).toBeInTheDocument();
  });

  it('should handle pagination page change', async () => {
    const user = userEvent.setup();
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
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
        },
      ],
      totalCount: 20,
      currentPage: 1,
      totalPages: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    });

    await act(async () => {
      render(<App />);
    });

    mockSearchPeople.mockClear();

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke');

    const searchButton = screen.getByText('SEARCH');
    await user.click(searchButton);

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
        },
      ],
      totalCount: 20,
      currentPage: 2,
      totalPages: 2,
      hasNextPage: false,
      hasPreviousPage: true,
    });

    const nextButton = screen.getByText('Next →');
    await user.click(nextButton);

    await waitFor(() => {
      expect(mockSearchPeople).toHaveBeenCalledWith({ term: 'Luke', page: 2 });
    });
  });
});
