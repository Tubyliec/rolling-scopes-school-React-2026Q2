import type { Person } from '../../../../entities/person/model/interfaces/person.interface.ts';

export interface ResultsSectionProps {
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly results: Person[];
  readonly currentPage: number;
  readonly totalPages: number;
  readonly totalCount: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly onPageChange: (page: number) => void;
  readonly onSelect: (person: Person) => void;
  readonly selectedId?: string;
}
