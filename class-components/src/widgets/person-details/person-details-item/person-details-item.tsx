'use client';

import type { JSX } from 'react';

import type { PersonDetailsItemProps } from './model/types/person-details-item-props.type.ts';

export function PersonDetailsItem({
  label,
  value,
}: PersonDetailsItemProps): JSX.Element {
  return (
    <li className="person-details__item">
      <span className="person-details__label">{label}</span>
      <span className="person-details__value">{value}</span>
    </li>
  );
}
