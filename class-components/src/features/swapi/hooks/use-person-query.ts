'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@features/query/query-keys';

import type { Person } from '../model/types/person.type.ts';

import { getPerson } from '../swapi-service';

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
    enabled: Boolean(id),
  });
}
