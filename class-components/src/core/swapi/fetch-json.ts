import type { SearchError } from '@core/swapi/model/interfaces/search-error.interface.ts';

export async function fetchJson<T>(url: string): Promise<T | SearchError> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { message: `Server error ${response.status}...` };
    }

    return (await response.json()) as T;
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message.toLowerCase().includes('fetch')
          ? 'Network error: Unable to connect to SWAPI server.'
          : err.message
        : 'Unknown error occurred';

    return { message };
  }
}
