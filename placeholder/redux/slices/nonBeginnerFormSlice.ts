import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { nonBeginnerFormState } from "../types";

const initialState: nonBeginnerFormState = {
  mentorFor: [],
  interestedTechnologies: []
};

export const nonBeginnerFormSlice = createSlice({
  name: "non-beginner form",
  initialState,
  reducers: {
    nonBeginnerChangeMentorFor: (state, action: PayloadAction<string>) => {
      // toggle mentor purpose selection
      const index = state.mentorFor.indexOf(action.payload);
      if (index !== -1) {
        state.mentorFor.splice(index, 1);
      }
      else {
        state.mentorFor.push(action.payload);
      }
      return state;
    },
    nonBeginnerChangeInterestedTechnologies: (state, action: PayloadAction<string>) => {
      // remove all technologies if user says they're unsure about technology selection
      if (action.payload === "general") {
        if (state.interestedTechnologies.includes("general")) {
          state.interestedTechnologies = [];
          return state;
        }
        else {
          state.interestedTechnologies = ["general"];
          return state;
        }
      }
      // toggle technology selection
      const index = state.interestedTechnologies.indexOf(action.payload)
      if (index !== -1) {
        state.interestedTechnologies.splice(index, 1);
      }
      else {
        state.interestedTechnologies.push(action.payload);
      }
      return state;
    }
  }
})

export const { nonBeginnerChangeMentorFor, nonBeginnerChangeInterestedTechnologies} = nonBeginnerFormSlice.actions;
export default nonBeginnerFormSlice.reducer;