import type { JSX } from 'react';

export type PaginationButtonProps = Readonly<{
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
  children: JSX.Element | string;
}>;
