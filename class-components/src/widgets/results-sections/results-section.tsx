import type { JSX } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Spinner from '@/shared/ui/spinner/spinner.tsx';
import Pagination from '@/shared/ui/pagination/pagination.tsx';
import ResultsTable from '@/shared/ui/results-table/results-table.tsx';

import { extractPersonId } from '@/shared/utilities/extract-person-id.ts';
import { stopPropagation } from '@/shared/utilities/stop-propagation.ts';
import { useResultsSection } from '@widgets/results-sections/hooks/use-results-section.ts';
import { RequestError } from '@shared/ui/errors/request-error/request-error.tsx';

import { useSelectionStore } from '@/core/store/selection-store.ts';

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

  return (
    <section className="results-section">
      <div className="results__wrapper wrapper" onClick={stopPropagation}>
        {isLoading && <Spinner />}
        {error && <RequestError error={error} />}

        <ResultsTable
          results={results}
          onSelect={handleSelect}
          onCheckboxToggle={toggleItem}
          isChecked={isSelected}
          selectedId={detailsId}
        />

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
