import { useState, useEffect } from 'react';
import { ICardType } from '../shared/CardsList';

interface UsePostsResult {
  posts: ICardType[];
  isLoading: boolean;
  error: string;
  hasMore: boolean;
  loadMorePosts: () => void;
}

const usePosts = (initialOffset: number, limit: number, sortBy: string): UsePostsResult => {
  const [posts, setPosts] = useState<ICardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (offset: number, limit: number, sortBy: string): Promise<{ posts: ICardType[]; hasMore: boolean }> => {
    try {
      const response = await fetch(`/api/posts?limit=${limit}&offset=${offset}&sortBy=${sortBy}`);
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      const newPosts = await response.json();
      return newPosts;
    } catch (error) {
      setError('Ошибка загрузки данных');
      return { posts: [], hasMore: false };
    }
  };

  const fetchInitialPosts = async () => {
    const { posts, hasMore } = await loadPosts(offset, limit, sortBy);
    setPosts(posts);
    setHasMore(hasMore);
    setIsLoading(false);
  };

  const fetchMorePosts = async () => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      const newOffset = offset + limit;
      const { posts: newPosts, hasMore: newHasMore } = await loadPosts(newOffset, limit, sortBy);

      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts, ...newPosts];
        return updatedPosts;
      });

      setOffset(newOffset);
      setHasMore(newHasMore);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialPosts();
  }, [sortBy]);

  return {
    posts,
    isLoading,
    error,
    hasMore,
    loadMorePosts: fetchMorePosts,
  };
};

export default usePosts;