import type { JSX } from 'react';

import './results-empty.scss';

export function ResultsEmpty(): JSX.Element {
  return <div className="results-table__empty">NO RECORDS FOUND</div>;
}
