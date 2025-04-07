import React, { useEffect, useState } from 'react';
import * as styles from './layout.css';
import { useMatch, useNavigate } from 'react-router-dom';
import { useToken } from '../../Hooks/useToken';
import usePosts from '../../Hooks/usePosts';
import { CardsList } from '../CardsList';
import { Content } from '../Content';
import { Header } from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../store/store';

export function Layout() {
  const [token] = useToken();
  const sortBy = useSelector((state: any) => state.sortBy.sortBy);
  const [searchBy, setSearchBy] = useState('');
  const { posts = [], isLoading, error, hasMore, loadMorePosts } = usePosts(0, 7, sortBy, searchBy);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const match = useMatch('/posts/:id');


  useEffect(() => {
    if (!match) {
      const searchParams = new URLSearchParams(location.search);
      const newSortBy = searchParams.get('sortBy');
      dispatch(setSortBy(newSortBy));
    }

  }, [location.search]);


  const handleSortChange = (newSortBy: string) => {
    navigate(`/posts?sortBy=${newSortBy}`);
  }

  const handleSearchSubmit = (search: string) => {
    setSearchBy(search);
  }
console.log(searchBy);

  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <Header onSortChange={handleSortChange} onSearchSubmit={handleSearchSubmit} />
      <Content>
        <div style={{ height: 'calc(90vh - 150px)' }}>
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