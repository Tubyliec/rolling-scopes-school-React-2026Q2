'use client';

import type { JSX } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useLocale, useTranslations } from 'next-intl';

import { usePersonQuery } from '@features/swapi/hooks/use-person-query';

import { BaseButton } from '@shared/ui/buttons/base-button/base-button.tsx';
import { CloseButton } from '@shared/ui/buttons/close-button/close-button.tsx';
import { EmptyState } from '@shared/ui/empty-state/empty-state';
import { ErrorDisplay } from '@shared/ui/errors/error-display/error-display.tsx';

import Spinner from '@/shared/ui/spinner/spinner.tsx';

import type { PersonDetailsProps } from './model/types/person-details-props.type.ts';

import { PersonDetailItem } from './person-detail-item/person-detail-item';

import './person-details.scss';

function PersonDetail({ personId }: PersonDetailsProps): JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const t = useTranslations('results');

  const { data: person, isLoading, error, refetch } = usePersonQuery(personId);

  const shouldShowEmptyState = !isLoading && !error && !person;

  const handleClose = (): void => {
    const params = new URLSearchParams(searchParams);
    params.delete('id');
    router.push(`/${locale}?${params.toString()}`);
  };

  return (
    <aside className="person-details">
      <div className="person-details__actions">
        <BaseButton className="refresh-button" onClick={refetch}>
          ↻ Refresh
        </BaseButton>
        <CloseButton className="person-details__close" onClick={handleClose} />
      </div>
      {isLoading && <Spinner />}
      {error && <ErrorDisplay message={error.message} title="" />}
      {shouldShowEmptyState && <EmptyState />}
      {person && (
        <div className="person-details__content">
          <h2 className="person-details__name">{person.name}</h2>
          <ul className="person-details__list">
            <PersonDetailItem
              label={t('height')}
              value={`${person.height} cm`}
            />
            <PersonDetailItem label={t('mass')} value={`${person.mass} kg`} />
            <PersonDetailItem
              label={t('birthYear')}
              value={person.birth_year}
            />
            <PersonDetailItem label={t('gender')} value={person.gender} />
            <PersonDetailItem label={t('hair')} value={person.hair_color} />
            <PersonDetailItem label={t('eyes')} value={person.eye_color} />
            <PersonDetailItem label={t('skin')} value={person.skin_color} />
          </ul>
        </div>
      )}
    </aside>
  );
}

export default PersonDetail;
