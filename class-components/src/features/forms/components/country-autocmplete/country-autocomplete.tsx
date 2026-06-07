import { type JSX, useRef } from 'react';

import { useFormsStore } from '@/features/forms/store/forms-store.ts';

import type { CountryAutocompleteProps } from '@/features/forms/model/types/country-autocomplete-props.type.ts';

import { useAutocomplete } from './hooks/use-autocomplete.ts';
import { useClickOutside } from './hooks/use-click-outside.ts';
import { useKeyboardNavigation } from './hooks/use-keyboard-navigation.ts';

import './country-autocomplete.scss';

function CountryAutocomplete({
  id,
  value,
  onChange,
  hasError,
}: CountryAutocompleteProps): JSX.Element {
  const countries = useFormsStore((state) => state.countries);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    inputValue,
    suggestions,
    isOpen,
    highlightedIndex,
    setHighlightedIndex,
    handleInputChange,
    handleSelect,
    close,
  } = useAutocomplete(value, countries, onChange);

  const handleKeyDown = useKeyboardNavigation(
    isOpen,
    suggestions.length,
    highlightedIndex,
    setHighlightedIndex,
    (index) => handleSelect(suggestions[index]),
    close
  );

  useClickOutside(containerRef, close);

  return (
    <div className="country-autocomplete" ref={containerRef}>
      <input
        id={id}
        type="text"
        className={`country-autocomplete__input form-input${hasError ? ' form-input--error' : ''}`}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
        autoComplete="off"
        role="combobox"
      />
      {isOpen && (
        <ul
          className="country-autocomplete__list"
          id={`${id}-listbox`}
          role="listbox"
        >
          {suggestions.map((country, index) => (
            <li
              key={country}
              className={`country-autocomplete__option${index === highlightedIndex ? ' country-autocomplete__option--highlighted' : ''}`}
              role="option"
              onMouseDown={(): void => handleSelect(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CountryAutocomplete;
