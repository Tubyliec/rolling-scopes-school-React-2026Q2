import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ErrorButton } from './error-button';

describe('ErrorButton', () => {
  it('should throw an error when clicked', async () => {
    const user = userEvent.setup();

    render(<ErrorButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    await expect(user.click(button)).rejects.toThrow(
      'Simulated application error triggered by test button.'
    );
  });
});
