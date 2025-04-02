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
  async (dispatch, getState) => {
    const { token, data } = getState().userData;
    if (!token || (data && data.name)) return;

    dispatch(meRequest());

    try {
      // 1. Получаем данные пользователя из вашего API
      const meResponse = await fetch('/api/me', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!meResponse.ok) throw meResponse;
      const redditUserData = await meResponse.json();
      console.log(redditUserData);

      // 2. Отправляем данные для создания/обновления в MongoDB
      const mongoResponse = await fetch('/api/user/upsert', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: redditUserData.name,
          iconImg: redditUserData.icon_img,
          redditId: redditUserData.id
        })
      });

      if (!mongoResponse.ok) throw mongoResponse;
      const mongoUserData = await mongoResponse.json();

      // 3. Сохраняем полученные данные в Redux
      dispatch(meRequestSuccess({
        name: mongoUserData.name,
        iconImg: mongoUserData.iconImg,
        id: mongoUserData.redditId,
        created: mongoUserData.created,
        lastLogin: mongoUserData.lastLogin
      }));

    } catch (error) {
      const err = error as Response;
      const errorData = await err.json().catch(() => ({ error: 'Шибка' }));
      
      dispatch(meRequestError({
        message: errorData.error || 'Ошибка получения данных',
        code: err.status || 500,
      }));
    }
  };