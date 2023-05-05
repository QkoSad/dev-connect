<<<<<<< HEAD
import api from './api';

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
=======
import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem(('token'), token)
  } else {
    delete axios.defaults.common["x-auth-token"];
    localStorage.removeItem('token')
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
  }
};

export default setAuthToken;
