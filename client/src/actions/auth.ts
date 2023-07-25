import api from "../utils/api";
import { createAlert } from "./alert";
import {
  loginSucces,
  authError,
  registerSuccess,
  logOut,
  userLoaded,
} from "../reducers/auth";
import { AppThunk } from "../types";
import { AxiosError, isAxiosError } from "axios";

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  const body = { email, password };
  try {
    const res = await api.post("/auth", body);

    dispatch(loginSucces(res.data));

    dispatch(loadUser());
  } catch (err: unknown) {
    if (err instanceof AxiosError || err instanceof Error) {
      if (isAxiosError(err) && err.response !== undefined) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error: any) => dispatch(createAlert(error.msg, "danger")));
        }
        dispatch({
          type: "auth/loginFail",
        });
      }
    }
    //normal err
  }
  // not error
}

export const loadUser = (): AppThunk => async (dispatch) => {
  try {
    const res = await api.get("/auth");

    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authError());
  }
};

// Register User
export const register = (formData: { name: string, email: string, password: string }): AppThunk => async (dispatch) => {
  try {
    const res = await api.post("/users", formData);

    dispatch(registerSuccess(res.data));
    dispatch(loadUser());
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err !== undefined && 'response' in err && err.response !== undefined) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error: any) => dispatch(createAlert(error.msg, "danger")));
        }

        dispatch({
          type: "auth/registerFail",
        });
      }
    };
  }
}

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(logOut);
};
