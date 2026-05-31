import { useQuery } from '@tanstack/react-query';

import type { Person } from '@entities/person/model/types/person.type.ts';

import { queryKeys } from '@/core/query/query-keys.ts';
import { getPerson } from '@/core/swapi/swapi-service.ts';

async function fetchPerson(id: string): Promise<Person> {
  const result = await getPerson(id);

  if ('message' in result) {
    throw new Error(result.message);
  }

  return result;
}

export function usePersonQuery(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.person(id ?? ''),
    queryFn: () => fetchPerson(id!),
    enabled: !!id,
  });
}
