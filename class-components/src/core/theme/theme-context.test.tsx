import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from './theme-context';
import { useTheme } from './use-theme';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span>{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

describe('ThemeContext', () => {
  it('should toggle theme', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText(/dark/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button'));

    expect(screen.getByText(/light/i)).toBeInTheDocument();
  });
});
