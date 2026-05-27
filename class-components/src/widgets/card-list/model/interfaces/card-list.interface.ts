import type { Person } from '@entities/person/model/types/person.type.ts';

export interface CardListProps {
  readonly results: Person[];
}
