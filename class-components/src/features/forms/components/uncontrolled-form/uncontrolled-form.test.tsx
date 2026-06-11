import { useFormsStore } from '@features/forms/store/forms-store.ts';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UncontrolledForm from './uncontrolled-form.tsx';

import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('UncontrolledForm', () => {
  beforeEach(() => {
    useFormsStore.setState({ submissions: [] });
  });

  it('renders all required fields', () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);

    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^age$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^gender$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/profile image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and conditions/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  it('shows error when name starts with lowercase', async () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);

    await userEvent.type(screen.getByLabelText(/^name/i), 'alice');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/first letter must be uppercase/i)
      ).toBeInTheDocument();
    });
  });

  it('shows error for invalid email on submit', async () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'not-an-email');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('has submit button', () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('all labels are connected to inputs via htmlFor', () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    const nameInput = screen.getByLabelText(/^name/i);
    expect(nameInput).toBeInTheDocument();
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });
});
