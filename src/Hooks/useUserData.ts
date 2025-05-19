import { useEffect } from 'react';
import { useToken } from './useToken';
import { meRequestAsync } from '../store/features/user';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function useUserData() {
  const [token] = useToken();
  const { loading, data, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch(meRequestAsync() as any);
  }, [token]);

  return {
    data,
    loading,
    error,
    isAuthenticated: !!data,
    isLoading: loading,
    hasError: !!error
  };
}