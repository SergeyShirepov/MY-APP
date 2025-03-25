import React, { useEffect, useRef, useState } from 'react';
import * as styles from './layout.css';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { useToken } from '../../Hooks/useToken';
import usePosts from '../../Hooks/usePosts';
import { useSortedAndSearchPosts } from '../../Hooks/useSortedAndSearchPosts';
import { Navi } from '../Navi/Navi';
import { CardsList } from '../CardsList';
import { Content } from '../Content';
import { Header } from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../store/store';



export function Layout() {
  const [token] = useToken();
  const sortBy = useSelector((state: any) => state.sortBy.sortBy);
  const [serchBy, setSearchBy] = useState('');
  const observerTarget = useRef(null);
  const { posts = [], isLoading, error, hasMore, loadMorePosts } = usePosts(0, 6, sortBy);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isAccountPage = location.pathname === '/account';
 
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newSortBy = searchParams.get('sortBy');

     if (newSortBy !== null) {
      dispatch(setSortBy(newSortBy));
     }
    
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


  return (
    <>
      <Header onSortChange={handleSortChange} onSearchChange={setSearchBy} />
      {isAccountPage && <Navi /> }
      <Content>
        <CardsList posts={sortedAndSearchPosts} />
        <div ref={observerTarget} style={{ height: '10px' }}></div>
        {isLoading && <div>Loading...</div>}
      </Content>
    </>
  );
}