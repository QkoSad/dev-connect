import api from "../utils/api";
import { createAlert } from "./alert";
import {
  loginSucces,
  authError,
  registerSuccess,
  logOut,
  userLoaded,
} from "../reducers/auth";
/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

export const login = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const res = await api.post("/auth", body);

    dispatch(loginSucces(res.data));

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(createAlert(error.msg, "danger")));
    }
    dispatch({
      type: "auth/loginFail",
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");

    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authError());
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users", formData);

    dispatch(registerSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(createAlert(error.msg, "danger")));
    }

    dispatch({
      type: "auth/registerFail",
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logOut);
};
