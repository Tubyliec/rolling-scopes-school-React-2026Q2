import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSearchStore } from '@/core/store/search-store.ts';

import SearchSection from './search-section';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderSearchSection = () =>
  render(
    <MemoryRouter>
      <SearchSection />
    </MemoryRouter>
  );

describe('SearchSection', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    useSearchStore.setState({ term: '', isLoading: false });
  });

  it('should render without crashing', () => {
    renderSearchSection();
    expect(screen.getByLabelText('Search term')).toBeInTheDocument();
  });

  it('should render with section class', () => {
    const { container } = renderSearchSection();
    expect(container.querySelector('.search-section')).toBeInTheDocument();
  });

  it('should initialise input with the current store term', () => {
    useSearchStore.setState({ term: 'Luke' });
    renderSearchSection();
    expect(screen.getByLabelText('Search term')).toHaveValue('Luke');
  });

  it('should update input value when user types', async () => {
    const user = userEvent.setup();
    renderSearchSection();
    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Vader');
    expect(input).toHaveValue('Vader');
  });

  it('should trim the term and update the store on search', async () => {
    const user = userEvent.setup();
    renderSearchSection();
    const input = screen.getByLabelText('Search term');
    await user.type(input, '  Luke  ');
    await user.click(screen.getByText('SEARCH'));
    expect(useSearchStore.getState().term).toBe('Luke');
  });

  it('should navigate to /main/1 on search', async () => {
    const user = userEvent.setup();
    renderSearchSection();
    await user.click(screen.getByText('SEARCH'));
    expect(mockNavigate).toHaveBeenCalledWith('/main/1');
  });

  it('should disable input when isLoading is true', () => {
    useSearchStore.setState({ isLoading: true });
    renderSearchSection();
    expect(screen.getByLabelText('Search term')).toBeDisabled();
  });

  it('should trigger search on Enter key press', async () => {
    const user = userEvent.setup();
    renderSearchSection();
    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Leia{Enter}');
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/main/1');
    });
  });

  it('should persist term to localStorage via store on search', async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    renderSearchSection();
    const input = screen.getByLabelText('Search term');
    await user.type(input, 'Obi-Wan');
    await user.click(screen.getByText('SEARCH'));
    expect(setItemSpy).toHaveBeenCalledWith('swapi_search_term', 'Obi-Wan');
  });
});
