import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { type JSX } from 'react';

import MainPage from '@pages/main/main-page.tsx';
import AboutPage from '@pages/about/about-page.tsx';
import NotFoundPage from '@pages/not-found/not-found-page.tsx';

import PersonDetail from '@entities/person/components/details/person-details.tsx';

import { AppRoute } from '@core/router/model/enums/app-route.enum.ts';
import { AppRouteSegment } from '@core/router/model/enums/app-route-segment.ts';


function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default AppRouter;