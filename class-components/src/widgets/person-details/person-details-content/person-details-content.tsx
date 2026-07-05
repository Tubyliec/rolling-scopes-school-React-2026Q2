'use client';

import type { JSX } from 'react';

import { useTranslations } from 'next-intl';

import type { Person } from '@features/swapi/model/types/person.type.ts';

import { PersonDetailsItem } from '../person-details-item/person-details-item';

import './person-details-content.scss';

type PersonDetailsContentProps = Readonly<{
  person: Person;
}>;

export function PersonDetailsContent({
  person,
}: PersonDetailsContentProps): JSX.Element {
  const t = useTranslations('results');

  return (
    <div className="person-details-content">
      <h2 className="person-details-content__name">{person.name}</h2>
      <ul className="person-details-content__list">
        <PersonDetailsItem label={t('height')} value={`${person.height} cm`} />
        <PersonDetailsItem label={t('mass')} value={`${person.mass} kg`} />
        <PersonDetailsItem label={t('birthYear')} value={person.birth_year} />
        <PersonDetailsItem label={t('gender')} value={person.gender} />
        <PersonDetailsItem label={t('hair')} value={person.hair_color} />
        <PersonDetailsItem label={t('eyes')} value={person.eye_color} />
        <PersonDetailsItem label={t('skin')} value={person.skin_color} />
      </ul>
    </div>
  );
}
