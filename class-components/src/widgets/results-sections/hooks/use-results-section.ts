import type { ResultsFetchState } from '@widgets/results-sections/model/types/results-fetch-state.type.ts';
import { useParams } from 'react-router-dom';

import { useSearchStore } from '@/core/store/search-store.ts';
import { usePeopleQuery } from '@/core/swapi/hooks/use-people-query.ts';

export function useResultsSection(): ResultsFetchState {
  const { page } = useParams();
  const currentPage = parseInt(page ?? '1', 10);

  const { term } = useSearchStore();

  const { data, isLoading, error, refetch } = usePeopleQuery(term, currentPage);

  return {
    results: data?.results ?? [],
    isLoading,
    error: error?.message ?? null,
    currentPage,
    totalPages: data?.totalPages ?? 1,
    totalCount: data?.totalCount ?? 0,
    hasNextPage: data?.hasNextPage ?? false,
    hasPreviousPage: data?.hasPreviousPage ?? false,
    refetch,
  };
}
