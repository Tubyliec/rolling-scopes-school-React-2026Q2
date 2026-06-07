import { queryKeys } from '@/core/query/query-keys.ts';
import { getPeople } from '@/core/swapi/swapi-service.ts';
import { useQuery } from '@tanstack/react-query';

import type { SearchResult } from '@/core/swapi/model/interfaces/search-result.interface.ts';

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