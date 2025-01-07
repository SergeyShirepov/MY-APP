import React from 'react';
import { Card } from './Card';
import * as styles from './cardslist.css';
import { cardsArray } from '../../data';

interface CardType { 
  id: string; 
  tittle: string;
  cardPreview: string;
  timePublished: string;
  timeViewed: string;
  avtor: string;
}

export function CardsList() {
  return (
    <ul className={styles.cardlist}>     
      {cardsArray.map((card: CardType) => (
        <Card key={card.id} card={card} />
      ))}         
    </ul>
  );
}
