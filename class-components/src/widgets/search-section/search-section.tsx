'use client';

import { type JSX, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useLocale } from 'next-intl';

import { useIsFetching } from '@tanstack/react-query';

import { useSearchStore } from '@/core/store/search-store.ts';

import SearchField from '@widgets/search-section/components/search-field/search-field.tsx';

import { PAGE_NUMBERS } from '@shared/constants/page-constants.ts';

import './search-section.scss';

function SearchSection(): JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const isFetching = useIsFetching() > 0;
  const { term, setTerm } = useSearchStore();

  const [inputValue, setInputValue] = useState<string>(term);

  const handleSearch = (): void => {
    const trimmed = inputValue.trim();
    setInputValue(trimmed);
    setTerm(trimmed);
    router.push(
      `/${locale}?page=${PAGE_NUMBERS.first}&q=${encodeURIComponent(trimmed)}`
    );
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
