import type { ReactNode } from 'react';
import { Suspense } from 'react';

import PersonDetail from '@entities/person/components/details/person-details';

import Flyout from '@widgets/flyout/flyout';
import Header from '@widgets/header/header';
import { Layout } from '@widgets/layout/layout';
import { ResultsContent } from '@widgets/results-sections/results-content';
import SearchSection from '@widgets/search-section/search-section';

import Spinner from '@shared/ui/spinner/spinner';

interface MainPageProps {
  readonly params: Promise<{ locale: string }>;
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function LoadingSpinner(): ReactNode {
  return (
    <div className="results-loading">
      <Spinner />
    </div>
  );
}

export async function MainPage({
  params,
  searchParams,
}: MainPageProps): Promise<ReactNode> {
  await params;
  const { page = '1', q = '', id } = await searchParams;

  const currentPage = typeof page === 'string' ? page : page[0];
  const searchQuery = typeof q === 'string' ? q : (q?.[0] ?? '');
  const detailsId = typeof id === 'string' ? id : id?.[0];

  const bodyClassName = `main-layout__body${detailsId ? ' main-layout__body--split' : ''}`;

  return (
    <Layout data-theme="">
      <Header />
      <SearchSection />
      <div className={bodyClassName}>
        <div className="main-layout__results">
          <Suspense fallback={<LoadingSpinner />}>
            <ResultsContent
              searchQuery={searchQuery}
              currentPage={currentPage}
              selectedId={detailsId ?? null}
            />
          </Suspense>
        </div>
        {detailsId && (
          <Suspense fallback={<LoadingSpinner />}>
            <PersonDetail personId={detailsId} />
          </Suspense>
        )}
      </div>
      <Flyout />
    </Layout>
  );
}

export default MainPage;
