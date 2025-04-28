import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IUserData, meRequestAsync, useAppDispatch } from '../store/actions';
import { useToken } from './useToken';

export function useUserData() {
  const [token] = useToken();
  const data = useSelector<RootState, IUserData>(state => state.userData.data);
  const loading = useSelector<RootState, boolean>(state => state.userData.loading);
  const error = useSelector<RootState, Error | null>(state => state.userData.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token || !data) return;

    dispatch(meRequestAsync() as any);
  }, [token]);

  
  console.log('ВЫЗОВ USEUSERDATA');

  return {
    data,
    loading,
    error,
    // Добавляем вспомогательные флаги
    isAuthenticated: !!data,
    isLoading: loading,
    hasError: !!error
  };
}