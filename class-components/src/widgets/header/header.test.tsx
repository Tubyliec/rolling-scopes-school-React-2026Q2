import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
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
});
