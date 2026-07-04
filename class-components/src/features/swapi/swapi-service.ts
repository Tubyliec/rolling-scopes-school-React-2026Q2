import { fetchJson } from '@features/swapi/fetch-json.ts';

import { API_BASE_URL } from '@/shared/constants/api-constants';
import { RESULTS_PER_PAGE } from '@/shared/constants/page-constants';
import { buildSearchUrl } from '@/shared/utilities/build-search-url';

import type { SearchError } from './model/types/search-error.type';
import type { SearchParams } from './model/types/search-params.type';
import type { SearchResponse } from './model/types/search-response.type';
import type { Person } from '@entities/person/model/types/person.type.ts';
import type { PersonResponse } from '@entities/person/model/types/person-response.type.ts';

export async function getPeople(params: SearchParams): Promise<SearchResponse> {
  const { term, page } = params;
  const data = await fetchJson<PersonResponse | Person[]>(
    buildSearchUrl(term, page)
  );

  if ('message' in data) return data;

  const results = Array.isArray(data) ? data : (data.results ?? []);
  const count = Array.isArray(data) ? results.length : (data.count ?? 0);
  const totalPages = Math.max(1, Math.ceil(count / RESULTS_PER_PAGE));

  const hasNextPage = Array.isArray(data)
    ? page < totalPages
    : Boolean(data.next) || page < totalPages;
  const hasPreviousPage = Array.isArray(data)
    ? page > 1
    : Boolean(data.previous) || page > 1;

  return {
    results,
    totalCount: count,
    currentPage: page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
}

export async function getPerson(id: string): Promise<Person | SearchError> {
  return fetchJson<Person>(`${API_BASE_URL}${id}/`);
}
