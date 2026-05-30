import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AboutPage from './about-page';

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
