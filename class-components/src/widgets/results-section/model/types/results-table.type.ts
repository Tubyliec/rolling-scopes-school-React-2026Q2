import type { Person } from '@entities/person/model/types/person.type.ts';

export type ResultsTableProps = Readonly<{
  results: readonly Person[];
  selectedId: string | null;
}>;
