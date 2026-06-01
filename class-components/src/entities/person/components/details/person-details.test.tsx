import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  createCachingQueryClient,
  createTestQueryClient,
} from '@/test/query-test-utils.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import PersonDetail from './person-details';

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockGetPerson = vi.fn();
vi.mock('@/core/swapi/swapi-service.ts', () => ({
  getPerson: (...args: unknown[]) => mockGetPerson(...args),
}));

const mockPerson = {
  name: 'Test',
  height: '180',
  mass: '75',
  hair_color: 'black',
  skin_color: 'light',
  eye_color: 'brown',
  birth_year: '1990',
  gender: 'male',
  url: 'https://swapi.dev/api/people/10/',
};

const renderDetail = (
  path = '/main/1/10',
  queryClient = createTestQueryClient()
) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/main/:page/:detailsId" element={<PersonDetail />} />
          <Route path="/main/:page" element={<div>MAIN PAGE</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

describe('PersonDetail', () => {
  beforeEach(() => {
    mockGetPerson.mockClear();
  });

  it('shows spinner while loading', async () => {
    mockGetPerson.mockImplementation(() => new Promise(() => {}));
    renderDetail();
    expect(await screen.findByText('LOADING DATA')).toBeInTheDocument();
  });

  it('renders person data on success', async () => {
    mockGetPerson.mockResolvedValue(mockPerson);
    renderDetail();
    expect(await screen.findByText('Test')).toBeInTheDocument();
  });

  it('renders error when API returns message', async () => {
    mockGetPerson.mockResolvedValue({ message: 'Not found' });
    renderDetail();
    expect(await screen.findByText('Not found')).toBeInTheDocument();
  });

  it('renders error when fetch rejects', async () => {
    mockGetPerson.mockRejectedValue(new Error('Network boom'));
    renderDetail();
    expect(await screen.findByText(/Network boom/)).toBeInTheDocument();
  });

  it('close button navigates back to page', async () => {
    mockGetPerson.mockResolvedValue({ message: 'err' });
    renderDetail('/main/3/123');
    await screen.findByText('err');
    fireEvent.click(screen.getByText('✕'));
    await waitFor(() =>
      expect(screen.getByText('MAIN PAGE')).toBeInTheDocument()
    );
  });

  it('renders Refresh button', async () => {
    mockGetPerson.mockResolvedValue(mockPerson);
    renderDetail();
    await screen.findByText('Test');
    expect(screen.getByText('↻ Refresh')).toBeInTheDocument();
  });

  it('Refresh button triggers a new fetch', async () => {
    mockGetPerson.mockResolvedValue(mockPerson);
    renderDetail();
    await screen.findByText('Test');
    const callsAfterLoad = mockGetPerson.mock.calls.length;

    fireEvent.click(screen.getByText('↻ Refresh'));

    await waitFor(() =>
      expect(mockGetPerson.mock.calls.length).toBeGreaterThan(callsAfterLoad)
    );
  });

  it('caches person data — same id does not refetch', async () => {
    mockGetPerson.mockResolvedValue(mockPerson);
    const client = createCachingQueryClient();
    const { unmount } = renderDetail('/main/1/10', client);
    await screen.findByText('Test');
    const firstCount = mockGetPerson.mock.calls.length;
    unmount();

    renderDetail('/main/1/10', client);
    await screen.findByText('Test');
    expect(mockGetPerson.mock.calls.length).toBe(firstCount);
  });
});
