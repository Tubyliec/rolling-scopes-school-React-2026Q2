import type { JSX } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Spinner from '@/shared/ui/spinner/spinner.tsx';
import Pagination from '@/shared/ui/pagination/pagination.tsx';
import ResultsTable from '@/shared/ui/results-table/results-table.tsx';

import { useSelectionStore } from '@/core/store/selection-store.ts';
import { extractPersonId } from '@/shared/utilities/extract-person-id.ts';
import { useResultsSection } from '@widgets/results-sections/hooks/use-results-section.ts';

import type { Person } from '@entities/person/model/types/person.type.ts';

import './results-section.scss';

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
      <div
        className="results__wrapper wrapper"
        onClick={(e) => e.stopPropagation()}
      >
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
      </div>
    </section>
  );
}

export default ResultsSection;
