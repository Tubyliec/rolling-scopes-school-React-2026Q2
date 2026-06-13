import type { JSX } from 'react';

import { generatePageNumbers } from '@features/pagination/generate-page-numbers.tsx';

import { PaginationButton } from '@shared/ui/buttons/pagination-button/pagination-button.tsx';

import type { PaginationProps } from '@features/pagination/model/types/pagination.type.ts';

import './pagination.scss';

function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
  count,
}: PaginationProps): JSX.Element {
  const handlePrevious = (): void => onPageChange(currentPage - 1);

  const handleNext = (): void => onPageChange(currentPage + 1);

  const handlePageClick = (page: number): void => {
    if (page !== currentPage) onPageChange(page);
  };

  const pageNumbers = generatePageNumbers(
    currentPage,
    totalPages,
    handlePageClick
  );

  return (
    <div className="pagination">
      <div className="pagination__info">
        <span className="pagination__count">{count} total records</span>
        <span className="pagination__divider">|</span>
        <span className="pagination__pages">
          Page {currentPage} of {totalPages}
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
