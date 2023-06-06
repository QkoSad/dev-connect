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
import api from "../utils/api";
import { createAlert } from "./alert";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get("/posts");

    dispatch(getPostsAction(res.data));
  } catch (err) {
    dispatch(
      postError({ msg: err.response.statusText, status: err.response.status })
    );
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${id}`);

    dispatch(updateLikes({ id, likes: res.data }));
  } catch (err) {
    dispatch(
      postError({ msg: err.response.statusText, status: err.response.status })
    );
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${id}`);

    dispatch(updateLikes({ id, likes: res.data }));
  } catch (err) {
    dispatch(
      postError({ msg: err.response.statusText, status: err.response.status })
    );
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`);

    dispatch(deletePostAction(id));

    dispatch(createAlert("Post Removed", "success"));
  } catch (err) {
    dispatch(
      postError({ msg: err.response.statusText, status: err.response.status })
    );
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/posts", formData);

    dispatch(addPostAction(res.data));

    dispatch(createAlert("Post Created", "success"));
  } catch (err) {
    dispatch(
      postError({ msg: err.response.statusText, status: err.response.status })
    );
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);

    dispatch(getPostAction(res.data));
  } catch (err) {
    dispatch(
      postError({ msg: err.response.statusText, status: err.response.status })
    );
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);

    dispatch(addCommentAction(res.data));

    dispatch(createAlert("Comment Added", "success"));
  } catch (err) {
    dispatch(
      postError({ msg: err.response.statusText, status: err.response.status })
    );
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch(removeComment(commentId));

    dispatch(createAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch(
      postError({ msg: err.response.statusText, status: err.response.status })
    );
  }
};
