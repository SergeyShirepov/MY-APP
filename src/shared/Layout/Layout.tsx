import React, { useEffect, useRef, useState } from 'react';
import * as styles from './layout.css';
import { useMatch, useNavigate } from 'react-router-dom';
import { useToken } from '../../Hooks/useToken';
import usePosts from '../../Hooks/usePosts';
import { useSortedAndSearchPosts } from '../../Hooks/useSortedAndSearchPosts';
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
    const searchParams = new URLSearchParams(location.search);
    const newSortBy = searchParams.get('sortBy');

    if (!match) {
      const searchParams = new URLSearchParams(location.search);
      const newSortBy = searchParams.get('sortBy');
      dispatch(setSortBy(newSortBy));
    }

  }, [location.search]);


  const handleSortChange = (newSortBy: string) => {
    navigate(`/posts?sortBy=${newSortBy}`);
  }

  const sortedAndSearchPosts = useSortedAndSearchPosts(posts, sortBy, searchBy);

  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <Header onSortChange={handleSortChange} onSearchChange={setSearchBy} />
      <Content>
        <div style={{ height: 'calc(90vh - 150px)' }}>
          <CardsList
            posts={sortedAndSearchPosts}
            isLoading={isLoading}
            hasMore={hasMore}
            loadMorePosts={loadMorePosts}
          />
        </div>
      </Content>
    </div>
  );
}