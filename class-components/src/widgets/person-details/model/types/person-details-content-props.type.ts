import type { Person } from '@features/swapi/model/types/person.type.ts';

export type PersonDetailsContentProps = Readonly<{
  person: Person;
}>;
