import { createSlice } from "@reduxjs/toolkit";
import { Repo, ProfileType } from "../types";

type ProfileState = {
  profile: ProfileType | null;
  profiles: ProfileType[];
  repos: Repo[];
  loading: boolean;
  error: {};
};

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile(state, action) {
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    },
    updateProfile(state, action) {
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    },
    getProfilesType(state, action) {
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    },
    profileError(state, action) {
      return {
        ...state,
        error: action.payload,
        loading: false,
        profile: null,
      };
    },
    clearProfile(state) {
      return {
        ...state,
        profile: null,
        repos: [],
      };
    },
    getRepos(state, action) {
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    },
    noRepos(state) {
      return {
        ...state,
        repos: [],
      };
    },
  },
});
export const {
  noRepos,
  getRepos,
  clearProfile,
  profileError,
  getProfilesType,
  updateProfile,
  getProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
