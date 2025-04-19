import React from 'react';
import * as styles from './title.css';
import { ICardType } from '../../../../types/ICardType';


export function Title({ card }: { card: ICardType }) {
    let cardLength: number = card.title.length;
    let cardTitle;

    if (cardLength >= 62) {
        cardTitle = [card.title.slice(0, 62), `...`].join('');
    } else {
        cardTitle = card.title.slice(0, 62);
    }

    return (
        <h2 className={styles.title}>
            {cardTitle}
        </h2>
    );
}