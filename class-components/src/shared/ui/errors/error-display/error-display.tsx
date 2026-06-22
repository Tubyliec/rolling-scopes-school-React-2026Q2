'use client';

import type { JSX } from 'react';

import './error-display.scss';

interface ErrorDisplayProps {
  message: string;
  title?: string;
}

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
