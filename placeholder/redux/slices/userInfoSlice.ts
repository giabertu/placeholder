import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TechnologyObj, UserInfoState } from "../types";

const initialState: UserInfoState = {
  level: "",
  developerField: null,
  experiencedWithTechnologies: [],
  purpose: ""
};

export const userInfoSlice = createSlice({
  name: "user info",
  initialState,
  reducers: {
    changeLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
      return state;
    },
    changeDeveloperField: (state, action: PayloadAction<string>) => {
      state.developerField = action.payload;
      return state;
    },
    setExpriencedWithTechnologies (state, action: PayloadAction<TechnologyObj[]>) {
      state.experiencedWithTechnologies = action.payload;
      return state;
    },
    changeExperiencedWithTechnologies: (state, action: PayloadAction<TechnologyObj>) => {
      // toggle technology selection
      const index = state.experiencedWithTechnologies.findIndex((x) => x.name === action.payload.name)
      if (index !== -1) {
        state.experiencedWithTechnologies.splice(index, 1);
      }
      else {
        state.experiencedWithTechnologies.push(action.payload);
      }
      return state;
    },
    changePurpose: (state, action: PayloadAction<string>) => {
      state.purpose = action.payload;
      return state;
    }
  }
})

export const { changeLevel, changeDeveloperField, changeExperiencedWithTechnologies, changePurpose, setExpriencedWithTechnologies } = userInfoSlice.actions;
export default userInfoSlice.reducer;