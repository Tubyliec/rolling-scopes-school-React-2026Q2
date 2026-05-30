import type { Person } from '@entities/person/model/types/person.type.ts';
import type { ResultsFetchState } from '@widgets/results-sections/model/types/results-fetch-state.type.ts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSearchStore } from '@/core/store/search-store.ts';
import { searchPeople } from '@/core/swapi/swapi-service.ts';

export function useResultsSection(): ResultsFetchState {
  const { page } = useParams();
  const currentPage = parseInt(page ?? '1', 10);

  const { term, setIsLoading } = useSearchStore();

  const [results, setResults] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const doSearch = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      const response = await searchPeople({ term, page: currentPage });

      if (cancelled) return;

      if ('message' in response) {
        setError(response.message);
        setResults([]);
        setTotalCount(0);
      } else {
        setResults(response.results);
        setTotalCount(response.totalCount);
        setTotalPages(response.totalPages);
        setHasNextPage(response.hasNextPage);
        setHasPreviousPage(response.hasPreviousPage);
      }

      setIsLoading(false);
    };

    void doSearch();

    return (): void => {
      cancelled = true;
    };
  }, [currentPage, term, setIsLoading]);

  const { isLoading } = useSearchStore();

  return {
    results,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    hasNextPage,
    hasPreviousPage,
  };
}
