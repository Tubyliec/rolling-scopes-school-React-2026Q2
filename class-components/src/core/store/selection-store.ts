import type { SelectionState } from '@core/store/model/types/selection-state.type.ts';
import type { Person } from '@entities/person/model/types/person.type.ts';

import { create } from 'zustand';

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedItems: [],

  toggleItem: (person: Person): void => {
    const { selectedItems } = get();
    const exists = selectedItems.some((item) => item.url === person.url);

    if (exists) {
      set({
        selectedItems: selectedItems.filter((item) => item.url !== person.url),
      });
    } else {
      set({ selectedItems: [...selectedItems, person] });
    }
  },

  unselectAll: (): void => {
    set({ selectedItems: [] });
  },

  isSelected: (url: string): boolean => {
    return get().selectedItems.some((person) => person.url === url);
  },
}));
