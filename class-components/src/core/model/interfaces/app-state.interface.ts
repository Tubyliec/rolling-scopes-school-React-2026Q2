import type { Person } from '@entities/person/model/types/person.type.ts';

export interface AppState {
  results: Person[];
  isLoading: boolean;
  error: string | null;
  lastSearchTerm: string | null;
  shouldThrowError: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
