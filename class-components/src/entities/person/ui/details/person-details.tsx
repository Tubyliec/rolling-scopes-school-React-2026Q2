import { useState, useEffect, type JSX } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import type { Person } from '../../model/interfaces/person.interface.ts';
import Spinner from '../../../../shared/ui/spinner/spinner.tsx';
import './person-details.scss';
import { getPerson } from '../../../../core/swapi/swapi-service.ts';

function PersonDetail(): JSX.Element {
  const { detailsId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const page = location.pathname.match(/\/main\/(\d+)/)?.[1] || '1';
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!detailsId) return;

    let isMounted = true;

    setIsLoading(true);
    setPerson(null);
    setError(null);

    getPerson(detailsId)
      .then((response) => {
        if (!isMounted) return;

        if ('message' in response) {
          setError(response.message);
        } else {
          setPerson(response);
        }
      })
      .catch((err: unknown) => {
        if (!isMounted) return;

        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => {
        if (!isMounted) return;

        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [detailsId]);

  const handleClose = (): void => {
    navigate(`/main/${page}`);
  };

  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error !== null) {
      return (
        <div className="person-details__error">
          <span className="person-details__error-icon">✖</span>
          <div className="person-details__error-msg">{error}</div>
        </div>
      );
    }

    if (person === null) {
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
      <button
        className="person-details__close"
        onClick={handleClose}
        aria-label="Close details"
      >
        ✕
      </button>
      {renderContent()}
    </aside>
  );
}

export default PersonDetail;
