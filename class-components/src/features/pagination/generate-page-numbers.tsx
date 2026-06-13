import type { JSX } from 'react';

import PageButton from '@features/pagination/components/page-button/page-button.tsx';

export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  handlePageClick: (page: number) => void
): JSX.Element[] {
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  const pages: JSX.Element[] = [];

  for (let i = startPage; i <= endPage; i++) {
    const isActive = i === currentPage;
    pages.push(
      <PageButton
        key={i}
        page={i}
        isActive={isActive}
        onClick={handlePageClick}
      />
    );
  }

  return pages;
}
