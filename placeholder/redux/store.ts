import { configureStore } from "@reduxjs/toolkit";
import beginnerFormReducer from "./slices/beginnerFormSlice";
import nonBeginnerFormReducer from "./slices/nonBeginnerFormSlice";

export const store = configureStore({
  reducer: {
    beginnerForm: beginnerFormReducer,
    nonBeginnerForm: nonBeginnerFormReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;