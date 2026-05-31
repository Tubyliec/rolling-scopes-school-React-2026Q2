import type { JSX } from 'react';

import Card from '@/entities/person/components/card/card.tsx';

import type { CardListProps } from './model/interfaces/card-list.interface';

import './card-list.scss';

function CardList({ results }: CardListProps): JSX.Element {
  if (!results.length) {
    return (
      <div className="card-list__empty">
        <div className="card-list__empty-glyph">◈</div>
        NO RECORDS FOUND
      </div>
    );
  }

  return (
    <div className="card-list">
      {results.map((person, index) => (
        <Card key={index} person={person} />
      ))}
    </div>
  );
}

export default CardList;
