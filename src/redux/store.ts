import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./base/baseApi";
import authReducer from "./feature/auth/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Persist auth state to localStorage on every change
store.subscribe(() => {
  if (typeof window === "undefined") return;
  try {
    const { auth } = store.getState();
    localStorage.setItem("auth", JSON.stringify(auth));
  } catch {
    // ignore write errors
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
