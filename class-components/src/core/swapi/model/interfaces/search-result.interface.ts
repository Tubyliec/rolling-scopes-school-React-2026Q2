import type { Person } from '@entities/person/model/types/person.type.ts';

export interface SearchResult {
  results: Person[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
