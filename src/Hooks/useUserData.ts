import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IUserData, meRequestAsync, useAppDispatch } from '../store/actions';

export function useUserData() {
  const data = useSelector<RootState, IUserData>(state => state.userData.data);
  const loading = useSelector<RootState, boolean>(state => state.userData.loading);
  const error = useSelector<RootState, Error | null>(state => state.userData.error);
  const token = useSelector<RootState, string | null>(state => state.comment.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(meRequestAsync());
  }, [token, dispatch]);

  return { data, loading, error };
}