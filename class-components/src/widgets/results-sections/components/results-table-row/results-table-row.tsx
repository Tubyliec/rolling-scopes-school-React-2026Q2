import type { JSX } from 'react';

import ResultsTableBadges from '@widgets/results-sections/components/results-table-badges/results-table-badges.tsx';

import { buildDescription } from '@shared/utilities/build-descriptions.ts';
import { extractPersonId } from '@shared/utilities/extract-person-id.ts';
import { stopPropagation } from '@shared/utilities/stop-propagation.ts';

import type { ResultsTableRowProps } from '@widgets/results-sections/model/types/results-table-row-props.type.ts';

import './results-table-row.scss';

function ResultsTableRow({
  person,
  selectedId,
  isChecked,
  onSelect,
  onCheckboxToggle,
}: ResultsTableRowProps): JSX.Element {
  const id = extractPersonId(person.url);
  const checked = isChecked(person.url);

  const rowClassName = [
    'results-table__row',
    'results-table__row--clickable',
    id === selectedId && 'results-table__row--active',
    checked && 'results-table__row--selected',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr
      className={rowClassName}
      onClick={(e) => {
        stopPropagation(e);
        onSelect(person);
      }}
    >
      <td className="results-table__cell results-table__cell--checkbox">
        <input
          type="checkbox"
          className="results-table__checkbox"
          checked={checked}
          onChange={() => onCheckboxToggle(person)}
          onClick={stopPropagation}
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
