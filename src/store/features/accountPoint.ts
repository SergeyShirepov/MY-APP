import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export interface AccountPointState {
  accountPoint: string;
}

const initialState: AccountPointState = {
  accountPoint: "",
};

const accountPointSlice = createSlice({
  name: "accountPoint",
  initialState,
  reducers: {
    setAccountPoint(state, action: PayloadAction<string>) {
      state.accountPoint = action.payload;
    },
  },
});

export const { setAccountPoint } = accountPointSlice.actions;
export const selectAccountPoint = (state: RootState) =>
  state.accountPoint.accountPoint;
export default accountPointSlice.reducer;
