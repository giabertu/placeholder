import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserInfoState } from "../types";

const initialState: UserInfoState = {
  level: "",
  developerField: null,
  experiencedWithTechnologies: []
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
    },
    changeExperiencedWithTechnologies: (state, action: PayloadAction<string> ) => {
      // toggle technologies purpose selection
      const index = state.experiencedWithTechnologies.indexOf(action.payload);
      if (index !== -1) {
        state.experiencedWithTechnologies.splice(index, 1);
      }
      else {
        state.experiencedWithTechnologies.push(action.payload);
      }
      return state;
    }
  }
})

export const { changeUserLevel, changeUserDeveloperField, changeExperiencedWithTechnologies } = userInfoSlice.actions;
export default userInfoSlice.reducer;