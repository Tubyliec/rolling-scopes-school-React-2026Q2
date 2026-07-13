'use client';

import type { JSX } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useLocale } from 'next-intl';

import { usePersonQuery } from '@features/swapi/hooks/use-person-query';

import { BaseButton } from '@shared/ui/buttons/base-button/base-button.tsx';
import { CloseButton } from '@shared/ui/buttons/close-button/close-button.tsx';
import { EmptyState } from '@shared/ui/empty-state/empty-state';
import { ErrorDisplay } from '@shared/ui/errors/error-display/error-display.tsx';

import Spinner from '@/shared/ui/spinner/spinner.tsx';

import type { PersonDetailsProps } from './model/types/person-details-props.type.ts';

import { PersonDetailsContent } from './person-details-content/person-details-content';

import './person-details.scss';

function PersonDetails({ personId }: PersonDetailsProps): JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();

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
      {person && <PersonDetailsContent person={person} />}
    </aside>
  );
}

export default PersonDetails;
