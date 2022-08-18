import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BeginnerFormState } from "../types";

const initialState: BeginnerFormState = {
  mentorFor: [],
  interestedTechnologies: [],
  interestedCareers: [],
};

export const beginnerFormSlice = createSlice({
  name: "beginner form",
  initialState,
  reducers: {
    beginnerChangeMentorFor: (state, action: PayloadAction<string>) => {
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
    beginnerChangeInterestedTechnologies: (state, action: PayloadAction<string>) => {
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
    },
    beginnerChangeInterestedCareers: (state, action: PayloadAction<string>) => {
      // remove all technologies if user says they're unsure about technology selection
      if (action.payload === "I'm unsure at this stage") {
        if (state.interestedCareers.includes("I'm unsure at this stage")) {
          
          state.interestedCareers = [];
          return state;
        }
        else {
          state.interestedCareers = ["I'm unsure at this stage"];
          return state;
        }
      }
      // toggle careers selection
      const index = state.interestedCareers.indexOf(action.payload);
      if (index !== -1) {
        state.interestedCareers.splice(index, 1);
      }
      else {
        state.interestedCareers.push(action.payload);
      }
      return state;
    }
  }
})

export const { beginnerChangeMentorFor, beginnerChangeInterestedTechnologies, beginnerChangeInterestedCareers} = beginnerFormSlice.actions;
export default beginnerFormSlice.reducer;