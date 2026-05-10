import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './app';

describe('App', () => {
  it('app should render without crashing', () => {
    render(<App />);
    expect(screen.getByText('SIMULATE ERROR')).toBeInTheDocument();
  });
});
