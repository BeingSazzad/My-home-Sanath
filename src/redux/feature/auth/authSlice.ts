import { createSlice } from "@reduxjs/toolkit";

type TUser = {
  id: string;
  email: string;
  role: "Admin" | "Manager" | "Sales Executive" | "Agent" | "User";
  iat: number;
  exp: number;
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
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
