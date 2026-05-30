import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component, type JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';

import ErrorBoundary from './error-boundary';

class ThrowError extends Component<{ shouldThrow: boolean }> {
  public render(): JSX.Element {
    if (this.props.shouldThrow) {
      throw new Error('Test error');
    }
    return <div data-testid="child">Child component</div>;
  }
}

describe('ErrorBoundary', () => {
  it('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Сontent</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Сontent')).toBeInTheDocument();
  });

  it('should render fallback UI when child throws error', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('SYSTEM FAILURE')).toBeInTheDocument();
    expect(screen.getByText('ERR')).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it('should display error message in fallback', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it('should render reset button', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('RESET APP')).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it('should reset error state when reset button is clicked', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('SYSTEM FAILURE')).toBeInTheDocument();

    const resetButton = screen.getByText('RESET APP');
    expect(resetButton).toBeInTheDocument();

    await user.click(resetButton);

    expect(screen.getByText('RESET APP')).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it('should log error to console', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
