import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { Post, Comment } from "../types";

interface postState {
  posts: Post[];
  post: Post | null;
  loading: boolean;
  error: {};
  //Todo errors
}
const initialState: postState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostsAction(state, action) {
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    },
    getPostAction(state, action) {
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    },
    addPostAction(state, action) {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    },
    deletePostAction(state, action) {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    },
    postError(state, action) {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },

    updateLikes(state, action) {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post,
        ),
        loading: false,
      };
    },

    addCommentAction(state, action: PayloadAction<Comment[]>) {
      if ("post" in state && state.post !== null) {
        return {
          ...state,
          post: { ...state.post, comments: action.payload },
          loading: false,
        };
      }
      throw new Error("post missing from state");
    },
    removeComment(state, action: PayloadAction<String>) {
      if ("post" in state && state.post !== null) {
        return {
          ...state,
          post: {
            ...state.post,
            comments: state.post.comments.filter(
              (comment) => comment._id !== action.payload,
            ),
          },
          loading: false,
        };
      }
      throw new Error("post missing from state");
    },
  },
});
export const {
  removeComment,
  addCommentAction,
  updateLikes,
  postError,
  deletePostAction,
  getPostAction,
  getPostsAction,
  addPostAction,
} = postSlice.actions;

export default postSlice.reducer;
