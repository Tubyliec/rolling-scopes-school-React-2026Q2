import type { Person } from '@features/swapi/model/types/person.type.ts';

export type ResultsTableProps = Readonly<{
  results: readonly Person[];
  selectedId: string | null;
}>;
