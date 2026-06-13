import type { JSX } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { AppRoute } from '@core/router/model/constants/app-route.ts';
import { useTheme } from '@core/theme/use-theme.tsx';

import { Layout } from '@widgets/layout/layout.tsx';

import Flyout from '@/widgets/flyout/flyout.tsx';
import Header from '@/widgets/header/header.tsx';
import ResultsSection from '@/widgets/results-sections/results-section.tsx';
import SearchSection from '@/widgets/search-section/search-section.tsx';

import { ErrorButton } from '@shared/ui/buttons/error-button/error-button.tsx';

import './main-page.scss';

function MainPage(): JSX.Element {
  const { detailsId } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleCloseDetails = (): void => {
    if (detailsId) navigate(AppRoute.Main);
  };

  const bodyClassName = `main-layout__body${detailsId ? ' main-layout__body--split' : ''}`;

  return (
    <Layout data-theme={theme}>
      <Header />
      <SearchSection />
      <div className={bodyClassName}>
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
