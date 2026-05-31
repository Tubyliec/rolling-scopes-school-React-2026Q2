import { render, screen } from '@testing-library/react';

import Spinner from './spinner';

import { describe, expect, it } from 'vitest';

describe('Spinner', () => {
  it('should render without crashing', () => {
    render(<Spinner />);
    expect(screen.getByText('LOADING DATA')).toBeInTheDocument();
  });

  it('should render the spinner container with correct class', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should render the spinner track', () => {
    const { container } = render(<Spinner />);
    const track = container.querySelector('.spinner__track');
    expect(track).toBeInTheDocument();
  });

  it('should render the loading label with correct class', () => {
    render(<Spinner />);
    const label = screen.getByText('LOADING DATA');
    expect(label).toHaveClass('spinner__label');
  });
});
