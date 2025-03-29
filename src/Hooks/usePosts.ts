import { useState, useEffect } from 'react';
import { ICardType } from '../shared/CardsList';

interface UsePostsResult {
  posts: ICardType[];
  isLoading: boolean;
  error: string;
  hasMore: boolean;
  loadMorePosts: () => void;
}

const usePosts = (initialOffset: number, limit: number, sortBy: string, searchBy: string): UsePostsResult => {
  const [posts, setPosts] = useState<ICardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (offset: number, limit: number, sortBy: string, searchBy: string): Promise<{ posts: ICardType[]; hasMore: boolean }> => {
    try {
      const response = await fetch(`/api/posts?limit=${limit}&offset=${offset}&sortBy=${sortBy}`);
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      const newPosts = await response.json();
      console.log('Server response:', newPosts);
      return newPosts;
    } catch (error) {
      setError('Ошибка загрузки данных');
      return { posts: [], hasMore: false };
    }
  };

  const fetchInitialPosts = async () => {
    setIsLoading(true);
    setPosts([]); // Очищаем старые посты
    setOffset(initialOffset);
    const { posts, hasMore } = await loadPosts(initialOffset, limit, sortBy, searchBy);
    setPosts(posts);
    setHasMore(hasMore);
    setIsLoading(false);
  };

  const loadMorePosts = async () => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      const newOffset = offset + limit;
      console.log(`Loading more posts with offset: ${newOffset}`);
      const { posts: newPosts, hasMore: newHasMore } = await loadPosts(newOffset, limit, sortBy, searchBy);
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
  }, [sortBy, searchBy]);

  return {
    posts,
    isLoading,
    error,
    hasMore,
    loadMorePosts,
  };
};

export default usePosts;