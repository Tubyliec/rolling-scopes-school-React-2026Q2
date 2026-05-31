import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSearchStore } from '@/core/store/search-store.ts';
import SearchField from '@/widgets/search-field/search-field.tsx';
import { useIsFetching } from '@tanstack/react-query';

import './search-section.scss';

function SearchSection(): JSX.Element {
  const navigate = useNavigate();
  const isFetching = useIsFetching() > 0;
  const { term, setTerm } = useSearchStore();

  const [inputValue, setInputValue] = useState<string>(term);

  const useSearch = (): void => {
    const trimmed = inputValue.trim();
    setInputValue(trimmed);
    setTerm(trimmed);
    navigate('/main/1');
  };

  return (
    <section className="search-section">
      <div className="search__wrapper wrapper">
        <SearchField
          value={inputValue}
          isLoading={isFetching}
          onChange={setInputValue}
          onSearch={useSearch}
        />
      </div>
    </section>
  );
}

export default SearchSection;
