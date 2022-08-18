import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MentorPreferencesState } from "../types";

const initialState: MentorPreferencesState = {
  desiredCategories: [],
  desiredTechnologies: [],
};

export const mentorPreferencesSlice = createSlice({
  name: "mentor preferences",
  initialState,
  reducers: {
    changeDesiredCategory: (state, action: PayloadAction<string>) => {
      // toggle mentor purpose selection
      const index = state.desiredCategories.indexOf(action.payload);
      if (index !== -1) {
        state.desiredCategories.splice(index, 1);
      }
      else {
        state.desiredCategories.push(action.payload);
      }
      return state;
    },
    changeDesiredTechnologies: (state, action: PayloadAction<string>) => {
      // remove all technologies if user says they're unsure about technology selection
      if (action.payload === "general") {
        if (state.desiredTechnologies.includes("general")) {
          state.desiredTechnologies = [];
          return state;
        }
        else {
          state.desiredTechnologies = ["general"];
          return state;
        }
      }
      // toggle technology selection
      const index = state.desiredTechnologies.indexOf(action.payload)
      if (index !== -1) {
        state.desiredTechnologies.splice(index, 1);
      }
      else {
        state.desiredTechnologies.push(action.payload);
      }
      return state;
    }
  }
})

export const { changeDesiredCategory, changeDesiredTechnologies} = mentorPreferencesSlice.actions;
export default mentorPreferencesSlice.reducer;