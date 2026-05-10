import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
  it('should render without crashing', () => {
    render(<Header />);
    expect(screen.getByText('Star Wars API search')).toBeInTheDocument();
  });

  it('should render the header with correct class', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('.app-header');
    expect(header).toBeInTheDocument();
  });

  it('should render the logo text', () => {
    render(<Header />);
    const logo = screen.getByText('Star Wars API search');
    expect(logo).toHaveClass('app-header__logo');
  });
});
