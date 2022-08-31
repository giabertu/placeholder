import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TechnologyObj, UserInfoState } from "../types";

const initialState = false; 

export const darkMode = createSlice({
  name: "dark mode",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state = action.payload;
      return state
    },
    toggleDarkMode: (state, action: PayloadAction<string>) => {
      state = !state;
      return state;
    }
  }
})

export const { toggleDarkMode, setDarkMode } = darkMode.actions;
export default darkMode.reducer;