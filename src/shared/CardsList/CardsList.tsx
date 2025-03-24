import React from 'react';
import { Card } from './Card';
import * as styles from './cardslist.css';

export interface ICardType {
  id: string;
  title: string;
  cardPreview: string;
  timePublished: string;
  timeViewed: string;
  avtor: string;
  avatar: string;
  karmaValue: number;
}

type CardsListProps = {
  posts: ICardType[];
};

export function CardsList({ posts }: CardsListProps) {
  return (
    <ul className={styles.cardlist}>
      {posts?.map((post: ICardType) => (
        <Card key={post.id} card={post} />
      ))}
    </ul>
  );
}