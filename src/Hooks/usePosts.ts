import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ICardType } from '../types/ICardType';
import { RootState } from '../store';

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
  name: string
): UsePostsResult => {
  console.log('usePosts ', {name});

  const accountPoint = useSelector((state: RootState) => state.accountPoint.accountPoint);
  const sortBy = useSelector((state: RootState) => state.sort.sortBy);
  const searchBy = useSelector((state: RootState) => state.search.searchBy);


  const [state, setState] = useState<{
    posts: ICardType[];
    isLoading: boolean;
    error: string;
    offset: number;
    hasMore: boolean;
  }>({
    posts: [],
    isLoading: true,
    error: '',
    offset: initialOffset,
    hasMore: true,
  });


  const loadPosts = useCallback(async (
    
    currentOffset: number,
    currentSortBy: string,
    currentSearchBy: string,
    currentAccountPoint: string
  ): Promise<PostsResponse> => {
    try {
      console.log('Вызван LOADMORE');
      const response = await axios.get<PostsResponse>('/api/posts', {
        params: {
          limit,
          offset: currentOffset,
          sortBy: currentSortBy,
          searchBy: currentSearchBy,
          accountPoint: currentAccountPoint,
        },
        headers: {
          'X-User-Name': name || ''
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

      setState(prev => ({ ...prev, error: errorMessage }));
      console.error('Ошибка загрузки постов:', error);
      return { posts: [], hasMore: false };
    }
  }, [sortBy, searchBy, accountPoint]);

  const fetchInitialPosts = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: '' }));

    try {
      const { posts: newPosts, hasMore: newHasMore } = await loadPosts(
        initialOffset,
        sortBy,
        searchBy,
        accountPoint
      );

      setState(prev => ({
        ...prev,
        posts: newPosts,
        hasMore: newHasMore,
        offset: initialOffset,
        isLoading: false,
      }));
    // } catch {
    //   setState(prev => ({ ...prev, isLoading: false }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [sortBy, searchBy, accountPoint]);

  const loadMorePosts = useCallback(async () => {
    console.log('loadMorePosts вызван с:', { initialOffset, sortBy, searchBy, accountPoint });
    if (state.isLoading || !state.hasMore) return;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const newOffset = state.offset + limit;
      const { posts: newPosts, hasMore: newHasMore } = await loadPosts(
        newOffset,
        sortBy,
        searchBy,
        accountPoint
      );

      setState(prev => {
        const existingIds = new Set(prev.posts.map(post => post.id));
        const filtered = newPosts.filter(post => !existingIds.has(post.id));
        return {
          ...prev,
          posts: [...prev.posts, ...filtered],
          offset: newOffset,
          hasMore: newHasMore,
          isLoading: false,
        };
      });
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.isLoading, state.hasMore]);

  useEffect(() => {
    console.log('fetchInitialPosts вызван с:', { initialOffset, sortBy, searchBy, accountPoint });
    fetchInitialPosts();
  }, [sortBy, searchBy, accountPoint]);

  
  console.log(    state.posts,
    state.isLoading,
    state.error,
    state.hasMore);

  return{
    posts: state.posts,
    isLoading: state.isLoading,
    error: state.error,
    hasMore: state.hasMore,
    loadMorePosts,
  };
  
};

export default usePosts;