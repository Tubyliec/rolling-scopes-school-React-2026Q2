import type { SearchError } from './search-error.interface';
import type { SearchResult } from './search-result.interface';

export type SearchResponse = SearchResult | SearchError;
