import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useToken } from './useToken';
import { RootState } from '../store/store';
import { IUserData } from '../store/actions';
import { ICardType } from '../types/ICardType';

interface UsePostsResult {
  posts: ICardType[];
  isLoading: boolean;
  error: string;
  hasMore: boolean;
  loadMorePosts: () => void;
}

interface PostsResponse {
  posts: ICardType[];
  hasMore: boolean;
}

const usePosts = (
  initialOffset: number, 
  limit: number, 
  sortBy: string, 
  searchBy: string, 
  accountPoint: string
): UsePostsResult => {

  const [posts, setPosts] = useState<ICardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(true);
  
  const { name } = useSelector<RootState, IUserData>((state) => state.userData.data);
  const [token] = useToken();

  const loadPosts = useCallback(async (
    currentOffset: number,
    currentSortBy: string,
    currentSearchBy: string,
    currentAccountPoint: string
  ): Promise<PostsResponse> => {
    try {
      const response = await axios.get<PostsResponse>('/api/posts', {
        params: {
          limit,
          offset: currentOffset,
          sortBy: currentSortBy,
          searchBy: currentSearchBy,
          accountPoint: currentAccountPoint,
        },
        headers: {
          'X-User-Name': name || '',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      return response.data;
    } catch (error) {
      let errorMessage = 'Ошибка загрузки данных';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      console.error('Ошибка загрузки постов:', error);
      return { posts: [], hasMore: false };
    }
  }, [limit, name, token]);

  const fetchInitialPosts = useCallback(async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const { posts: newPosts, hasMore: newHasMore } = await loadPosts(
        initialOffset,
        sortBy,
        searchBy,
        accountPoint
      );
      
      setPosts(newPosts);
      setHasMore(newHasMore);
      setOffset(initialOffset);
    } finally {
      setIsLoading(false);
    }
  }, [initialOffset, sortBy, searchBy, accountPoint]);

  const loadMorePosts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    try {
      const newOffset = offset + limit;
      const { posts: newPosts, hasMore: newHasMore } = await loadPosts(
        newOffset,
        sortBy,
        searchBy,
        accountPoint
      );

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setOffset(newOffset);
      setHasMore(newHasMore);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, offset, limit, sortBy, searchBy, accountPoint]);

  useEffect(() => {
    fetchInitialPosts();
  }, [fetchInitialPosts]);

  return {
    posts,
    isLoading,
    error,
    hasMore,
    loadMorePosts,
  };
};

export default usePosts;