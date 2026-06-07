import { render, screen } from '@testing-library/react';

import type { FormSubmission } from '@/features/forms/model/types/form-submission.type.ts';

import SubmissionCard from './submission-card.tsx';

import { describe, expect, it } from 'vitest';

const mockSubmission: FormSubmission = {
  id: 'test-id-1',
  name: 'Alice Smith',
  age: 30,
  email: 'alice@example.com',
  gender: 'female',
  country: 'France',
  imageBase64: '',
  agreedToTerms: true,
  submittedAt: Date.now(),
  isNew: false,
};

describe('SubmissionCard', () => {
  it('renders the submission name', () => {
    render(<SubmissionCard submission={mockSubmission} />);
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  });

  it('renders age, email, gender, country', () => {
    render(<SubmissionCard submission={mockSubmission} />);
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('female')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('applies --new modifier when isNew is true', () => {
    const { container } = render(
      <SubmissionCard submission={{ ...mockSubmission, isNew: true }} />
    );
    expect(
      container.querySelector('.submission-card--new')
    ).toBeInTheDocument();
  });

  it('does not apply --new modifier when isNew is false', () => {
    const { container } = render(
      <SubmissionCard submission={{ ...mockSubmission, isNew: false }} />
    );
    expect(
      container.querySelector('.submission-card--new')
    ).not.toBeInTheDocument();
  });

  it('renders image when imageBase64 is present', () => {
    render(
      <SubmissionCard
        submission={{
          ...mockSubmission,
          imageBase64: 'data:image/png;base64,abc123',
        }}
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'data:image/png;base64,abc123');
    expect(img).toHaveAttribute('alt', "Alice Smith's profile");
  });

  it('does not render image element when imageBase64 is empty', () => {
    render(<SubmissionCard submission={mockSubmission} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
