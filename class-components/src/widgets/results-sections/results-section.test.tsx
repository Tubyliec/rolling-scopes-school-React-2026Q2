import type { Person } from '@entities/person/model/types/person.type.ts';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { useSearchStore } from '@/core/store/search-store.ts';
import { useSelectionStore } from '@/core/store/selection-store.ts';

import ResultsSection from './results-section';

const mockSearchPeople = vi.fn();

vi.mock('@/core/swapi/swapi-service.ts', () => ({
  searchPeople: (...args: unknown[]) => mockSearchPeople(...args),
}));

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

const renderInRouter = (path = '/main/1') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/main/:page/:detailsId?" element={<ResultsSection />} />
        <Route path="/main" element={<ResultsSection />} />
      </Routes>
    </MemoryRouter>
  );

describe('ResultsSection', () => {
  beforeEach(() => {
    mockSearchPeople.mockClear();
    useSearchStore.setState({ term: '', isLoading: false });
    useSelectionStore.setState({ selectedItems: [] });
  });

  it('renders spinner while loading', () => {
    useSearchStore.setState({ isLoading: true });
    mockSearchPeople.mockResolvedValue({ results: [], totalCount: 0 });
    renderInRouter();
    expect(screen.getByText('LOADING DATA')).toBeInTheDocument();
  });

  it('renders results when fetch resolves', async () => {
    mockSearchPeople.mockResolvedValue({
      results: [mockPerson],
      totalCount: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    renderInRouter();
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('renders error state when fetch fails', async () => {
    mockSearchPeople.mockResolvedValue({ message: 'Network error' });
    renderInRouter();
    expect(await screen.findByText('REQUEST FAILED')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('renders empty state when no results found', async () => {
    mockSearchPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    renderInRouter();
    expect(await screen.findByText('NO RECORDS FOUND')).toBeInTheDocument();
  });

  it('renders pagination when totalCount > 0', async () => {
    mockSearchPeople.mockResolvedValue({
      results: [mockPerson],
      totalCount: 20,
      totalPages: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    });
    renderInRouter();
    expect(await screen.findByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('does not render pagination when totalCount is 0', async () => {
    mockSearchPeople.mockResolvedValue({
      results: [],
      totalCount: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    renderInRouter();
    await screen.findByText('NO RECORDS FOUND');
    expect(screen.queryByText(/Page/)).not.toBeInTheDocument();
  });

  it('calls searchPeople with the current store term', async () => {
    useSearchStore.setState({ term: 'Luke' });
    mockSearchPeople.mockResolvedValue({
      results: [mockPerson],
      totalCount: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    renderInRouter();
    expect(mockSearchPeople).toHaveBeenCalledWith({ term: 'Luke', page: 1 });
  });

  it('renders results-section class', async () => {
    mockSearchPeople.mockResolvedValue({ message: 'err' });
    const { container } = renderInRouter();
    await screen.findByText('REQUEST FAILED');
    expect(container.querySelector('.results-section')).toBeInTheDocument();
  });

  it('renders error icon when fetch fails', async () => {
    mockSearchPeople.mockResolvedValue({ message: 'err' });
    renderInRouter();
    expect(await screen.findByText('✖')).toBeInTheDocument();
  });
});
