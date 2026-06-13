import { type ChangeEvent, useCallback, useEffect, useState } from 'react';

import { filterSuggestions } from '@shared/utilities/filter-suggestions.ts';

export function useAutocomplete(
  value: string,
  items: string[],
  onChange: (value: string) => void
) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const newValue = event.target.value;
      setInputValue(newValue);
      onChange('');
      const filtered = filterSuggestions(newValue, items);
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
      setHighlightedIndex(-1);
    },
    [items, onChange]
  );

  const handleSelect = useCallback(
    (item: string): void => {
      setInputValue(item);
      onChange(item);
      setIsOpen(false);
      setSuggestions([]);
    },
    [onChange]
  );

  const close = useCallback((): void => {
    setIsOpen(false);
  }, []);

  return {
    inputValue,
    suggestions,
    isOpen,
    highlightedIndex,
    setHighlightedIndex,
    handleInputChange,
    handleSelect,
    close,
  };
}
