import type { Person } from '../../../../../entities/person/model/interfaces/person.interface.ts';

export interface ResultsTableProps {
  readonly results: Person[];
  readonly onSelect: (person: Person) => void;
  readonly selectedId?: string;
}
