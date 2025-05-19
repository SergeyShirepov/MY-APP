import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export interface SearchState {
  searchBy: string;
}

const initialState: SearchState = { searchBy: "" };

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchBy(state, action: PayloadAction<string>) {
      state.searchBy = action.payload;
    },
  },
});

export const { setSearchBy } = searchSlice.actions;
export const selectSearchBy = (state: RootState) => state.search.searchBy;
export default searchSlice.reducer;
