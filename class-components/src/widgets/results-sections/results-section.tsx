import type { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelectionStore } from '@/core/store/selection-store.ts';
import Pagination from '@/shared/ui/pagination/pagination.tsx';
import ResultsTable from '@/shared/ui/results-table/results-table.tsx';
import Spinner from '@/shared/ui/spinner/spinner.tsx';
import { extractPersonId } from '@/shared/utilities/extract-person-id.ts';
import { stopPropagation } from '@/shared/utilities/stop-propagation.ts';
import { AppRoute } from '@core/router/model/enums/app-route.enum.ts';
import { RefreshButton } from '@shared/ui/buttons/refresh-button/refresh-button.tsx';
import { ErrorDisplay } from '@shared/ui/errors/error-display/error-display.tsx';
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
    refetch,
  } = useResultsSection();

  const { toggleItem, isSelected } = useSelectionStore();

  const shouldShowPagination = totalCount > 0;

  const handleSelect = (person: Person): void => {
    const id = extractPersonId(person.url);
    navigate(`${AppRoute.Main}/${currentPage}/${id}`);
  };

  const handlePageChange = (newPage: number): void => {
    navigate(`${AppRoute.Main}/${newPage}${detailsId ? `/${detailsId}` : ''}`);
  };

  return (
    <section className="results-section">
      <div className="results__wrapper wrapper" onClick={stopPropagation}>
        {isLoading && <Spinner />}
        {error && <ErrorDisplay message={error} />}
        <ResultsTable
          results={results}
          onSelect={handleSelect}
          onCheckboxToggle={toggleItem}
          isChecked={isSelected}
          selectedId={detailsId}
        />
        {shouldShowPagination && (
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
          <RefreshButton onClick={() => refetch()} />
        </div>
      </div>
    </section>
  );
}

export default ResultsSection;
