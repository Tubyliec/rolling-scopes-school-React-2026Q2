import type { JSX } from 'react';

import type { CardProps } from './model/interfaces/card.interface';

import './card.scss';

function Card({ person }: CardProps): JSX.Element {
  return (
    <div className="card">
      <div className="card__header">
        <h3 className="card__name">{person.name}</h3>
      </div>
      <div className="card__body">
        <div className="card__info">
          <span className="card__label">Height:</span>
          <span className="card__value">{person.height} cm</span>
        </div>
        <div className="card__info">
          <span className="card__label">Mass:</span>
          <span className="card__value">{person.mass} kg</span>
        </div>
        <div className="card__info">
          <span className="card__label">Birth Year:</span>
          <span className="card__value">{person.birth_year}</span>
        </div>
        <div className="card__info">
          <span className="card__label">Gender:</span>
          <span className="card__value">{person.gender}</span>
        </div>
      </div>
      <div className="card__footer">
        <span className="card__badge">Hair: {person.hair_color}</span>
        <span className="card__badge">Eyes: {person.eye_color}</span>
        <span className="card__badge">Skin: {person.skin_color}</span>
      </div>
    </div>
  );
}

export default Card;
