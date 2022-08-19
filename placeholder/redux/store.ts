import { configureStore } from "@reduxjs/toolkit";
import mentorPreferencesReducer from "./slices/mentorPreferencesSlice";
// import nonBeginnerFormReducer from "./slices/menteePreferencesSlice";
import userInfoSlice from "./slices/userInfoSlice";

export const store = configureStore({
  reducer: {
    mentorPreferences: mentorPreferencesReducer,
    // nonBeginnerForm: nonBeginnerFormReducer,
    userInfo: userInfoSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;