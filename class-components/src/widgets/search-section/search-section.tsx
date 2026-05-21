import { useState, useEffect, type JSX } from 'react';
import { KEY_SEARCH_TERM } from '@/shared/constants/search-constants.ts';
import type { SearchSectionProps } from './model/interfaces/search-section-props.interface.ts';
import SearchField from '@/widgets/search-field/search-field.tsx';
import './search-section.scss';
import { useLocalStorage } from '@/core/use-local-storage/use-local-storage.ts';

function SearchSection({
  onSearch,
  isLoading,
}: SearchSectionProps): JSX.Element {
  const { value: savedTerm, setValue: setSavedTerm } = useLocalStorage({
    key: KEY_SEARCH_TERM,
    initialValue: '',
  });
  const [inputValue, setInputValue] = useState<string>(savedTerm);

  useEffect(() => {
    onSearch(savedTerm);
  }, []);

  const handleSearch = (): void => {
    const trimmed = inputValue.trim();
    setInputValue(trimmed);
    setSavedTerm(trimmed);
    onSearch(trimmed);
  };

  return (
    <section className="search-section">
      <div className="search__wrapper wrapper">
        <SearchField
          value={inputValue}
          isLoading={isLoading}
          onChange={setInputValue}
          onSearch={handleSearch}
        />
      </div>
    </section>
  );
}

export default SearchSection;
