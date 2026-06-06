import { API_BASE_URL } from '@/shared/constants/api-constants';
import { RESULTS_PER_PAGE } from '@/shared/constants/page-constants';
import { buildSearchUrl } from '@/shared/utilities/build-search-url';
import { fetchJson } from '@/shared/utilities/fetch-json';

import type { SearchError } from './model/interfaces/search-error.interface';
import type { SearchParams } from './model/interfaces/search-params.interface';
import type { SearchResponse } from './model/interfaces/search-response.interface';
import type { Person } from '@entities/person/model/types/person.type.ts';
import type { PersonResponse } from '@entities/person/model/types/person-response.type.ts';

export async function searchPeople(
  params: SearchParams
): Promise<SearchResponse> {
  const { term, page } = params;
  const data = await fetchJson<PersonResponse>(buildSearchUrl(term, page));

  if ('message' in data) return data;

  const totalPages = Math.ceil((data.count ?? 0) / RESULTS_PER_PAGE);

  return {
    results: data.results ?? [],
    totalCount: data.count ?? 0,
    currentPage: page,
    totalPages,
    hasNextPage: data.next !== null,
    hasPreviousPage: data.previous !== null,
  };
}

export async function getPerson(id: string): Promise<Person | SearchError> {
  return fetchJson<Person>(`${API_BASE_URL}${id}/`);
}
