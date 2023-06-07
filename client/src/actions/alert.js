import { v4 as uuidv4 } from 'uuid';
import {removeAlert, setAlert } from '../reducers/alert';

export const createAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch(setAlert({ msg, alertType, id }));

  setTimeout(() => dispatch(removeAlert(id)), timeout);
};
