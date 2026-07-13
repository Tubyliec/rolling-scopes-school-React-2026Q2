import type { SelectionState } from './model/types/selection-state.type';
import type { Person } from '@features/swapi/model/types/person.type.ts';

import { create } from 'zustand';

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedItems: new Map<string, Person>(),

  toggleItem: (person: Person): void => {
    const { selectedItems } = get();
    const newMap = new Map(selectedItems);

    if (newMap.has(person.url)) {
      newMap.delete(person.url);
    } else {
      newMap.set(person.url, person);
    }

    set({ selectedItems: newMap });
  },

  unselectAll: (): void => {
    set({ selectedItems: new Map() });
  },

  isSelected: (url: string): boolean => {
    return get().selectedItems.has(url);
  },
}));
