import {Component, type JSX} from 'react';
import type { CardListProps } from './model/interfaces/card-list.interface';

import './card-list.scss';
import Card from "../../entities/person/ui/card/card.tsx";

class CardList extends Component<CardListProps> {
    private renderEmptyState(): JSX.Element {
        return (
            <div className="card-list__empty">
                <div className="card-list__empty-glyph">◈</div>
                NO RECORDS FOUND
            </div>
        );
    }

    public render(): JSX.Element {
        const { results } = this.props;

        if (!results.length) {
            return this.renderEmptyState();
        }

        return (
            <div className="card-list">
                {results.map((person, index) => (
                    <Card key={index} person={person} />
                ))}
            </div>
        );
    }
}

export default CardList;