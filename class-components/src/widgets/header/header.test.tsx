import { fireEvent,render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect,it } from 'vitest';

import { ThemeProvider } from '@/core/theme/theme-context.tsx';

import Header from './header';

const renderHeader = () =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('Header', () => {
  it('should render without crashing', () => {
    renderHeader();
    expect(screen.getByText('Star Wars API search')).toBeInTheDocument();
  });

  it('should render the header with correct class', () => {
    const { container } = renderHeader();
    const header = container.querySelector('.app-header');
    expect(header).toBeInTheDocument();
  });

  it('should render the logo text', () => {
    renderHeader();
    const logo = screen.getByText('Star Wars API search');
    expect(logo).toHaveClass('app-header__logo');
  });

  it('should render an About navigation link', () => {
    renderHeader();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('should render theme toggle button', () => {
    renderHeader();
    expect(
      screen.getByRole('button', { name: /\u2600 Light/i })
    ).toBeInTheDocument();
  });

  it('should show light option in dark mode by default', () => {
    renderHeader();
    const toggle = screen.getByRole('button', { name: /\u2600 Light/i });
    expect(toggle).toBeInTheDocument();
  });

  it('theme toggle switches label on click', () => {
    renderHeader();
    const toggle = screen.getByRole('button', { name: /\u2600 Light/i });
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: /☾ Dark/i })).toBeInTheDocument();
  });
});
