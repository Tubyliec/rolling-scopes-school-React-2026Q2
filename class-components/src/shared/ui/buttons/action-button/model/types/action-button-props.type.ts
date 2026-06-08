import type { MouseEventHandler } from 'react';

export type ActionButtonVariant = 'primary' | 'secondary';

export interface ActionButtonProps {
  children: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  variant?: ActionButtonVariant;
  className?: string;
}
