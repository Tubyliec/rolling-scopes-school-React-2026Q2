import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsSection from './results-section';
import type { Person } from '../../../entities/person/model/interfaces/person.interface';

describe('ResultsSection', () => {
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

  const defaultProps = {
    isLoading: false,
    error: null,
    results: [mockPerson],
    currentPage: 1,
    totalPages: 5,
    totalCount: 50,
    hasNextPage: true,
    hasPreviousPage: false,
    onPageChange: vi.fn(),
    onSelect: vi.fn(),
  };

  it('should render without crashing with results', () => {
    render(<ResultsSection {...defaultProps} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should render loading spinner when isLoading is true', () => {
    render(<ResultsSection {...defaultProps} isLoading={true} />);
    expect(screen.getByText('LOADING DATA')).toBeInTheDocument();
  });

  it('should render error message when error is provided', () => {
    render(<ResultsSection {...defaultProps} error="Network error" />);
    expect(screen.getByText('REQUEST FAILED')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('should not render results when loading', () => {
    render(<ResultsSection {...defaultProps} isLoading={true} />);
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });

  it('should not render results when error occurs', () => {
    render(<ResultsSection {...defaultProps} error="Failed" />);
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });

  it('should render results table when not loading and no error', () => {
    render(<ResultsSection {...defaultProps} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should render pagination when totalCount is greater than 0', () => {
    render(<ResultsSection {...defaultProps} />);
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('should not render pagination when totalCount is 0', () => {
    render(
      <ResultsSection
        {...defaultProps}
        results={[]}
        totalCount={0}
        totalPages={0}
      />
    );
    expect(screen.queryByText('Page')).not.toBeInTheDocument();
  });

  it('should render section with correct class', () => {
    const { container } = render(<ResultsSection {...defaultProps} />);
    const section = container.querySelector('.results-section');
    expect(section).toBeInTheDocument();
  });

  it('should render error with correct icon', () => {
    render(<ResultsSection {...defaultProps} error="Error occurred" />);
    expect(screen.getByText('✖')).toBeInTheDocument();
  });

  it('should render empty state when no results and no error', () => {
    render(
      <ResultsSection
        {...defaultProps}
        results={[]}
        totalCount={0}
        totalPages={0}
      />
    );
    expect(screen.getByText('NO RECORDS FOUND')).toBeInTheDocument();
  });

  it('should render multiple results', () => {
    const person2: Person = {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/4/',
    };

    render(
      <ResultsSection {...defaultProps} results={[mockPerson, person2]} />
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });
});