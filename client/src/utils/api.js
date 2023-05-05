import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

<<<<<<< HEAD
// Create an instance of axios
=======
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
<<<<<<< HEAD
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/
=======
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
