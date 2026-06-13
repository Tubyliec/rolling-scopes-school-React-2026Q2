import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import AboutPage from './about-page';

import { describe, expect, it } from 'vitest';

describe('AboutPage', () => {
  it('should render the AboutPage component', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
