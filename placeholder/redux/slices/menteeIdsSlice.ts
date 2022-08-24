import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Types } from "mongoose";

const initialState: Types.ObjectId[] = []; 

export const menteeIds = createSlice({
  name: "mentor ids",
  initialState,
  reducers: {
    addMenteeId: (state, action: PayloadAction<Types.ObjectId>) => {
      state.concat([action.payload])
      return state;
    }
  }
})

export const { addMenteeId } = menteeIds.actions;
export default menteeIds.reducer;