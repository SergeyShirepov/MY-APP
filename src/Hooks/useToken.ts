import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setToken } from '../store/features/user';
import { RootState, store } from '../store';

export function useToken(): [string | null] {
  const [token, setTokenState] = useState<string | null>(null);
  const reduxToken = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/token', { credentials: 'include' });
        const data = await response.json();

        if (data.token !== reduxToken) {
          store.dispatch(setToken(data.token));
          setTokenState(data.token);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  return [token];
}