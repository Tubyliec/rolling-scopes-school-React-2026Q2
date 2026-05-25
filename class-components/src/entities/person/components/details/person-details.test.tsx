import { describe, it, expect, vi, beforeEach } from 'vitest';

import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import PersonDetail from './person-details';

const mockGetPerson = vi.fn();
vi.mock('@/core/swapi/swapi-service.ts', () => ({
  getPerson: (...args: unknown[]) => mockGetPerson(...args),
}));

describe('PersonDetail', () => {
  beforeEach(() => {
    mockGetPerson.mockClear();
  });

  it('renders spinner while loading and shows data on success', async () => {
    mockGetPerson.mockImplementation(
      () =>
        new Promise((res) =>
          setTimeout(
            () =>
              res({
                name: 'Test',
                height: '180',
                mass: '75',
                hair_color: 'black',
                skin_color: 'light',
                eye_color: 'brown',
                birth_year: '1990',
                gender: 'male',
                url: 'https://swapi.dev/api/people/10/',
              }),
            10
          )
        )
    );

    render(
      <MemoryRouter initialEntries={['/main/1/10']}>
        <Routes>
          <Route path="/main/:page/:detailsId" element={<PersonDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/LOADING DATA|LOADING/i)).toBeInTheDocument();
    expect(await screen.findByText('Test')).toBeInTheDocument();
  });

  it('renders error message when API returns message', async () => {
    mockGetPerson.mockResolvedValue({ message: 'Not found' });

    render(
      <MemoryRouter initialEntries={['/main/1/999']}>
        <Routes>
          <Route path="/main/:page/:detailsId" element={<PersonDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Not found')).toBeInTheDocument();
  });

  it('renders unknown error when getPerson rejects', async () => {
    mockGetPerson.mockRejectedValue(new Error('Network boom'));

    render(
      <MemoryRouter initialEntries={['/main/1/500']}>
        <Routes>
          <Route path="/main/:page/:detailsId" element={<PersonDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/Network boom|Unknown error/)
    ).toBeInTheDocument();
  });

  it('close button navigates back to page', async () => {
    mockGetPerson.mockResolvedValue({ message: 'Not found' });

    const { container } = render(
      <MemoryRouter initialEntries={['/main/3/123']}>
        <Routes>
          <Route path="/main/:page/:detailsId" element={<PersonDetail />} />
          <Route path="/main/:page" element={<div>MAIN PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Not found')).toBeInTheDocument();
    const button = container.querySelector(
      '.person-details__close'
    ) as HTMLButtonElement;
    fireEvent.click(button);
    await waitFor(() =>
      expect(screen.getByText('MAIN PAGE')).toBeInTheDocument()
    );
  });
});
