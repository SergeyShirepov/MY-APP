import { useEffect, useState } from 'react';
import { RootState, store } from '../store/store';
import { setToken } from '../store/store';



export function useToken(): [string | null] {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || window.__token__;
    if (token) {
      localStorage.setItem('token', token);
      store.dispatch(setToken(token));
      setTokenState(token);
    }
  }, []);

  return [token];
}