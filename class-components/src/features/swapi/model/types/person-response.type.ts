import type { Person } from './person.type.ts';

export type PersonResponse = Readonly<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}>;
