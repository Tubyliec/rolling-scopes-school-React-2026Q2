import type { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { usePersonQuery } from '@/core/swapi/hooks/use-person-query.ts';
import Spinner from '@/shared/ui/spinner/spinner.tsx';
import { AppRoute } from '@core/router/model/enums/app-route.enum.ts';
import { RefreshButton } from '@shared/ui/buttons/refresh-button/refresh-button.tsx';

import './person-details.scss';

function PersonDetail(): JSX.Element {
  const { detailsId, page = '1' } = useParams();
  const navigate = useNavigate();

  const { data: person, isLoading, error, refetch } = usePersonQuery(detailsId);

  const handleClose = (): void => {
    navigate(`${AppRoute.Main}/${page}`);
  };

  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error !== null) {
      return (
        <div className="person-details__error">
          <span className="person-details__error-icon">✖</span>
          <div className="person-details__error-msg">{error.message}</div>
        </div>
      );
    }

    if (!person) {
      return <div className="person-details__empty">No data available.</div>;
    }

    return (
      <div className="person-details__content">
        <h2 className="person-details__name">{person.name}</h2>
        <ul className="person-details__list">
          <li className="person-details__item">
            <span className="person-details__label">Height</span>
            <span className="person-details__value">{person.height} cm</span>
          </li>
          <li className="person-details__item">
            <span className="person-details__label">Mass</span>
            <span className="person-details__value">{person.mass} kg</span>
          </li>
          <li className="person-details__item">
            <span className="person-details__label">Birth Year</span>
            <span className="person-details__value">{person.birth_year}</span>
          </li>
          <li className="person-details__item">
            <span className="person-details__label">Gender</span>
            <span className="person-details__value">{person.gender}</span>
          </li>
          <li className="person-details__item">
            <span className="person-details__label">Hair</span>
            <span className="person-details__value">{person.hair_color}</span>
          </li>
          <li className="person-details__item">
            <span className="person-details__label">Eyes</span>
            <span className="person-details__value">{person.eye_color}</span>
          </li>
          <li className="person-details__item">
            <span className="person-details__label">Skin</span>
            <span className="person-details__value">{person.skin_color}</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <aside className="person-details">
      <div className="person-details__actions">
        <RefreshButton onClick={() => refetch()} />
        <button className="person-details__close" onClick={handleClose}>
          ✕
        </button>
      </div>
      {renderContent()}
    </aside>
  );
}

export default PersonDetail;