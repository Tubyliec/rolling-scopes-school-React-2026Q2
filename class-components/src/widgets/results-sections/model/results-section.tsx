import { Component, type JSX } from 'react';
import type { ResultsSectionProps } from './interfaces/results-section.interface.ts';
import Spinner from '../../../shared/ui/spinner/spinner.tsx';
import Pagination from '../../../shared/ui/pagination/pagination.tsx';
import ResultsTable from '../../../shared/ui/results-table/results-table.tsx';
import './results-section.scss';

class ResultsSection extends Component<ResultsSectionProps> {
  private renderContent(): JSX.Element {
    const { isLoading, error, results } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    if (error !== null) {
      return (
        <div className="results-section__error">
          <span className="results-section__error-icon">✖</span>
          <div>
            <div className="results-section__error-title">REQUEST FAILED</div>
            <div className="results-section__error-msg">{error}</div>
          </div>
        </div>
      );
    }

    return <ResultsTable results={results} />;
  }

  private renderPagination(): JSX.Element | null {
    const {
      totalCount,
      currentPage,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      onPageChange,
    } = this.props;

    if (totalCount === 0) {
      return null;
    }

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNext={hasNextPage}
        hasPrevious={hasPreviousPage}
        onPageChange={onPageChange}
        count={totalCount}
      />
    );
  }

  public render(): JSX.Element {
    return (
      <section className="results-section">
        <div className="results__wrapper wrapper">
          {this.renderContent()}
          {this.renderPagination()}
        </div>
      </section>
    );
  }
}

export default ResultsSection;
