import { v4 as uuidv4 } from "uuid";
import { removeAlert, setAlert } from "../reducers/alert";
import { AppThunk } from "../types";

export const createAlert =
  (msg: string, alertType: string, timeout = 5000): AppThunk =>
  (dispatch) => {
    const id = uuidv4();
    dispatch(setAlert({ msg, alertType, id }));

    setTimeout(() => dispatch(removeAlert(id)), timeout);
  };
