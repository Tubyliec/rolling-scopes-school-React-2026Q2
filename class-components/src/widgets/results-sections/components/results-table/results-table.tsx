import type { JSX } from 'react';

import { ResultsEmpty } from '@shared/ui/errors/results-empty/results-empty.tsx';
import { buildDescription } from '@shared/utilities/build-descriptions.ts';
import { extractPersonId } from '@shared/utilities/extract-person-id.ts';
import { stopPropagation } from '@shared/utilities/stop-propagation.ts';

import type { Person } from '@entities/person/model/types/person.type.ts';
import type { ResultsTableProps } from '@widgets/results-sections/components/results-table/model/types/results-table.type.ts';

import './results-table.scss';

function ResultsTable({
  results,
  onSelect,
  onCheckboxToggle,
  isChecked,
  selectedId,
}: ResultsTableProps): JSX.Element {
  const handleRowClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    person: Person
  ): void => {
    stopPropagation(e);
    onSelect(person);
  };

  const handleCheckboxToggle = (person: Person): void => {
    onCheckboxToggle(person);
  };

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
        {results.map((person) => {
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
              key={person.url}
              className={rowClassName}
              onClick={(e) => handleRowClick(e, person)}
            >
              <td className="results-table__cell results-table__cell--checkbox">
                <input
                  type="checkbox"
                  className="results-table__checkbox"
                  checked={checked}
                  onChange={() => handleCheckboxToggle(person)}
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
                <div className="results-table__badges">
                  <span className="results-table__badge">
                    hair: {person.hair_color}
                  </span>
                  <span className="results-table__badge">
                    eyes: {person.eye_color}
                  </span>
                  <span className="results-table__badge">
                    skin: {person.skin_color}
                  </span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ResultsTable;
