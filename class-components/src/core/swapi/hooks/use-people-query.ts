import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/core/query/query-keys.ts';
import type { SearchResult } from '@/core/swapi/model/interfaces/search-result.interface.ts';
import { searchPeople } from '@/core/swapi/swapi-service.ts';

async function fetchPeople(term: string, page: number): Promise<SearchResult> {
  const result = await searchPeople({ term, page });

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
