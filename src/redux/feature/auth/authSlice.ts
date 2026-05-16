import { createSlice } from "@reduxjs/toolkit";

type TUser = {
  id: string;
  email: string;
  role: "Admin" | "Manager" | "Sales Executive" | "Agent" | "User";
  iat: number;
  exp: number;
  subscription?: any; // Added subscription field
};

type TInitialState = {
  user: null | { user: TUser; token: string };
  token: null | string;
};

const loadAuth = (): TInitialState => {
  if (typeof window === "undefined") return { user: null, token: null };
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuth,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload?.token ?? null;
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state));
      }
    },
    updateSubscription: (state, action) => {
      if (state.user) {
        state.user.user = {
          ...state.user.user,
          subscription: action.payload,
        };
        if (typeof window !== "undefined") {
          localStorage.setItem("auth", JSON.stringify(state));
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
  },
});

export const { setUser, logout, updateSubscription } = authSlice.actions;
export default authSlice.reducer;
