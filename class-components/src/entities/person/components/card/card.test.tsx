import type { Person } from '@entities/person/model/types/person.type.ts';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Card from './card';

describe('Card', () => {
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

  it('should render without crashing', () => {
    render(<Card person={mockPerson} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should display person name', () => {
    render(<Card person={mockPerson} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should display person height', () => {
    render(<Card person={mockPerson} />);
    expect(screen.getByText('172 cm')).toBeInTheDocument();
  });

  it('should display person mass', () => {
    render(<Card person={mockPerson} />);
    expect(screen.getByText('77 kg')).toBeInTheDocument();
  });

  it('should display person birth year', () => {
    render(<Card person={mockPerson} />);
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  it('should display person gender', () => {
    render(<Card person={mockPerson} />);
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  it('should display person hair color', () => {
    render(<Card person={mockPerson} />);
    expect(screen.getByText('Hair: blond')).toBeInTheDocument();
  });

  it('should display person eye color', () => {
    render(<Card person={mockPerson} />);
    expect(screen.getByText('Eyes: blue')).toBeInTheDocument();
  });

  it('should display person skin color', () => {
    render(<Card person={mockPerson} />);
    expect(screen.getByText('Skin: fair')).toBeInTheDocument();
  });

  it('should render card with correct CSS class', () => {
    const { container } = render(<Card person={mockPerson} />);
    const card = container.querySelector('.card');
    expect(card).toBeInTheDocument();
  });

  it('should render card name with correct class', () => {
    render(<Card person={mockPerson} />);
    const name = screen.getByText('Luke Skywalker');
    expect(name).toHaveClass('card__name');
  });

  it('should handle different person data', () => {
    const differentPerson: Person = {
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

    render(<Card person={differentPerson} />);
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('202 cm')).toBeInTheDocument();
    expect(screen.getByText('136 kg')).toBeInTheDocument();
    expect(screen.getByText('Hair: none')).toBeInTheDocument();
  });
});
