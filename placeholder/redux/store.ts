import { configureStore } from "@reduxjs/toolkit";
import beginnerFormReducer from "./beginnerFormSlice";

export const store = configureStore({
  reducer: {
    beginnerForm: beginnerFormReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;