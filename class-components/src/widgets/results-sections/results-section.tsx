import type { JSX } from 'react';
import type { ResultsSectionProps } from './model/interfaces/results-section.interface.ts';
import Spinner from '../../shared/ui/spinner/spinner.tsx';
import Pagination from '../../shared/ui/pagination/pagination.tsx';
import ResultsTable from '../../shared/ui/results-table/results-table.tsx';
import './results-section.scss';

function ResultsSection({
  isLoading,
  error,
  results,
  currentPage,
  totalPages,
  totalCount,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  onSelect,
  selectedId,
}: ResultsSectionProps): JSX.Element {
  const renderContent = (): JSX.Element => {
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

    return (
      <ResultsTable
        results={results}
        onSelect={onSelect}
        selectedId={selectedId}
      />
    );
  };

  const renderPagination = (): JSX.Element | null => {
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
  };

  return (
    <section className="results-section">
      <div
        className="results__wrapper wrapper"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {renderContent()}
        {renderPagination()}
      </div>
    </section>
  );
}

export default ResultsSection;