import type { SearchResult } from './search-result.interface';
import type { SearchError } from './search-error.interface';

export type SearchResponse = SearchResult | SearchError;
