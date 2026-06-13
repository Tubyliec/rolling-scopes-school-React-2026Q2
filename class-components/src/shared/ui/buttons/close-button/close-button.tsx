import type { JSX } from 'react';

import type { CloseButtonProps } from './model/types/close-button-props.type.ts';

import './close-button.scss';

export function CloseButton({
  onClick,
  className = '',
}: CloseButtonProps): JSX.Element {
  return (
    <button
      className={`close-button ${className}`}
      onClick={onClick}
      type="button"
      aria-label="Close"
    >
      ✕
    </button>
  );
}
