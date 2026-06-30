'use client';

import type { JSX } from 'react';

import type { ErrorDisplayProps } from './model/types/error-display-props.type.ts';

import './error-display.scss';

export function ErrorDisplay({
  message,
  title = 'REQUEST FAILED',
}: ErrorDisplayProps): JSX.Element {
  return (
    <div className="error-display">
      <span className="error-display__icon">✖</span>
      <div>
        <div className="error-display__title">{title}</div>
        <div className="error-display__message">{message}</div>
      </div>
    </div>
  );
}
