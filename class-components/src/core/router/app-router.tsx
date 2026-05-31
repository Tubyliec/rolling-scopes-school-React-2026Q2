import { type JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppRoute } from '@core/router/model/enums/app-route.enum.ts';
import { AppRouteSegment } from '@core/router/model/enums/app-route-segment.ts';
import PersonDetail from '@entities/person/components/details/person-details.tsx';
import AboutPage from '@pages/about/about-page.tsx';
import MainPage from '@pages/main/main-page.tsx';
import NotFoundPage from '@pages/not-found/not-found-page.tsx';

function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<Navigate to={AppRoute.Main} replace />}
      />
      <Route path={`${AppRouteSegment.Main}/:page?`} element={<MainPage />}>
        <Route path={AppRouteSegment.DetailsId} element={<PersonDetail />} />
      </Route>
      <Route path={AppRouteSegment.About} element={<AboutPage />} />
      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
