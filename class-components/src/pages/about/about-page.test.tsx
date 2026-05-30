import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect,it } from 'vitest';

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
