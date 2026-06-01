import type { JSX } from 'react';

import type { PaginationProps } from './model/interfaces/pagination.interface.ts';

import './pagination.scss';

function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
  count,
}: PaginationProps): JSX.Element {
  const handlePrevious = (): void => {
    if (hasPrevious && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (hasNext && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

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
        <button
          className="pagination__btn pagination__btn--prev"
          onClick={handlePrevious}
          disabled={!hasPrevious}
        >
          ← Previous
        </button>

        <div className="pagination__numbers">{renderPageNumbers()}</div>

        <button
          className="pagination__btn pagination__btn--next"
          onClick={handleNext}
          disabled={!hasNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Pagination;