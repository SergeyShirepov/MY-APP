import {
    createSlice,
    PayloadAction,
    ThunkAction,
    Action,
    ActionCreator,
  } from "@reduxjs/toolkit";
  import type { RootState } from "../index";
  
  export interface UserData {
    name?: string;
    iconImg?: string;
  }
  
  export interface UserState {
    loading: boolean;
    error: Error | null;
    data: UserData | null;
    token: string | null;
  }
  
  const initialState: UserState = {
    loading: false,
    error: null,
    data: null,
    token: null,
  };

  
export const ME_REQUEST = 'ME_REQUEST'

  export type MeRequestAction = {
    type: typeof ME_REQUEST;
  };

  export const meRequest: ActionCreator<MeRequestAction> = () => ({
    type: ME_REQUEST,
  });

  export const ME_REQUEST_SUCCESS = 'ME_REQUEST_SUCCESS';
  export type MeRequestSuccessAction = {
    type: typeof ME_REQUEST_SUCCESS;
    data: UserData;
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

  export const meRequestSuccess: ActionCreator<MeRequestSuccessAction> = (data: UserData) => {
    return {
      type: ME_REQUEST_SUCCESS,
      data,
    };
  };
  
  // Асинхронное действие
  export const meRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => 
  
    async (dispatch, getState) => {
      
      const { token, data, loading } = getState().user;
      if (!token || (data && data.name) || loading) return;
  
      try {
        dispatch(meRequest());
        
        // 1. Получаем данные пользователя из вашего API
        const meResponse = await fetch('/api/me', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!meResponse.ok) throw meResponse;
        const redditUserData = await meResponse.json();
  
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
        const errorData = await err.json().catch(() => ({ error: 'Ошибка' }));
        
        dispatch(meRequestError({
          message: errorData.error || 'Ошибка получения данных',
          code: err.status || 500,
        }));
      }
    };
  
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setToken(state, action: PayloadAction<string | null>) {
        state.token = action.payload;
      },
    },
  extraReducers: (builder) => {
    builder
      .addCase(ME_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ME_REQUEST_SUCCESS, (state, action: { type: typeof ME_REQUEST_SUCCESS; data: UserData }) => {
        state.loading = false;
        state.error = null;
        state.data = {
          name: action.data.name,
          iconImg: action.data.iconImg
        };
      })
      .addCase(ME_REQUEST_ERROR, (state, action: { type: typeof ME_REQUEST_ERROR; error: Error }) => {
        state.loading = false;
        state.error = action.error;
        state.data = {};
      });
  }
  });
  
  export const { setToken } = userSlice.actions;
  export const selectUser = (state: RootState) => state.user.data;
  export default userSlice.reducer;
  