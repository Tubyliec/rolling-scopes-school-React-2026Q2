import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSection from './search-section';

const mockOnSearch = vi.fn();

const defaultProps = {
  onSearch: mockOnSearch,
  isLoading: false,
};

describe('SearchSection', () => {
  let localStorageMock: Storage;

  beforeEach(() => {
    mockOnSearch.mockClear();
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

  it('should render without crashing', () => {
    render(<SearchSection {...defaultProps} />);
    expect(screen.getByLabelText('Search term')).toBeInTheDocument();
  });

  it('should read saved search term from localStorage on mount', () => {
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      'Luke Skywalker'
    );
    render(<SearchSection {...defaultProps} />);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('swapi_search_term');
  });

  it('should use empty string when localStorage has no saved term', () => {
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      null
    );
    render(<SearchSection {...defaultProps} />);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('swapi_search_term');
  });

  it('should call onSearch with saved term on component mount', () => {
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      'Darth Vader'
    );
    render(<SearchSection {...defaultProps} />);
    expect(mockOnSearch).toHaveBeenCalledWith('Darth Vader');
  });

  it('should call onSearch with empty string on mount when no saved term', () => {
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      null
    );
    render(<SearchSection {...defaultProps} />);
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('should update input value when user types', async () => {
    const user = userEvent.setup();
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
    render(<SearchSection {...defaultProps} />);

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke');

    expect(input).toHaveValue('Luke');
  });

  it('should trim search term before calling onSearch', async () => {
    const user = userEvent.setup();
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
    render(<SearchSection {...defaultProps} />);

    const input = screen.getByLabelText('Search term');
    await user.type(input, '  Luke  ');

    mockOnSearch.mockClear();

    const searchButton = screen.getByText('SEARCH');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Luke');
  });

  it('should call onSearch when search button is clicked', async () => {
    const user = userEvent.setup();
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
    render(<SearchSection {...defaultProps} />);

    mockOnSearch.mockClear();

    const searchButton = screen.getByText('SEARCH');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('should pass isLoading prop to SearchField', () => {
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
    render(<SearchSection {...defaultProps} isLoading={true} />);
    const input = screen.getByLabelText('Search term');
    expect(input).toBeDisabled();
  });

  it('should handle Enter key press to trigger search', async () => {
    const user = userEvent.setup();
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
    render(<SearchSection {...defaultProps} />);

    mockOnSearch.mockClear();

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke{Enter}');

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalled();
    });
  });

  it('should render with section class', () => {
    (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReturnValue('');
    const { container } = render(<SearchSection {...defaultProps} />);
    const section = container.querySelector('.search-section');
    expect(section).toBeInTheDocument();
  });
});
