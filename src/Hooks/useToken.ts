import { useEffect, useState } from 'react';
import { RootState, store } from '../store';
import { setToken } from '../store'; // Импортируем setToken
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';


const timeout = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) =>{
  dispatch({ type: 'START'});
  setTimeout(() => {
  dispatch({ type: 'FINISH'});
  }, 1500)
}

export function useToken(): [string | null] {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || window.__token__;
      store.dispatch(setToken(token)); // setToken возвращает объект действия
      store.dispatch(timeout());
    if (token) {
      localStorage.setItem('token', token);
      setTokenState(token); // Обновляем локальное состояние
    }
  }, []);

  return [token];
}