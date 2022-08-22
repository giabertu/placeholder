import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MentorPreferencesState, TechnologyObj } from "../types";
import { StaticImageData } from "next/image";

const initialState: MentorPreferencesState = {
  desiredCategories: [],
  desiredTechnologies: [],
  desiredCareers: []
};

export const mentorPreferencesSlice = createSlice({
  name: "mentor preferences",
  initialState,
  reducers: {
    setDesiredCategories (state: MentorPreferencesState, action: PayloadAction<string[]>) {
      state.desiredCategories = action.payload;
      return state
    },
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
    setDesiredTechnologies(state, action: PayloadAction<TechnologyObj[] | string[]>) {
      state.desiredTechnologies = action.payload
      return state;
    },
    toggleDesiredTechnologies: (state, action: PayloadAction<TechnologyObj | string>) => {
      // remove all technologies if user says they're unsure about technology selection
      if (typeof action.payload === "string") {
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
      state.desiredTechnologies = state.desiredTechnologies.filter((x) => x !== "general")
      const index = state.desiredTechnologies.findIndex((x) => typeof x !== "string" && typeof action.payload !== "string" && x.name === action.payload.name)
      if (index !== -1) {
        state.desiredTechnologies.splice(index, 1);
      }
      else {
        state.desiredTechnologies.push(action.payload);
      }
      return state;
    },
    setDesiredCareers (state, action: PayloadAction<string[]>) {
      state.desiredCareers = action.payload
      return state;
    },
    changeDesiredCareers: (state, action: PayloadAction<string>) => {
      // remove all careers if user says they're unsure about career selection
      if (action.payload === "general") {
        if (state.desiredCareers.includes("general")) {
          state.desiredCareers = [];
          return state;
        }
        else {
          state.desiredCareers = ["general"];
          return state;
        }
      }
      // toggle career selection
      state.desiredCareers = state.desiredCareers.filter((x) => x !== "general")
      const index = state.desiredCareers.indexOf(action.payload)
      if (index !== -1) {
        state.desiredCareers.splice(index, 1);
      }
      else {
        state.desiredCareers.push(action.payload);
      }
      return state;
    }
  }
})

export const { 
  changeDesiredCategory, toggleDesiredTechnologies, changeDesiredCareers, setDesiredTechnologies, setDesiredCareers, setDesiredCategories
  }  = mentorPreferencesSlice.actions;
export default mentorPreferencesSlice.reducer;