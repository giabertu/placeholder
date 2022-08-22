import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenteePreferencesState, TechnologyObj } from "../types";

const initialState: MenteePreferencesState = {
  desiredCategories: [],
  desiredTechnologies: []
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
    },
    toggleDesiredTechnologies: (state, action: PayloadAction<TechnologyObj>) => {
      const index = state.desiredTechnologies.findIndex((x) => x.name === action.payload.name);
      if (index !== -1) {
        state.desiredTechnologies.splice(index, 1);
      }
      else {
        state.desiredTechnologies.push(action.payload);
      }
      return state;
    }
  }
});

export const { changeDesiredCategory, toggleDesiredTechnologies } = menteePreferencesSlice.actions;
export default menteePreferencesSlice.reducer;