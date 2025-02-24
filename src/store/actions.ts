import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState, store } from './store';
import { useDispatch } from 'react-redux';

// Тип для AppDispatch
export type AppDispatch = typeof store.dispatch;

// Тип для ThunkAction
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Хук useAppDispatch для типизированного dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Типы для действий
export const ME_REQUEST = 'ME_REQUEST';

export type MeRequestAction = {
  type: typeof ME_REQUEST;
};
export const meRequest: ActionCreator<MeRequestAction> = () => ({
  type: ME_REQUEST,
});

export interface IUserData {
  name?: string;
  iconImg?: string;
}

export const ME_REQUEST_SUCCESS = 'ME_REQUEST_SUCCESS';
export type MeRequestSuccessAction = {
  type: typeof ME_REQUEST_SUCCESS;
  data: IUserData;
};
export const meRequestSuccess: ActionCreator<MeRequestSuccessAction> = (data: IUserData) => {
  console.log('meRequestSuccess called with data:', data);
  return {
    type: ME_REQUEST_SUCCESS,
    data,
  };
};

export const ME_REQUEST_ERROR = 'ME_REQUEST_ERROR';
export type MeRequestErrorAction = {
  type: typeof ME_REQUEST_ERROR;
  error: {
    message: string;
    code: number;
  };
};
export const meRequestError: ActionCreator<MeRequestErrorAction> = (error: { message: string; code: number }) => ({
  type: ME_REQUEST_ERROR,
  error,
});

// Асинхронное действие
export const meRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => 
  (dispatch, getState) => {
    const { token, data } = getState().userData;

    if (!token || (data && data.name)) return;

    dispatch(meRequest());

    // Запрос к вашему серверу вместо прямого запроса к Reddit API
    fetch('/api/me', {
      credentials: 'include', // Для передачи кук
    })
      .then(response => {
        if (!response.ok) throw response;
        return response.json();
      })
      .then((userData: { name: string; icon_img: string }) => {
        dispatch(meRequestSuccess({ 
          name: userData.name, 
          iconImg: userData.icon_img 
        }));
      })
      .catch(error => {
        error.json().then((errData: { error: string }) => {
          dispatch(meRequestError({
            message: errData.error || 'Unknown error',
            code: error.status || 500,
          }));
        });
      });
  };