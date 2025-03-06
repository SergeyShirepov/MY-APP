import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import './main.global.css';
import { CardsList, ICardType } from './shared/CardsList';
import { useToken } from './Hooks/useToken';
import { tokenContext } from './shared/context/tokenContext';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// The main App component
export function App() {
  const [token] = useToken();
  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [serchBy, setSearchBy] = useState('');
  const [posts, setPosts] = useState<ICardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 6;
  const observerTarget = useRef(null); // Референс на элемент-триггер
  const [hasMore, setHasMore] = useState(true);



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
      if (initialPosts.length < limit) {
        setHasMore(false); // Если данных меньше, чем лимит, значит, больше данных нет
      }
    };
    fetchInitialPosts();
  }, []);

  // Автоматическая подгрузка постов при достижении конца списка
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          // Если триггер виден и загрузка не выполняется
          setIsLoading(true);
          const newOffset = offset + limit;
          loadPosts(newOffset, limit).then((newPosts) => {
            if (newPosts.length > 0) {
              setPosts((prevPosts) => (prevPosts ? [...prevPosts, ...newPosts] : newPosts));
              setOffset(newOffset);
              if (newPosts.length < limit) {
                setHasMore(false); // Если новых данных меньше, чем лимит, значит, больше данных нет
              }
            } else {
              setHasMore(false); // Если новых данных нет, значит, больше данных нет
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

  const sortedAndSearchPosts = useMemo(() => {
    let filteredPosts = [...posts];

    // Фильтрация по поиску
    if (serchBy) {
      filteredPosts = filteredPosts.filter((post) =>
        post.tittle.toLowerCase().includes(serchBy.toLowerCase())
      );
    }

    // Сортировка
    if (sortBy === 'karma') {
      filteredPosts.sort((a, b) => b.karmaValue - a.karmaValue);
    } else if (sortBy === 'dataPost') {
      filteredPosts.sort((a, b) => new Date(b.timePublished).getTime() - new Date(a.timePublished).getTime());
    }

    return filteredPosts;
  }, [posts, sortBy, serchBy]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Provider store={store}>
      <tokenContext.Provider value={token}>
        <BrowserRouter>
          <Layout>
            <Header onSortChange={setSortBy} onSearchChange={setSearchBy} />
            <Content>
              <CardsList sortBy={sortBy} serchBy={serchBy} posts={sortedAndSearchPosts} />
              {/* Элемент-триггер для автоматической подгрузки */}
              <div ref={observerTarget} style={{ height: '10px' }}></div>
              {isLoading && <div>Loading...</div>}
            </Content>
          </Layout>
        </BrowserRouter>
      </tokenContext.Provider>
    </Provider>
  );
}
