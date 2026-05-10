import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsTable from './results-table';
import type { Person } from '../../../entities/person/model/interfaces/person.interface';

describe('ResultsTable', () => {
  const mockPerson: Person = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
  };

  it('should render without crashing with results', () => {
    render(<ResultsTable results={[mockPerson]} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should render table with correct class', () => {
    const { container } = render(<ResultsTable results={[mockPerson]} />);
    const table = container.querySelector('.results-table');
    expect(table).toBeInTheDocument();
  });

  it('should render table headers', () => {
    render(<ResultsTable results={[mockPerson]} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('should render person name in table row', () => {
    render(<ResultsTable results={[mockPerson]} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should render person description', () => {
    render(<ResultsTable results={[mockPerson]} />);
    expect(
      screen.getByText('Height 172 cm · Mass 77 kg · Born 19BBY · male')
    ).toBeInTheDocument();
  });

  it('should render hair color badge', () => {
    render(<ResultsTable results={[mockPerson]} />);
    expect(screen.getByText('hair: blond')).toBeInTheDocument();
  });

  it('should render eye color badge', () => {
    render(<ResultsTable results={[mockPerson]} />);
    expect(screen.getByText('eyes: blue')).toBeInTheDocument();
  });

  it('should render skin color badge', () => {
    render(<ResultsTable results={[mockPerson]} />);
    expect(screen.getByText('skin: fair')).toBeInTheDocument();
  });

  it('should render empty state when no results', () => {
    render(<ResultsTable results={[]} />);
    expect(screen.getByText('NO RECORDS FOUND')).toBeInTheDocument();
  });

  it('should render empty state glyph', () => {
    render(<ResultsTable results={[]} />);
    expect(screen.getByText('◈')).toBeInTheDocument();
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
    };

    render(<ResultsTable results={[mockPerson, person2]} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('should render correct description for second person', () => {
    const person2: Person = {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
    };

    render(<ResultsTable results={[person2]} />);
    expect(
      screen.getByText('Height 202 cm · Mass 136 kg · Born 41.9BBY · male')
    ).toBeInTheDocument();
  });
});
