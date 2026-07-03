'use client';

import type { JSX } from 'react';

import { PaginationInfo } from '@features/pagination/components/pagination-info/pagination-info';
import { generatePageNumbers } from '@features/pagination/generate-page-numbers.tsx';
import { usePaginationNavigation } from '@features/pagination/hooks/use-pagination-navigation';

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
  const { handlePrevious, handleNext, handlePageClick } =
    usePaginationNavigation(currentPage);

  const pageNumbers = generatePageNumbers(
    currentPage,
    totalPages,
    handlePageClick
  );

  return (
    <div className="pagination">
      <PaginationInfo
        count={count}
        currentPage={currentPage}
        totalPages={totalPages}
      />

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
