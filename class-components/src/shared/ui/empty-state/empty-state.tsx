'use client';

import type { JSX } from 'react';

import type { EmptyStateProps } from './model/types/empty-state-props.type.ts';

import './empty-state.scss';

export function EmptyState({
  message = 'No data available.',
  className = '',
}: EmptyStateProps): JSX.Element {
  return <div className={`empty-state ${className}`}>{message}</div>;
}
