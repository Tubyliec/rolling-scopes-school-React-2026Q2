import { fireEvent, render, screen } from '@testing-library/react';

import type { Person } from '@entities/person/model/types/person.type.ts';

import ResultsTable from './results-table';

import { describe, expect, it, vi } from 'vitest';

describe('ResultsTable', () => {
  const mockOnSelect = vi.fn();
  const mockOnCheckboxToggle = vi.fn();
  const mockIsChecked = vi.fn(() => false);

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
    results: [mockPerson],
    onSelect: mockOnSelect,
    onCheckboxToggle: mockOnCheckboxToggle,
    isChecked: mockIsChecked,
  };

  beforeEach(() => {
    mockOnSelect.mockClear();
    mockOnCheckboxToggle.mockClear();
    mockIsChecked.mockClear().mockReturnValue(false);
  });

  it('should render without crashing with results', () => {
    render(<ResultsTable {...defaultProps} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should render table with correct class', () => {
    const { container } = render(<ResultsTable {...defaultProps} />);
    expect(container.querySelector('.results-table')).toBeInTheDocument();
  });

  it('should render table headers', () => {
    render(<ResultsTable {...defaultProps} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('should render person name in table row', () => {
    render(<ResultsTable {...defaultProps} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should render person description', () => {
    render(<ResultsTable {...defaultProps} />);
    expect(
      screen.getByText('Height 172 cm · Mass 77 kg · Born 19BBY · male')
    ).toBeInTheDocument();
  });

  it('should render hair color badge', () => {
    render(<ResultsTable {...defaultProps} />);
    expect(screen.getByText('hair: blond')).toBeInTheDocument();
  });

  it('should render eye color badge', () => {
    render(<ResultsTable {...defaultProps} />);
    expect(screen.getByText('eyes: blue')).toBeInTheDocument();
  });

  it('should render skin color badge', () => {
    render(<ResultsTable {...defaultProps} />);
    expect(screen.getByText('skin: fair')).toBeInTheDocument();
  });

  it('should render empty state when no results', () => {
    render(
      <ResultsTable
        results={[]}
        onSelect={mockOnSelect}
        onCheckboxToggle={mockOnCheckboxToggle}
        isChecked={mockIsChecked}
      />
    );
    expect(screen.getByText('NO RECORDS FOUND')).toBeInTheDocument();
  });

  it('should render multiple rows when multiple results', () => {
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

    render(<ResultsTable {...defaultProps} results={[mockPerson, person2]} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('should render a checkbox for each row', () => {
    render(<ResultsTable {...defaultProps} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(1);
  });

  it('clicking the checkbox calls onCheckboxToggle, not onSelect', () => {
    render(<ResultsTable {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnCheckboxToggle).toHaveBeenCalledWith(mockPerson);
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('clicking the row (outside checkbox) calls onSelect, not onCheckboxToggle', () => {
    render(<ResultsTable {...defaultProps} />);
    const nameCell = screen.getByText('Luke Skywalker');
    fireEvent.click(nameCell);
    expect(mockOnSelect).toHaveBeenCalledWith(mockPerson);
    expect(mockOnCheckboxToggle).not.toHaveBeenCalled();
  });

  it('checkbox is checked when isChecked returns true', () => {
    mockIsChecked.mockReturnValue(true);
    render(<ResultsTable {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('checkbox is unchecked when isChecked returns false', () => {
    mockIsChecked.mockReturnValue(false);
    render(<ResultsTable {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('row has selected class when item is checked', () => {
    mockIsChecked.mockReturnValue(true);
    const { container } = render(<ResultsTable {...defaultProps} />);
    const row = container.querySelector('.results-table__row--selected');
    expect(row).toBeInTheDocument();
  });
});
