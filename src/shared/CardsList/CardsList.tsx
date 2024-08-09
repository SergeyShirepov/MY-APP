import React from 'react';
import { Card } from './Card';
import * as styles from './cardslist.css';

export function CardsList() {
  return (
<ul className={styles.cardlist}>
  <Card />
</ul>
  );
}
