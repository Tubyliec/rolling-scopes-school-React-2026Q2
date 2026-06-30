import type { Person } from '@entities/person/model/types/person.type.ts';

export type ResultsTableRowProps = Readonly<{
  person: Person;
  selectedId: string | null;
}>;
