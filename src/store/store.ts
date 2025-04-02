import { configureStore, createSlice, PayloadAction, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { ME_REQUEST, ME_REQUEST_SUCCESS, ME_REQUEST_ERROR } from './actions';

// Определение типа для состояния пользователя
interface IUserData {
  name?: string;
  iconImg?: string;
}

// Обновляем тип RootState
export type RootState = {
  comment: {
    commentText: string;
  };
  userData: {
    loading: boolean;
    error: Error | null;
    data: IUserData;
    token: string | null;
  };
};

// Начальное состояние для комментариев
const initialCommentState = {
  commentText: '',
};

// Слайс для комментариев
const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {
    updateComment(state, action: PayloadAction<string>) {
      state.commentText = action.payload;
    },
  },
});

// Начальное состояние для пользовательских данных
const initialUserDataState = {
  loading: false,
  error: null as Error | null,
  data: {} as IUserData,
  token: null as string | null,
};

// Слайс для пользовательских данных
const userDataSlice = createSlice({
  name: 'userData',
  initialState: initialUserDataState,
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
      .addCase(ME_REQUEST_SUCCESS, (state, action: { type: typeof ME_REQUEST_SUCCESS; data: IUserData }) => {
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

// Начальное состояние для сортировки
const initialSortState = {
  sortBy: '',
};

// Слайс для сортировки
const sortBySlice = createSlice({
  name: 'sortBy',
  initialState: initialSortState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

// Комбинируем редьюсеры
const rootReducer = combineReducers({
  comment: commentSlice.reducer,
  userData: userDataSlice.reducer,
  sortBy: sortBySlice.reducer,
});

// Экспортируем actions из обоих слайсов
export const { updateComment } = commentSlice.actions;
export const { setToken } = userDataSlice.actions;
export const { setSortBy } = sortBySlice.actions;

// Настраиваем хранилище
export const store = configureStore({
  reducer: rootReducer,
});

// Тип для dispatch
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;