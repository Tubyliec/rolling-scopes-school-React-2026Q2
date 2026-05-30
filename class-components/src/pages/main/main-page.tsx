import type { JSX } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';

import Header from '@/widgets/header/header.tsx';
import SearchSection from '@/widgets/search-section/search-section.tsx';
import ResultsSection from '@/widgets/results-sections/results-section.tsx';
import Flyout from '@/widgets/flyout/flyout.tsx';
import { ErrorButton } from '@shared/ui/buttons/error-button/error-button.tsx';

import './main-page.scss';

function MainPage(): JSX.Element {
  const { detailsId } = useParams();
  const navigate = useNavigate();

  const handleCloseDetails = (): void => {
    if (detailsId) navigate('/main');
  };

  return (
    <>
      <Header />
      <SearchSection />
      <div
        className={`main-layout__body${detailsId ? ' main-layout__body--split' : ''}`}
      >
        <div className="main-layout__results" onClick={handleCloseDetails}>
          <ResultsSection />
        </div>
        <Outlet />
      </div>
      <ErrorButton />
      <Flyout />
    </>
  );
}

export default MainPage;
