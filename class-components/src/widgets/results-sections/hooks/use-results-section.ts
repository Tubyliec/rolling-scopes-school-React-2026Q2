import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { searchPeople } from '@/core/swapi/swapi-service.ts';

import { useSearchStore } from '@/core/store/search-store.ts';

import type { ResultsFetchState } from '@widgets/results-sections/model/types/results-fetch-state.type.ts';
import type { Person } from '@entities/person/model/types/person.type.ts';

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

    const handleSearch = async (): Promise<void> => {
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

    void handleSearch();

    return (): void => {
      cancelled = true;
    };
  }, [currentPage, term]);

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