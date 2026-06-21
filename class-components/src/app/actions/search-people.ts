'use server';

import { getPeople } from '@core/swapi/swapi-service';

import type { SearchResult } from '@core/swapi/model/interfaces/search-result.interface';

export async function searchPeopleAction(
  term: string,
  page: number
): Promise<SearchResult | { error: string }> {
  try {
    const result = await getPeople({ term, page });

    if ('message' in result) {
      return { error: result.message };
    }

    return result;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: message };
  }
}
