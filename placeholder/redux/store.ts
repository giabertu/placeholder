import { configureStore } from "@reduxjs/toolkit";
import mentorPreferencesReducer from "./slices/mentorPreferencesSlice";
import menteePreferencesSliceReducer from "./slices/menteePreferencesSlice";
// import nonBeginnerFormReducer from "./slices/menteePreferencesSlice";
import userInfoSlice from "./slices/userInfoSlice";
// import registeredUserSlice from "./slices/registeredUserSlice";

export const store = configureStore({
  reducer: {
    mentorPreferences: mentorPreferencesReducer,
    menteePreferences: menteePreferencesSliceReducer,
    userInfo: userInfoSlice,
    // registeredUser: registeredUserSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;