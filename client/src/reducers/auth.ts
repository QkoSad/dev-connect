import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";

interface authState {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: User | null;
}

const initialState: authState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoaded(state, action: PayloadAction<User>) {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    },
    registerSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    loginSucces(state, action) {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    accountDeleted(state) {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    },
    authError(state) {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    },
    logOut(state) {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    },
  },
});
export const {
  logOut,
  userLoaded,
  loginSucces,
  registerSuccess,
  accountDeleted,
  authError,
} = authSlice.actions;

export default authSlice.reducer;
