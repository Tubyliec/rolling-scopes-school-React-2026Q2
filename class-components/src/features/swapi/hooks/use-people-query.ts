'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@features/query/query-keys';

import type { SearchResult } from '../model/types/search-result.type';

import { getPeople } from '../swapi-service';

async function fetchPeople(term: string, page: number): Promise<SearchResult> {
  const result = await getPeople({ term, page });

  if ('message' in result) {
    throw new Error(result.message);
  }

  return result;
}

export function usePeopleQuery(term: string, page: number) {
  return useQuery({
    queryKey: queryKeys.people(term, page),
    queryFn: () => fetchPeople(term, page),
  });
}
