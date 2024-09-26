import React, { useEffect, useState } from 'react';

export function useToken(initialToken: string | undefined) {
  // Инициализируем токен значением initialToken, если оно есть
  const [token, setToken] = useState<string | undefined>(initialToken);

  useEffect(() => {
    // Если в глобальном объекте window существует токен, обновляем состояние
    if (window.__token__) {
      setToken(window.__token__);
    }
  }, []);

  return [token];
}
