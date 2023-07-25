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
import { AxiosError } from "axios";
import { AppThunk, EducationType, ExperienceType } from "../types";

const errorHandle = (dispatch: any, err: unknown) => {
  if (err instanceof AxiosError) {
    if (err !== undefined && 'response' in err && err.response !== undefined) {
      dispatch(profileError({ msg: err.response.statusText, status: err.response.status, }), err)
    }
  }
}
// Get current users profile
export const getCurrentProfile = (): AppThunk<Promise<void>> => async (dispatch) => {
  try {
    const res = await api.get("/profile/me");

    dispatch(getProfile(res.data));
  } catch (err: unknown) {
    errorHandle(dispatch, err)

  }
}
// Get all profiles
export const getProfiles = (): AppThunk<Promise<void>> => async (dispatch) => {
  dispatch(clearProfile());
  try {
    const res = await api.get("/profile");

    dispatch(getProfilesType(res.data));
  } catch (err: unknown) {
    errorHandle(dispatch, err)
  }
};

// Get profile by ID
export const getProfileById = (userId: string): AppThunk<Promise<void>> => async (dispatch) => {
  try {
    const res = await api.get(`/profile/user/${userId}`);

    dispatch(getProfile(res.data));
  } catch (err: unknown) {
    errorHandle(dispatch, err)
  }
};

// Get Github repos
export const getGithubRepos = (username: string): AppThunk<Promise<void>> => async (dispatch) => {
  try {
    const res = await api.get(`/profile/github/${username}`);

    dispatch(getRepos(res.data));
  } catch (err: unknown) {
    dispatch(noRepos());
  }
};

// Create or update profile
type FormDataType = {
  company: string,
  website: string,
  location: string,
  status: string,
  skills: string,
  githubusername: string,
  bio: string,
  twitter: string,
  facebook: string,
  linkedin: string,
  youtube: string,
  instagram: string,
}
export const createProfile =
  (formData: FormDataType, edit = false): AppThunk<Promise<void>> =>
    async (dispatch) => {
      try {
        const res = await api.post("/profile", formData);

        dispatch(getProfile(res.data));

        dispatch(
          createAlert(edit ? "Profile Updated" : "Profile Created", "success")
        );

      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err !== undefined && 'response' in err && err.response !== undefined) {
            const errors = err.response.data.errors;
            if (errors) {
              errors.forEach((error: any) => dispatch(createAlert(error.msg, "danger")));
            }
            dispatch(
              profileError({
                msg: err.response.statusText,
                status: err.response.status,
              })
            );
          }
        }
      }
    };

// Add Experience
export const addExperience = (formData: Omit<ExperienceType, '_id'>): AppThunk<Promise<void>> => async (dispatch) => {
  try {
    const res = await api.put("/profile/experience", formData);

    dispatch(updateProfile(res.data));

    dispatch(createAlert("Experience Added", "success"));

  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err !== undefined && 'response' in err && err.response !== undefined) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error: any) => dispatch(createAlert(error.msg, "danger")));
        }

        dispatch(
          profileError({
            msg: err.response.statusText,
            status: err.response.status,
          })
        );
      }
    }
  }
};

// Add Education
export const addEducation = (formData: Omit<EducationType, '_id'>): AppThunk<Promise<void>> => async (dispatch) => {
  try {
    const res = await api.put("/profile/education", formData);

    dispatch(updateProfile(res.data));

    dispatch(createAlert("Education Added", "success"));

  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err !== undefined && 'response' in err && err.response !== undefined) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error: any) => dispatch(createAlert(error.msg, "danger")));
        }

        dispatch(
          profileError({
            msg: err.response.statusText,
            status: err.response.status,
          })
        );
      }
    }
  }
};

// Delete experience
export const deleteExperience = (id: string): AppThunk<Promise<void>> => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`);

    dispatch(updateProfile(res.data));

    dispatch(createAlert("Experience Removed", "success"));
  } catch (err: unknown) {
    errorHandle(dispatch, err)
  }
};

// Delete education
export const deleteEducation = (id: string): AppThunk<Promise<void>> => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/education/${id}`);

    dispatch(updateProfile(res.data));

    dispatch(createAlert("Education Removed", "success"));
  } catch (err: unknown) {
    errorHandle(dispatch, err)
  }
};

// Delete account & profile
export const deleteAccount = (): AppThunk<Promise<void>> => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await api.delete("/profile");

      dispatch(clearProfile());
      dispatch(accountDeleted());

      dispatch(createAlert("Your account has been permanently deleted", "danger"));
    } catch (err: unknown) {
      errorHandle(dispatch, err)
    }
  }
};
