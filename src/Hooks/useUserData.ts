import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IUserData, meRequestAsync, useAppDispatch } from '../store/actions';

export function useUserData() {
  const data = useSelector<RootState, IUserData>(state => state.userData.data);
  const loading = useSelector<RootState, boolean>(state => state.userData.loading);
  const error = useSelector<RootState, Error | null>(state => state.userData.error);
  const token = useSelector<RootState, string | null>(state => state.userData.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token || !data) return;
    
    // Задержкf для демонстрации
    const timer = setTimeout(() => {
      dispatch(meRequestAsync());
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [token, dispatch, data]);

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