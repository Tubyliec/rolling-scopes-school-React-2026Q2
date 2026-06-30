'use client';

import type { JSX } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useLocale } from 'next-intl';

import { useSelectionStore } from '@/core/store/selection-store.ts';

import ResultsTableBadges from '@widgets/results-sections/components/results-table-badges/results-table-badges.tsx';

import { buildDescription } from '@shared/utilities/build-descriptions.ts';
import { extractPersonId } from '@shared/utilities/extract-person-id.ts';

import type { ResultsTableRowProps } from '../../model/types/results-table-row-props.type.ts';

import './results-table-row.scss';

function ResultsTableRow({
  person,
  selectedId,
}: ResultsTableRowProps): JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { toggleItem, isSelected } = useSelectionStore();

  const id = extractPersonId(person.url);
  const checked = isSelected(person.url);

  const rowClassName = [
    'results-table__row',
    'results-table__row--clickable',
    id === selectedId && 'results-table__row--active',
    checked && 'results-table__row--selected',
  ]
    .filter(Boolean)
    .join(' ');

  const handleRowClick = (): void => {
    const params = new URLSearchParams(searchParams);
    params.set('id', id);
    router.push(`/${locale}?${params.toString()}`);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.stopPropagation();
    toggleItem(person);
  };

  return (
    <tr className={rowClassName} onClick={handleRowClick}>
      <td className="results-table__cell results-table__cell--checkbox">
        <input
          type="checkbox"
          className="results-table__checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="results-table__cell results-table__cell--name">
        {person.name}
      </td>
      <td className="results-table__cell">
        <div className="results-table__description">
          {buildDescription(person)}
        </div>
        <ResultsTableBadges person={person} />
      </td>
    </tr>
  );
}

export default ResultsTableRow;
