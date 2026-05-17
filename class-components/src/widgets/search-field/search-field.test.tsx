import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchField from './search-field';

describe('SearchField', () => {
  const mockOnChange = vi.fn();
  const mockOnSearch = vi.fn();

  const defaultProps = {
    value: '',
    isLoading: false,
    onChange: mockOnChange,
    onSearch: mockOnSearch,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnSearch.mockClear();
  });

  it('should render without crashing', () => {
    render(<SearchField {...defaultProps} />);
    expect(screen.getByLabelText('Search term')).toBeInTheDocument();
  });

  it('should display input with correct value', () => {
    render(<SearchField {...defaultProps} value="Luke Skywalker" />);
    const input = screen.getByLabelText('Search term');
    expect(input).toHaveValue('Luke Skywalker');
  });

  it('should call onChange when input value changes', async () => {
    const user = userEvent.setup();
    render(<SearchField {...defaultProps} />);

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke');

    expect(mockOnChange).toHaveBeenCalledTimes(4);
    expect(mockOnChange).toHaveBeenLastCalledWith('e');
  });

  it('should call onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<SearchField {...defaultProps} />);

    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Luke{Enter}');

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('should call onSearch when search button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchField {...defaultProps} />);

    const searchButton = screen.getByText('SEARCH');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('should disable search button when isLoading is true', () => {
    render(<SearchField {...defaultProps} isLoading={true} />);
    const searchButton = screen.getByText('FETCHING…');
    expect(searchButton).toBeDisabled();
  });

  it('should not disable search button when isLoading is false', () => {
    render(<SearchField {...defaultProps} isLoading={false} />);
    const searchButton = screen.getByText('SEARCH');
    expect(searchButton).not.toBeDisabled();
  });

  it('should have correct placeholder text', () => {
    render(<SearchField {...defaultProps} />);
    const input = screen.getByLabelText('Search term');
    expect(input).toHaveAttribute('placeholder', 'e.g. Luke Skywalker…');
  });

  it('should have correct input type', () => {
    render(<SearchField {...defaultProps} />);
    const input = screen.getByLabelText('Search term');
    expect(input).toHaveAttribute('type', 'text');
  });
});
