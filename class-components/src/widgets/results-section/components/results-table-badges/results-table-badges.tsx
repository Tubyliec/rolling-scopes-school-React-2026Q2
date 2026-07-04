'use client';

import type { JSX } from 'react';

import type { ResultsTableBadgesProps } from '@widgets/results-section/model/types/results-table-badges-props.type.ts';

import './results-table-badges.scss';

function ResultsTableBadges({ person }: ResultsTableBadgesProps): JSX.Element {
  return (
    <div className="results-table__badges">
      <span className="results-table__badge">hair: {person.hair_color}</span>
      <span className="results-table__badge">eyes: {person.eye_color}</span>
      <span className="results-table__badge">skin: {person.skin_color}</span>
    </div>
  );
}

export default ResultsTableBadges;
