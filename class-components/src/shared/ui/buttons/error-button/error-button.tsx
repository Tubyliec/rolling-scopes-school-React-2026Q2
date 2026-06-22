'use client';

import { type JSX, useState } from 'react';

import './error-button.scss';
export function ErrorButton(): JSX.Element {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleSimulateError = (): void => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Simulated application error triggered by test button.');
  }

  return (
    <button className="app__error-trigger" onClick={handleSimulateError}>
      SIMULATE ERROR
    </button>
  );
}
