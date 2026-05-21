import { useState, useEffect, type JSX } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';

import Header from '@/widgets/header/header.tsx';
import SearchSection from '@/widgets/search-section/search-section.tsx';
import ResultsSection from '@/widgets/results-sections/results-section.tsx';

import { searchPeople } from '@/core/swapi/swapi-service.ts';

import type { Person } from '@/entities/person/model/interfaces/person.interface.ts';

import { extractPersonId } from '@/shared/utilities/extract-person-id.ts';
import { KEY_SEARCH_TERM } from '@/shared/constants/search-constants.ts';

import './main-page.scss';
import { ErrorButton } from '@shared/ui/buttons/error-button/error-button.tsx';

function MainPage(): JSX.Element {
  const { page, detailsId } = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(page ?? '1', 10);

  const [results, setResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [activeTerm, setActiveTerm] = useState<string>(
    () => localStorage.getItem(KEY_SEARCH_TERM) ?? ''
  );

  const doSearch = async (term: string, targetPage: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response = await searchPeople({ term, page: targetPage });

    if ('message' in response) {
      setError(response.message);
      setResults([]);
      setTotalCount(0);
    } else {
      setResults(response.results);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
      setHasNextPage(response.hasNextPage);
      setHasPreviousPage(response.hasPreviousPage);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    void doSearch(activeTerm, currentPage);
  }, [currentPage, activeTerm]);

  const handleSearch = (term: string): void => {
    setActiveTerm(term);
    navigate('/main');
  };

  const handlePageChange = (newPage: number): void => {
    navigate(`/main/${newPage}${detailsId ? `/${detailsId}` : ''}`);
  };

  const handleSelect = (person: Person): void => {
    const id = extractPersonId(person.url);
    navigate(`/main/${currentPage}/${id}`);
  };

  const handleMainPanelClick = (): void => {
    if (detailsId) {
      navigate('/main');
    }
  };

  return (
    <>
      <Header />
      <SearchSection onSearch={handleSearch} isLoading={isLoading} />
      <div
        className={`main-layout__body${detailsId ? ' main-layout__body--split' : ''}`}
      >
        <div
          className="main-layout__results"
          onClick={detailsId ? handleMainPanelClick : undefined}
        >
          <ResultsSection
            isLoading={isLoading}
            error={error}
            results={results}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            onPageChange={handlePageChange}
            onSelect={handleSelect}
            selectedId={detailsId}
          />
        </div>
        <Outlet />
      </div>
      <ErrorButton />
    </>
  );
}

export default MainPage;
