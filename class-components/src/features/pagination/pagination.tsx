'use client';

import type { JSX } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useLocale, useTranslations } from 'next-intl';

import { generatePageNumbers } from '@features/pagination/generate-page-numbers.tsx';

import { PaginationButton } from '@shared/ui/buttons/pagination-button/pagination-button.tsx';

import type { PaginationProps } from '@features/pagination/model/types/pagination.type.ts';

import './pagination.scss';

function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  count,
}: PaginationProps): JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const t = useTranslations('results');

  const handlePrevious = (): void => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(currentPage - 1));
    router.push(`/${locale}?${params.toString()}`);
  };

  const handleNext = (): void => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(currentPage + 1));
    router.push(`/${locale}?${params.toString()}`);
  };

  const handlePageClick = (page: number): void => {
    const isSamePage = page === currentPage;
    if (!isSamePage) {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(page));
      router.push(`/${locale}?${params.toString()}`);
    }
  };

  const pageNumbers = generatePageNumbers(
    currentPage,
    totalPages,
    handlePageClick
  );

  return (
    <div className="pagination">
      <div className="pagination__info">
        <span className="pagination__count">
          {count} {t('total')}
        </span>
        <span className="pagination__divider">|</span>
        <span className="pagination__pages">
          {t('page')} {currentPage} {t('of')} {totalPages}
        </span>
      </div>

      <div className="pagination__controls">
        <PaginationButton
          direction="prev"
          onClick={handlePrevious}
          disabled={!hasPrevious}
        >
          ←
        </PaginationButton>

        <div className="pagination__numbers">{pageNumbers}</div>

        <PaginationButton
          direction="next"
          onClick={handleNext}
          disabled={!hasNext}
        >
          →
        </PaginationButton>
      </div>
    </div>
  );
}

export default Pagination;
