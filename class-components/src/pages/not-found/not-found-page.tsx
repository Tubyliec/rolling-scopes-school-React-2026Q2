import type { JSX } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@core/router/model/constants/app-route.ts';

import './not-found-page.scss';

function NotFoundPage(): JSX.Element {
  return (
    <div className="not-found-page">
      <div className="not-found-page__code">404</div>
      <h1 className="not-found-page__title">Page Not Found</h1>
      <p className="not-found-page__text">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link className="not-found-page__back" to={AppRoute.Main}>
        Return to Search
      </Link>
    </div>
  );
}

export default NotFoundPage;
