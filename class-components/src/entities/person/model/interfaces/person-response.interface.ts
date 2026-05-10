import type { Person } from './person.interface.ts';

export interface PersonResponse {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: Person[];
}
