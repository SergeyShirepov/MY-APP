import { useEffect, useState } from 'react';
import { store } from '../store/store';
import { setToken } from '../store/store';

export function useToken(): [string | null] {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    // Запрос к серверу для получения токена из кук
    fetch('/api/token', {
      credentials: 'include', // Для передачи кук
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch token');
        return response.json();
      })
      .then(data => {
        if (data.token) {
          store.dispatch(setToken(data.token));
          setTokenState(data.token);
        }
      })
      .catch(error => {
        console.error('Error fetching token:', error);
      });
  }, []);

  return [token];
}