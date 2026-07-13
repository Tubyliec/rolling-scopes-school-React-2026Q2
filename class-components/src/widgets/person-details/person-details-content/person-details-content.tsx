'use client';

import type { JSX } from 'react';

import { useTranslations } from 'next-intl';

import type { PersonDetailsContentProps } from '@widgets/person-details/model/types/person-details-content-props.type.ts';

import { PersonDetailsItem } from '../person-details-item/person-details-item';

import './person-details-content.scss';

export function PersonDetailsContent({
  person,
}: PersonDetailsContentProps): JSX.Element {
  const translation = useTranslations('results');

  return (
    <div className="person-details-content">
      <h2 className="person-details-content__name">{person.name}</h2>
      <ul className="person-details-content__list">
        <PersonDetailsItem
          label={translation('height')}
          value={`${person.height} cm`}
        />
        <PersonDetailsItem
          label={translation('mass')}
          value={`${person.mass} kg`}
        />
        <PersonDetailsItem
          label={translation('birthYear')}
          value={person.birth_year}
        />
        <PersonDetailsItem
          label={translation('gender')}
          value={person.gender}
        />
        <PersonDetailsItem
          label={translation('hair')}
          value={person.hair_color}
        />
        <PersonDetailsItem
          label={translation('eyes')}
          value={person.eye_color}
        />
        <PersonDetailsItem
          label={translation('skin')}
          value={person.skin_color}
        />
      </ul>
    </div>
  );
}
