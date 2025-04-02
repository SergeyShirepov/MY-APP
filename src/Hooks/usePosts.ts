import { useState, useEffect } from 'react';
import { ICardType } from '../shared/CardsList';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useToken } from './useToken';
import { RootState } from '../store/store';
import { IUserData } from '../store/actions';

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
  const { name } = useSelector<RootState, IUserData>(state => state.userData.data);
  const [token] = useToken();

  const loadPosts = async (
    offset: number, 
    limit: number, 
    sortBy: string, 
    searchBy: string
  ): Promise<{ posts: ICardType[]; hasMore: boolean }> => {
    try {
      const response = await axios.get<{ posts: ICardType[]; hasMore: boolean }>(`/api/posts`, {
        params: {
          limit,
          offset,
          sortBy,
          search: searchBy
        },
        headers: {
          'X-User-Name': name || '',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
  
      return {
        posts: response.data.posts,
        hasMore: response.data.hasMore
      };
      
    } catch (error: unknown) {
      let errorMessage = 'Ошибка загрузки данных';
      
      if (axios.isAxiosError(error)) {
        // Ошибка от axios
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        // Стандартная ошибка JavaScript
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      console.error('Ошибка загрузки постов:', error);
      return { posts: [], hasMore: false };
    }
  };


  const fetchInitialPosts = async () => {
    setIsLoading(true);
    setPosts([]);
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