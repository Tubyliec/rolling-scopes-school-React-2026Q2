import { ERROR_MESSAGES } from '@shared/constants/error-messages';

import type { SearchError } from './model/types/search-error.type';

export async function fetchJson<T>(url: string): Promise<T | SearchError> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { message: ERROR_MESSAGES.SERVER_ERROR(response.status) };
    }

    return (await response.json()) as T;
  } catch (err) {
    let message: string;

    if (err instanceof Error) {
      if (err.message.toLowerCase().includes('fetch')) {
        message = ERROR_MESSAGES.NETWORK_ERROR;
      } else {
        message = err.message;
      }
    } else {
      message = ERROR_MESSAGES.UNKNOWN_ERROR;
    }

    return { message };
  }
}
