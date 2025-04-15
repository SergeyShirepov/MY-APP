import React, { useEffect, useState } from 'react';
import * as styles from './layout.css';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useToken } from '../../Hooks/useToken';
import usePosts from '../../Hooks/usePosts';
import { CardsList } from '../CardsList';
import { Content } from '../Content';
import { Header } from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../store/store';

export function Layout() {
  const [searchBy, setSearchBy] = useState('');
  const [accountPoint, setAccountPoint] = useState('');
  const sortBy = useSelector((state: any) => state.sortBy.sortBy);
  const [token] = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const match = useMatch('/posts/:id');
  const location = useLocation();
  const { posts = [], isLoading, error, hasMore, loadMorePosts } = usePosts(0, 7, sortBy, searchBy, accountPoint);

  useEffect(() => {
    if (!match) {
      const searchParams = new URLSearchParams(location.search);
      const newSortBy = searchParams.get('sortBy');
      dispatch(setSortBy(newSortBy));

      switch (location.pathname) {
        case '/account/viewed':
          setAccountPoint('viewed');
          break;
        case '/account/saved':
          setAccountPoint('saved');
          break;
        case '/account/my':
          setAccountPoint('my');
          break;
        case '/account/commented': // Исправленная опечатка
          setAccountPoint('commented');
          break;
        default:
          setAccountPoint('');
      }
    }
  }, [location.search, location.pathname]);

  const handleSortChange = (newSortBy: string) => {
    navigate(`/posts?sortBy=${newSortBy}`);
  }
  const handleSearchSubmit = (search: string) => {
    setSearchBy(search);
  }

  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <Header onSortChange={handleSortChange} onSearchSubmit={handleSearchSubmit} />
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
    </div>
  );
}