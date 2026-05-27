import type { Person } from '@entities/person/model/types/person.type.ts';

export type ResultsTableProps = Readonly<{
  readonly results: Person[];
  readonly onSelect: (person: Person) => void;
  readonly onCheckboxToggle: (person: Person) => void;
  readonly isChecked: (url: string) => boolean;
  readonly selectedId?: string;
}>;
