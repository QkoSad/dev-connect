import api from "../utils/api";
import { createAlert } from "./alert";
import {
  noRepos,
  getRepos,
  clearProfile,
  profileError,
  getProfilesType,
  updateProfile,
  getProfile,
} from "../reducers/profile";
import { accountDeleted } from "../reducers/auth";


// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profile/me");

    dispatch(getProfile(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch(clearProfile());

  try {
    const res = await api.get("/profile");

    dispatch(getProfilesType(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/user/${userId}`);

    dispatch(getProfile(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/github/${username}`);

    dispatch(getRepos(res.data));
  } catch (err) {
    dispatch(noRepos());
  }
};

// Create or update profile
export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post("/profile", formData);

      dispatch(getProfile(res.data));

      dispatch(
        createAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(createAlert(error.msg, "danger")));
      }

      dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };

// Add Experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const res = await api.put("/profile/experience", formData);

    dispatch(updateProfile(res.data));

    dispatch(createAlert("Experience Added", "success"));

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(createAlert(error.msg, "danger")));
    }

    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Add Education
export const addEducation = (formData) => async (dispatch) => {
  try {
    const res = await api.put("/profile/education", formData);

    dispatch(updateProfile(res.data));

    dispatch(createAlert("Education Added", "success"));

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(createAlert(error.msg, "danger")));
    }

    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`);

    dispatch(updateProfile(res.data));

    dispatch(createAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/education/${id}`);

    dispatch(updateProfile(res.data));

    dispatch(createAlert("Education Removed", "success"));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await api.delete("/profile");

      dispatch(clearProfile());
      dispatch(accountDeleted());

      dispatch(createAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
};
