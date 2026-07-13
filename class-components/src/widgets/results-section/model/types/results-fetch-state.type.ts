import type { Person } from '@features/swapi/model/types/person.type.ts';

export type ResultsFetchState = Readonly<{
  results: Person[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  refetch: () => void;
}>;
