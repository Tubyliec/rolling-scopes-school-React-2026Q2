'use client';

import type { JSX } from 'react';

import { useTranslations } from 'next-intl';

import type { PaginationInfoProps } from '@features/pagination/model/types/pagination-info-props.type.ts';

import './pagination-info.scss';

export function PaginationInfo({
  count,
  currentPage,
  totalPages,
}: PaginationInfoProps): JSX.Element {
  const t = useTranslations('results');

  return (
    <div className="pagination__info">
      <span className="pagination__count">
        {count} {t('total')}
      </span>
      <span className="pagination__divider">|</span>
      <span className="pagination__pages">
        {t('page')} {currentPage} {t('of')} {totalPages}
      </span>
    </div>
  );
}
