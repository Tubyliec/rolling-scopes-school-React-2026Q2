import type { JSX } from 'react';

import './refresh-button.scss';

interface RefreshButtonProps {
  onClick: () => void;
  className?: string;
}

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
