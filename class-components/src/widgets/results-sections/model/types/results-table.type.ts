import type { Person } from '@entities/person/model/types/person.type.ts';

export type ResultsTableProps = Readonly<{
  results: Person[];
  onSelect: (person: Person) => void;
  onCheckboxToggle: (person: Person) => void;
  isChecked: (url: string) => boolean;
  selectedId: string | null;
}>;
