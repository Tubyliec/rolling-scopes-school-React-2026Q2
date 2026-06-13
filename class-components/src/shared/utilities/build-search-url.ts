import { API_BASE_URL } from '@/shared/constants/api-constants.ts';

export function buildSearchUrl(term: string, page: number = 1): string {
  const params = new URLSearchParams();

  if (term) {
    params.set('search', term);
  }

  if (page > 1) {
    params.set('page', page.toString());
  }

  const queryString = params.toString();
  return queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;
}
