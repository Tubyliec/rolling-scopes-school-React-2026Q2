import type { ReactNode } from 'react';

import { searchPeopleAction } from '@core/swapi/actions/search-people';

import Pagination from '@features/pagination/pagination';

import ResultsTable from '@widgets/results-section/components/results-table/results-table';

import { ErrorDisplay } from '@shared/ui/errors/error-display/error-display';
import { ResultsEmpty } from '@shared/ui/errors/results-empty/results-empty';

import type { ResultsContentProps } from './model/types/results-content-props.type.ts';

export async function ResultsContent({
  searchQuery,
  currentPage,
  selectedId,
}: ResultsContentProps): Promise<ReactNode> {
  const pageNum = parseInt(currentPage, 10) || 1;

  const result = await searchPeopleAction(searchQuery.trim(), pageNum);

  if ('error' in result) {
    return <ErrorDisplay message={result.error} />;
  }

  const { results, totalPages, totalCount, hasNextPage, hasPreviousPage } =
    result;

  const hasResults = results.length > 0;

  return (
    <>
      {hasResults ? (
        <>
          <ResultsTable results={results} selectedId={selectedId} />
          <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            hasNext={hasNextPage}
            hasPrevious={hasPreviousPage}
            count={totalCount}
          />
        </>
      ) : (
        <ResultsEmpty />
      )}
    </>
  );
}
