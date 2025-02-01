import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, store } from "./store";
import axios from 'axios';
import { useDispatch } from "react-redux";




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
}
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
}
export const meRequestSuccess: ActionCreator<MeRequestSuccessAction> = (data: IUserData) => {
  console.log('meRequestSuccess called with data:', data);
  return {
    type: ME_REQUEST_SUCCESS,
    data
  };
};

export const ME_REQUEST_ERROR = 'ME_REQUEST_ERROR';
export type MeRequestErrorAction = {
    type: typeof ME_REQUEST_ERROR;
    error: Error;
}
export const meRequestError: ActionCreator<MeRequestErrorAction> = (error: Error) => ({
    type: ME_REQUEST_ERROR,
    error,
});

// Тип для ответа от Reddit API
interface IRedditMeResponse {
  name: string;
  icon_img: string;
}

// Асинхронное действие
export const meRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => 
  (dispatch, getState) => {
    const { token } = getState().comment;
    const { data } = getState().userData;

    if (!token || (data && data.name)) return;

    dispatch(meRequest());
    
    console.log('Making API request with token:', token);
    
    axios.get<IRedditMeResponse>('https://oauth.reddit.com/api/v1/me', {
      headers: { Authorization: `bearer ${token}` }
    })
      .then((resp) => {
        const userData = resp.data;
        console.log('API response:', userData);
        dispatch(meRequestSuccess({ 
          name: userData.name, 
          iconImg: userData.icon_img 
        }));
      })
      .catch((error) => {
        console.error('API error:', error);
        dispatch(meRequestError(error instanceof Error ? error : new Error('An unknown error occurred')));
      });
  };