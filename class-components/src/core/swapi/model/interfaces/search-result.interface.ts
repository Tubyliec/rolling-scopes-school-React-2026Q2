import type { Person } from '@/entities/person/model/interfaces/person.interface';

export interface SearchResult {
  results: Person[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
