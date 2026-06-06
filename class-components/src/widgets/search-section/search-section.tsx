import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSearchStore } from '@/core/store/search-store.ts';
import SearchField from '@/widgets/search-field/search-field.tsx';
import { AppRoute } from '@core/router/model/enums/app-route.enum.ts';
import { PAGE_NUMBERS } from '@shared/constants/page-constants.ts';
import { useIsFetching } from '@tanstack/react-query';

import './search-section.scss';

function SearchSection(): JSX.Element {
  const navigate = useNavigate();
  const isFetching = useIsFetching() > 0;
  const { term, setTerm } = useSearchStore();

  const [inputValue, setInputValue] = useState<string>(term);

  const handleSearch = (): void => {
    const trimmed = inputValue.trim();
    setInputValue(trimmed);
    setTerm(trimmed);
    navigate(`${AppRoute.Main}/${PAGE_NUMBERS.firstPage}`);
  };

  return (
    <section className="search-section">
      <div className="search__wrapper wrapper">
        <SearchField
          value={inputValue}
          isLoading={isFetching}
          onChange={setInputValue}
          onSearch={handleSearch}
        />
      </div>
    </section>
  );
}

export default SearchSection;
