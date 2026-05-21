import { type JSX, useState } from 'react';

import './error-button.scss';
export function ErrorButton(): JSX.Element {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    throw new Error('Simulated application error triggered by test button.');
  }

  return (
    <button
      className="app__error-trigger"
      onClick={() => {
        setShouldThrowError(true);
      }}
    >
      SIMULATE ERROR
    </button>
  );
}
