import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  const [offset, setOffset] = useState(0);
  const limit = 6;
  const observerTarget = useRef(null); // Референс на элемент-триггер

  // Функция для загрузки постов
  const loadPosts = async (offset: number, limit: number) => {
    try {
      const response = await fetch(`/api/posts?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newPosts = await response.json();
      return newPosts;
    } catch (error) {
      setError('Ошибка загрузки данных');
      console.error('Error:', error);
      return [];
    }
  };

  // Загрузка первых постов при монтировании компонента
  useEffect(() => {
    const fetchInitialPosts = async () => {
      const initialPosts = await loadPosts(offset, limit);
      setPosts(initialPosts);
      setIsLoading(false);
    };
    fetchInitialPosts();
  }, []);

  // Автоматическая подгрузка постов при достижении конца списка
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          // Если триггер виден и загрузка не выполняется
          setIsLoading(true);
          const newOffset = offset + limit;
          loadPosts(newOffset, limit).then((newPosts) => {
            if (newPosts.length > 0) {
              setPosts((prevPosts) => (prevPosts ? [...prevPosts, ...newPosts] : newPosts));
              setOffset(newOffset);
            }
            setIsLoading(false);
          });
        }
      },
      { threshold: 1.0 } // Триггер сработает, когда элемент полностью появится в viewport
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current); // Наблюдаем за элементом-триггером
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current); // Останавливаем наблюдение при размонтировании
      }
    };
  }, [isLoading, offset]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <ul className={styles.cardlist}>
        {posts?.map((post: ICardType) => (
          <Card key={post.id} card={post} />
        ))}
      </ul>
      {/* Элемент-триггер для автоматической подгрузки */}
      <div ref={observerTarget} style={{ height: '10px' }}></div>
      {isLoading && <div>Loading...</div>}
    </div>
  );
}