import Modal from '@/features/forms/components/modal/modal.tsx';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

describe('Modal', () => {
  it('renders nothing when isOpen is false', () => {
    render(
      <Modal isOpen={false} title="Test" onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when isOpen is true', () => {
    render(
      <Modal isOpen={true} title="Test Modal" onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders title and children', () => {
    render(
      <Modal isOpen={true} title="My Form" onClose={vi.fn()}>
        <p>Form content</p>
      </Modal>
    );
    expect(screen.getByText('My Form')).toBeInTheDocument();
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} title="Test" onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when ESC key is pressed', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} title="Test" onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking overlay', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} title="Test" onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    const overlay = screen.getByRole('dialog');
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
