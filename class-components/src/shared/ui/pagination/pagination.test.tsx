import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Pagination from './pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    hasNext: true,
    hasPrevious: false,
    onPageChange: mockOnPageChange,
    count: 50,
  };

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('should render without crashing', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('should display current page and total pages', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('should display total count', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('50 total records')).toBeInTheDocument();
  });

  it('should disable previous button when hasPrevious is false', () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByText('← Previous');
    expect(prevButton).toBeDisabled();
  });

  it('should enable previous button when hasPrevious is true', () => {
    render(<Pagination {...defaultProps} hasPrevious={true} />);
    const prevButton = screen.getByText('← Previous');
    expect(prevButton).not.toBeDisabled();
  });

  it('should disable next button when hasNext is false', () => {
    render(<Pagination {...defaultProps} hasNext={false} />);
    const nextButton = screen.getByText('Next →');
    expect(nextButton).toBeDisabled();
  });

  it('should enable next button when hasNext is true', () => {
    render(<Pagination {...defaultProps} hasNext={true} />);
    const nextButton = screen.getByText('Next →');
    expect(nextButton).not.toBeDisabled();
  });

  it('should call onPageChange with previous page when previous button is clicked', async () => {
    const user = userEvent.setup();
    render(<Pagination {...defaultProps} hasPrevious={true} currentPage={2} />);

    const prevButton = screen.getByText('← Previous');
    await user.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('should call onPageChange with next page when next button is clicked', async () => {
    const user = userEvent.setup();
    render(<Pagination {...defaultProps} hasNext={true} />);

    const nextButton = screen.getByText('Next →');
    await user.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should render page numbers', () => {
    render(<Pagination {...defaultProps} />);
    const page1 = screen.getByText('1');
    const page2 = screen.getByText('2');
    const page3 = screen.getByText('3');

    expect(page1).toBeInTheDocument();
    expect(page2).toBeInTheDocument();
    expect(page3).toBeInTheDocument();
  });

  it('should call onPageChange when a page number is clicked', async () => {
    const user = userEvent.setup();
    render(<Pagination {...defaultProps} currentPage={1} />);

    const page2Button = screen.getByText('2');
    await user.click(page2Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should not call onPageChange when current page is clicked', async () => {
    const user = userEvent.setup();
    render(<Pagination {...defaultProps} currentPage={1} />);

    const page1Button = screen.getByText('1');
    await user.click(page1Button);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('should highlight current page', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const page2Button = screen.getByText('2');
    expect(page2Button).toHaveClass('pagination__page--active');
  });

  it('should disable current page button', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const page1Button = screen.getByText('1');
    expect(page1Button).toBeDisabled();
  });

  it('should handle page range correctly when in the middle', () => {
    render(<Pagination {...defaultProps} currentPage={3} totalPages={10} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should handle page range correctly at the beginning', () => {
    render(<Pagination {...defaultProps} currentPage={1} totalPages={10} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should handle page range correctly at the end', () => {
    render(<Pagination {...defaultProps} currentPage={10} totalPages={10} />);
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
