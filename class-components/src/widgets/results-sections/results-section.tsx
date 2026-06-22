'use client';

import type { JSX } from 'react';
import { Suspense } from 'react';

import Pagination from '@features/pagination/pagination.tsx';

import ResultsTable from '@widgets/results-sections/components/results-table/results-table.tsx';

import { RefreshButton } from '@shared/ui/buttons/refresh-button/refresh-button.tsx';
import { ErrorDisplay } from '@shared/ui/errors/error-display/error-display.tsx';

import Spinner from '@/shared/ui/spinner/spinner.tsx';

import './results-section.scss';

interface ResultsSectionProps {
  readonly currentPage: string;
  readonly detailsId?: string;
}

async function ResultsContent({
  currentPage,
  detailsId,
}: ResultsSectionProps): Promise<JSX.Element> {
  const pageNum = parseInt(currentPage, 10) || 1;

  const results = [];
  const isLoading = false;
  const error = null;
  const totalPages = 1;
  const totalCount = 0;
  const hasNextPage = false;
  const hasPreviousPage = false;

  return (
    <section className="results-section">
      <div className="results__wrapper wrapper">
        {isLoading && <Spinner />}
        {error && <ErrorDisplay message={error} />}
        <ResultsTable results={results} selectedId={detailsId ?? null} />
        {totalCount > 0 && (
          <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            hasNext={hasNextPage}
            hasPrevious={hasPreviousPage}
            count={totalCount}
          />
        )}
        <div className="results-section__toolbar">
          <RefreshButton onClick={() => {}} />
        </div>
      </div>
    </section>
  );
}

function ResultsSectionLoading(): JSX.Element {
  return (
    <section className="results-section">
      <div className="results__wrapper wrapper">
        <Spinner />
      </div>
    </section>
  );
}

export function ResultsSection({
  currentPage,
  detailsId,
}: ResultsSectionProps): JSX.Element {
  return (
    <Suspense fallback={<ResultsSectionLoading />}>
      <ResultsContent currentPage={currentPage} detailsId={detailsId} />
    </Suspense>
  );
}

export default ResultsSection;
