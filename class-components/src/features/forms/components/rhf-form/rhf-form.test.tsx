import { useFormsStore } from '@/features/forms/store/forms-store.ts';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RhfForm from './rhf-form.tsx';

import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('RhfForm', () => {
  beforeEach(() => {
    useFormsStore.setState({ submissions: [] });
  });

  it('renders all required fields', () => {
    render(<RhfForm onSuccess={vi.fn()} />);

    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^age$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^gender$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/profile image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and conditions/i)).toBeInTheDocument();
  });

  it('submit button is disabled initially', () => {
    render(<RhfForm onSuccess={vi.fn()} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('shows live validation error for lowercase name', async () => {
    render(<RhfForm onSuccess={vi.fn()} />);

    await userEvent.type(screen.getByLabelText(/^name/i), 'alice');
    await userEvent.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/first letter must be uppercase/i)
      ).toBeInTheDocument();
    });
  });

  it('shows live validation error for invalid email', async () => {
    render(<RhfForm onSuccess={vi.fn()} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'bad-email');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('shows error when confirmPassword is filled then cleared', async () => {
    render(<RhfForm onSuccess={vi.fn()} />);

    const confirmInput = screen.getByLabelText(/confirm password/i);
    await userEvent.type(confirmInput, 'x');
    await userEvent.clear(confirmInput);
    await userEvent.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/please confirm your password/i)
      ).toBeInTheDocument();
    });
  });

  it('all labels are connected to inputs via htmlFor', () => {
    render(<RhfForm onSuccess={vi.fn()} />);
    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
