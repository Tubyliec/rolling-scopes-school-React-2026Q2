import { type JSX } from 'react';

import ResultsTableRow from '@widgets/results-sections/components/results-table-row/results-table-row.tsx';

import { ResultsEmpty } from '@shared/ui/errors/results-empty/results-empty.tsx';

import type { ResultsTableProps } from '@widgets/results-sections/model/types/results-table.type.ts';

import './results-table.scss';

function ResultsTable({
  results,
  onSelect,
  onCheckboxToggle,
  isChecked,
  selectedId,
}: ResultsTableProps): JSX.Element {
  if (!results.length) {
    return <ResultsEmpty />;
  }

  return (
    <table className="results-table">
      <thead className="results-table__head">
        <tr>
          <th className="results-table__th results-table__th--checkbox" />
          <th className="results-table__th">Name</th>
          <th className="results-table__th">Description</th>
        </tr>
      </thead>
      <tbody>
        {results.map((person) => (
          <ResultsTableRow
            key={person.url}
            person={person}
            selectedId={selectedId}
            isChecked={isChecked}
            onSelect={onSelect}
            onCheckboxToggle={onCheckboxToggle}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ResultsTable;