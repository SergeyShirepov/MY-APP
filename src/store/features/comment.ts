import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export interface CommentState {
  commentText: string;
}

const initialState: CommentState = {
  commentText: "",
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentText(state, action: PayloadAction<string>) {
      state.commentText = action.payload;
    },
  },
});

export const { setCommentText } = commentSlice.actions;

// 4) Селектор
export const selectCommentText = (state: RootState) =>
  state.comment.commentText;

// 5) Редьюсер по умолчанию
export default commentSlice.reducer;
