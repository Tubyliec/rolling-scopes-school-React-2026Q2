import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSearchStore } from '@/core/store/search-store.ts';
import { createTestQueryClient } from '@/test/query-test-utils.tsx';

import SearchSection from './search-section';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>();
  return { ...actual, useIsFetching: () => 0 };
});

const renderSearchSection = () =>
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <MemoryRouter>
        <SearchSection />
      </MemoryRouter>
    </QueryClientProvider>
  );

describe('SearchSection', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    useSearchStore.setState({ term: '' });
  });

  it('renders without crashing', () => {
    renderSearchSection();
    expect(screen.getByLabelText('Search term')).toBeInTheDocument();
  });

  it('renders with section class', () => {
    const { container } = renderSearchSection();
    expect(container.querySelector('.search-section')).toBeInTheDocument();
  });

  it('initialises input with current store term', () => {
    useSearchStore.setState({ term: 'Luke' });
    renderSearchSection();
    expect(screen.getByLabelText('Search term')).toHaveValue('Luke');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    renderSearchSection();
    await user.type(screen.getByLabelText('Search term'), 'Vader');
    expect(screen.getByLabelText('Search term')).toHaveValue('Vader');
  });

  it('trims term and updates store on search', async () => {
    const user = userEvent.setup();
    renderSearchSection();
    await user.type(screen.getByLabelText('Search term'), '  Luke  ');
    await user.click(screen.getByText('SEARCH'));
    expect(useSearchStore.getState().term).toBe('Luke');
  });

  it('navigates to /main/1 on search', async () => {
    const user = userEvent.setup();
    renderSearchSection();
    await user.click(screen.getByText('SEARCH'));
    expect(mockNavigate).toHaveBeenCalledWith('/main/1');
  });

  it('persists term to localStorage via store on search', async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    renderSearchSection();
    await user.type(screen.getByLabelText('Search term'), 'Obi-Wan');
    await user.click(screen.getByText('SEARCH'));
    expect(setItemSpy).toHaveBeenCalledWith('swapi_search_term', 'Obi-Wan');
  });

  it('triggers search on Enter key', async () => {
    const user = userEvent.setup();
    renderSearchSection();
    await user.type(screen.getByLabelText('Search term'), 'Leia{Enter}');
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/main/1'));
  });
});
