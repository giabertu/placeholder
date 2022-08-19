import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserInfoState } from "../types";

const initialState: UserInfoState = {
  level: "",
  developerField: null
};

export const userInfoSlice = createSlice({
  name: "user info",
  initialState,
  reducers: {
    changeUserLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
      return state;
    },
    changeUserDeveloperField: (state, action: PayloadAction<string>) => {
      state.developerField = action.payload;
      return state;
    }
  }
})

export const { changeUserLevel, changeUserDeveloperField } = userInfoSlice.actions;
export default userInfoSlice.reducer;