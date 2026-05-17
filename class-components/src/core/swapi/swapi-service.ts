import { buildSearchUrl } from '../../shared/utilities/build-search-url';
import type { PersonResponse } from '../../entities/person/model/interfaces/person-response.interface';
import type { Person } from '../../entities/person/model/interfaces/person.interface';
import { RESULTS_PER_PAGE } from '../../shared/constants/page-constants';
import { API_BASE_URL } from '../../shared/constants/api-constants';
import type { SearchParams } from './model/interfaces/search-params.interface';
import type { SearchResponse } from './model/interfaces/search-response.interface';
import type { SearchError } from './model/interfaces/search-error.interface';

export type { SearchResponse } from './model/interfaces/search-response.interface';

export async function searchPeople(
  params: SearchParams
): Promise<SearchResponse> {
  const { term, page } = params;
  const url = buildSearchUrl(term, page);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        message: `Server error ${response.status}...`,
      };
    }

    const data: PersonResponse = await response.json();

    const totalPages = Math.ceil((data.count ?? 0) / RESULTS_PER_PAGE);

    return {
      results: data.results ?? [],
      totalCount: data.count ?? 0,
      currentPage: page,
      totalPages,
      hasNextPage: data.next !== null,
      hasPreviousPage: data.previous !== null,
    };
  } catch (err) {
    let message = 'Unknown error occurred';
    if (err instanceof Error) {
      const errorMessage = err.message;
      if (
        errorMessage.indexOf('fetch') !== -1 ||
        errorMessage.indexOf('Failed to fetch') !== -1
      ) {
        message =
          'Network error: Unable to connect to SWAPI server.';
      } else {
        message = errorMessage;
      }
    }
    return { message };
  }
}

export async function getPerson(id: string): Promise<Person | SearchError> {
  const url = `${API_BASE_URL}${id}/`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { message: `Server error ${response.status}...` };
    }
    return (await response.json()) as Person;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unknown error occurred';
    return { message };
  }
}