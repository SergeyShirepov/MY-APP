import { useState, useEffect } from 'react';
import { ICardType } from '../shared/CardsList';



interface UsePostsResult {
  posts: ICardType[];
  isLoading: boolean;
  error: string;
  hasMore: boolean;
  loadMorePosts: () => void;
}

const usePosts = (initialOffset: number, limit: number): UsePostsResult => {
  const [posts, setPosts] = useState<ICardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (offset: number, limit: number): Promise<ICardType[]> => {
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

  const fetchInitialPosts = async () => {
    const initialPosts = await loadPosts(offset, limit);
    setPosts(initialPosts);
    setIsLoading(false);
    if (initialPosts.length < limit) {
      setHasMore(false);
    }
  };

  const fetchMorePosts = async () => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      const newOffset = offset + limit;
      const newPosts = await loadPosts(newOffset, limit);
      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setOffset(newOffset);
        if (newPosts.length < limit) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  return {
    posts,
    isLoading,
    error,
    hasMore,
    loadMorePosts: fetchMorePosts,
  };
};

export default usePosts;