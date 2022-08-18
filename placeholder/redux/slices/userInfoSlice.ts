import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserInfoState } from "../types";

const initialState: UserInfoState = {
  level: ""
};

export const userInfoSlice = createSlice({
  name: "user info",
  initialState,
  reducers: {
    changeUserLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
      return state;
    }
  }
})

export const { changeUserLevel } = userInfoSlice.actions;
export default userInfoSlice.reducer;