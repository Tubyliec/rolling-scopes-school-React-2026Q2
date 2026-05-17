import { Component, type JSX } from 'react';
import './pagination.scss';
import type { PaginationProps } from './model/interfaces/pagination.interface.ts';

class Pagination extends Component<PaginationProps> {
  private handlePrevious = (): void => {
    if (this.props.hasPrevious && this.props.currentPage > 1) {
      this.props.onPageChange(this.props.currentPage - 1);
    }
  };

  private handleNext = (): void => {
    if (this.props.hasNext && this.props.currentPage < this.props.totalPages) {
      this.props.onPageChange(this.props.currentPage + 1);
    }
  };

  private handlePageClick = (page: number): void => {
    if (page !== this.props.currentPage) {
      this.props.onPageChange(page);
    }
  };

  private renderPageNumbers(): JSX.Element[] {
    const { currentPage, totalPages } = this.props;
    const pages: JSX.Element[] = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination__page ${i === currentPage ? 'pagination__page--active' : ''}`}
          onClick={() => this.handlePageClick(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    return pages;
  }

  public render(): JSX.Element {
    const { currentPage, totalPages, hasNext, hasPrevious, count } = this.props;

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
            onClick={this.handlePrevious}
            disabled={!hasPrevious}
          >
            ← Previous
          </button>

          <div className="pagination__numbers">{this.renderPageNumbers()}</div>

          <button
            className="pagination__btn pagination__btn--next"
            onClick={this.handleNext}
            disabled={!hasNext}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }
}

export default Pagination;
