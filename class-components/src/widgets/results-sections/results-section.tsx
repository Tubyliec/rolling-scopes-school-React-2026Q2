import { useNavigate, useParams } from 'react-router-dom';

import type { JSX } from 'react';

import { useResultsSection } from '@widgets/results-sections/hooks/use-results-section.ts';

import type { Person } from '@entities/person/model/types/person.type.ts';

import './results-section.scss';

import { useSelectionStore } from '@/core/store/selection-store.ts';
import Pagination from '@/shared/ui/pagination/pagination.tsx';
import ResultsTable from '@/shared/ui/results-table/results-table.tsx';
import Spinner from '@/shared/ui/spinner/spinner.tsx';
import { extractPersonId } from '@/shared/utilities/extract-person-id.ts';
import { stopPropagation } from '@/shared/utilities/stop-propagation.ts';

function ResultsSection(): JSX.Element {
  const { detailsId } = useParams();
  const navigate = useNavigate();

  const {
    results,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    hasNextPage,
    hasPreviousPage,
    refetch,
  } = useResultsSection();

  const { toggleItem, isSelected } = useSelectionStore();

  const handleSelect = (person: Person): void => {
    const id = extractPersonId(person.url);
    navigate(`/main/${currentPage}/${id}`);
  };

  const handlePageChange = (newPage: number): void => {
    navigate(`/main/${newPage}${detailsId ? `/${detailsId}` : ''}`);
  };

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
        onSelect={handleSelect}
        onCheckboxToggle={toggleItem}
        isChecked={isSelected}
        selectedId={detailsId}
      />
    );
  };

  return (
    <section className="results-section">
      <div className="results__wrapper wrapper" onClick={stopPropagation}>
        {renderContent()}
        {totalCount > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNext={hasNextPage}
            hasPrevious={hasPreviousPage}
            onPageChange={handlePageChange}
            count={totalCount}
          />
        )}
        <div className="results-section__toolbar">
          <button
            className="results-section__refresh"
            onClick={() => refetch()}
            type="button"
          >
            ↻ Refresh
          </button>
        </div>
      </div>
    </section>
  );
}

export default ResultsSection;
