import React, { useEffect, useRef, useState } from 'react';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import './main.global.css';
import { CardsList } from './shared/CardsList';
import { useToken } from './Hooks/useToken';
import { tokenContext } from './shared/context/tokenContext';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useSortedAndSearchPosts } from './Hooks/useSortedAndSearchPosts';
import usePosts from './Hooks/useLoadPosts';

export function App() {
  const [token] = useToken();
  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [serchBy, setSearchBy] = useState('');
  const observerTarget = useRef(null);

  const { posts, isLoading, error, hasMore, loadMorePosts } = usePosts(0, 6);

  const sortedAndSearchPosts = useSortedAndSearchPosts(posts, sortBy, serchBy);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loadMorePosts]);

  if (error) return <div>{error}</div>;

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
              <div ref={observerTarget} style={{ height: '10px' }}></div>
              {isLoading && <div>Loading...</div>}
            </Content>
          </Layout>
        </BrowserRouter>
      </tokenContext.Provider>
    </Provider>
  );
}