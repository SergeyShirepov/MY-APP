import { useEffect, useState } from 'react';
import { store } from '../store/store';
import { setToken } from '../store/store';

export function useToken(): [string | null] {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect( () => {
    
    const fetchToken = async () => {
    try {
      // Запрос к серверу для получения токена из кук
      const response = await fetch('/api/token', { credentials: 'include' })
      const data = await response.json();
      if (data.token) {
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