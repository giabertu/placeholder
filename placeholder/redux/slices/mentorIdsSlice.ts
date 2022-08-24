import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Types } from "mongoose";

const initialState: Types.ObjectId[] = []; 

export const mentorIds = createSlice({
  name: "mentor ids",
  initialState,
  reducers: {
    addMentorId: (state, action: PayloadAction<Types.ObjectId>) => {
      console.log('Action payload! ', typeof action.payload)
      // state.push(action.payload.toString())
      state.push(action.payload)
      console.log('New State!! ', current(state))
      return state;
    }
  }
})

export const { addMentorId } = mentorIds.actions;
export default mentorIds.reducer;