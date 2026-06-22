import { fetchJson } from '@core/swapi/fetch-json.ts';

import { API_BASE_URL } from '@/shared/constants/api-constants';
import { RESULTS_PER_PAGE } from '@/shared/constants/page-constants';
import { buildSearchUrl } from '@/shared/utilities/build-search-url';

import type { SearchError } from './model/interfaces/search-error.interface';
import type { SearchParams } from './model/interfaces/search-params.interface';
import type { SearchResponse } from './model/interfaces/search-response.interface';
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
  const totalPages = Math.ceil(count / RESULTS_PER_PAGE);

  return {
    results,
    totalCount: count,
    currentPage: page,
    totalPages,
    hasNextPage: false,
    hasPreviousPage: false,
  };
}

export async function getPerson(id: string): Promise<Person | SearchError> {
  return fetchJson<Person>(`${API_BASE_URL}${id}/`);
}
