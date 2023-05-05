import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
<<<<<<< HEAD
  NO_REPOS
} from '../actions/types';
=======
  NO_REPOS,
} from "../actions/types";
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
<<<<<<< HEAD
  error: {}
=======
  error: {},
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
<<<<<<< HEAD
        loading: false
=======
        loading: false,
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
<<<<<<< HEAD
        loading: false
=======
        loading: false,
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
<<<<<<< HEAD
        profile: null
=======
        profile: null,
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
<<<<<<< HEAD
        repos: []
=======
        repos: [],
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
<<<<<<< HEAD
        loading: false
=======
        loading: false,
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
      };
    case NO_REPOS:
      return {
        ...state,
<<<<<<< HEAD
        repos: []
=======
        repos: [],
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
      };
    default:
      return state;
  }
}

export default profileReducer;
