import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import usePosts from '../../Hooks/usePosts';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../store/store';
import { CardsList } from '../CardsList';
import { Content } from '../Content';
import { Header } from '../Header';
import * as styles from './layout.css';


interface RootState {
  sortBy: {
    sortBy: string;
  };
}

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const match = useMatch('/posts/:id');
  const [searchBy, setSearchBy] = useState('');
  const [accountPoint, setAccountPoint] = useState('');

  const sortBy = useSelector((state: RootState) => state.sortBy.sortBy);
  const { posts = [], isLoading, error, hasMore, loadMorePosts } = usePosts(0, 7, sortBy, searchBy, accountPoint);

  const handleSortChange = useCallback((newSortBy: string) => {
    navigate(`/posts?sortBy=${newSortBy}`);
  }, [navigate]);

  const handleSearchSubmit = useCallback((search: string) => {
    setSearchBy(search);
  }, []);

  useEffect(() => {
    if (!match) {
      const searchParams = new URLSearchParams(location.search);
      const newSortBy = searchParams.get('sortBy');
      if (newSortBy) {
        dispatch(setSortBy(newSortBy));
      }

      const pathToAccountPointMap: Record<string, string> = {
        '/account/viewed': 'viewed',
        '/account/saved': 'saved',
        '/account/my': 'my',
        '/account/commented': 'commented',
      };

      setAccountPoint(pathToAccountPointMap[location.pathname] || '');
    }
  }, [location.search, location.pathname, match, dispatch]);

  const content = useMemo(() => (
    <Content>
      <div style={{ height: '1100px' }}>
        <CardsList
          posts={posts}
          isLoading={isLoading}
          hasMore={hasMore}
          loadMorePosts={loadMorePosts}
        />
      </div>
    </Content>
  ), [posts, isLoading, hasMore, loadMorePosts]);

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <Header
        onSortChange={handleSortChange}
        onSearchSubmit={handleSearchSubmit}
      />
      {content}
    </div>
  );
}