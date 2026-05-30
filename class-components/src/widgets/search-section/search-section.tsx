import './search-section.scss';

import { type JSX,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSearchStore } from '@/core/store/search-store.ts';
import SearchField from '@/widgets/search-field/search-field.tsx';

function SearchSection(): JSX.Element {
  const navigate = useNavigate();
  const { term, isLoading, setTerm } = useSearchStore();

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
          isLoading={isLoading}
          onChange={setInputValue}
          onSearch={useSearch}
        />
      </div>
    </section>
  );
}

export default SearchSection;
