import type { Person } from '../../../../entities/person/model/interfaces/person.interface.ts';

export interface CardListProps {
  readonly results: Person[];
}
