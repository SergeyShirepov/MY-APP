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
  const [posts, setPosts] = useState<ICardType[]>([]); // Начинаем с пустого массива
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 6;
  const observerTarget = useRef(null); // Референс на элемент-триггер
  const [hasMore, setHasMore] = useState(true); // Флаг, есть ли еще посты для загрузки

  // Функция для загрузки постов
  const loadPosts = useCallback(async (offset: number, limit: number) => {
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
  }, []);

  // Загрузка первых постов при монтировании компонента
  useEffect(() => {
    const fetchInitialPosts = async () => {
      setIsLoading(true);
      const initialPosts = await loadPosts(offset, limit);
      setPosts(initialPosts);
      setIsLoading(false);
    };
    fetchInitialPosts();
  }, [loadPosts]);

  // Автоматическая подгрузка постов при достижении конца списка
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          // Если триггер виден, загрузка не выполняется и есть еще посты
          setIsLoading(true);
          const newOffset = offset + limit;
          loadPosts(newOffset, limit).then((newPosts) => {
            if (newPosts.length > 0) {
              setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Добавляем новые посты
              setOffset(newOffset);
            } else {
              setHasMore(false); // Если постов больше нет, останавливаем загрузку
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
  }, [isLoading, offset, hasMore, loadPosts]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <ul className={styles.cardlist}>
        {posts.map((post: ICardType) => (
          <Card key={post.id} card={post} />
        ))}
      </ul>
      {/* Элемент-триггер для автоматической подгрузки */}
      <div ref={observerTarget} style={{ height: '10px' }}></div>
      {isLoading && <div>Loading...</div>}
      {!hasMore && <div>Больше постов нет</div>}
    </div>
  );
}