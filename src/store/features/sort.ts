import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export interface SortState {
  sortBy: string;
}

const initialState: SortState = {
  sortBy: "",
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortSlice.actions;
export const selectSortBy = (state: RootState) => state.sort.sortBy;
export default sortSlice.reducer;
