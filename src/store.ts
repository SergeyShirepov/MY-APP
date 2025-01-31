import { configureStore, createSlice, PayloadAction, ThunkAction, Action } from "@reduxjs/toolkit";


export type RootState = {
    commentText: string;
    token: string | null;
  };
  
  const initialState: RootState = {
    commentText: 'Privet',
    token: null,
  };
  
  export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
      updateComment(state, action: PayloadAction<string>) {
        state.commentText = action.payload;
      },
      setToken(state, action: PayloadAction<string | null>) {
        state.token = action.payload;
      },
    },
  });
  
  
  const { actions, reducer } = commentSlice;
  export const { updateComment, setToken  } = commentSlice.actions;


  

  
  // Configure the Redux store
  export const store = configureStore({
    reducer,
    
  });

function dispatch(arg0: { type: string; }): ThunkAction<void, RootState, unknown, Action<string>> {
  throw new Error("Function not implemented.");
}
