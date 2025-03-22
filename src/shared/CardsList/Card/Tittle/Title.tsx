import React from 'react';
import * as styles from './title.css';
import { Link } from 'react-router-dom';
import { ICardProps } from '../Card';


export function Title({ card }: ICardProps) {
    let cardLength: number = card.title.length;
    let cardTitle;

    if (cardLength >= 62) {
        cardTitle = [card.title.slice(0, 62), `...`].join('');
    } else {
        cardTitle = card.title.slice(0, 62);
    }

    return (
        <h2 className={styles.title}>
            <Link to={`/posts/${card.id}`} className={styles.postlink} >
                {cardTitle}
            </Link>
        </h2>
    );
}