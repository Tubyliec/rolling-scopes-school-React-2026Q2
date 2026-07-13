'use client';

import { type JSX } from 'react';

import { useTranslations } from 'next-intl';

import ResultsTableRow from '@widgets/results-section/components/results-table-row/results-table-row.tsx';

import { ResultsEmpty } from '@shared/ui/errors/results-empty/results-empty.tsx';

import type { ResultsTableProps } from '../../model/types/results-table.type.ts';

import './results-table.scss';

function ResultsTable({ results, selectedId }: ResultsTableProps): JSX.Element {
  const translation = useTranslations('results');

  const isEmpty = !results.length;

  if (isEmpty) {
    return <ResultsEmpty />;
  }

  return (
    <table className="results-table">
      <thead className="results-table__head">
        <tr>
          <th className="results-table__th results-table__th--checkbox" />
          <th className="results-table__th">{translation('name')}</th>
          <th className="results-table__th">{translation('description')}</th>
        </tr>
      </thead>
      <tbody>
        {results.map((person) => (
          <ResultsTableRow
            key={person.url}
            person={person}
            selectedId={selectedId}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ResultsTable;
