import type { ReactNode } from 'react';
import { Suspense } from 'react';

import Flyout from '@widgets/flyout/flyout';
import Header from '@widgets/header/header';
import { Layout } from '@widgets/layout/layout';
import PersonDetails from '@widgets/person-details/person-details.tsx';
import { ResultsContent } from '@widgets/results-section/results-content';
import SearchSection from '@widgets/search-section/search-section';

import { LAYOUT_CLASSES } from '@shared/constants/layout-classes';
import { ErrorButton } from '@shared/ui/buttons/error-button/error-button';
import { LoadingSpinner } from '@shared/ui/loading-spinner/loading-spinner';
import { getFirstString } from '@shared/utilities/get-first-string';

import type { MainPageProps } from '../model/types/main-page-props.type.ts';

export default async function MainPage({
  params,
  searchParams,
}: MainPageProps): Promise<ReactNode> {
  await params;
  const { page = '1', q = '', id } = await searchParams;

  const currentPage = getFirstString(page) || '1';
  const searchQuery = getFirstString(q);
  const detailsId = getFirstString(id) || undefined;

  const bodyClassName = `${LAYOUT_CLASSES.BODY}${detailsId ? ` ${LAYOUT_CLASSES.BODY_SPLIT}` : ''}`;

  return (
    <Layout data-theme="">
      <ErrorButton />
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
            <PersonDetails personId={detailsId} />
          </Suspense>
        )}
      </div>
      <Flyout />
    </Layout>
  );
}
