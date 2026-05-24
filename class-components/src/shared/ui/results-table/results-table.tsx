import type { JSX } from 'react';
import type { ResultsTableProps } from './model/interfaces/results-table.interface';

import { buildDescription } from '@/shared/utilities/build-descriptions.ts';
import { extractPersonId } from '@/shared/utilities/extract-person-id.ts';

import type { Person } from '@entities/person/model/types/person.type.ts';

import './results-table.scss';

function ResultsTable({
  results,
  onSelect,
  onCheckboxToggle,
  isChecked,
  selectedId,
}: ResultsTableProps): JSX.Element {
  if (!results.length) {
    return (
      <div className="results-table__empty">
        <div className="results-table__empty-glyph">◈</div>
        NO RECORDS FOUND
      </div>
    );
  }

  const renderRow = (person: Person, index: number): JSX.Element => {
    const id = extractPersonId(person.url);
    const isActive = id === selectedId;
    const checked = isChecked(person.url);

    return (
      <tr
        key={index}
        className={`results-table__row results-table__row--clickable${isActive ? ' results-table__row--active' : ''}${checked ? ' results-table__row--selected' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(person);
        }}
      >
        <td className="results-table__cell results-table__cell--checkbox">
          <input
            type="checkbox"
            className="results-table__checkbox"
            checked={checked}
            aria-label={`Select ${person.name}`}
            onChange={() => {}}
            onClick={(e) => {
              e.stopPropagation();
              onCheckboxToggle(person);
            }}
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
  };

  return (
    <table className="results-table">
      <thead className="results-table__head">
        <tr>
          <th
            className="results-table__th results-table__th--checkbox"
            aria-label="Selection"
          />
          <th className="results-table__th">Name</th>
          <th className="results-table__th">Description</th>
        </tr>
      </thead>
      <tbody>{results.map((person, index) => renderRow(person, index))}</tbody>
    </table>
  );
}

export default ResultsTable;
