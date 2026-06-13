import type { JSX } from 'react';

import Card from '@/entities/person/components/card/card.tsx';

import { ResultsEmpty } from '@shared/ui/errors/results-empty/results-empty.tsx';

import type { CardListProps } from './model/interfaces/card-list.interface';

import './card-list.scss';

function CardList({ results }: CardListProps): JSX.Element {
  if (!results.length) {
    return <ResultsEmpty />;
  }

  return (
    <div className="card-list">
      {results.map((person) => (
        <Card key={person.url} person={person} />
      ))}
    </div>
  );
}

export default CardList;
