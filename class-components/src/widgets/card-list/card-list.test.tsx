import { render, screen } from '@testing-library/react';

import type { Person } from '@entities/person/model/types/person.type.ts';

import CardList from './card-list';

import { describe, expect, it } from 'vitest';

describe('CardList', () => {
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

  it('should render without crashing with results', () => {
    render(<CardList results={[mockPerson]} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should render card list with correct class', () => {
    const { container } = render(<CardList results={[mockPerson]} />);
    const cardList = container.querySelector('.card-list');
    expect(cardList).toBeInTheDocument();
  });

  it('should render person name in card', () => {
    render(<CardList results={[mockPerson]} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should render person height in card', () => {
    render(<CardList results={[mockPerson]} />);
    expect(screen.getByText('172 cm')).toBeInTheDocument();
  });

  it('should render empty state when no results', () => {
    render(<CardList results={[]} />);
    expect(screen.getByText('NO RECORDS FOUND')).toBeInTheDocument();
  });


  it('should render multiple cards when multiple results', () => {
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

    render(<CardList results={[mockPerson, person2]} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('should render correct person details in second card', () => {
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

    render(<CardList results={[person2]} />);
    expect(screen.getByText('202 cm')).toBeInTheDocument();
    expect(screen.getByText('136 kg')).toBeInTheDocument();
    expect(screen.getByText('Hair: none')).toBeInTheDocument();
  });
});