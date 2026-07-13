'use server';

import type { SearchResult } from '../model/types/search-result.type';

import { getPeople } from '../swapi-service';

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
