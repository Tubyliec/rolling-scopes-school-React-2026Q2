'use client';

import type { JSX } from 'react';

import type { PaginationButtonProps } from './model/types/pagination-button.type.ts';

import './pagination-button.scss';

export function PaginationButton({
  direction,
  onClick,
  disabled,
  children,
}: PaginationButtonProps): JSX.Element {
  return (
    <button
      className={`pagination__btn pagination__btn--${direction}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
