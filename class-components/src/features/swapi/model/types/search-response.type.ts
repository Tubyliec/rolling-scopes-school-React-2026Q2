import type { SearchError } from './search-error.type.ts';
import type { SearchResult } from './search-result.type.ts';

export type SearchResponse = SearchResult | SearchError;
