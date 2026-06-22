import type { ReactNode } from 'react';

import Pagination from '@features/pagination/pagination';

import ResultsTable from '@widgets/results-sections/components/results-table/results-table';

import { ErrorDisplay } from '@shared/ui/errors/error-display/error-display';
import { ResultsEmpty } from '@shared/ui/errors/results-empty/results-empty';

import { searchPeopleAction } from '@/app/actions/search-people';

interface ResultsContentProps {
  readonly searchQuery: string;
  readonly currentPage: string;
  readonly selectedId: string | null;
}

export async function ResultsContent({
  searchQuery,
  currentPage,
  selectedId,
}: ResultsContentProps): Promise<ReactNode> {
  const pageNum = parseInt(currentPage, 10) || 1;

  if (!searchQuery.trim()) {
    return <ResultsEmpty />;
  }

  const result = await searchPeopleAction(searchQuery.trim(), pageNum);

  if ('error' in result) {
    return <ErrorDisplay message={result.error} />;
  }

  const { results, totalPages, totalCount, hasNextPage, hasPreviousPage } =
    result;

  return (
    <>
      {results.length > 0 ? (
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
