import './main-page.scss';

import { useTheme } from '@core/theme/use-theme.tsx';
import { ErrorButton } from '@shared/ui/buttons/error-button/error-button.tsx';
import { Layout } from '@widgets/layout/layout.tsx';
import type { JSX } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import Flyout from '@/widgets/flyout/flyout.tsx';
import Header from '@/widgets/header/header.tsx';
import ResultsSection from '@/widgets/results-sections/results-section.tsx';
import SearchSection from '@/widgets/search-section/search-section.tsx';

function MainPage(): JSX.Element {
  const { detailsId } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleCloseDetails = (): void => {
    if (detailsId) navigate('/main');
  };

  return (
    <Layout data-theme={theme}>
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
    </Layout>
  );
}

export default MainPage;
