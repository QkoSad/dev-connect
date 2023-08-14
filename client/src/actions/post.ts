import {
  removeComment,
  addCommentAction,
  updateLikes,
  postError,
  deletePostAction,
  getPostAction,
  getPostsAction,
  addPostAction,
} from "../reducers/post";
import { AppThunk } from "../types";
import api from "../utils/api";
import { createAlert } from "./alert";
import { AxiosError } from "axios";

// Get posts
export const getPosts = (): AppThunk => async (dispatch) => {
  try {
    const res = await api.get("/posts");

    dispatch(getPostsAction(res.data));
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (
        err !== undefined &&
        "response" in err &&
        err.response !== undefined
      ) {
        dispatch(
          postError({
            msg: err.response.statusText,
            status: err.response.status,
          }),
        );
      }
    }
  }
};

// Add like
export const addLike =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const res = await api.put(`/posts/like/${id}`);

      dispatch(updateLikes({ id, likes: res.data }));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (
          err !== undefined &&
          "response" in err &&
          err.response !== undefined
        ) {
          dispatch(
            postError({
              msg: err.response.statusText,
              status: err.response.status,
            }),
          );
        }
      }
    }
  };

// Remove like
export const removeLike =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const res = await api.put(`/posts/unlike/${id}`);

      dispatch(updateLikes({ id, likes: res.data }));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (
          err !== undefined &&
          "response" in err &&
          err.response !== undefined
        ) {
          dispatch(
            postError({
              msg: err.response.statusText,
              status: err.response.status,
            }),
          );
        }
      }
    }
  };

// Delete post
export const deletePost =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await api.delete(`/posts/${id}`);

      dispatch(deletePostAction(id));

      dispatch(createAlert("Post Removed", "success"));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (
          err !== undefined &&
          "response" in err &&
          err.response !== undefined
        ) {
          dispatch(
            postError({
              msg: err.response.statusText,
              status: err.response.status,
            }),
          );
        }
      }
    }
  };
// Add post
export const addPost =
  (formData: { text: string }): AppThunk =>
  async (dispatch) => {
    try {
      const res = await api.post("/posts", formData);

      dispatch(addPostAction(res.data));

      dispatch(createAlert("Post Created", "success"));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (
          err !== undefined &&
          "response" in err &&
          err.response !== undefined
        ) {
          dispatch(
            postError({
              msg: err.response.statusText,
              status: err.response.status,
            }),
          );
        }
      }
    }
  };

// Get post
export const getPost =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const res = await api.get(`/posts/${id}`);

      dispatch(getPostAction(res.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (
          err !== undefined &&
          "response" in err &&
          err.response !== undefined
        ) {
          dispatch(
            postError({
              msg: err.response.statusText,
              status: err.response.status,
            }),
          );
        }
      }
    }
  };
// Add comment
export const addComment =
  (postId: string, formData: { text: string }): AppThunk =>
  async (dispatch) => {
    try {
      const res = await api.post(`/posts/comment/${postId}`, formData);

      dispatch(addCommentAction(res.data));

      dispatch(createAlert("Comment Added", "success"));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (
          err !== undefined &&
          "response" in err &&
          err.response !== undefined
        ) {
          dispatch(
            postError({
              msg: err.response.statusText,
              status: err.response.status,
            }),
          );
        }
      }
    }
  };
// Delete comment
export const deleteComment =
  (postId: string, commentId: string): AppThunk =>
  async (dispatch) => {
    try {
      await api.delete(`/posts/comment/${postId}/${commentId}`);

      dispatch(removeComment(commentId));

      dispatch(createAlert("Comment Removed", "success"));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (
          err !== undefined &&
          "response" in err &&
          err.response !== undefined
        ) {
          dispatch(
            postError({
              msg: err.response.statusText,
              status: err.response.status,
            }),
          );
        }
      }
    }
  };
