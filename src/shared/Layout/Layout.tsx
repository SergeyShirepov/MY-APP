import React, { useEffect, useRef, useState } from 'react';
import * as styles from './layout.css';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { useToken } from '../../Hooks/useToken';
import usePosts from '../../Hooks/usePosts';
import { useSortedAndSearchPosts } from '../../Hooks/useSortedAndSearchPosts';
import { Navi } from '../Navi/Navi';
import { CardsList } from '../CardsList';
import { Content } from '../Content';
import { Header } from '../Header';



export function Layout() {
  const [token] = useToken();
  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [serchBy, setSearchBy] = useState('');
  const observerTarget = useRef(null);
  const { posts = [], isLoading, error, hasMore, loadMorePosts } = usePosts(0, 6, sortBy);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newSortBy = searchParams.get('sortBy') || '';
    setSortBy(newSortBy);
  }, [location.search]);

  const handleSortChange = (newSortBy: string) => {
    navigate(`/posts?sortBy=${newSortBy}`);
  }

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
    <>
      <Header onSortChange={handleSortChange} onSearchChange={setSearchBy} />
      { }<Navi />
      <Content>
        <CardsList sortBy={sortBy} serchBy={serchBy} posts={sortedAndSearchPosts} />
        <div ref={observerTarget} style={{ height: '10px' }}></div>
        {isLoading && <div>Loading...</div>}
      </Content>
    </>
  );
}