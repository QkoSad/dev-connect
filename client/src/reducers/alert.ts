import { createSlice } from "@reduxjs/toolkit";
import type { Alert } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

type AlertState = Alert[];

const initialState: AlertState = [];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert(state, action: PayloadAction<Alert>) {
      return [...state, action.payload];
    },
    removeAlert(state, action: PayloadAction<string>) {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
