'use client';

import type { JSX } from 'react';

import type { ActionButtonProps } from './model/types/action-button-props.type.ts';

import './action-button.scss';

export function ActionButton({
  children,
  onClick,
  variant = 'secondary',
  className = '',
}: ActionButtonProps): JSX.Element {
  const variantClass = `action-button--${variant}`;

  return (
    <button
      className={`action-button ${variantClass} ${className}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
