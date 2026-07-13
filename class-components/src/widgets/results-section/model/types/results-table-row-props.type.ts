import type { Person } from '@features/swapi/model/types/person.type.ts';

export type ResultsTableRowProps = Readonly<{
  person: Person;
  selectedId: string | null;
}>;
