import { configureStore } from "@reduxjs/toolkit";

import commentReducer from "./features/comment";
import searchReducer  from "./features/search";
import sortReducer    from "./features/sort";
import accountPointReducer from "./features/accountPoint";
import userReducer    from "./features/user";

export const store = configureStore({
  reducer: {
    comment: commentReducer,
    search:  searchReducer,
    sort:    sortReducer,
    accountPoint: accountPointReducer,
    user:    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
