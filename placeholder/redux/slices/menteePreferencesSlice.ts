import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenteePreferencesState, TechnologyObj } from "../types";
import { StaticImageData } from "next/image";

const initialState: MenteePreferencesState = {
  desiredCategories: [],
};

export const menteePreferencesSlice = createSlice({
  name: "mentee preferences",
  initialState,
  reducers: {
    setMenteeDesiredCategories(state, action: PayloadAction<string[]>) {
      state.desiredCategories = action.payload;
      return state;
    },
    changeDesiredCategory: (state, action: PayloadAction<string>) => {
      // toggle mentee purpose selection
      const index = state.desiredCategories.indexOf(action.payload);
      if (index !== -1) {
        state.desiredCategories.splice(index, 1);
      }
      else {
        state.desiredCategories.push(action.payload);
      }
      return state;
    }
  }
})

export const { changeDesiredCategory, setMenteeDesiredCategories } = menteePreferencesSlice.actions;
export default menteePreferencesSlice.reducer;