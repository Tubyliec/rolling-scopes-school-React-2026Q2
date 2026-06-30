'use client';

import type { JSX } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useLocale, useTranslations } from 'next-intl';

import { usePersonQuery } from '@/core/swapi/hooks/use-person-query.ts';

import { CloseButton } from '@shared/ui/buttons/close-button/close-button.tsx';
import { RefreshButton } from '@shared/ui/buttons/refresh-button/refresh-button.tsx';
import { ErrorDisplay } from '@shared/ui/errors/error-display/error-display.tsx';

import Spinner from '@/shared/ui/spinner/spinner.tsx';

import type { PersonDetailsProps } from './model/types/person-details-props.type.ts';

import './person-details.scss';

function PersonDetail({ personId }: PersonDetailsProps): JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const t = useTranslations('results');

  const { data: person, isLoading, error, refetch } = usePersonQuery(personId);

  const handleClose = (): void => {
    const params = new URLSearchParams(searchParams);
    params.delete('id');
    router.push(`/${locale}?${params.toString()}`);
  };

  return (
    <aside className="person-details">
      <div className="person-details__actions">
        <RefreshButton onClick={refetch} />
        <CloseButton className="person-details__close" onClick={handleClose} />
      </div>
      {isLoading && <Spinner />}
      {error && <ErrorDisplay message={error.message} title="" />}
      {!isLoading && !error && !person && <div>No data available.</div>}
      {person && (
        <div className="person-details__content">
          <h2 className="person-details__name">{person.name}</h2>
          <ul className="person-details__list">
            <li className="person-details__item">
              <span className="person-details__label">{t('height')}</span>
              <span className="person-details__value">{person.height} cm</span>
            </li>
            <li className="person-details__item">
              <span className="person-details__label">{t('mass')}</span>
              <span className="person-details__value">{person.mass} kg</span>
            </li>
            <li className="person-details__item">
              <span className="person-details__label">{t('birthYear')}</span>
              <span className="person-details__value">{person.birth_year}</span>
            </li>
            <li className="person-details__item">
              <span className="person-details__label">{t('gender')}</span>
              <span className="person-details__value">{person.gender}</span>
            </li>
            <li className="person-details__item">
              <span className="person-details__label">{t('hair')}</span>
              <span className="person-details__value">{person.hair_color}</span>
            </li>
            <li className="person-details__item">
              <span className="person-details__label">{t('eyes')}</span>
              <span className="person-details__value">{person.eye_color}</span>
            </li>
            <li className="person-details__item">
              <span className="person-details__label">{t('skin')}</span>
              <span className="person-details__value">{person.skin_color}</span>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
}

export default PersonDetail;
