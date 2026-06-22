'use client';

import type { JSX } from 'react';

import type { RefreshButtonProps } from '@shared/ui/buttons/refresh-button/model/types/refresh-button-props.type.ts';

import './refresh-button.scss';

export function RefreshButton({
  onClick,
  className = '',
}: RefreshButtonProps): JSX.Element {
  return (
    <button
      className={`refresh-button ${className}`}
      onClick={onClick}
      type="button"
    >
      ↻ Refresh
    </button>
  );
}
