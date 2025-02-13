import React from 'react';
import * as styles from './tittle.css';
import { Link } from 'react-router-dom';

interface ICardProps {
    card: {
      id: string;
      tittle: string;
      cardPreview: string;
      timePublished: string;
      timeViewed: string;
      avtor: string;
      avatar: string;
    }
  }


export function Tittle ({ card }: ICardProps) {
    let cardLength: number = card.tittle.length;
    let cardTittle;

    if (cardLength >= 62) {
        cardTittle = [card.tittle.slice(0, 62), `...`].join('');
    } else{
        cardTittle = card.tittle.slice(0, 62);
    }

    return (
        <h2 className={styles.tittle}>
            <Link to="/posts/1" className={styles.postlink} >
                {cardTittle}
            </Link>




        </h2>
    );
}