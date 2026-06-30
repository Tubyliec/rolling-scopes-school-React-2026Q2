import type { ReactNode } from 'react';

import Spinner from '../spinner/spinner';

export function LoadingSpinner(): ReactNode {
  return (
    <div className="results-loading">
      <Spinner />
    </div>
  );
}
