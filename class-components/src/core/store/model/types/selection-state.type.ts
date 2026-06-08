import type { Person } from '@entities/person/model/types/person.type.ts';

export type SelectionState = Readonly<{
  selectedItems: Map<string, Person>;
  toggleItem: (person: Person) => void;
  unselectAll: () => void;
  isSelected: (url: string) => boolean;
}>;