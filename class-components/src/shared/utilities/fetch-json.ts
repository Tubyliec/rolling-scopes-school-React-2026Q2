import type { SearchError } from '@/core/swapi/model/interfaces/search-error.interface.ts';

export async function fetchJson<T>(url: string): Promise<T | SearchError> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { message: `Server error ${response.status}...` };
    }

    return (await response.json()) as T;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message.toLowerCase().includes('fetch')
          ? 'Network error: Unable to connect to SWAPI server.'
          : error.message
        : 'Unknown error occurred';

    return { message };
  }
}
