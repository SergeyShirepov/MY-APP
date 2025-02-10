import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import * as styles from './cardslist.css';

interface ICardType {
  id: string;
  tittle: string;
  cardPreview: string;
  timePublished: string;
  timeViewed: string;
  avtor: string;
  avatar: string;
}

export function CardsList() {
  const [posts, setPosts] = useState<ICardType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        setError('Ошибка загрузки данных');
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) return <div>{error}</div>;
  
  return isLoading
    ? "Loading..."
    : (<ul className={styles.cardlist}>
      {posts?.map((post: ICardType) => (
        <Card key={post.id} card={post} />
      ))}
      </ul>)
}

