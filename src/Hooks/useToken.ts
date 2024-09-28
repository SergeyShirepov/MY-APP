import React, { useEffect, useState } from 'react';

export function useToken() {
  // Инициализируем токен значением initialToken, если оно есть
  const [token, setToken] = useState('');

  useEffect(() => {
    if (window.__token__) {
      setToken(window.__token__);
    }
  }, []);

  return [token];
}
