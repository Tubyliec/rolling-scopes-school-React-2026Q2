import type { KeyboardEvent } from 'react';

export function useKeyboardNavigation(
  isOpen: boolean,
  itemCount: number,
  highlightedIndex: number,
  setHighlightedIndex: (index: number) => void,
  onSelect: (index: number) => void,
  onClose: () => void
): (event: KeyboardEvent<HTMLInputElement>) => void {
  return (event: KeyboardEvent<HTMLInputElement>): void => {
    if (!isOpen) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex(Math.min(highlightedIndex + 1, itemCount - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex(Math.max(highlightedIndex - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (highlightedIndex >= 0) {
        onSelect(highlightedIndex);
      }
    } else if (event.key === 'Escape') {
      onClose();
    }
  };
}
