import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RootState = {
    commentText: string;
  };
  
  const initialState: RootState = {
    commentText: 'Privet',
  };
  
  export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
      updateComment(state, action: PayloadAction<string>) {
        state.commentText = action.payload;
      },
    },
  });
  
  
  const { actions, reducer } = commentSlice;
  export const { updateComment } = actions;
  
  // Configure the Redux store
  export const store = configureStore({
    reducer,
  });