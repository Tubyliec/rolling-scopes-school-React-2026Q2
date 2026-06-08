import { MemoryRouter } from 'react-router-dom';

import NotFoundPage from '@pages/not-found/not-found-page.tsx';

import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

describe('NotFoundPage', () => {
  it('should render the NotFoundPage component', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
