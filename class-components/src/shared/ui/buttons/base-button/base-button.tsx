'use client';

import type { JSX } from 'react';

import type { BaseButtonProps } from './model/types/base-button-props.type.ts';

import './base-button.scss';

export function BaseButton({
  children,
  onClick,
  className = '',
  type = 'button',
}: BaseButtonProps): JSX.Element {
  return (
    <button
      className={`base-button ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
