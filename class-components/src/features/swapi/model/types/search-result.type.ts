import type { Person } from './person.type.ts';

export type SearchResult = Readonly<{
  results: Person[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}>;
