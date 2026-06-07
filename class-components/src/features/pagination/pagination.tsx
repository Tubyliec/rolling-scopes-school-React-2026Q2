import type { JSX } from 'react';

import { PaginationButton } from '@shared/ui/buttons/pagination-button/pagination-button.tsx';

import type { PaginationProps } from '@/features/pagination/model/types/pagination.type.ts';

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

  const renderPageNumbers = (): JSX.Element[] => {
    const pages: JSX.Element[] = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      const isPageActive = i === currentPage;
      pages.push(
        <button
          key={i}
          className={`pagination__page ${isPageActive ? 'pagination__page--active' : ''}`}
          onClick={() => {
            if (i !== currentPage) onPageChange(i);
          }}
          disabled={isPageActive}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

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

        <div className="pagination__numbers">{renderPageNumbers()}</div>

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
